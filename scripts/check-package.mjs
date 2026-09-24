import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const packageDefinitions = [
  {
    directory: "packages/app-kit",
    name: "uiux-base-app-kit",
    requiredFiles: ["dist/index.js", "dist/index.d.ts"]
  },
  {
    directory: "packages/ui",
    name: "uiux-base",
    requiredFiles: ["dist/index.js", "dist/index.d.ts", "dist/uiux-base.css"]
  }
];

function run(command, args, cwd = root) {
  const npmExecutable = process.env.npm_execpath;
  const executable = command === "npm" && npmExecutable ? process.execPath : command;
  const executableArgs = command === "npm" && npmExecutable ? [npmExecutable, ...args] : args;
  const result = spawnSync(executable, executableArgs, {
    cwd,
    encoding: "utf8",
    shell: false
  });

  if (result.status !== 0) {
    throw new Error(
      [
        `Falha: ${command} ${args.join(" ")}`,
        result.error?.message,
        result.stdout?.trim(),
        result.stderr?.trim()
      ]
        .filter(Boolean)
        .join("\n")
    );
  }

  return result.stdout.trim();
}

const tempDirectory = await mkdtemp(join(tmpdir(), "uiux-base-package-"));

try {
  const tarballs = [];

  for (const definition of packageDefinitions) {
    const manifestPath = join(root, definition.directory, "package.json");
    const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

    assert.equal(manifest.name, definition.name);
    assert.equal(manifest.private, undefined, `${definition.name} nao pode ser privado`);
    assert.equal(manifest.publishConfig?.access, "public");
    assert.equal(manifest.license, "MIT");
    assert.equal(manifest.files?.length, 1);
    assert.equal(manifest.files[0], "dist");
    assert.equal(manifest.dependencies?.zod, undefined);
    assert.equal(manifest.dependencies?.recharts, undefined);

    const output = run("npm", [
      "pack",
      join(root, definition.directory),
      "--pack-destination",
      tempDirectory,
      "--json"
    ]);
    const [{ filename, files }] = JSON.parse(output);
    const packedPaths = new Set(files.map((file) => file.path));

    for (const requiredFile of definition.requiredFiles) {
      assert.ok(
        packedPaths.has(requiredFile),
        `${definition.name} deve incluir ${requiredFile}`
      );
    }

    assert.ok(
      [...packedPaths].every(
        (path) => !path.includes("/src/") && !path.endsWith(".test.tsx")
      ),
      `${definition.name} nao deve publicar fontes ou testes`
    );

    tarballs.push(join(tempDirectory, filename));
  }

  await writeFile(
    join(tempDirectory, "package.json"),
    JSON.stringify({ name: "uiux-base-package-smoke", private: true }, null, 2)
  );

  run(
    "npm",
    [
      "install",
      "--ignore-scripts",
      "--no-audit",
      "--no-fund",
      "react@18.3.1",
      "react-dom@18.3.1",
      "@types/react@18.3.31",
      "@types/react-dom@18.3.7",
      ...tarballs
    ],
    tempDirectory
  );

  await writeFile(
    join(tempDirectory, "smoke.mjs"),
    [
      'import * as kit from "uiux-base";',
      'if (typeof kit.Button !== "object" && typeof kit.Button !== "function") {',
      '  throw new Error("Button nao foi exportado");',
      '}',
      'if (typeof kit.DashboardShell !== "function") {',
      '  throw new Error("DashboardShell nao foi exportado");',
      '}',
      'console.log("package-smoke: ok");'
    ].join("\n")
  );
  run("node", ["smoke.mjs"], tempDirectory);

  await writeFile(
    join(tempDirectory, "smoke.tsx"),
    [
      'import { Button, DashboardShell, type NavigationItem } from "uiux-base";',
      'const items: NavigationItem[] = [{ id: "home", href: "/", isCurrent: false, label: "Home" }];',
      'void items;',
      'export const Smoke = () => (',
      '  <DashboardShell sidebar={<nav />}><Button>Ok</Button></DashboardShell>',
      ');'
    ].join("\n")
  );
  await writeFile(
    join(tempDirectory, "tsconfig.json"),
    JSON.stringify(
      {
        compilerOptions: {
          jsx: "react-jsx",
          lib: ["ES2022", "DOM"],
          module: "ESNext",
          moduleResolution: "Bundler",
          noEmit: true,
          skipLibCheck: false,
          strict: true,
          target: "ES2022"
        },
        include: ["smoke.tsx"]
      },
      null,
      2
    )
  );
  run(
    "node",
    [join(root, "node_modules/typescript/bin/tsc"), "--project", "tsconfig.json"],
    tempDirectory
  );

  process.stdout.write(
    "package-check: tarballs, import ESM e consumidor TypeScript validados\n"
  );
} finally {
  await rm(tempDirectory, { recursive: true, force: true });
}

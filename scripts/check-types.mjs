import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const attw = resolve(root, "node_modules/@arethetypeswrong/cli/dist/index.js");
const packageDirectories = ["packages/app-kit", "packages/ui"];
const tempDirectory = await mkdtemp(join(tmpdir(), "uiux-base-attw-"));

function run(command, args, cwd = root) {
  const npmExecutable = process.env.npm_execpath;
  const executable = command === "npm" && npmExecutable ? process.execPath : command;
  const executableArgs = command === "npm" && npmExecutable ? [npmExecutable, ...args] : args;
  const result = spawnSync(executable, executableArgs, {
    cwd,
    encoding: "utf8",
    shell: false,
    stdio: "inherit"
  });

  if (result.status !== 0) {
    throw new Error(`Falha: ${command} ${args.join(" ")}`);
  }
}

try {
  for (const directory of packageDirectories) {
    const npmExecutable = process.env.npm_execpath;
    const executable = npmExecutable ? process.execPath : "npm";
    const args = npmExecutable
      ? [
          npmExecutable,
          "pack",
          resolve(root, directory),
          "--pack-destination",
          tempDirectory,
          "--json"
        ]
      : [
          "pack",
          resolve(root, directory),
          "--pack-destination",
          tempDirectory,
          "--json"
        ];
    const result = spawnSync(executable, args, {
      cwd: root,
      encoding: "utf8",
      shell: false
    });

    if (result.status !== 0) {
      throw new Error(result.stderr || `Falha ao empacotar ${directory}`);
    }

    const [{ filename }] = JSON.parse(result.stdout);
    run(process.execPath, [
      attw,
      join(tempDirectory, filename),
      "--profile",
      "esm-only",
      "--entrypoints",
      "."
    ]);
  }
} finally {
  await rm(tempDirectory, {
    force: true,
    maxRetries: 5,
    recursive: true,
    retryDelay: 200
  });
}

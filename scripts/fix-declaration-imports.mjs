import { readdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import process from "node:process";

const targetDirectory = process.argv[2];

if (!targetDirectory) {
  throw new Error("Informe o diretorio de declaracoes a normalizar");
}

async function collectDeclarations(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = resolve(directory, entry.name);
      return entry.isDirectory()
        ? collectDeclarations(path)
        : entry.name.endsWith(".d.ts")
          ? [path]
          : [];
    })
  );

  return nested.flat();
}

const declarationFiles = await collectDeclarations(resolve(targetDirectory));

await Promise.all(
  declarationFiles.map(async (path) => {
    const source = await readFile(path, "utf8");
    const normalized = source.replace(
      /(from\s+["'])(\.\.?\/[^"']+)(["'])/g,
      (match, prefix, specifier, suffix) =>
        /\.(?:[cm]?[jt]sx?|css|json|node)$/.test(specifier)
          ? match
          : `${prefix}${specifier}.js${suffix}`
    );

    if (normalized !== source) {
      await writeFile(path, normalized);
    }
  })
);

process.stdout.write(`declarations-fix: ${declarationFiles.length} arquivos verificados\n`);

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import process from "node:process";

const root = resolve(import.meta.dirname, "..");
const tag = process.argv[2];

assert.match(tag ?? "", /^v\d+\.\d+\.\d+$/, "Informe uma tag semver como v0.1.1");

const manifests = await Promise.all(
  ["package.json", "packages/app-kit/package.json", "packages/ui/package.json"].map(
    async (path) => JSON.parse(await readFile(resolve(root, path), "utf8"))
  )
);
const expectedVersion = tag.slice(1);

for (const manifest of manifests) {
  assert.equal(
    manifest.version,
    expectedVersion,
    `${manifest.name} deve estar na versao ${expectedVersion}`
  );
}

assert.equal(
  manifests[2].dependencies?.["uiux-base-app-kit"],
  expectedVersion,
  "uiux-base deve depender da mesma versao de uiux-base-app-kit"
);

process.stdout.write(`release-version-check: ${tag} consistente\n`);

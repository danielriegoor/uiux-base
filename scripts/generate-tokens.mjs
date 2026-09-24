import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import process from "node:process";

const root = resolve(import.meta.dirname, "..");
const sourcePath = resolve(root, "packages/ui/src/tokens/theme.json");
const typescriptPath = resolve(root, "packages/ui/src/tokens/theme.generated.ts");
const cssPath = resolve(root, "packages/ui/src/styles/tokens.css");
const checkOnly = process.argv.includes("--check");

const themeTokens = JSON.parse(await readFile(sourcePath, "utf8"));

function kebabCase(value) {
  return value.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function flattenTokens(value, path = []) {
  return Object.entries(value).flatMap(([key, child]) => {
    const nextPath = [...path, kebabCase(key)];

    if (typeof child === "string") {
      return [[`--ui-${nextPath.join("-")}`, child]];
    }

    return flattenTokens(child, nextPath);
  });
}

function renderVariables(entries) {
  return entries.map(([name, value]) => `  ${name}: ${value};`).join("\n");
}

const sharedVariables = renderVariables(flattenTokens(themeTokens.shared));
const lightVariables = renderVariables(flattenTokens(themeTokens.light));
const darkVariables = renderVariables(flattenTokens(themeTokens.dark));

const generatedCss = [
  "/* Gerado por scripts/generate-tokens.mjs. Nao edite manualmente. */",
  ":root {",
  sharedVariables,
  lightVariables,
  "  color-scheme: light;",
  "}",
  "",
  '[data-ui-theme="dark"],',
  ".dark {",
  darkVariables,
  "  color-scheme: dark;",
  "}",
  ""
].join("\n");

const generatedTypescript = [
  "// Gerado por scripts/generate-tokens.mjs. Nao edite manualmente.",
  `export const themeTokens = ${JSON.stringify(themeTokens, null, 2)} as const;`,
  "",
  "export type ThemeTokens = typeof themeTokens;",
  ""
].join("\n");

async function assertGeneratedFile(path, expected) {
  const actual = await readFile(path, "utf8");
  assert.equal(
    actual.replaceAll("\r\n", "\n"),
    expected,
    `${path} esta fora de sincronia com theme.json`
  );
}

if (checkOnly) {
  await Promise.all([
    assertGeneratedFile(cssPath, generatedCss),
    assertGeneratedFile(typescriptPath, generatedTypescript)
  ]);
  process.stdout.write("tokens-check: CSS e TypeScript sincronizados\n");
} else {
  await Promise.all([
    writeFile(cssPath, generatedCss),
    writeFile(typescriptPath, generatedTypescript)
  ]);
  process.stdout.write("tokens-generate: CSS e TypeScript atualizados\n");
}

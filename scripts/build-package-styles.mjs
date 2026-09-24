import { copyFile, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import process from "node:process";

const root = resolve(import.meta.dirname, "..");
const sourceStyles = resolve(root, "packages/ui/src/styles");
const outputStyles = resolve(root, "packages/ui/dist");
const tokensPath = resolve(sourceStyles, "tokens.css");
const resetPath = resolve(sourceStyles, "reset.css");
const componentsPath = resolve(outputStyles, "components.css");
const aggregatePath = resolve(outputStyles, "uiux-base.css");

await Promise.all([
  copyFile(tokensPath, resolve(outputStyles, "tokens.css")),
  copyFile(resetPath, resolve(outputStyles, "reset.css"))
]);

const [tokens, reset, components] = await Promise.all([
  readFile(tokensPath, "utf8"),
  readFile(resetPath, "utf8"),
  readFile(componentsPath, "utf8")
]);

await writeFile(
  aggregatePath,
  [tokens.trim(), reset.trim(), components.trim(), ""].join("\n\n")
);

process.stdout.write("styles-build: tokens, reset, components e agregado prontos\n");

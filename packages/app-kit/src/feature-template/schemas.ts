import type { FeatureExample, FeatureExampleInput } from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isFeatureExample(value: unknown): value is FeatureExample {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    (value.status === "active" || value.status === "paused") &&
    typeof value.updatedAt === "string"
  );
}

export function normalizeFeatureExampleInput(
  input: FeatureExampleInput
): FeatureExampleInput {
  return {
    name: input.name.trim(),
    status: input.status ?? "active"
  };
}

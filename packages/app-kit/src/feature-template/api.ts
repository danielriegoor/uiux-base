import { apiClient, type ApiClient } from "../services/apiClient";
import { normalizeFeatureExampleInput } from "./schemas";
import type { FeatureExample, FeatureExampleInput } from "./types";

export function listFeatureExamples(client: ApiClient = apiClient) {
  return client.get<FeatureExample[]>("/feature-examples");
}

export function createFeatureExample(
  payload: FeatureExampleInput,
  client: ApiClient = apiClient
) {
  return client.post<FeatureExample>(
    "/feature-examples",
    normalizeFeatureExampleInput(payload)
  );
}

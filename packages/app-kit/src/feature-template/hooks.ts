import { useCallback } from "react";
import { useAsyncState } from "../hooks/useAsyncState";
import { listFeatureExamples } from "./api";
import type { FeatureExample } from "./types";

export function useFeatureExamples() {
  const asyncState = useAsyncState<FeatureExample[]>([]);
  const { run } = asyncState;
  const load = useCallback(
    () => run(() => listFeatureExamples()),
    [run]
  );

  return {
    ...asyncState,
    load
  };
}

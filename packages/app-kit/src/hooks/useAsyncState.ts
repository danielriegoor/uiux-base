import { useCallback, useEffect, useRef, useState } from "react";

export type AsyncStatus = "idle" | "loading" | "success" | "error";

export type AsyncState<TData, TError = unknown> = {
  data?: TData;
  error?: TError;
  status: AsyncStatus;
};

export type UseAsyncStateResult<TData, TError = unknown> = AsyncState<
  TData,
  TError
> & {
  isError: boolean;
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  reset: () => void;
  run: (operation: () => Promise<TData>) => Promise<TData>;
  setData: (data: TData) => void;
};

export function useAsyncState<TData, TError = unknown>(
  initialData?: TData
): UseAsyncStateResult<TData, TError> {
  const isMountedRef = useRef(true);
  const runIdRef = useRef(0);
  const [state, setState] = useState<AsyncState<TData, TError>>({
    data: initialData,
    status: initialData === undefined ? "idle" : "success"
  });

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const run = useCallback(async (operation: () => Promise<TData>) => {
    const runId = runIdRef.current + 1;
    runIdRef.current = runId;
    setState((current) => ({
      data: current.data,
      status: "loading"
    }));

    try {
      const data = await operation();

      if (isMountedRef.current && runIdRef.current === runId) {
        setState({ data, status: "success" });
      }

      return data;
    } catch (error) {
      if (isMountedRef.current && runIdRef.current === runId) {
        setState({ error: error as TError, status: "error" });
      }

      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    runIdRef.current += 1;
    setState({ status: "idle" });
  }, []);

  const setData = useCallback((data: TData) => {
    runIdRef.current += 1;
    setState({ data, status: "success" });
  }, []);

  return {
    ...state,
    isError: state.status === "error",
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isSuccess: state.status === "success",
    reset,
    run,
    setData
  };
}

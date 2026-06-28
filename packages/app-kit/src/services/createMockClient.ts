import {
  ApiClientError,
  type ApiClient,
  type ApiClientMethod,
  type ApiClientRequestOptions
} from "./apiClient";

export type MockClientRequest = {
  body?: unknown;
  method: ApiClientMethod;
  options?: ApiClientRequestOptions;
  path: string;
};

export type MockRouteHandler =
  | unknown
  | ((request: MockClientRequest) => unknown | Promise<unknown>);

export type MockRouteMap = Record<string, MockRouteHandler>;

function routeKey(method: ApiClientMethod, path: string) {
  return `${method} ${path}`;
}

async function resolveMockRoute<TResponse>(
  routes: MockRouteMap,
  method: ApiClientMethod,
  path: string,
  body?: unknown,
  options?: ApiClientRequestOptions
) {
  const handler = routes[routeKey(method, path)];

  if (handler === undefined) {
    throw new ApiClientError(
      `Mock route not found: ${routeKey(method, path)}`,
      404,
      "Not Found",
      { message: "Mock route not found", method, path }
    );
  }

  if (typeof handler === "function") {
    return (await handler({ body, method, options, path })) as TResponse;
  }

  return handler as TResponse;
}

export function createMockClient(routes: MockRouteMap): ApiClient {
  return {
    delete: (path, options) =>
      resolveMockRoute(routes, "DELETE", path, undefined, options),
    get: (path, options) => resolveMockRoute(routes, "GET", path, undefined, options),
    patch: (path, body, options) =>
      resolveMockRoute(routes, "PATCH", path, body, options),
    post: (path, body, options) =>
      resolveMockRoute(routes, "POST", path, body, options),
    put: (path, body, options) => resolveMockRoute(routes, "PUT", path, body, options),
    request: (method, path, body, options) =>
      resolveMockRoute(routes, method, path, body, options)
  };
}

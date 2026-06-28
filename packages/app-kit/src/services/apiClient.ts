export type ApiClientMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiClientRequestOptions = {
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | null | undefined>;
  signal?: AbortSignal;
};

export type ApiClient = {
  request<TResponse>(
    method: ApiClientMethod,
    path: string,
    body?: unknown,
    options?: ApiClientRequestOptions
  ): Promise<TResponse>;
  get<TResponse>(path: string, options?: ApiClientRequestOptions): Promise<TResponse>;
  post<TResponse>(
    path: string,
    body?: unknown,
    options?: ApiClientRequestOptions
  ): Promise<TResponse>;
  put<TResponse>(
    path: string,
    body?: unknown,
    options?: ApiClientRequestOptions
  ): Promise<TResponse>;
  patch<TResponse>(
    path: string,
    body?: unknown,
    options?: ApiClientRequestOptions
  ): Promise<TResponse>;
  delete<TResponse>(
    path: string,
    options?: ApiClientRequestOptions
  ): Promise<TResponse>;
};

export type ApiClientOptions = {
  baseUrl?: string;
  fetcher?: typeof fetch;
  headers?: Record<string, string>;
};

export class ApiClientError extends Error {
  body: unknown;
  status: number;
  statusText: string;

  constructor(message: string, status: number, statusText: string, body: unknown) {
    super(message);
    this.body = body;
    this.name = "ApiClientError";
    this.status = status;
    this.statusText = statusText;
  }
}

function buildUrl(
  baseUrl: string | undefined,
  path: string,
  query?: ApiClientRequestOptions["query"]
) {
  const cleanBaseUrl = baseUrl?.replace(/\/+$/, "") ?? "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const rawUrl = /^https?:\/\//i.test(path)
    ? path
    : `${cleanBaseUrl}${cleanPath}`;
  const isAbsolute = /^https?:\/\//i.test(rawUrl);
  const url = new URL(
    isAbsolute
      ? rawUrl
      : `http://local.app${rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`}`
  );

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  if (isAbsolute) {
    return url.toString();
  }

  return `${url.pathname}${url.search}`;
}

async function parseResponseBody(response: Response) {
  if (response.status === 204) {
    return undefined;
  }

  const text = await response.text();

  if (!text) {
    return undefined;
  }

  const contentType = response.headers.get("Content-Type") ?? "";

  if (contentType.includes("application/json")) {
    return JSON.parse(text) as unknown;
  }

  return text;
}

function createRequestInit(
  method: ApiClientMethod,
  body: unknown,
  clientHeaders: Record<string, string>,
  options?: ApiClientRequestOptions
): RequestInit {
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...clientHeaders,
    ...options?.headers
  };
  const init: RequestInit = {
    headers,
    method,
    signal: options?.signal
  };

  if (body !== undefined) {
    headers["Content-Type"] = headers["Content-Type"] ?? "application/json";
    init.body =
      typeof body === "string" || body instanceof FormData
        ? (body as BodyInit)
        : JSON.stringify(body);
  }

  return init;
}

export function createApiClient({
  baseUrl,
  fetcher = fetch,
  headers = {}
}: ApiClientOptions = {}): ApiClient {
  async function request<TResponse>(
    method: ApiClientMethod,
    path: string,
    body?: unknown,
    options?: ApiClientRequestOptions
  ) {
    const response = await fetcher(
      buildUrl(baseUrl, path, options?.query),
      createRequestInit(method, body, headers, options)
    );
    const responseBody = await parseResponseBody(response);

    if (!response.ok) {
      throw new ApiClientError(
        `Request failed with status ${response.status}`,
        response.status,
        response.statusText,
        responseBody
      );
    }

    return responseBody as TResponse;
  }

  return {
    delete: (path, options) => request("DELETE", path, undefined, options),
    get: (path, options) => request("GET", path, undefined, options),
    patch: (path, body, options) => request("PATCH", path, body, options),
    post: (path, body, options) => request("POST", path, body, options),
    put: (path, body, options) => request("PUT", path, body, options),
    request
  };
}

export const apiClient = createApiClient();

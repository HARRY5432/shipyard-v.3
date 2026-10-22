import type { z } from 'zod';

// ─── Configuration ───────────────────────────────────────
const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'https://api.shipyards.dev';
const REQUEST_TIMEOUT = 30000; // 30 seconds
const MAX_RETRIES = 3;

// ─── Custom Error Classes ──────────────────────────────────
export class ApiRequestError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly errorCode: string,
    public readonly details?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

export class NetworkError extends Error {
  constructor(message = 'Network connection failed') {
    super(message);
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends Error {
  constructor(timeout: number) {
    super(`Request timed out after ${timeout}ms`);
    this.name = 'TimeoutError';
  }
}

// ─── Token Refresh Queue ─────────────────────────────────
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;
const requestQueue: Array<(token: string) => void> = [];

async function refreshAccessToken(): Promise<string> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = performRefresh();

  try {
    const newToken = await refreshPromise;
    requestQueue.forEach((resolve) => resolve(newToken));
    requestQueue.length = 0;
    return newToken;
  } finally {
    isRefreshing = false;
    refreshPromise = null;
  }
}

async function performRefresh(): Promise<string> {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    clearAuthData();
    window.location.href = '/login?reason=session_expired';
    throw new Error('Token refresh failed');
  }

  const data = await response.json();
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  return data.accessToken;
}

function clearAuthData(): void {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('auth-storage');
}

// ─── Request Interceptor ─────────────────────────────────
interface RequestConfig extends RequestInit {
  timeout?: number;
  retries?: number;
  schema?: z.ZodType<unknown>;
  skipRefresh?: boolean;
}

async function apiClient<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<T> {
  const { timeout = REQUEST_TIMEOUT, retries = MAX_RETRIES, schema, skipRefresh, ...fetchConfig } = config;

  const url = `${API_BASE_URL}${endpoint}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchConfig,
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
        ...fetchConfig.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 401 && !skipRefresh) {
        try {
          const newToken = await refreshAccessToken();
          return apiClient<T>(endpoint, {
            ...config,
            headers: {
              ...config.headers,
              Authorization: `Bearer ${newToken}`,
            },
            skipRefresh: true,
          });
        } catch {
          throw new ApiRequestError('Session expired', 401, 'SESSION_EXPIRED');
        }
      }

      const errorData = await response.json().catch(() => ({}));
      throw new ApiRequestError(
        errorData.message ?? `HTTP ${response.status}`,
        response.status,
        errorData.code ?? 'UNKNOWN_ERROR',
        errorData.details
      );
    }

    const data = await response.json();

    if (schema) {
      const result = schema.safeParse(data);
      if (!result.success) {
        console.error('Schema validation failed:', result.error);
        throw new ApiRequestError(
          'Invalid response format from server',
          500,
          'SCHEMA_VALIDATION_ERROR'
        );
      }
      return result.data as T;
    }

    return data as T;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof ApiRequestError) throw error;
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new NetworkError();
    }
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new TimeoutError(timeout);
    }

    throw error;
  }
}

// ─── Retry Logic with Exponential Backoff ────────────────
async function apiClientWithRetry<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<T> {
  const { retries = MAX_RETRIES, ...rest } = config;
  let lastError: Error;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await apiClient<T>(endpoint, rest);
    } catch (error) {
      lastError = error as Error;

      if (error instanceof ApiRequestError && error.statusCode < 500) {
        throw error;
      }

      if (attempt === retries) break;

      const delay = Math.min(1000 * 2 ** attempt, 8000);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}

// ─── Auth Headers Helper ─────────────────────────────────
function getAuthHeaders(): Record<string, string> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ─── HTTP Method Helpers ─────────────────────────────────
export const api = {
  get: <T>(endpoint: string, config?: Omit<RequestConfig, 'method'>) =>
    apiClientWithRetry<T>(endpoint, { ...config, method: 'GET' }),

  post: <T>(endpoint: string, body: unknown, config?: Omit<RequestConfig, 'method' | 'body'>) =>
    apiClientWithRetry<T>(endpoint, {
      ...config,
      method: 'POST',
      body: JSON.stringify(body),
    }),

  put: <T>(endpoint: string, body: unknown, config?: Omit<RequestConfig, 'method' | 'body'>) =>
    apiClientWithRetry<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  patch: <T>(endpoint: string, body: unknown, config?: Omit<RequestConfig, 'method' | 'body'>) =>
    apiClientWithRetry<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string, config?: Omit<RequestConfig, 'method'>) =>
    apiClientWithRetry<T>(endpoint, { ...config, method: 'DELETE' }),
};

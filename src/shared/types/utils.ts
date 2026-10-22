/**
 * Makes all properties nullable (for partial updates)
 */
export type Nullable<T> = { [P in keyof T]: T[P] | null };

/**
 * Deep partial type for nested updates
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Extracts the element type from an array
 */
export type ElementType<T extends readonly unknown[]> = T[number];

/**
 * Creates a type with only the specified keys required
 */
export type RequiredKeys<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

/**
 * API response wrapper types
 */
export type ApiResponse<T> =
  | { success: true; data: T; meta?: PaginationMeta }
  | { success: false; error: ApiError };

export type PaginationMeta = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type ApiError = {
  code: string;
  message: string;
  details?: Record<string, string[]>;
  statusCode: number;
};

/**
 * Async state for UI components
 */
export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: ApiError };

# 01 — ARCHITECTURE & ENGINEERING DISCIPLINE
# The Foundation. The Bible. The Non-Negotiable Rules.
# Written for: Shipyards Pivot Platform Transformation
# Standard: $100K+ Senior Engineering Team | 20+ Years Combined Experience
# Status: MASTER SPEC — NOTHING GETS BUILT WITHOUT THIS

---

## TABLE OF CONTENTS

1. [Philosophy & Core Principles](#1-philosophy--core-principles)
2. [Project Structure (Domain-Driven Architecture)](#2-project-structure)
3. [TypeScript Strictness & Type Safety](#3-typescript-strictness)
4. [Component Architecture (Atomic Design + Compound Components)](#4-component-architecture)
5. [API & Service Layer Architecture](#5-api--service-layer)
6. [Error Handling & Resilience Patterns](#6-error-handling)
7. [Code Conventions & Naming](#7-code-conventions)
8. [Import/Export Patterns](#8-import-export-patterns)
9. [Module Boundaries & Dependency Rules](#9-module-boundaries)
10. [Code Quality Gates & Enforcement](#10-quality-gates)
11. [Anti-Patterns (NEVER DO THESE)](#11-anti-patterns)
12. [Implementation Checklist](#12-implementation-checklist)

---

## 1. PHILOSOPHY & CORE PRINCIPLES

### 1.1 The Five Pillars
Every line of code, every file, every decision MUST satisfy these five pillars:

| Pillar | Rule | Violation Cost |
|--------|------|---------------|
| **Clarity** | Code is read 10x more than written. If it needs a comment to explain WHAT it does, rewrite it. | -2 story points |
| **Predictability** | Same input = same output. No side effects in pure functions. No magic. | Block merge |
| **Testability** | Every unit must be testable in isolation. No hidden dependencies. | Block merge |
| **Scalability** | Architecture must handle 10x growth without rewrite. | Architecture review |
| **Maintainability** | A junior dev must understand it in 5 minutes. | Code review rejection |

### 1.2 The Golden Rules

```
RULE #1: A component does ONE thing. If you say "and" describing it, split it.
RULE #2: Never mix presentation logic with business logic.
RULE #3: Never mix server state with client state in the same store.
RULE #4: Every async operation has a loading, success, and error state.
RULE #5: Types are contracts. Break the contract, break the build.
RULE #6: No file over 200 lines without explicit justification.
RULE #7: Dependencies flow inward. Inner layers know nothing of outer layers.
RULE #8: Magic numbers are forbidden. Everything is a named constant.
RULE #9: Default to composition over inheritance. Always.
RULE #10: Performance is a feature, not an afterthought.
```

### 1.3 The "Vibe-Coded" vs "World-Class" Mindset Shift

| Vibe-Coded Thinking | World-Class Thinking |
|--------------------|---------------------|
| "It works on my machine" | "It works in production under load" |
| "I'll fix it later" | "If it's not tested, it's broken" |
| "This library looks cool, let's use it" | "What's the bundle size? What's the maintenance cost?" |
| "Props are fine, I'll just pass them down" | "Prop drilling at 3 levels = context or composition" |
| "TypeScript is annoying, I'll use `any`" | "`any` is a bug waiting to happen. Fix the type." |
| "Error handling? I'll add a try-catch later" | "Error handling is the first thing I write" |
| "It looks fine on my 27" monitor" | "It must be perfect on a 320px feature phone" |

---

## 2. PROJECT STRUCTURE

### 2.1 Root Directory

```
shipyards-pivot/
├── .github/                    # CI/CD workflows, PR templates
├── .husky/                     # Git hooks
├── .vscode/                    # Shared VS Code settings
├── public/                     # Static assets (never imported in code)
│   ├── fonts/                  # Self-hosted fonts only
│   ├── icons/                  # Favicon, apple-touch-icon, manifest icons
│   └── images/                 # Static images (not processed by bundler)
├── src/
│   ├── app/                    # Next.js App Router (routes, layouts, loading, error)
│   ├── domains/                # Business logic organized by feature/domain
│   ├── shared/                 # Cross-cutting concerns (used by 2+ domains)
│   ├── lib/                    # Third-party library configurations
│   ├── styles/                 # Global styles, CSS variables, Tailwind config
│   ├── types/                  # Global TypeScript declarations
│   └── middleware.ts           # Next.js middleware (auth, redirects, headers)
├── tests/
│   ├── unit/                   # Jest/Vitest tests (mirror src structure)
│   ├── integration/            # API integration tests
│   ├── e2e/                    # Playwright end-to-end tests
│   └── fixtures/               # Test data, mock responses
├── scripts/                    # Build scripts, code generation
├── docs/                       # Architecture Decision Records (ADRs)
├── .env.example                # All env vars documented
├── .env.local                  # Local overrides (gitignored)
├── next.config.ts              # Next.js config (typed)
├── tailwind.config.ts          # Tailwind with design tokens
├── tsconfig.json               # Strict TypeScript config
├── eslint.config.mjs           # ESLint flat config
├── prettier.config.mjs         # Prettier config
├── vitest.config.ts            # Test runner config
├── playwright.config.ts        # E2E test config
└── package.json                # Pinned dependencies, engine requirements
```

### 2.2 The `src/domains/` Directory (Domain-Driven Design)

This is the HEART of the architecture. Every feature lives in its own domain.

```
src/domains/
├── _template/                  # COPY THIS for new domains
│   ├── components/             # Domain-specific React components
│   ├── hooks/                  # Domain-specific custom hooks
│   ├── services/               # API calls, external integrations
│   ├── stores/                 # State management (Zustand)
│   ├── types/                  # Domain-specific TypeScript types
│   ├── validators/             # Zod schemas for runtime validation
│   ├── utils/                  # Domain-specific utilities
│   └── index.ts                # Public API of the domain (barrel export)
│
├── auth/                       # Authentication & Authorization
│   ├── components/
│   │   ├── LoginForm/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── LoginForm.test.tsx
│   │   │   ├── LoginForm.stories.tsx
│   │   │   └── index.ts
│   │   ├── OAuthButton/
│   │   ├── PasswordInput/
│   │   └── SessionGuard/
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useSession.ts
│   │   └── usePermissions.ts
│   ├── services/
│   │   ├── authService.ts      # HTTP calls to auth API
│   │   ├── tokenService.ts     # Token refresh, storage
│   │   └── sessionService.ts   # Session management
│   ├── stores/
│   │   └── authStore.ts
│   ├── types/
│   │   ├── auth.types.ts
│   │   └── user.types.ts
│   ├── validators/
│   │   ├── login.schema.ts
│   │   ├── register.schema.ts
│   │   └── password.schema.ts
│   └── index.ts
│
├── dashboard/                  # Main dashboard feature
├── billing/                    # Payments, invoices, subscriptions
├── analytics/                  # Charts, reports, data visualization
├── notifications/              # In-app notifications, alerts
├── settings/                   # User preferences, account settings
└── [feature-name]/             # Future features follow same pattern
```

### 2.3 The `src/shared/` Directory (Cross-Cutting Concerns)

```
src/shared/
├── components/                 # Atomic Design System
│   ├── atoms/                  # Smallest building blocks
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Label/
│   │   ├── Icon/
│   │   ├── Badge/
│   │   ├── Avatar/
│   │   ├── Skeleton/
│   │   ├── Spinner/
│   │   └── [atom-name]/
│   │       ├── [AtomName].tsx
│   │       ├── [AtomName].test.tsx
│   │       ├── [AtomName].stories.tsx
│   │       ├── [AtomName].variants.ts
│   │       └── index.ts
│   │
│   ├── molecules/              # Combinations of atoms
│   │   ├── FormField/          # Label + Input + ErrorMessage
│   │   ├── SearchBar/          # Input + Button + Icon
│   │   ├── Card/               # Container with padding, shadow, radius
│   │   ├── Dropdown/           # Button + Menu items
│   │   └── [molecule-name]/
│   │
│   ├── organisms/              # Complex components
│   │   ├── DataTable/          # Table + Pagination + Sorting + Filtering
│   │   ├── Modal/              # Overlay + Content + Actions
│   │   ├── Sidebar/            # Navigation + User profile + Collapse
│   │   ├── TopNav/             # Logo + Search + Notifications + Profile
│   │   └── [organism-name]/
│   │
│   ├── templates/              # Page layouts
│   │   ├── DashboardLayout/
│   │   ├── AuthLayout/
│   │   ├── SettingsLayout/
│   │   └── [template-name]/
│   │
│   └── providers/              # React context providers
│       ├── QueryProvider/
│       ├── ThemeProvider/
│       └── [provider-name]/
│
├── hooks/                      # Reusable custom hooks
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   ├── useMediaQuery.ts
│   ├── useIntersectionObserver.ts
│   ├── useClickOutside.ts
│   ├── usePrevious.ts
│   ├── useToggle.ts
│   ├── useAsync.ts
│   └── [hook-name].ts
│
├── lib/                        # Utility functions (pure, tested)
│   ├── cn.ts                   # Tailwind class merge (clsx + tailwind-merge)
│   ├── formatters/
│   │   ├── date.ts
│   │   ├── currency.ts
│   │   ├── number.ts
│   │   └── string.ts
│   ├── validators/
│   │   ├── email.ts
│   │   ├── phone.ts
│   │   └── url.ts
│   ├── constants/
│   │   ├── app.ts              # App name, version, URLs
│   │   ├── breakpoints.ts      # Responsive breakpoints
│   │   ├── http-status.ts      # HTTP status code enums
│   │   └── regex.ts            # Shared regex patterns
│   └── [utility-name].ts
│
├── styles/
│   ├── globals.css             # Global styles, CSS variables
│   ├── tokens.css              # Design tokens as CSS custom properties
│   └── animations.css          # Keyframe animations
│
└── types/
    ├── global.d.ts             # Global type declarations
    ├── api.ts                  # Shared API response types
    └── utils.ts                # Utility types (Nullable, DeepPartial, etc.)
```

### 2.4 The `src/app/` Directory (Next.js App Router)

```
src/app/
├── (auth)/                     # Route group (no URL segment)
│   ├── login/
│   │   ├── page.tsx            # Login page component
│   │   └── loading.tsx         # Suspense fallback
│   ├── register/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   └── layout.tsx              # Auth layout (no sidebar, centered)
│
├── (dashboard)/                # Route group
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── error.tsx           # Error boundary
│   ├── billing/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── settings/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── layout.tsx              # Dashboard layout (sidebar + topnav)
│   └── page.tsx                # Redirect to /dashboard
│
├── api/                        # API routes (if needed)
│   └── [route]/
│       └── route.ts
│
├── layout.tsx                  # Root layout (HTML, fonts, providers)
├── loading.tsx                 # Global loading state
├── error.tsx                   # Global error boundary
├── not-found.tsx               # 404 page
├── robots.ts                   # robots.txt generation
└── sitemap.ts                  # sitemap.xml generation
```

---

## 3. TYPESCRIPT STRICTNESS

### 3.1 tsconfig.json (Non-Negotiable)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"],
      "@/domains/*": ["./src/domains/*"],
      "@/shared/*": ["./src/shared/*"],
      "@/app/*": ["./src/app/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/styles/*": ["./src/styles/*"],
      "@/types/*": ["./src/types/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 3.2 Type Safety Rules

```typescript
// ❌ FORBIDDEN: any
function processData(data: any) { ... }

// ✅ REQUIRED: Unknown with type guard
function processData(data: unknown) {
  if (!isValidData(data)) {
    throw new ValidationError('Invalid data structure');
  }
  // Now TypeScript knows the shape
  return data;
}

// ❌ FORBIDDEN: Implicit any in callbacks
users.map(user => user.name); // user is implicitly any

// ✅ REQUIRED: Explicit types or inferred from typed array
users.map((user: User) => user.name);
// Or better: users is typed as User[], so inference works

// ❌ FORBIDDEN: Non-null assertion
const element = document.getElementById('app')!;

// ✅ REQUIRED: Null check
const element = document.getElementById('app');
if (!element) {
  throw new Error('Root element not found');
}

// ❌ FORBIDDEN: Optional chaining without handling undefined
const name = user?.profile?.name;

// ✅ REQUIRED: Handle the undefined case
const name = user?.profile?.name ?? 'Anonymous';

// ❌ FORBIDDEN: Type assertions without validation
const user = response.data as User;

// ✅ REQUIRED: Runtime validation with Zod
const user = userSchema.parse(response.data);
```

### 3.3 Utility Types (src/shared/types/utils.ts)

```typescript
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
```

---

## 4. COMPONENT ARCHITECTURE

### 4.1 Atomic Design + Compound Components

Every component follows the **Compound Component Pattern** for flexibility:

```typescript
// src/shared/components/molecules/Modal/

// Modal.tsx — The container
import { createContext, useContext, useState, useCallback } from 'react';
import { cn } from '@/shared/lib/cn';

// ─── Context ─────────────────────────────────────────────
interface ModalContextValue {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal subcomponents must be used within <Modal>');
  }
  return context;
}

// ─── Root Component ────────────────────────────────────────
interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

function Modal({ children, isOpen, onClose, className }: ModalProps) {
  if (!isOpen) return null;

  return (
    <ModalContext.Provider value={{ isOpen, onClose }}>
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center',
          'bg-black/50 backdrop-blur-sm',
          className
        )}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </ModalContext.Provider>
  );
}

// ─── Subcomponents ─────────────────────────────────────────
function ModalHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-6 pt-6 pb-4', className)}>{children}</div>;
}

function ModalContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-6 py-4', className)}>{children}</div>;
}

function ModalFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex justify-end gap-3 px-6 pb-6 pt-4', className)}>{children}</div>;
}

// ─── Composition ───────────────────────────────────────────
Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export { Modal };
```

### 4.2 Component File Structure

Every component lives in its own directory with these files:

```
ComponentName/
├── ComponentName.tsx           # Main component (export default)
├── ComponentName.test.tsx      # Unit tests (100% coverage target)
├── ComponentName.stories.tsx   # Storybook stories (all states)
├── ComponentName.variants.ts   # Variant definitions (if complex)
├── ComponentName.types.ts      # Types (if shared across files)
├── ComponentName.hooks.ts      # Component-specific hooks
├── useComponentName.ts         # Main hook (if component is thin)
└── index.ts                    # Barrel export
```

### 4.3 Component Template

```typescript
// src/shared/components/atoms/Button/Button.tsx

import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/cn';

// ─── Types ───────────────────────────────────────────────
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

// ─── Variants ────────────────────────────────────────────
const buttonVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center gap-2',
    'rounded-lg font-medium transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-[0.97]', // Tactile feedback
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary-600 text-white',
          'hover:bg-primary-700',
          'focus-visible:ring-primary-500',
          'shadow-sm hover:shadow-md',
        ],
        secondary: [
          'bg-secondary-100 text-secondary-900',
          'hover:bg-secondary-200',
          'focus-visible:ring-secondary-500',
        ],
        outline: [
          'border-2 border-gray-300 bg-transparent',
          'hover:bg-gray-50 hover:border-gray-400',
          'focus-visible:ring-gray-500',
        ],
        ghost: [
          'bg-transparent hover:bg-gray-100',
          'focus-visible:ring-gray-500',
        ],
        danger: [
          'bg-red-600 text-white',
          'hover:bg-red-700',
          'focus-visible:ring-red-500',
        ],
      },
      size: {
        xs: 'h-7 px-2.5 text-xs',
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

// ─── Component ───────────────────────────────────────────
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      isLoading = false,
      loadingText,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={disabled || isLoading}
        aria-disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner size="sm" className="animate-spin" />
            {loadingText ?? children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
```

### 4.4 Component Rules

```
RULE: Every component must have a displayName (for DevTools debugging).
RULE: Forward refs on all reusable components.
RULE: Use `asChild` pattern for polymorphic components (Button as Link).
RULE: Spread `...props` LAST so explicit props override.
RULE: Never use inline styles. Use Tailwind classes or CSS variables.
RULE: Every interactive element needs: focus styles, hover styles, active styles, disabled styles.
RULE: Loading states are not optional. Skeleton > Spinner > Content.
RULE: Error states are not optional. Error boundary + fallback UI.
RULE: Empty states are not optional. Illustration + helpful message + CTA.
```

---

## 5. API & SERVICE LAYER ARCHITECTURE

### 5.1 The Repository Pattern

```typescript
// src/shared/lib/api-client.ts

import { z } from 'zod';
import { ApiResponse, ApiError } from '@/shared/types/utils';

// ─── Configuration ───────────────────────────────────────
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.shipyards.dev';
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

// ─── Request Interceptor ─────────────────────────────────
interface RequestConfig extends RequestInit {
  timeout?: number;
  retries?: number;
  schema?: z.ZodType<unknown>;
}

async function apiClient<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<T> {
  const { timeout = REQUEST_TIMEOUT, retries = MAX_RETRIES, schema, ...fetchConfig } = config;

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

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiRequestError(
        errorData.message ?? `HTTP ${response.status}`,
        response.status,
        errorData.code ?? 'UNKNOWN_ERROR',
        errorData.details
      );
    }

    const data = await response.json();

    // Runtime validation with Zod
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

      // Don't retry client errors (4xx)
      if (error instanceof ApiRequestError && error.statusCode < 500) {
        throw error;
      }

      // Don't retry on last attempt
      if (attempt === retries) break;

      // Exponential backoff: 1s, 2s, 4s
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
```

### 5.2 Domain Service Pattern

```typescript
// src/domains/auth/services/authService.ts

import { z } from 'zod';
import { api } from '@/shared/lib/api-client';
import { LoginCredentials, AuthResponse, User } from '../types/auth.types';
import { loginSchema, authResponseSchema } from '../validators';

// ─── Schemas ─────────────────────────────────────────────
const loginResponseSchema = z.object({
  success: z.literal(true),
  data: authResponseSchema,
});

// ─── Service Object ────────────────────────────────────────
export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Validate input before sending
    const validated = loginSchema.parse(credentials);

    const response = await api.post<z.infer<typeof loginResponseSchema>>(
      '/auth/login',
      validated,
      { schema: loginResponseSchema }
    );

    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const validated = registerSchema.parse(data);

    const response = await api.post<z.infer<typeof loginResponseSchema>>(
      '/auth/register',
      validated,
      { schema: loginResponseSchema }
    );

    return response.data;
  },

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await api.post<z.infer<typeof loginResponseSchema>>(
      '/auth/refresh',
      { refreshToken },
      { schema: loginResponseSchema }
    );

    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout', {});
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<{ success: true; data: User }>('/auth/me', {
      schema: z.object({ success: z.literal(true), data: userSchema }),
    });

    return response.data;
  },

  async forgotPassword(email: string): Promise<void> {
    const validated = z.string().email().parse(email);
    await api.post('/auth/forgot-password', { email: validated });
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const validated = z.object({
      token: z.string().uuid(),
      password: z.string().min(8),
    }).parse({ token, password: newPassword });

    await api.post('/auth/reset-password', validated);
  },
} as const;

// Type inference for the service
export type AuthService = typeof authService;
```

### 5.3 React Query Integration

```typescript
// src/domains/auth/hooks/useAuth.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { useAuthStore } from '../stores/authStore';
import { LoginCredentials } from '../types/auth.types';

// ─── Query Keys ──────────────────────────────────────────
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  session: () => [...authKeys.all, 'session'] as const,
};

// ─── Hooks ───────────────────────────────────────────────
export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: () => authService.getCurrentUser(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      // Don't retry 401s
      if (error instanceof ApiRequestError && error.statusCode === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);
  const setTokens = useAuthStore((state) => state.setTokens);

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      setUser(data.user);
      setTokens(data.tokens);
      queryClient.setQueryData(authKeys.user(), data.user);
    },
    onError: (error) => {
      // Log to monitoring service
      console.error('Login failed:', error);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.clear);

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      window.location.href = '/login';
    },
  });
}
```

---

## 6. ERROR HANDLING & RESILIENCE

### 6.1 Error Boundary Pattern

```typescript
// src/shared/components/providers/ErrorBoundary/ErrorBoundary.tsx

import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/shared/components/atoms/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Send to monitoring service (Sentry, etc.)
    console.error('ErrorBoundary caught:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 p-8">
          <div className="text-6xl">💥</div>
          <h2 className="text-xl font-semibold text-gray-900">
            Something went wrong
          </h2>
          <p className="max-w-md text-center text-gray-500">
            We're sorry, but an unexpected error occurred. Our team has been notified.
          </p>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <pre className="max-w-lg overflow-auto rounded-lg bg-gray-100 p-4 text-xs text-red-600">
              {this.state.error.stack}
            </pre>
          )}
          <Button onClick={this.handleReset} variant="primary">
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 6.2 Async Error Handling Pattern

```typescript
// src/shared/hooks/useAsync.ts

import { useState, useCallback, useRef } from 'react';
import { AsyncState, ApiError } from '@/shared/types/utils';

interface UseAsyncOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
}

export function useAsync<T, Args extends unknown[]>(
  asyncFunction: (...args: Args) => Promise<T>,
  options: UseAsyncOptions<T> = {}
) {
  const [state, setState] = useState<AsyncState<T>>({ status: 'idle' });
  const isMounted = useRef(true);

  const execute = useCallback(
    async (...args: Args) => {
      setState({ status: 'loading' });

      try {
        const data = await asyncFunction(...args);

        if (isMounted.current) {
          setState({ status: 'success', data });
          options.onSuccess?.(data);
        }

        return data;
      } catch (error) {
        const apiError = normalizeError(error);

        if (isMounted.current) {
          setState({ status: 'error', error: apiError });
          options.onError?.(apiError);
        }

        throw apiError;
      }
    },
    [asyncFunction, options.onSuccess, options.onError]
  );

  const reset = useCallback(() => {
    setState({ status: 'idle' });
  }, []);

  return { state, execute, reset };
}

function normalizeError(error: unknown): ApiError {
  if (error instanceof ApiRequestError) {
    return {
      code: error.errorCode,
      message: error.message,
      details: error.details,
      statusCode: error.statusCode,
    };
  }

  if (error instanceof NetworkError) {
    return {
      code: 'NETWORK_ERROR',
      message: 'Please check your internet connection and try again.',
      statusCode: 0,
    };
  }

  if (error instanceof TimeoutError) {
    return {
      code: 'TIMEOUT_ERROR',
      message: 'The request took too long. Please try again.',
      statusCode: 0,
    };
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred. Please try again.',
    statusCode: 500,
  };
}
```

---

## 7. CODE CONVENTIONS & NAMING

### 7.1 File Naming

```
Component files:        PascalCase.tsx          (Button.tsx, UserCard.tsx)
Hook files:             camelCase.ts            (useAuth.ts, useDebounce.ts)
Service files:          camelCase.ts            (authService.ts, billingService.ts)
Utility files:          camelCase.ts            (dateFormatter.ts, cn.ts)
Type files:             kebab-case.types.ts     (auth.types.ts, api.types.ts)
Schema files:           kebab-case.schema.ts    (login.schema.ts, user.schema.ts)
Config files:           kebab-case.config.ts    (tailwind.config.ts)
Test files:             ComponentName.test.tsx  (Button.test.tsx)
Story files:            ComponentName.stories.tsx (Button.stories.tsx)
Style files:            kebab-case.css          (globals.css, animations.css)
```

### 7.2 Naming Conventions

```typescript
// Variables
const userCount = 5;           // camelCase for variables
const MAX_RETRY_COUNT = 3;     // SCREAMING_SNAKE_CASE for constants
const API_BASE_URL = '...';    // SCREAMING_SNAKE_CASE for env-like constants

// Functions
function getUserById(id: string): User { ... }  // verb + noun
function handleSubmit(event: FormEvent) { ... }  // handle + event
function onClick() { ... }                        // on + event (callbacks)
function isValidEmail(email: string): boolean { ... } // is/has + adjective

// Components
function UserProfileCard() { ... }  // Noun + optional descriptor
function DashboardLayout() { ... }

// Hooks
function useAuth() { ... }          // use + noun (what it provides)
function useLocalStorage<T>() { ... }

// Types
interface UserProfile { ... }       // PascalCase, noun
interface ApiResponse<T> { ... }  // Generic with T

type UserStatus = 'active' | 'inactive' | 'pending';  // PascalCase
type Nullable<T> = T | null;                           // PascalCase, descriptive

// Enums
enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

// Zod Schemas
const userSchema = z.object({ ... });           // noun + Schema
const loginCredentialsSchema = z.object({ ... });
```

### 7.3 Comment Rules

```typescript
// ❌ FORBIDDEN: Comments that state the obvious
// Increment counter by 1
setCounter(counter + 1);

// ✅ REQUIRED: Comments that explain WHY, not WHAT
// We batch updates to reduce re-renders during rapid state changes
const debouncedUpdate = useDebounce(updateState, 100);

// ✅ REQUIRED: JSDoc for public APIs
/**
 * Authenticates a user with email and password.
 *
 * @param credentials - The user's login credentials
 * @returns Promise resolving to the authentication response
 * @throws {ApiRequestError} When credentials are invalid
 * @throws {NetworkError} When the network request fails
 *
 * @example
 * ```ts
 * const response = await authService.login({
 *   email: 'user@example.com',
 *   password: 'securePassword123'
 * });
 * ```
 */
async function login(credentials: LoginCredentials): Promise<AuthResponse> { ... }
```

---

## 8. IMPORT/EXPORT PATTERNS

### 8.1 Barrel Exports (index.ts)

```typescript
// src/domains/auth/index.ts
// ONLY export what's meant to be public API of this domain

export { authService } from './services/authService';
export { useAuth, useLogin, useLogout, useCurrentUser } from './hooks/useAuth';
export { useAuthStore } from './stores/authStore';
export type { User, AuthResponse, LoginCredentials } from './types/auth.types';
export { loginSchema, registerSchema } from './validators';

// ❌ NEVER export internal implementation details
// export { tokenService } from './services/tokenService'; // Internal only
// export { authReducer } from './stores/authReducer';   // Internal only
```

### 8.2 Import Order

```typescript
// 1. React & framework imports
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// 2. Third-party library imports
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

// 3. Absolute imports (from src)
import { Button } from '@/shared/components/atoms/Button';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { cn } from '@/shared/lib/cn';

// 4. Domain imports (from other domains — minimize these)
import { useAuthStore } from '@/domains/auth';

// 5. Relative imports (same directory only)
import { useLocalHook } from './hooks/useLocalHook';
import { localTypes } from './types';

// 6. Style imports (always last)
import './styles.css';
```

### 8.3 Export Rules

```typescript
// ✅ Named exports for everything (tree-shakeable)
export function Button() { ... }
export const buttonVariants = cva(...);

// ✅ Default export ONLY for page components (Next.js requirement)
export default function DashboardPage() { ... }

// ❌ NEVER: Default export for reusable components
// export default Button; // Hard to refactor, no autocomplete

// ✅ Type exports are explicit
export type { ButtonProps } from './Button';
export type { User, UserRole } from './types';
```

---

## 9. MODULE BOUNDARIES & DEPENDENCY RULES

### 9.1 The Dependency Direction

```
app/ (routes) ──► domains/ (business logic) ──► shared/ (utilities)
     ▲                                              ▲
     │                                              │
     └────────── NEVER import upward ───────────────┘
```

```
RULE: domains/ can import from shared/
RULE: domains/ can import from other domains/ ONLY through public API (index.ts)
RULE: shared/ can NEVER import from domains/ or app/
RULE: app/ can import from domains/ and shared/
RULE: No circular dependencies. EVER.
```

### 9.2 Circular Dependency Detection

```bash
# Add to CI pipeline
npx madge --circular src/
```

### 9.3 Domain Coupling Rules

```typescript
// ❌ FORBIDDEN: Deep imports into another domain
import { tokenService } from '@/domains/auth/services/tokenService'; // NO

// ✅ REQUIRED: Import only from public API
import { authService } from '@/domains/auth'; // YES

// ❌ FORBIDDEN: Domain knows about another domain's internals
// Billing domain should not know how auth works
function BillingPage() {
  const token = localStorage.getItem('token'); // NO — auth concern
}

// ✅ REQUIRED: Use the public API
function BillingPage() {
  const { user } = useAuth(); // YES — abstracted
}
```

---

## 10. CODE QUALITY GATES & ENFORCEMENT

### 10.1 ESLint Configuration

```javascript
// eslint.config.mjs
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import a11yPlugin from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';

const __dirname = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

export default tseslint.config(
  ...compat.extends('next/core-web-vitals'),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
      'jsx-a11y': a11yPlugin,
      import: importPlugin,
    },
    rules: {
      // TypeScript strictness
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',

      // React rules
      'react/jsx-key': 'error',
      'react/jsx-no-leaked-render': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Accessibility
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',

      // Import rules
      'import/no-cycle': 'error',
      'import/no-self-import': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
        },
      ],

      // General
      'no-console': ['warn', { allow: ['error', 'warn'] }],
      'no-debugger': 'error',
      'prefer-const': 'error',
      'eqeqeq': ['error', 'always'],
    },
  }
);
```

### 10.2 Prettier Configuration

```javascript
// prettier.config.mjs
export default {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'lf',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['cn', 'clsx', 'cva'],
};
```

### 10.3 Git Hooks (Husky)

```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Run linting on staged files
npx lint-staged

# Run type checking
npx tsc --noEmit

# Run tests for changed files
npx vitest run --changed
```

```javascript
// lint-staged.config.mjs
export default {
  '*.{ts,tsx}': [
    'eslint --fix',
    'prettier --write',
  ],
  '*.{css,scss}': ['prettier --write'],
  '*.{json,md}': ['prettier --write'],
};
```

### 10.4 CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npx tsc --noEmit

      - name: Lint
        run: npm run lint

      - name: Format check
        run: npm run format:check

      - name: Run unit tests
        run: npm run test:unit -- --coverage

      - name: Check bundle size
        run: npm run analyze

      - name: Check for circular dependencies
        run: npx madge --circular src/

      - name: Build
        run: npm run build
```

---

## 11. ANTI-PATTERNS (NEVER DO THESE)

### 11.1 The Forbidden List

```typescript
// ❌ ANTI-PATTERN #1: Prop Drilling Beyond 2 Levels
// If you pass props through 3+ components, use Context or composition

// ❌ ANTI-PATTERN #2: useEffect for Data Fetching
// Use React Query/TanStack Query. useEffect fetching is a bug factory.

// ❌ ANTI-PATTERN #3: Inline Styles
<div style={{ color: 'red', marginTop: '10px' }}>  // NEVER
<div className="text-red-500 mt-2.5">               // ALWAYS

// ❌ ANTI-PATTERN #4: Magic Numbers
if (status === 3) { ... }  // What is 3?
if (status === HttpStatusCode.FORBIDDEN) { ... }  // Clear

// ❌ ANTI-PATTERN #5: Nested Ternaries
const color = isActive ? (isPrimary ? 'blue' : 'gray') : 'transparent';  // NO

// Use a lookup or early returns instead
function getButtonColor(isActive: boolean, isPrimary: boolean): string {
  if (!isActive) return 'transparent';
  if (isPrimary) return 'blue';
  return 'gray';
}

// ❌ ANTI-PATTERN #6: Mutating State Directly
const items = [...state.items];
items.push(newItem);  // Mutated!
setState({ items });  // Bug: React won't detect change

// ✅ Immutable update
setState({ items: [...state.items, newItem] });

// ❌ ANTI-PATTERN #7: useState for Derived Values
const [fullName, setFullName] = useState(`${firstName} ${lastName}`);
// Bug: Doesn't update when firstName/lastName change

// ✅ Use useMemo
const fullName = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName]);

// ❌ ANTI-PATTERN #8: Empty Dependency Arrays in useEffect
useEffect(() => {
  fetchData(userId);  // Bug: userId changes but effect doesn't re-run
}, []);

// ✅ Include all dependencies
useEffect(() => {
  fetchData(userId);
}, [userId, fetchData]);

// ❌ ANTI-PATTERN #9: SWR / React Query Without Keys
// Always use descriptive, hierarchical query keys

// ❌ ANTI-PATTERN #10: Not Handling Loading States
// Every async operation MUST have a loading state
// Every form MUST have a submitting state
// Every button that triggers async MUST show feedback

// ❌ ANTI-PATTERN #11: Direct DOM Manipulation
// Use refs and React patterns. document.querySelector is forbidden.

// ❌ ANTI-PATTERN #12: Storing Sensitive Data in LocalStorage
// Tokens: Use httpOnly cookies. LocalStorage is XSS-vulnerable.

// ❌ ANTI-PATTERN #13: Client-Side Only Validation
// Zod validation on client AND server. Client validation is UX, not security.

// ❌ ANTI-PATTERN #14: Not Cleaning Up Effects
useEffect(() => {
  const subscription = subscribe();
  // Missing cleanup!
}, []);

// ✅ Always cleanup
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe();
}, []);

// ❌ ANTI-PATTERN #15: Large Components
// If a component is >200 lines, it needs to be split.
// If a function is >50 lines, it needs to be extracted.
```

---

## 12. IMPLEMENTATION CHECKLIST

### Phase 1: Foundation (Week 1)

- [ ] Set up project structure (domains/, shared/, app/)
- [ ] Configure TypeScript with strict mode (all flags enabled)
- [ ] Set up ESLint with all rules (no-explicit-any, import/order, etc.)
- [ ] Set up Prettier with Tailwind plugin
- [ ] Configure path aliases (@/domains, @/shared, etc.)
- [ ] Set up Husky + lint-staged pre-commit hooks
- [ ] Configure GitHub Actions CI pipeline
- [ ] Set up Vitest for unit testing
- [ ] Set up Playwright for E2E testing
- [ ] Set up Storybook for component documentation
- [ ] Create the api-client.ts with retry logic, timeout, schema validation
- [ ] Create the ErrorBoundary component
- [ ] Create the cn() utility (clsx + tailwind-merge)
- [ ] Set up Zustand stores with TypeScript
- [ ] Set up React Query with default configs
- [ ] Create the Button, Input, Label atom components
- [ ] Document all decisions in docs/ADRs/

### Phase 2: Domain Setup (Week 2)

- [ ] Set up auth domain (login, register, session, guards)
- [ ] Set up dashboard domain (layout, navigation, widgets)
- [ ] Set up billing domain (subscriptions, invoices, payments)
- [ ] Set up settings domain (profile, preferences, security)
- [ ] Create barrel exports for all domains
- [ ] Verify no circular dependencies with madge
- [ ] Write unit tests for all services (100% coverage target)
- [ ] Write unit tests for all hooks (100% coverage target)
- [ ] Write unit tests for all utilities (100% coverage target)

### Phase 3: Integration (Week 3)

- [ ] Wire up all domains through public APIs
- [ ] Implement route guards and middleware
- [ ] Set up error boundaries at page and feature levels
- [ ] Implement loading states (skeletons) for all async data
- [ ] Implement empty states for all data-dependent components
- [ ] Implement error states with retry functionality
- [ ] Add Storybook stories for all component states
- [ ] Run full test suite (unit + integration + E2E)
- [ ] Performance audit with Lighthouse (target: 90+ all categories)
- [ ] Accessibility audit with axe-core (0 violations)

### Phase 4: Polish (Week 4)

- [ ] Add micro-interactions (hover, focus, active states)
- [ ] Add page transitions
- [ ] Add toast/notification system
- [ ] Add keyboard shortcuts
- [ ] Add offline detection and handling
- [ ] Add analytics instrumentation
- [ ] Add error monitoring (Sentry)
- [ ] Final bundle size audit (target: <200KB initial JS)
- [ ] Final security audit (CSP, headers, input sanitization)
- [ ] Documentation complete (README, API docs, component docs)

---

## APPENDIX A: Decision Log

| Date | Decision | Rationale | Status |
|------|----------|-----------|--------|
| 2026-08-09 | Domain-Driven folder structure | Scales with team size, clear boundaries | Decided |
| 2026-08-09 | Zustand over Redux | Simpler API, smaller bundle, TypeScript-native | Decided |
| 2026-08-09 | React Query over useEffect | Caching, deduping, background refetch, devtools | Decided |
| 2026-08-09 | Zod over Yup/Joi | TypeScript-first, smaller bundle, composable | Decided |
| 2026-08-09 | Tailwind over CSS-in-JS | Zero runtime, tree-shakeable, design tokens | Decided |
| 2026-08-09 | App Router over Pages Router | Streaming, layouts, nested loading/error | Decided |

---

## APPENDIX B: Glossary

| Term | Definition |
|------|------------|
| **Domain** | A bounded context representing a business capability (auth, billing, etc.) |
| **Barrel Export** | An index.ts file that re-exports a module's public API |
| **Compound Component** | A component pattern where subcomponents share implicit state via context |
| **CVA** | class-variance-authority — type-safe Tailwind variant management |
| **SWR** | Stale-While-Revalidate — caching strategy for server state |
| **ADR** | Architecture Decision Record — documented rationale for technical choices |

---

**END OF FILE 01 — ARCHITECTURE & ENGINEERING DISCIPLINE**
**Next: FILE 02 — PERFORMANCE ENGINEERING**
**Status: COMPLETE | NOTHING LEFT BEHIND**


## 13. FORM ARCHITECTURE (React Hook Form + Zod)

Forms are 60% of UI. Without a standard, every form is a snowflake. This is the ONLY way we build forms.

### 13.1 The Form Stack

```
react-hook-form (v7+)  → Form state management, validation integration
zod (resolver)          → Schema validation, type inference
@hookform/resolvers     → Bridge between RHF and Zod
```

### 13.2 Form Schema Pattern

```typescript
// src/domains/auth/validators/login.schema.ts

import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  rememberMe: z.boolean().default(false),
});

export type LoginFormData = z.infer<typeof loginSchema>;
```

### 13.3 Form Component Pattern

```typescript
// src/domains/auth/components/LoginForm/LoginForm.tsx

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../../validators/login.schema';
import { useLogin } from '../../hooks/useAuth';
import { Button } from '@/shared/components/atoms/Button';
import { Input } from '@/shared/components/atoms/Input';
import { Label } from '@/shared/components/atoms/Label';
import { FormField } from '@/shared/components/molecules/FormField';
import { Checkbox } from '@/shared/components/atoms/Checkbox';

export function LoginForm() {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur', // Validate on blur, not on every keystroke
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data);
    } catch (error) {
      // Handle specific API errors and map to form fields
      if (error instanceof ApiRequestError) {
        if (error.statusCode === 401) {
          setError('root', {
            message: 'Invalid email or password. Please try again.',
          });
        } else if (error.details) {
          // Map server-side validation errors to fields
          Object.entries(error.details).forEach(([field, messages]) => {
            setError(field as keyof LoginFormData, {
              message: messages[0],
            });
          });
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Root error (non-field) */}
      {errors.root && (
        <div
          role="alert"
          className="rounded-lg bg-red-50 p-4 text-sm text-red-600"
        >
          {errors.root.message}
        </div>
      )}

      <FormField
        label="Email"
        error={errors.email?.message}
        required
      >
        <Input
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email')}
        />
      </FormField>

      <FormField
        label="Password"
        error={errors.password?.message}
        required
      >
        <Input
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
          {...register('password')}
        />
      </FormField>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2">
          <Checkbox {...register('rememberMe')} />
          <span className="text-sm text-gray-600">Remember me</span>
        </label>
        <a
          href="/forgot-password"
          className="text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          Forgot password?
        </a>
      </div>

      <Button
        type="submit"
        fullWidth
        isLoading={isSubmitting || loginMutation.isPending}
        loadingText="Signing in..."
        disabled={!isDirty}
      >
        Sign In
      </Button>
    </form>
  );
}
```

### 13.4 FormField Molecule (Reusable)

```typescript
// src/shared/components/molecules/FormField/FormField.tsx

import { Label } from '@/shared/components/atoms/Label';
import { cn } from '@/shared/lib/cn';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
  helperText?: string;
  className?: string;
}

export function FormField({
  label,
  children,
  error,
  required,
  helperText,
  className,
}: FormFieldProps) {
  const fieldId = `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${fieldId}-error`;
  const helperId = `${fieldId}-helper`;

  return (
    <div className={cn('space-y-1.5', className)}>
      <Label htmlFor={fieldId} required={required}>
        {label}
      </Label>

      {/* Clone child to inject id and aria attributes */}
      {React.cloneElement(children as React.ReactElement, {
        id: fieldId,
        'aria-invalid': !!error,
        'aria-describedby': error ? errorId : helperText ? helperId : undefined,
      })}

      {helperText && !error && (
        <p id={helperId} className="text-xs text-gray-500">
          {helperText}
        </p>
      )}

      {error && (
        <p id={errorId} className="text-sm text-red-600 animate-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
```

### 13.5 Form Rules

```
RULE: Every form has a Zod schema. No exceptions.
RULE: Validation mode is 'onBlur' for fields, 'onSubmit' for the form.
RULE: Every field has: label, error message, aria-invalid, aria-describedby.
RULE: Submit button shows loading state with descriptive text.
RULE: Server errors are mapped to form fields when possible.
RULE: Root errors (non-field) are displayed above the form.
RULE: Password fields have strength indicator (zxcvbn or similar).
RULE: Auto-save drafts to localStorage for long forms (debounced).
RULE: Dirty state prevents accidental navigation (useBeforeUnload).
RULE: All forms are wrapped in <form noValidate> — we handle validation.
```

---

## 14. JWT TOKEN REFRESH FLOW

When a 401 hits, the app must NOT crash. It must silently refresh and retry.

### 14.1 The Problem

```
User has 5 tabs open. Token expires.
Tab 1: Makes API call → 401 → Refreshes token ✓
Tab 2: Makes API call → 401 → ALSO tries to refresh → Race condition! ✗
Tab 3: Makes API call → 401 → Queued behind Tab 1's refresh ✓
```

### 14.2 The Solution: Token Refresh Queue

```typescript
// src/shared/lib/api-client.ts (additions)

// ─── Token Refresh Queue ─────────────────────────────────
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;
const requestQueue: Array<(token: string) => void> = [];

async function refreshAccessToken(): Promise<string> {
  // If already refreshing, return the same promise
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = performRefresh();

  try {
    const newToken = await refreshPromise;
    // Process queued requests
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
    // Refresh failed — clear auth and redirect
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
  localStorage.removeItem('user');
}
```

### 14.3 Updated API Client with Auto-Refresh

```typescript
// In apiClient function, replace the non-OK response handler:

if (!response.ok) {
  // Handle 401 with auto-refresh
  if (response.status === 401 && !config.skipRefresh) {
    try {
      const newToken = await refreshAccessToken();
      // Retry the original request with new token
      return apiClient<T>(endpoint, {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${newToken}`,
        },
        skipRefresh: true, // Prevent infinite loop
      });
    } catch {
      // Refresh failed — already handled in performRefresh
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
```

### 14.4 Token Expiration Pre-Emptive Refresh

```typescript
// src/shared/hooks/useTokenRefresh.ts

import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const REFRESH_BUFFER_MS = 5 * 60 * 1000; // Refresh 5 minutes before expiry

export function useTokenRefresh() {
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    try {
      const decoded = jwtDecode<{ exp: number }>(token);
      const expiryTime = decoded.exp * 1000;
      const timeUntilExpiry = expiryTime - Date.now();
      const refreshTime = timeUntilExpiry - REFRESH_BUFFER_MS;

      if (refreshTime <= 0) {
        // Token is about to expire — refresh now
        refreshAccessToken();
        return;
      }

      // Schedule pre-emptive refresh
      const timeoutId = setTimeout(() => {
        refreshAccessToken();
      }, refreshTime);

      return () => clearTimeout(timeoutId);
    } catch {
      // Invalid token — clear it
      clearAuthData();
    }
  }, []);
}
```

### 14.5 Token Refresh Rules

```
RULE: Only ONE refresh request in flight at any time (queue pattern).
RULE: All requests that hit 401 are queued and retried after refresh.
RULE: If refresh fails, clear ALL auth state and redirect to login.
RULE: Pre-emptively refresh 5 minutes before expiry (background).
RULE: Refresh token is stored in httpOnly cookie (server-side) when possible.
RULE: Access token in memory/localStorage with short expiry (15 min max).
RULE: On logout, call /auth/logout AND clear all client-side tokens.
```

---

## 15. ROUTE GUARDS & MIDDLEWARE

### 15.1 Next.js Middleware

```typescript
// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// ─── Route Configuration ─────────────────────────────────
const PUBLIC_ROUTES = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/',
];

const ADMIN_ROUTES = ['/admin', '/admin/*'];
const API_ROUTES = ['/api/*'];

// ─── Middleware ──────────────────────────────────────────
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Allow API routes (handled separately)
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check for auth token
  const token = request.cookies.get('accessToken')?.value;

  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Verify token
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    // Check role-based access for admin routes
    if (ADMIN_ROUTES.some((route) => pathname.startsWith(route.replace('/*', '')))) {
      if (payload.role !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }

    // Add user info to headers for downstream use
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.sub as string);
    requestHeaders.set('x-user-role', payload.role as string);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch {
    // Invalid token — redirect to login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    loginUrl.searchParams.set('reason', 'session_expired');
    return NextResponse.redirect(loginUrl);
  }
}

// ─── Matcher ───────────────────────────────────────────────
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
```

### 15.2 Client-Side Route Guard (Higher-Order Component)

```typescript
// src/shared/components/providers/RouteGuard/RouteGuard.tsx

'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useCurrentUser } from '@/domains/auth';

interface RouteGuardProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'admin' | 'superadmin';
  fallback?: React.ReactNode;
}

export function RouteGuard({ children, requiredRole, fallback }: RouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading, isError } = useCurrentUser();

  useEffect(() => {
    if (isError) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (user && requiredRole) {
      const roleHierarchy = { user: 1, admin: 2, superadmin: 3 };
      if (roleHierarchy[user.role] < roleHierarchy[requiredRole]) {
        router.push('/dashboard');
      }
    }
  }, [user, isLoading, isError, requiredRole, pathname, router]);

  if (isLoading) {
    return fallback ?? <PageSkeleton />;
  }

  if (isError || !user) {
    return null; // Redirect handled in useEffect
  }

  if (requiredRole && user.role !== requiredRole) {
    return null; // Redirect handled in useEffect
  }

  return <>{children}</>;
}

function PageSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-8">
      <div className="h-8 w-1/3 rounded bg-gray-200" />
      <div className="h-4 w-2/3 rounded bg-gray-200" />
      <div className="h-4 w-1/2 rounded bg-gray-200" />
    </div>
  );
}
```

### 15.3 Route Guard Usage

```typescript
// src/app/(dashboard)/admin/page.tsx

import { RouteGuard } from '@/shared/components/providers/RouteGuard';
import { AdminDashboard } from '@/domains/admin/components/AdminDashboard';

export default function AdminPage() {
  return (
    <RouteGuard requiredRole="admin">
      <AdminDashboard />
    </RouteGuard>
  );
}
```

### 15.4 Route Guard Rules

```
RULE: Middleware guards server-side routes (redirect before page loads).
RULE: RouteGuard HOC guards client-side navigation (SPA transitions).
RULE: Both layers must agree on auth state (token in cookie + localStorage).
RULE: Redirect URL preserves the original destination (?redirect=/admin).
RULE: Role checks use hierarchy, not string equality (admin > user).
RULE: Loading state shows skeleton, never blank screen.
RULE: Unauthenticated API calls return 401, not 403 (403 = authenticated but forbidden).
```

---

## 16. SUSPENSE + STREAMING COORDINATION

Next.js App Router's superpower is streaming. Most teams waste it.

### 16.1 Loading State Hierarchy

```
Root Layout (layout.tsx)
  ├── Root Loading (loading.tsx)          ← Global fallback
  ├── Error Boundary (error.tsx)            ← Global error
  │
  ├── Dashboard Layout (layout.tsx)
  │   ├── Dashboard Loading (loading.tsx)  ← Layout-level fallback
  │   ├── Sidebar (static, no suspense)
  │   ├── TopNav (static, no suspense)
  │   │
  │   ├── <Suspense>                       ← Page-level streaming
  │   │   ├── Widget A (async)
  │   │   ├── Widget B (async)
  │   │   └── Widget C (async)
  │   │
  │   └── <Suspense>                       ← Another stream
  │       ├── DataTable (async)
│       └── Pagination (static)
```

### 16.2 loading.tsx Pattern

```typescript
// src/app/(dashboard)/dashboard/loading.tsx

import { DashboardSkeleton } from '@/domains/dashboard/components/DashboardSkeleton';

export default function DashboardLoading() {
  return <DashboardSkeleton />;
}
```

### 16.3 error.tsx Pattern

```typescript
// src/app/(dashboard)/dashboard/error.tsx

'use client';

import { Button } from '@/shared/components/atoms/Button';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to monitoring
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold">Failed to load dashboard</h2>
      <p className="text-gray-500">{error.message}</p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
}
```

### 16.4 Suspense Boundary Pattern

```typescript
// src/app/(dashboard)/dashboard/page.tsx

import { Suspense } from 'react';
import { StatsWidget } from '@/domains/dashboard/components/StatsWidget';
import { RevenueChart } from '@/domains/dashboard/components/RevenueChart';
import { RecentActivity } from '@/domains/dashboard/components/RecentActivity';
import { StatsSkeleton } from '@/domains/dashboard/components/StatsSkeleton';
import { ChartSkeleton } from '@/domains/dashboard/components/ChartSkeleton';
import { ActivitySkeleton } from '@/domains/dashboard/components/ActivitySkeleton';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Each async component gets its own Suspense boundary */}
      <Suspense fallback={<StatsSkeleton />}>
        <StatsWidget />
      </Suspense>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Suspense fallback={<ChartSkeleton />}>
          <RevenueChart />
        </Suspense>

        <Suspense fallback={<ActivitySkeleton />}>
          <RecentActivity />
        </Suspense>
      </div>
    </div>
  );
}
```

### 16.5 Async Component Pattern

```typescript
// src/domains/dashboard/components/StatsWidget/StatsWidget.tsx

import { getStats } from '../../services/dashboardService';

// This is an async Server Component — fetches data on the server
export async function StatsWidget() {
  const stats = await getStats(); // Fetches on server, streams HTML

  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard title="Total Users" value={stats.totalUsers} change={stats.userChange} />
      <StatCard title="Revenue" value={stats.revenue} change={stats.revenueChange} />
      <StatCard title="Orders" value={stats.orders} change={stats.orderChange} />
      <StatCard title="Conversion" value={stats.conversion} change={stats.conversionChange} />
    </div>
  );
}
```

### 16.6 Suspense Rules

```
RULE: Every async component has its own Suspense boundary.
RULE: Skeletons match the layout shape exactly (no layout shift).
RULE: Use loading.tsx for route-level, Suspense for component-level.
RULE: Server Components fetch data; Client Components handle interactivity.
RULE: Error boundaries at every level (root, layout, page, component).
RULE: Never wrap the entire page in one Suspense — stream independently.
RULE: Critical above-the-fold content: no Suspense (inline in layout).
RULE: Below-the-fold content: Suspense with skeleton.
```

---

## 17. ZUSTAND STORE PATTERNS

### 17.1 Store Structure

```typescript
// src/domains/auth/stores/authStore.ts

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import type { User, AuthTokens } from '../types/auth.types';

// ─── State Interface ─────────────────────────────────────
interface AuthState {
  // State
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setTokens: (tokens: AuthTokens | null) => void;
  setLoading: (isLoading: boolean) => void;
  clear: () => void;
}

// ─── Store Creation ──────────────────────────────────────
export const useAuthStore = create<AuthState>()(
  devtools(
    immer(
      persist(
        (set) => ({
          // Initial state
          user: null,
          tokens: null,
          isAuthenticated: false,
          isLoading: true,

          // Actions (use immer for immutable updates)
          setUser: (user) =>
            set((state) => {
              state.user = user;
              state.isAuthenticated = !!user;
            }),

          setTokens: (tokens) =>
            set((state) => {
              state.tokens = tokens;
            }),

          setLoading: (isLoading) =>
            set((state) => {
              state.isLoading = isLoading;
            }),

          clear: () =>
            set((state) => {
              state.user = null;
              state.tokens = null;
              state.isAuthenticated = false;
              state.isLoading = false;
            }),
        }),
        {
          name: 'auth-storage',
          storage: createJSONStorage(() => localStorage),
          // Only persist these fields
          partialize: (state) => ({
            user: state.user,
            tokens: state.tokens,
            isAuthenticated: state.isAuthenticated,
          }),
        }
      )
    ),
    { name: 'AuthStore' }
  )
);
```

### 17.2 Selector Pattern (Performance)

```typescript
// ❌ BAD: Re-renders on ANY store change
const { user } = useAuthStore();

// ✅ GOOD: Re-renders only when user changes
const user = useAuthStore((state) => state.user);

// ✅ BETTER: Create selector hooks
export function useUser() {
  return useAuthStore((state) => state.user);
}

export function useIsAuthenticated() {
  return useAuthStore((state) => state.isAuthenticated);
}

export function useAuthActions() {
  return useAuthStore((state) => ({
    setUser: state.setUser,
    setTokens: state.setTokens,
    clear: state.clear,
  }));
}
```

### 17.3 Store Composition (Multiple Stores)

```typescript
// src/shared/stores/uiStore.ts

import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  toastQueue: Toast[];

  toggleSidebar: () => void;
  setTheme: (theme: UIState['theme']) => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  theme: 'system',
  toastQueue: [],

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setTheme: (theme) => set({ theme }),
  addToast: (toast) =>
    set((state) => ({
      toastQueue: [...state.toastQueue, { ...toast, id: crypto.randomUUID() }],
    })),
  removeToast: (id) =>
    set((state) => ({
      toastQueue: state.toastQueue.filter((t) => t.id !== id),
    })),
}));
```

### 17.4 Store Rules

```
RULE: One store per domain. No god store.
RULE: Use immer middleware for all state mutations (no spread hell).
RULE: Use persist middleware only for data that should survive reload.
RULE: NEVER persist sensitive data (tokens) — use httpOnly cookies.
RULE: Use devtools middleware in development (time-travel debugging).
RULE: Create selector hooks for commonly accessed state (performance).
RULE: Actions are pure functions — no async logic in stores.
RULE: Async logic lives in React Query mutations or service layer.
RULE: Store state is READ-ONLY outside of actions.
```

---

## 18. DATA FETCHING PATTERNS

### 18.1 Query Key Strategy

```typescript
// Hierarchical, predictable, cacheable

export const queryKeys = {
  // Auth
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
    session: () => [...queryKeys.auth.all, 'session'] as const,
  },

  // Users
  users: {
    all: ['users'] as const,
    list: (filters: UserFilters) => [...queryKeys.users.all, 'list', filters] as const,
    detail: (id: string) => [...queryKeys.users.all, 'detail', id] as const,
    profile: (id: string) => [...queryKeys.users.all, 'profile', id] as const,
  },

  // Billing
  billing: {
    all: ['billing'] as const,
    subscriptions: () => [...queryKeys.billing.all, 'subscriptions'] as const,
    invoices: (page: number) => [...queryKeys.billing.all, 'invoices', page] as const,
    paymentMethods: () => [...queryKeys.billing.all, 'payment-methods'] as const,
  },

  // Dashboard
  dashboard: {
    all: ['dashboard'] as const,
    stats: () => [...queryKeys.dashboard.all, 'stats'] as const,
    activity: (limit: number) => [...queryKeys.dashboard.all, 'activity', limit] as const,
    revenue: (period: string) => [...queryKeys.dashboard.all, 'revenue', period] as const,
  },
};
```

### 18.2 Parallel Queries

```typescript
// Fetch multiple independent queries in parallel

function DashboardPage() {
  const { data: stats } = useQuery({
    queryKey: queryKeys.dashboard.stats(),
    queryFn: dashboardService.getStats,
  });

  const { data: activity } = useQuery({
    queryKey: queryKeys.dashboard.activity(10),
    queryFn: () => dashboardService.getRecentActivity(10),
  });

  const { data: revenue } = useQuery({
    queryKey: queryKeys.dashboard.revenue('30d'),
    queryFn: () => dashboardService.getRevenue('30d'),
  });

  // All three fire simultaneously
  // Each has its own Suspense boundary
}
```

### 18.3 Dependent Queries

```typescript
// Query B depends on Query A's result

function UserProfilePage({ userId }: { userId: string }) {
  // First: fetch user
  const { data: user } = useQuery({
    queryKey: queryKeys.users.detail(userId),
    queryFn: () => userService.getById(userId),
    enabled: !!userId,
  });

  // Then: fetch user's orders (only after user loads)
  const { data: orders } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: () => orderService.getByUserId(user!.id),
    enabled: !!user?.id, // Only run when user is loaded
  });

  // Then: fetch order analytics (only after orders load)
  const { data: analytics } = useQuery({
    queryKey: ['analytics', orders?.map((o) => o.id)],
    queryFn: () => analyticsService.getOrderAnalytics(orders!),
    enabled: !!orders && orders.length > 0,
  });
}
```

### 18.4 Infinite Scroll Pattern

```typescript
// src/shared/hooks/useInfiniteList.ts

import { useInfiniteQuery } from '@tanstack/react-query';

interface UseInfiniteListOptions<T> {
  queryKey: unknown[];
  fetchFn: (page: number) => Promise<{ data: T[]; hasMore: boolean }>;
  pageSize?: number;
}

export function useInfiniteList<T>({ queryKey, fetchFn, pageSize = 20 }: UseInfiniteListOptions<T>) {
  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) => fetchFn(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
}

// Usage
function ActivityFeed() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteList({
    queryKey: queryKeys.dashboard.activity(20),
    fetchFn: (page) => dashboardService.getActivity({ page, limit: 20 }),
  });

  const activities = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <InfiniteScroll
      items={activities}
      hasMore={hasNextPage}
      isLoading={isFetchingNextPage}
      onLoadMore={fetchNextPage}
      renderItem={(activity) => <ActivityCard activity={activity} />}
    />
  );
}
```

### 18.5 Prefetching Pattern

```typescript
// Prefetch on hover / route prefetch

import { useQueryClient } from '@tanstack/react-query';

function UserList() {
  const queryClient = useQueryClient();

  const handleMouseEnter = (userId: string) => {
    // Prefetch user detail on hover (300ms delay)
    queryClient.prefetchQuery({
      queryKey: queryKeys.users.detail(userId),
      queryFn: () => userService.getById(userId),
      staleTime: 5 * 60 * 1000,
    });
  };

  return (
    <ul>
      {users.map((user) => (
        <li
          key={user.id}
          onMouseEnter={() => handleMouseEnter(user.id)}
        >
          <Link href={`/users/${user.id}`}>{user.name}</Link>
        </li>
      ))}
    </ul>
  );
}
```

### 18.6 Data Fetching Rules

```
RULE: Query keys are hierarchical and include ALL parameters.
RULE: staleTime is set per query (frequently changing = low, static = high).
RULE: cacheTime is longer than staleTime (keeps data for background refetch).
RULE: Enabled flag prevents queries from running before dependencies are ready.
RULE: Prefetch aggressively on hover, focus, and route preloading.
RULE: Invalidation is targeted (invalidateQueries with exact keys).
RULE: Optimistic updates for mutations (update UI before API confirms).
RULE: Rollback on mutation failure (restore previous cache state).
```

---

## 19. FEATURE FLAGS ARCHITECTURE

### 19.1 Feature Flag Service

```typescript
// src/shared/services/featureFlagService.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FeatureFlags {
  newDashboard: boolean;
  betaBilling: boolean;
  darkMode: boolean;
  analyticsV2: boolean;
  [key: string]: boolean;
}

interface FeatureFlagStore {
  flags: FeatureFlags;
  isReady: boolean;
  setFlags: (flags: Partial<FeatureFlags>) => void;
  initialize: () => Promise<void>;
}

export const useFeatureFlags = create<FeatureFlagStore>()(
  persist(
    (set) => ({
      flags: {
        newDashboard: false,
        betaBilling: false,
        darkMode: false,
        analyticsV2: false,
      },
      isReady: false,

      setFlags: (newFlags) =>
        set((state) => ({
          flags: { ...state.flags, ...newFlags },
        })),

      initialize: async () => {
        // Fetch flags from API or config
        const response = await fetch('/api/feature-flags');
        const flags = await response.json();
        set({ flags, isReady: true });
      },
    }),
    {
      name: 'feature-flags',
    }
  )
);
```

### 19.2 Feature Flag Hook

```typescript
// src/shared/hooks/useFeatureFlag.ts

import { useFeatureFlags } from '../services/featureFlagService';

export function useFeatureFlag(flagName: string): boolean {
  return useFeatureFlags((state) => state.flags[flagName] ?? false);
}

export function useFeatureFlagsReady(): boolean {
  return useFeatureFlags((state) => state.isReady);
}
```

### 19.3 Feature Flag Component

```typescript
// src/shared/components/providers/FeatureFlag/FeatureFlag.tsx

import { useFeatureFlag } from '../../hooks/useFeatureFlag';

interface FeatureFlagProps {
  flag: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function FeatureFlag({ flag, children, fallback }: FeatureFlagProps) {
  const isEnabled = useFeatureFlag(flag);

  if (!isEnabled) {
    return fallback ?? null;
  }

  return <>{children}</>;
}
```

### 19.4 Feature Flag Usage

```typescript
// In a component
function DashboardPage() {
  const showNewDashboard = useFeatureFlag('newDashboard');

  return (
    <div>
      <FeatureFlag flag="newDashboard" fallback={<OldDashboard />}>
        <NewDashboard />
      </FeatureFlag>

      <FeatureFlag flag="analyticsV2">
        <AnalyticsV2Widget />
      </FeatureFlag>
    </div>
  );
}

// For route-level flags
// middleware.ts
export async function middleware(request: NextRequest) {
  const flags = await getFeatureFlags(request);

  if (request.nextUrl.pathname.startsWith('/beta/') && !flags.betaAccess) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}
```

### 19.5 Feature Flag Rules

```
RULE: Flags are fetched once at app initialization and cached.
RULE: Flags can be overridden per environment (dev/staging/prod).
RULE: Flags support gradual rollout (percentage-based).
RULE: Flags support user targeting (role, plan, cohort).
RULE: Every feature flag has a sunset date (remove after 30 days stable).
RULE: Feature flags are NOT for A/B testing (use dedicated A/B framework).
RULE: Feature flags are NOT for configuration (use config service).
RULE: When a flag is removed, the "new" path becomes the default.
RULE: Feature flags are typed — no string literals scattered in code.
```

---

## APPENDIX A: Decision Log

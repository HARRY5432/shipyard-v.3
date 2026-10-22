import type { User as FirebaseUser } from "firebase/auth";

export interface AppUser {
  id: string;
  email?: string | null;
  user_metadata: {
    full_name?: string | null;
    user_name?: string | null;
    avatar_url?: string | null;
    role?: string | null;
  };
}

export type TestUserKey = "user_a" | "user_b" | "custom" | "none";

export interface AuthState {
  user: AppUser | null;
  session: FirebaseUser | null;
  loading: boolean;
  activeUserId: string;
  activeTestKey: TestUserKey;
}

export interface AuthActions {
  signInWithGithub: () => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  switchTestUser: (key: Omit<TestUserKey, "custom">) => void;
}

export type AuthContextType = AuthState & AuthActions;

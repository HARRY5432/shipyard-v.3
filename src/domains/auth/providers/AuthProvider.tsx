import type { ReactNode } from "react";
import { createContext, useEffect, useState } from "react";
import type {
  User as FirebaseUser
} from "firebase/auth";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut as firebaseSignOut
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { notify as toast } from "@/lib/notify";
import type { AppUser, AuthContextType, TestUserKey } from "../types";

export const TEST_USERS = {
  user_a: {
    id: "user_a",
    email: "alex@shipyards.dev",
    user_metadata: {
      full_name: "Alex Rivera",
      user_name: "alex_builds",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex&backgroundColor=00f2ff",
      role: "AI Architect",
    }
  },
  user_b: {
    id: "user_b",
    email: "priya@shipyards.dev",
    user_metadata: {
      full_name: "Priya Sharma",
      user_name: "priya_ships",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya&backgroundColor=c0aede",
      role: "ML Engineer",
    }
  }
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [fbUser, setFbUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTestKey, setActiveTestKey] = useState<TestUserKey>("user_a");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFbUser(user);
      if (user) {
        setActiveTestKey("custom");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const switchTestUser = (key: Omit<TestUserKey, "custom">) => {
    setActiveTestKey(key as TestUserKey);
    if (key === "none") {
      toast("Switched to Guest mode");
    } else {
      const name = TEST_USERS[key as keyof typeof TEST_USERS]?.user_metadata?.full_name;
      toast(`Switched active user to ${name} (${key})`);
    }
  };

  const customUser: AppUser | null = fbUser
    ? {
        id: fbUser.uid,
        email: fbUser.email,
        user_metadata: {
          full_name: fbUser.displayName || fbUser.email?.split("@")[0] || "Builder",
          user_name: fbUser.email?.split("@")[0] || "builder",
          avatar_url: fbUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${fbUser.uid}`,
          role: "AI Builder",
        },
      }
    : null;

  const currentUser: AppUser | null =
    activeTestKey === "custom" && customUser
      ? customUser
      : activeTestKey === "user_a"
      ? TEST_USERS.user_a
      : activeTestKey === "user_b"
      ? TEST_USERS.user_b
      : null;

  const activeUserId = currentUser?.id || "";

  const signInWithGithub = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      setActiveTestKey("custom");
      return { error: null };
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || "Failed to sign in with GitHub");
      return { error };
    }
  };

  const signInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const { signInWithEmailAndPassword } = await import("firebase/auth");
      await signInWithEmailAndPassword(auth, email, password);
      setActiveTestKey("custom");
      return { error: null };
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || "Failed to sign in with email");
      return { error };
    }
  };

  const signOut = async () => {
    setActiveTestKey("none");
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      // ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        session: fbUser,
        loading,
        activeUserId,
        activeTestKey,
        signInWithGithub,
        signInWithGoogle,
        signOut,
        switchTestUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

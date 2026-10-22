import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate, useLocation, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import ScrollToTop from "@/shared/components/utils/ScrollToTop";
import LiveAnnouncer from "@/shared/components/utils/LiveAnnouncer";
import { announce } from "@/lib/announce";
import { Toaster as Sonner } from "@/shared/components/ui/sonner";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { AuthProvider } from "@/domains/auth/providers/AuthProvider";
import { useAuth } from "@/domains/auth/hooks/useAuth";
import { ThemeProvider } from "@/shared/components/providers/ThemeProvider";
import { MotionProvider, useMotionPreference } from "@/shared/components/providers/MotionProvider";
import { ProtectedRoute } from "@/domains/auth/components/ProtectedRoute";

// Critical Entry
import Index from "@/app/routes/Index.tsx";

// Lazy-loaded routes
const Login = React.lazy(() => import("@/domains/auth/components/Login.tsx"));
const AuthCallback = React.lazy(() => import("@/domains/auth/components/AuthCallback.tsx"));
const Dashboard = React.lazy(() => import("@/domains/profiles/components/Dashboard.tsx"));
const PostProject = React.lazy(() => import("@/domains/projects/components/PostProject.tsx"));
const Projects = React.lazy(() => import("@/domains/projects/components/ProjectsList.tsx"));
const ProjectDetail = React.lazy(() => import("@/domains/projects/components/ProjectDetail.tsx"));
const ProfilePreview = React.lazy(() => import("@/domains/profiles/components/ProfilePreview.tsx"));
const BuilderProfile = React.lazy(() => import("@/domains/profiles/components/BuilderProfile.tsx"));
const Leaderboards = React.lazy(() => import("@/domains/community/components/Leaderboards.tsx"));
const Feed = React.lazy(() => import("@/domains/community/components/Feed.tsx"));
const NotFound = React.lazy(() => import("@/app/routes/NotFound.tsx"));

const queryClient = new QueryClient();

const AnimatedPage = ({ children }: { children: React.ReactNode }) => {
  const { reduced } = useMotionPreference();

  if (reduced) return <div>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

/** Announces the destination after every client-side navigation. */
const RouteAnnouncer = () => {
  const location = useLocation();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const heading = document.querySelector("h1")?.textContent?.trim();
      announce(`${heading || document.title || "Page"} loaded.`);
    }, 250);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  return null;
};

const ProjectsRedirect = () => {
  const { id } = useParams<{ id: string }>();
  return <Navigate to={`/project/${id}`} replace />;
};

const AppRoutes = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { reduced } = useMotionPreference();

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div
          role="status"
          aria-live="polite"
          className="flex flex-col items-center gap-3 text-sm text-muted-foreground"
        >
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span>Loading Shipyard…</span>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait" initial={!reduced}>
      <Suspense fallback={
        <div className="min-h-dvh flex items-center justify-center">
          <div role="status" aria-live="polite" className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      }>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedPage><Index /></AnimatedPage>} />
          <Route path="/login" element={<AnimatedPage>{user ? <Navigate to="/dashboard" replace /> : <Login />}</AnimatedPage>} />
          <Route path="/sign-up" element={<AnimatedPage>{user ? <Navigate to="/dashboard" replace /> : <Login />}</AnimatedPage>} />
          <Route path="/auth/callback" element={<AnimatedPage><AuthCallback /></AnimatedPage>} />
          <Route path="/profile-preview" element={<AnimatedPage><ProfilePreview /></AnimatedPage>} />
          <Route path="/builder/:username" element={<AnimatedPage><BuilderProfile /></AnimatedPage>} />
          <Route path="/@demo" element={<AnimatedPage><BuilderProfile /></AnimatedPage>} />
          <Route path="/@:username" element={<AnimatedPage><BuilderProfile /></AnimatedPage>} />
          <Route
            path="/dashboard"
            element={
              <AnimatedPage>
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </AnimatedPage>
            }
          />
          <Route path="/post-project" element={<AnimatedPage><ProtectedRoute><PostProject /></ProtectedRoute></AnimatedPage>} />
          <Route path="/projects" element={<AnimatedPage><Projects /></AnimatedPage>} />
          <Route path="/marketplace" element={<AnimatedPage><Projects /></AnimatedPage>} />
          <Route path="/explore" element={<AnimatedPage><Projects /></AnimatedPage>} />
          <Route path="/loads" element={<Navigate to="/projects" replace />} />
          <Route path="/workloads" element={<Navigate to="/projects" replace />} />
          <Route path="/projects/:id" element={<ProjectsRedirect />} />
          <Route path="/project/:slug" element={<AnimatedPage><ProjectDetail /></AnimatedPage>} />
          <Route path="/project/:id" element={<AnimatedPage><ProjectDetail /></AnimatedPage>} />
          <Route path="/marketplace/:slug" element={<AnimatedPage><ProjectDetail /></AnimatedPage>} />
          <Route path="/leaderboards" element={<AnimatedPage><Leaderboards /></AnimatedPage>} />
          <Route path="/builders" element={<AnimatedPage><Leaderboards /></AnimatedPage>} />
          <Route path="/feed" element={<AnimatedPage><Feed /></AnimatedPage>} />
          <Route path="/messages" element={<AnimatedPage><ProtectedRoute><Dashboard defaultTab="messages" /></ProtectedRoute></AnimatedPage>} />
          <Route path="/settings" element={<AnimatedPage><ProtectedRoute><Dashboard defaultTab="settings" /></ProtectedRoute></AnimatedPage>} />
          <Route path="/notifications" element={<AnimatedPage><ProtectedRoute><Dashboard defaultTab="overview" /></ProtectedRoute></AnimatedPage>} />
          <Route path="/analytics" element={<AnimatedPage><ProtectedRoute><Dashboard defaultTab="overview" /></ProtectedRoute></AnimatedPage>} />
          <Route path="/onboarding" element={<AnimatedPage><ProtectedRoute><Dashboard defaultTab="profile" /></ProtectedRoute></AnimatedPage>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ThemeProvider>
          <MotionProvider>
            <LiveAnnouncer />
            <RouteAnnouncer />
            <Sonner />
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </MotionProvider>
        </ThemeProvider>
      </BrowserRouter>
    </TooltipProvider>
    <Analytics />
  </QueryClientProvider>
);

export default App;

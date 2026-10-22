import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";

// Self-hosted variable fonts
import "@fontsource-variable/geist";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/jetbrains-mono";

import "./index.css";
import { reportWebVitals } from "./shared/lib/vitals.ts";
import { initSentry } from "./shared/lib/sentry.ts";


initSentry();

createRoot(document.getElementById("root")!).render(<App />);

reportWebVitals();

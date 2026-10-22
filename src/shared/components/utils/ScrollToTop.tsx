import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function forceScrollToTop() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);
  requestAnimationFrame(() => {
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  });
}

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    forceScrollToTop();
  }, [pathname]);

  return null;
}

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

const RevealSession = createContext(false);

// Keep the last scroll position available before native scroll restoration runs.
export const RevealSessionProvider = ({ children }: { children: ReactNode }) => {
  const [skip, setSkip] = useState(false);
  useEffect(() => {
    const key = `reveal-scroll:${window.location.pathname}`;
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    let saved = 0;
    try { saved = Number(sessionStorage.getItem(key)) || 0; } catch { /* Storage may be disabled. */ }
    if (window.scrollY > 0 || ((navigation?.type === "reload" || navigation?.type === "back_forward") && saved > 0)) {
      setSkip(true);
    }
    const save = () => {
      try { sessionStorage.setItem(key, String(window.scrollY)); } catch { /* Storage may be disabled. */ }
    };
    const restore = () => { if (window.scrollY > 0) setSkip(true); };
    window.addEventListener("scroll", save, { passive: true });
    window.addEventListener("pagehide", save);
    window.addEventListener("pageshow", restore);
    const frame = requestAnimationFrame(restore);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", save);
      window.removeEventListener("pagehide", save);
      window.removeEventListener("pageshow", restore);
    };
  }, []);
  return <RevealSession.Provider value={skip}>{children}</RevealSession.Provider>;
};

export const useSkipEntrance = () => useContext(RevealSession);

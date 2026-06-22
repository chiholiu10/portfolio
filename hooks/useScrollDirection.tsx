import { useEffect, useRef } from "react";

export const useScrollDirection = () => {
  const direction = useRef<"up" | "down">("down");
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      direction.current = y > lastY.current ? "down" : "up";
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return direction;
};

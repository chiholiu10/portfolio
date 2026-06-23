import { useEffect, useRef, useState } from "react";

let initialY = 0;
let initialized = false;

export const useOneWayReveal = (threshold = 0.25) => {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!initialized && typeof window !== "undefined") {
      initialY = window.scrollY;
      initialized = true;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const elTop = entry.boundingClientRect.top + window.scrollY;

        if (elTop >= initialY) {
          setActive(true);
        } else {
          setActive(true);
        }

        observer.disconnect();
      },
      { threshold },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return { ref, active };
};

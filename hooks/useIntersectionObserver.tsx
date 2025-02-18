// @ts-nocheck
import { useEffect, useState } from "react";

export function useOnScreen(ref) {
  const [isOnScreen, setIsOnScreen] = useState(false);
  const [checkBottomElement, setCheckBottomELement] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOnScreen(entry.isIntersecting);
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
        rootMargin: "0px", // Adjust the root margin if needed
      },
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [ref]);

  const windowsHeight = window.innerHeight + window.scrollY;

  const scrollHandler = () => {
    const bottom = ref.current?.getBoundingClientRect().bottom;
    if (bottom <= windowsHeight) {
      setCheckBottomELement(true);
    } else {
      setCheckBottomELement(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, true);
    return () => {
      window.EventListener("scroll", scrollHandler, true);
    };
  });

  return {
    isOnScreen,
    checkBottomElement,
  };
}

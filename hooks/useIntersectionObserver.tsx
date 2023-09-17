//@ts-nocheck
import { useEffect, useState, useRef } from 'react';

export function useOnScreen(ref) {
  const [isOnScreen, setIsOnScreen] = useState(false);
  const [checkBottomElement, setCheckBottomELement] = useState(false);
  const observerRef = useRef(null);
  console.log(isOnScreen);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) => {
      setIsOnScreen(entry.isIntersecting)
    }
    );
  }, []);

  useEffect(() => {
    observerRef.current.observe(ref.current);

    return () => {
      observerRef.current.disconnect();
    };
  }, [ref.current]);

  const windowsHeight = window.innerHeight + window.scrollY;
  const scrollHandler = () => {
    const bottom = ref.current?.getBoundingClientRect().bottom;
    console.log(bottom < windowsHeight)
    if(bottom <= windowsHeight) {
      setCheckBottomELement(true);
    } else {
      setCheckBottomELement(false);
    }

  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, true);
    return () => window.addEventListener("scroll", scrollHandler, true);
  }, []);

  return {
    isOnScreen,
    checkBottomElement
  }
}

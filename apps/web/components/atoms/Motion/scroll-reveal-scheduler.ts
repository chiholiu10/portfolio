type Reveal = {
  update: (progress: number) => void;
  offset: () => number;
  once: boolean;
};

const reveals = new Map<HTMLElement, Reveal>();
const active = new Set<HTMLElement>();
const completed = new Set<HTMLElement>();
let observer: IntersectionObserver | null = null;
let frame = 0;

function flush() {
  frame = 0;
  const height = window.innerHeight;
  if (!height) return;
  // Read all geometry before updating MotionValues to avoid interleaved layout work.
  const measurements = Array.from(active, (element) => {
    const reveal = reveals.get(element)!;
    const top = element.getBoundingClientRect().top - reveal.offset();
    return {
      element,
      reveal,
      progress: Math.max(0, Math.min(1, (height * 0.7 - top) / (height * 0.2))),
    };
  });
  for (const { element, reveal, progress } of measurements) {
    reveal.update(progress);
    if (reveal.once && progress === 1) {
      active.delete(element);
      completed.add(element);
      observer?.unobserve(element);
    }
  }
}

function schedule() {
  if (!frame && active.size) frame = requestAnimationFrame(flush);
}

function start() {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const element = entry.target as HTMLElement;
        const reveal = reveals.get(element);
        if (!reveal || completed.has(element)) continue;
        if (entry.isIntersecting) active.add(element);
        else {
          active.delete(element);
          const progress = entry.boundingClientRect.top < 0 ? 1 : 0;
          reveal.update(progress);
          if (reveal.once && progress === 1) {
            completed.add(element);
            observer?.unobserve(element);
          }
        }
      }
      schedule();
    },
    { rootMargin: "200px 0px" },
  );
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
}

/** One observer and one animation-frame scheduler for all scroll reveals. */
export function observeScrollReveal(element: HTMLElement, reveal: Reveal) {
  if (!observer) start();
  reveals.set(element, reveal);
  observer!.observe(element);
  // Initialize restored scroll positions and elements already above the viewport.
  active.add(element);
  schedule();
  return () => {
    observer?.unobserve(element);
    active.delete(element);
    reveals.delete(element);
    completed.delete(element);
    if (!reveals.size) {
      observer?.disconnect();
      observer = null;
      cancelAnimationFrame(frame);
      frame = 0;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    }
  };
}

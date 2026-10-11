import { test, expect, jest } from "@jest/globals";
import { observeScrollReveal } from "./scroll-reveal-scheduler";

type ObserverCallback = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
) => void;

test("shares the observer, stops completed reveals and pauses offscreen reversible reveals", () => {
  let callback: ObserverCallback;
  let scheduled: ((time: number) => void) | undefined;
  const listeners = new Map<string, () => void>();
  const observe = jest.fn();
  const unobserve = jest.fn();
  const disconnect = jest.fn();
  const originalWindow = global.window;
  const originalObserver = global.IntersectionObserver;
  const originalRaf = global.requestAnimationFrame;
  const originalCancel = global.cancelAnimationFrame;
  const constructor = jest.fn((cb: ObserverCallback) => {
    callback = cb;
    return { observe, unobserve, disconnect };
  });
  Object.defineProperty(global, "window", {
    configurable: true,
    value: {
      innerHeight: 1000,
      addEventListener: (name: string, cb: () => void) =>
        listeners.set(name, cb),
      removeEventListener: (name: string) => listeners.delete(name),
    },
  });
  global.IntersectionObserver =
    constructor as unknown as typeof IntersectionObserver;
  global.requestAnimationFrame = (cb) => {
    scheduled = cb;
    return 1;
  };
  global.cancelAnimationFrame = jest.fn();
  let top = 600;
  const rect = jest.fn(() => ({ top, bottom: top + 200 }));
  const first = { getBoundingClientRect: rect } as unknown as HTMLElement;
  const second = { getBoundingClientRect: rect } as unknown as HTMLElement;
  const update = jest.fn();
  const cleanupFirst = observeScrollReveal(first, {
    update,
    offset: () => 0,
    once: true,
  });
  const cleanupSecond = observeScrollReveal(second, {
    update,
    offset: () => 0,
    once: false,
  });
  const flush = () => {
    const cb = scheduled;
    scheduled = undefined;
    cb?.(0);
  };
  try {
    expect(constructor).toHaveBeenCalledTimes(1);
    flush();
    expect(update.mock.calls.at(-1)?.[0]).toBeCloseTo(0.5);
    top = 400;
    listeners.get("scroll")?.();
    flush();
    expect(unobserve).toHaveBeenCalledWith(first);
    callback!(
      [
        {
          target: second,
          isIntersecting: false,
          boundingClientRect: { top: -100 },
        } as unknown as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver,
    );
    rect.mockClear();
    listeners.get("scroll")?.();
    flush();
    expect(rect).not.toHaveBeenCalled();
    callback!(
      [
        {
          target: second,
          isIntersecting: true,
        } as unknown as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver,
    );
    top = 600;
    flush();
    expect(update.mock.calls.at(-1)?.[0]).toBeCloseTo(0.5);
    top = -100;
    listeners.get("scroll")?.();
    flush();
    expect(update).toHaveBeenLastCalledWith(0);
    top = 0;
    listeners.get("scroll")?.();
    flush();
    expect(update.mock.calls.at(-1)?.[0]).toBeCloseTo(0.5);
    top = 100;
    listeners.get("scroll")?.();
    flush();
    expect(update).toHaveBeenLastCalledWith(1);
  } finally {
    cleanupFirst();
    cleanupSecond();
    expect(disconnect).toHaveBeenCalledTimes(1);
    expect(listeners.size).toBe(0);
    Object.defineProperty(global, "window", {
      configurable: true,
      value: originalWindow,
    });
    global.IntersectionObserver = originalObserver;
    global.requestAnimationFrame = originalRaf;
    global.cancelAnimationFrame = originalCancel;
  }
});

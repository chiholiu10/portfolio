import { useEffect, useRef } from "react";
import styled from "styled-components";

const gridSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="132" height="132" viewBox="0 0 132 132"><path d="M8 0H124M0 8V124" fill="none" stroke="#7293ad" stroke-opacity=".16"/><circle cx="0" cy="0" r="1.5" fill="#7293ad" fill-opacity=".18"/></svg>';
const gridPattern = `url("data:image/svg+xml,${encodeURIComponent(gridSvg)}")`;

const Ambient = styled.div.attrs({ className: "ambient-background" })`
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  .ambient-flow {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0.85;
  }
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: ${gridPattern};
    background-size: 132px 132px;
    background-position: center;
    opacity: 0.28;
    mask-image: radial-gradient(ellipse at center, #000 30%, transparent 95%);
  }
`;

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    // A small, smoothly scaled field keeps work independent of screen resolution.
    const width = 96;
    const height = 64;
    canvas.width = width;
    canvas.height = height;
    const pixels = context.createImageData(width, height);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let lastPaint = -Infinity;
    let elapsed = 0;
    let previous = 0;
    function paint(time: number) {
      for (let y = 0; y < height; y++) {
        const ny = y / height;
        const bend = Math.sin(ny * 5 + time * 0.8) * 1.8;
        for (let x = 0; x < width; x++) {
          const nx = x / width;
          const field =
            (Math.sin(nx * 7 + ny * 2 + bend - time) +
              Math.cos(ny * 6 - nx * 2 + time * 0.7) +
              2) /
            4;
          const offset = (y * width + x) * 4;
          pixels.data[offset] = 65;
          pixels.data[offset + 1] = 120;
          pixels.data[offset + 2] = 245;
          pixels.data[offset + 3] = Math.round(Math.pow(field, 1.7) * 48);
        }
      }
      context!.putImageData(pixels, 0, 0);
    }
    function tick(timestamp: number) {
      elapsed += previous ? Math.min(timestamp - previous, 100) : 0;
      previous = timestamp;
      if (timestamp - lastPaint >= 1000 / 30) {
        paint((elapsed / 1000) * 0.42);
        lastPaint = timestamp;
      }
      frame = requestAnimationFrame(tick);
    }
    function syncMotion() {
      cancelAnimationFrame(frame);
      previous = 0;
      if (motion.matches) paint(0);
      else if (!document.hidden) frame = requestAnimationFrame(tick);
    }
    paint(0);
    syncMotion();
    motion.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncMotion);
    return () => {
      cancelAnimationFrame(frame);
      motion.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncMotion);
    };
  }, []);
  return (
    <Ambient aria-hidden="true">
      <canvas className="ambient-flow" ref={canvasRef} />
    </Ambient>
  );
}

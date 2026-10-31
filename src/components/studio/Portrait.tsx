"use client";

import { useEffect, useRef, useState } from "react";

// Drop the photo at public/me.jpg. The black & white version is made from it on the fly.
const SRC = "/me.jpg";

/**
 * The photo in black & white; wherever the cursor passes, its colour is painted back in
 * and slowly drains away again. Touch screens just get the black & white photo.
 */
export function Portrait() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const baseRef = useRef<HTMLImageElement>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const stage = stageRef.current!;
    const canvas = canvasRef.current!;
    const base = baseRef.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || window.matchMedia("(max-width: 1023.98px), (hover: none)").matches) {
      canvas.style.display = "none";
      return;
    }

    const brushRadius = 143, decay = 0.016;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mk = () => {
      const c = document.createElement("canvas");
      return [c, c.getContext("2d")!] as const;
    };
    const [bwC, bwX] = mk(), [colC, colX] = mk(), [mask, mX] = mk(), [tmp, tX] = mk();
    const img = new Image();
    img.src = SRC;
    let W = 1, H = 1, radius = brushRadius * dpr;
    const points: { x: number; y: number }[] = [];
    let last: { x: number; y: number } | null = null, idle = 999, running = false, showing = false, disposed = false;

    // object-fit: cover, centred (matches the base <img>)
    function fitDraw(x: CanvasRenderingContext2D, filter: string) {
      x.clearRect(0, 0, W, H);
      if (!img.naturalWidth) return;
      const s = Math.max(W / img.naturalWidth, H / img.naturalHeight);
      const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
      x.filter = filter;
      x.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
      x.filter = "none";
    }
    const drawLayers = () => {
      fitDraw(bwX, "grayscale(1) contrast(1.06)");
      fitDraw(colX, "none");
    };
    function measure() {
      const r = stage.getBoundingClientRect();
      W = Math.max(1, Math.round(r.width * dpr));
      H = Math.max(1, Math.round(r.height * dpr));
      for (const c of [canvas, bwC, colC, mask, tmp]) { c.width = W; c.height = H; }
      radius = brushRadius * dpr;
      drawLayers();
      hide();
    }
    img.onload = drawLayers;

    function stamp(x: number, y: number) {
      const g = mX.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.55, "rgba(255,255,255,.82)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      mX.globalCompositeOperation = "source-over";
      mX.fillStyle = g;
      mX.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }
    function render() {
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(bwC, 0, 0);
      ctx.globalCompositeOperation = "destination-out";
      ctx.drawImage(mask, 0, 0); // bw · (1 − mask)
      tX.globalCompositeOperation = "source-over";
      tX.clearRect(0, 0, W, H);
      tX.drawImage(colC, 0, 0);
      tX.globalCompositeOperation = "destination-in";
      tX.drawImage(mask, 0, 0); // colour · mask
      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(tmp, 0, 0);
      ctx.globalCompositeOperation = "source-over";
    }
    function show() {
      if (showing) return;
      showing = true;
      render();
      base.style.visibility = "hidden";
    }
    function hide() {
      showing = false;
      base.style.visibility = "";
      ctx.clearRect(0, 0, W, H);
      mX.clearRect(0, 0, W, H);
    }
    function frame() {
      if (disposed) return;
      const drawing = points.length > 0;
      if (drawing) idle = 0;
      else idle++;
      if (idle >= 120) { hide(); running = false; return; }
      // the colour drains away, faster once the cursor has stopped
      const fade = drawing ? decay : Math.min(decay + idle * 0.004, 0.5);
      mX.globalCompositeOperation = "destination-out";
      mX.fillStyle = `rgba(0,0,0,${fade})`;
      mX.fillRect(0, 0, W, H);
      if (drawing) {
        for (const p of points) stamp(p.x, p.y);
        points.length = 0;
      }
      render();
      show();
      requestAnimationFrame(frame);
    }
    const onMove = (e: PointerEvent) => {
      if (!img.naturalWidth) return;
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) * dpr, y = (e.clientY - r.top) * dpr;
      if (x < -radius || y < -radius || x > W + radius || y > H + radius) { last = null; return; }
      if (last) {
        // fill in the stroke between pointer events so fast moves leave a continuous trail
        const dx = x - last.x, dy = y - last.y, dist = Math.hypot(dx, dy);
        const step = Math.max(radius * 0.3, 1), n = Math.min(Math.ceil(dist / step), 60);
        for (let i = 1; i <= n; i++) points.push({ x: last.x + (dx * i) / n, y: last.y + (dy * i) / n });
      } else points.push({ x, y });
      last = { x, y };
      if (!running) {
        running = true;
        idle = 0;
        requestAnimationFrame(frame);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    measure();
    return () => {
      disposed = true;
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
    };
  }, []);

  if (missing) return null;

  return (
    <div ref={stageRef} className="portrait">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={baseRef} src={SRC} alt="Karan Gupta on a bridge above a mountain waterfall" onError={() => setMissing(true)} />
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}

'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { MEDIA } from '@/components/motion/config';
import styles from './HeroXray.module.scss';

interface HeroXrayProps {
  /** Labels for a few graph nodes (the owner's real stack, from content). */
  labels: readonly string[];
}

interface GraphNode {
  x: number;
  y: number;
  z: number; // depth 0.3–1 (parallax + size)
  label: string | null;
}

interface Packet {
  from: number;
  to: number;
  t: number;
  speed: number; // px per second
}

/** Deterministic PRNG so the "system" looks the same on every visit. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * X-ray lens for the hero.
 *
 * - A canvas "system layer" (nodes, edges, travelling request packets, a few
 *   nodes labelled with the owner's stack) fills the hero, barely visible.
 * - A lens ring (mouse on fine pointers, an autopilot path on touch / when
 *   idle) reveals it at full strength via a CSS mask driven by `--x / --y / --r`.
 * - Scrolling out of the hero widens the lens until the whole system shows.
 * Purely decorative (aria-hidden). Reduced motion: one static, faint frame.
 */
export function HeroXray({ labels }: HeroXrayProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const layer = layerRef.current;
    const canvas = canvasRef.current;
    const hud = hudRef.current;
    const section = layer?.closest<HTMLElement>('[data-section="hero"]');
    const context = canvas?.getContext('2d');
    if (!layer || !canvas || !hud || !section || !context) return;
    const ctx = context;

    const mm = gsap.matchMedia();
    mm.add(
      { motion: MEDIA.motion, desktop: MEDIA.desktop, tablet: '(min-width: 768px)', fine: '(hover: hover) and (pointer: fine)' },
      (mmCtx) => {
        const { motion, desktop, tablet, fine } = mmCtx.conditions as Record<'motion' | 'desktop' | 'tablet' | 'fine', boolean>;
        const mountedAt = performance.now();

        // Heavy setup (graph build, canvas, ticker) runs at idle time, outside
        // the hydration commit; the lens only appears ~1.5s in anyway.
        const setup = (): (() => void) | void => {
          const mono = getComputedStyle(document.documentElement).getPropertyValue('--font-mono').trim() || 'monospace';
          const dprCap = desktop ? 2 : 1.5;
          const nodeCount = desktop ? 72 : tablet ? 50 : 30;
          const labelCount = desktop ? 8 : tablet ? 6 : 4;
          const baseRadius = desktop ? 170 : tablet ? 135 : 105;

          let width = 0;
          let height = 0;
          let nodes: GraphNode[] = [];
          let edges: [number, number][] = [];
          let adjacency: number[][] = [];
          let packets: Packet[] = [];

          // ---- Graph construction (re-run on resize) -----------------------
          const build = () => {
            const rect = section.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const rand = mulberry32(1503);
            const pad = 24;
            const minDist = Math.sqrt((width * height) / nodeCount) * 0.55;
            nodes = [];
            for (let attempts = 0; nodes.length < nodeCount && attempts < nodeCount * 40; attempts++) {
              const x = pad + rand() * (width - pad * 2);
              const y = pad + rand() * (height - pad * 2);
              if (nodes.every((n) => (n.x - x) ** 2 + (n.y - y) ** 2 > minDist ** 2)) {
                nodes.push({ x, y, z: 0.3 + rand() * 0.7, label: null });
              }
            }

            // Label nodes spread across the width, away from the edges.
            const candidates = nodes
              .map((n, i) => ({ n, i }))
              .filter(({ n }) => n.x > 60 && n.x < width - 170 && n.y > 90 && n.y < height - 60);
            const count = Math.min(labelCount, labels.length, candidates.length);
            for (let k = 0; k < count; k++) {
              const targetX = ((k + 0.5) / count) * width;
              const pick = candidates
                .filter(({ n }) => !n.label)
                .sort((a, b) => Math.abs(a.n.x - targetX) - Math.abs(b.n.x - targetX))[0];
              if (pick) pick.n.label = labels[k] ?? null;
            }

            // Edges: each node to its 2 nearest neighbours (deduplicated).
            const seen = new Set<string>();
            edges = [];
            adjacency = nodes.map(() => []);
            nodes.forEach((a, i) => {
              nodes
                .map((b, j) => ({ j, d: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 }))
                .filter(({ j }) => j !== i)
                .sort((p, q) => p.d - q.d)
                .slice(0, 2)
                .forEach(({ j }) => {
                  const key = i < j ? `${i}-${j}` : `${j}-${i}`;
                  if (seen.has(key)) return;
                  seen.add(key);
                  edges.push([i, j]);
                  adjacency[i]?.push(j);
                  adjacency[j]?.push(i);
                });
            });

            const packetCount = desktop ? 16 : 9;
            packets = Array.from({ length: Math.min(packetCount, edges.length) }, (_, k) => {
              const edge = edges[Math.floor(rand() * edges.length)] ?? [0, 0];
              return { from: edge[0], to: edge[1], t: (k / packetCount) % 1, speed: 60 + rand() * 90 };
            });
          };

          // ---- Lens state ----------------------------------------------------
          const state = { x: 0, y: 0, r: 0, boost: 0 };
          let targetX = 0;
          let targetY = 0;
          let lastPointer = -Infinity;
          let clock = 0;

          const autopilot = (time: number) => {
            // Slow figure-eight through the middle of the hero.
            targetX = width * 0.5 + Math.sin(time * 0.32 - 1.4) * width * 0.32;
            targetY = height * 0.46 + Math.sin(time * 0.64) * height * 0.16;
          };

          // ---- Drawing ---------------------------------------------------------
          const draw = (dt: number) => {
            ctx.clearRect(0, 0, width, height);
            // Depth parallax relative to the lens.
            const ox = (state.x - width / 2) * -0.025;
            const oy = (state.y - height / 2) * -0.025;
            const px = (n: GraphNode) => n.x + ox * n.z;
            const py = (n: GraphNode) => n.y + oy * n.z;

            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(168, 184, 200, 0.26)';
            ctx.beginPath();
            for (const [i, j] of edges) {
              const a = nodes[i];
              const b = nodes[j];
              if (!a || !b) continue;
              ctx.moveTo(px(a), py(a));
              ctx.lineTo(px(b), py(b));
            }
            ctx.stroke();

            // Request packets travelling along edges.
            ctx.fillStyle = 'rgba(242, 240, 235, 0.95)';
            ctx.beginPath();
            for (const p of packets) {
              const a = nodes[p.from];
              const b = nodes[p.to];
              if (!a || !b) continue;
              const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
              p.t += (p.speed * dt) / len;
              if (p.t >= 1) {
                const next = adjacency[p.to] ?? [];
                const options = next.filter((k) => k !== p.from);
                p.from = p.to;
                p.to = options[Math.floor(Math.random() * options.length)] ?? next[0] ?? p.from;
                p.t = 0;
              }
              const x = px(a) + (px(b) - px(a)) * p.t;
              const y = py(a) + (py(b) - py(a)) * p.t;
              ctx.moveTo(x + 1.8, y);
              ctx.arc(x, y, 1.8, 0, Math.PI * 2);
            }
            ctx.fill();

            // Nodes.
            ctx.fillStyle = 'rgba(168, 184, 200, 0.85)';
            ctx.beginPath();
            for (const n of nodes) {
              const r = 0.7 + n.z * 1.3;
              ctx.moveTo(px(n) + r, py(n));
              ctx.arc(px(n), py(n), r, 0, Math.PI * 2);
            }
            ctx.fill();

            // Labelled service nodes.
            ctx.font = `500 11px ${mono}`;
            ctx.textBaseline = 'middle';
            for (const n of nodes) {
              if (!n.label) continue;
              const x = px(n);
              const y = py(n);
              ctx.strokeStyle = 'rgba(168, 184, 200, 0.9)';
              ctx.strokeRect(x - 4, y - 4, 8, 8);
              ctx.fillStyle = 'rgba(242, 240, 235, 0.8)';
              ctx.fillText(n.label.toUpperCase(), x + 12, y + 1);
            }
          };

          // ---- Write lens to CSS -----------------------------------------------
          const apply = () => {
            const r = state.r + state.boost * Math.hypot(width, height);
            layer.style.setProperty('--x', `${state.x}px`);
            layer.style.setProperty('--y', `${state.y}px`);
            layer.style.setProperty('--r', `${Math.max(r, 0.1)}px`);

            const hudAlpha = Math.max(0, 1 - state.boost * 4) * Math.min(1, state.r / 40);
            hud.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) scale(${state.r / 100})`;
            hud.style.opacity = String(hudAlpha);
          };

          build();
          state.x = width * 0.3;
          state.y = height * 0.45;
          targetX = state.x;
          targetY = state.y;

          if (!motion) {
            // Reduced motion: a single faint, static frame. No lens.
            draw(0);
            layer.setAttribute('data-xray-ready', '');
            return () => layer.removeAttribute('data-xray-ready');
          }

          // ---- Live mode ---------------------------------------------------------
          let running = true;
          const io = new IntersectionObserver(([entry]) => {
            running = Boolean(entry?.isIntersecting);
          });
          io.observe(section);

          const onPointerMove = (event: PointerEvent) => {
            if (!fine || event.pointerType !== 'mouse') return;
            const s = section.getBoundingClientRect();
            targetX = event.clientX - s.left;
            targetY = event.clientY - s.top;
            lastPointer = performance.now();
          };
          const onPointerLeave = () => {
            lastPointer = -Infinity;
          };
          section.addEventListener('pointermove', onPointerMove, { passive: true });
          section.addEventListener('pointerleave', onPointerLeave);

          // Touch devices: 30fps, and the lens parks after its intro scan so the
          // main thread goes idle (it re-renders only while scrolling).
          const frameSkip = fine ? 1 : 2;
          // Wall-clock budget (not animation time, which runs slow on weak CPUs).
          const touchActiveMs = 6500;
          const startedAt = performance.now();
          let parked = false;
          let frameCount = 0;
          let pendingDt = 0;

          const render = (dt: number) => {
            draw(dt);
            apply();
          };

          const resizeObserver = new ResizeObserver(() => {
            build();
            if (parked) render(0);
          });
          resizeObserver.observe(section);

          const tick = (_time: number, deltaMs: number) => {
            if (!running || document.hidden || parked) return;
            pendingDt += Math.min(deltaMs, 50) / 1000;
            if (++frameCount % frameSkip !== 0) return;
            const dt = Math.min(pendingDt, 0.1);
            pendingDt = 0;
            clock += dt;
            if (performance.now() - lastPointer > 2500) autopilot(clock);
            // Frame-rate independent easing toward the target.
            const ease = 1 - Math.pow(0.0015, dt);
            state.x += (targetX - state.x) * ease;
            state.y += (targetY - state.y) * ease;
            render(dt);
            if (!fine && performance.now() - startedAt > touchActiveMs) parked = true;
          };
          gsap.ticker.add(tick);

          // Intro: the lens opens after the hero copy has settled, then scans.
          layer.setAttribute('data-xray-ready', '');
          gsap.to(state, {
            r: baseRadius,
            duration: 1.8,
            delay: Math.max(0, 1.5 - (performance.now() - mountedAt) / 1000),
            ease: 'expo.out',
          });

          // Scrolling out of the hero widens the lens over the whole system.
          const st = ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: 'bottom 25%',
            scrub: 0.6,
            onUpdate: (self) => {
              state.boost = gsap.parseEase('power2.in')(self.progress);
              if (parked && running) render(0);
            },
          });

          return () => {
            gsap.ticker.remove(tick);
            io.disconnect();
            resizeObserver.disconnect();
            section.removeEventListener('pointermove', onPointerMove);
            section.removeEventListener('pointerleave', onPointerLeave);
            st.kill();
            gsap.killTweensOf(state);
            layer.removeAttribute('data-xray-ready');
          };
        };

        let teardown: (() => void) | void;
        const run = () => {
          teardown = setup();
        };
        const idle = typeof window.requestIdleCallback === 'function';
        const handle = idle ? window.requestIdleCallback(run, { timeout: 1200 }) : window.setTimeout(run, 300);
        return () => {
          if (idle) window.cancelIdleCallback(handle);
          else window.clearTimeout(handle);
          teardown?.();
        };
      },
    );

    return () => mm.revert();
  });

  return (
    <div ref={layerRef} className={styles.layer} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div ref={hudRef} className={styles.hud}>
        <span className={styles.ring} />
        <span className={styles.cross} />
      </div>
    </div>
  );
}

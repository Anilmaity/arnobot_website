'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import LogoMark from '@/components/ui/LogoMark';
import { cn, prefersReducedMotion } from '@/lib/dom';
import styles from './ArchitectureDiagram.module.css';

/* ---------------------------------------------------------------------------
   Content
   -------------------------------------------------------------------------- */

/** The four layers. The link layer is drawn as a rail, not a box — it spans them. */
const LAYERS = {
  gcs: {
    name: 'Ground Control Station',
    role: 'the human layer',
    desc: 'Where a person plans the mission, watches it run, and takes it back.',
  },
  autonomy: {
    name: 'Autonomy Engine',
    role: 'the thinking layer',
    desc: 'Runs on the robot. Fuses the sensors, holds the map, decides the next move.',
  },
  reflex: {
    name: 'Real-Time Control',
    role: 'the reflex layer',
    desc: 'Does not think. Reacts — thousands of times a second, deterministically.',
  },
  hardware: {
    name: 'Robot Hardware',
    role: 'the body layer',
    desc: 'The only layer that changes between platforms.',
  },
} as const;

const LINK = { name: 'Link layer', role: 'spans all four' } as const;

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(onChange: () => void): () => void {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

/* ---------------------------------------------------------------------------
   Wiring

   Every connection is declared as "leave this node on this side, arrive at
   that node on that side", optionally by way of a lane along one edge of the
   diagram. The routes themselves are computed from the rendered boxes, so the
   copy can wrap and the layout can reflow and the wires still land where they
   should. There is one wiring table per orientation because the lanes swap
   from horizontal to vertical when the columns stack.
   -------------------------------------------------------------------------- */

type NodeKey = 'gcs' | 'estop' | 'autonomy' | 'reflex' | 'hardware';
type Side = 'top' | 'right' | 'bottom' | 'left';
type Kind = 'command' | 'feedback' | 'estop';

interface Anchor {
  readonly node: NodeKey;
  readonly side: Side;
  /** Position along the side, 0 → 1. */
  readonly at: number;
}

interface Lane {
  readonly side: Side;
  /** Distance of the lane from that edge of the diagram, in px. */
  readonly offset: number;
}

interface Wire {
  readonly id: string;
  readonly kind: Kind;
  readonly label: string;
  /** How many packets travel the wire at once, and how fast (px per second). */
  readonly pulses: number;
  readonly speed: number;
  readonly from: Anchor;
  readonly to: Anchor;
  readonly lane?: Lane;
}

const NODE_KEYS: readonly NodeKey[] = ['gcs', 'estop', 'autonomy', 'reflex', 'hardware'];

const a = (node: NodeKey, side: Side, at: number): Anchor => ({ node, side, at });

/** Columns side by side: lanes run along the top and bottom. */
const LANDSCAPE: readonly Wire[] = [
  { id: 'mission', kind: 'command', label: 'mission', pulses: 2, speed: 110, from: a('gcs', 'right', 0.66), to: a('autonomy', 'left', 0.5) },
  { id: 'telemetry', kind: 'feedback', label: 'telemetry', pulses: 3, speed: 140, from: a('autonomy', 'top', 0.4), to: a('gcs', 'top', 0.5), lane: { side: 'top', offset: 18 } },
  { id: 'next', kind: 'command', label: '', pulses: 2, speed: 120, from: a('autonomy', 'right', 0.5), to: a('reflex', 'left', 0.5) },
  { id: 'motor', kind: 'command', label: '1 kHz', pulses: 4, speed: 220, from: a('reflex', 'right', 0.5), to: a('hardware', 'left', 0.5) },
  { id: 'sensors', kind: 'feedback', label: 'sensors', pulses: 3, speed: 150, from: a('hardware', 'top', 0.5), to: a('autonomy', 'top', 0.7), lane: { side: 'top', offset: 38 } },
  { id: 'state', kind: 'feedback', label: 'state', pulses: 3, speed: 180, from: a('hardware', 'bottom', 0.5), to: a('reflex', 'bottom', 0.68), lane: { side: 'bottom', offset: 38 } },
  { id: 'estop', kind: 'estop', label: 'E-stop', pulses: 1, speed: 170, from: a('estop', 'right', 0.5), to: a('reflex', 'bottom', 0.32), lane: { side: 'bottom', offset: 18 } },
];

/** Columns stacked: lanes run down the left and right. */
const PORTRAIT: readonly Wire[] = [
  { id: 'mission', kind: 'command', label: 'mission', pulses: 2, speed: 110, from: a('gcs', 'bottom', 0.5), to: a('autonomy', 'top', 0.5) },
  { id: 'telemetry', kind: 'feedback', label: 'telemetry', pulses: 3, speed: 140, from: a('autonomy', 'left', 0.3), to: a('gcs', 'left', 0.62), lane: { side: 'left', offset: 14 } },
  { id: 'next', kind: 'command', label: '', pulses: 2, speed: 120, from: a('autonomy', 'bottom', 0.5), to: a('reflex', 'top', 0.5) },
  { id: 'motor', kind: 'command', label: '1 kHz', pulses: 4, speed: 220, from: a('reflex', 'bottom', 0.5), to: a('hardware', 'top', 0.5) },
  { id: 'sensors', kind: 'feedback', label: 'sensors', pulses: 3, speed: 150, from: a('hardware', 'left', 0.35), to: a('autonomy', 'left', 0.7), lane: { side: 'left', offset: 14 } },
  { id: 'state', kind: 'feedback', label: 'state', pulses: 3, speed: 180, from: a('hardware', 'right', 0.35), to: a('reflex', 'right', 0.7), lane: { side: 'right', offset: 14 } },
  { id: 'estop', kind: 'estop', label: 'E-stop', pulses: 1, speed: 170, from: a('estop', 'right', 0.5), to: a('reflex', 'right', 0.3), lane: { side: 'right', offset: 14 } },
];

/* ---------------------------------------------------------------------------
   Routing
   -------------------------------------------------------------------------- */

interface Pt {
  readonly x: number;
  readonly y: number;
}

interface Rect {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
}

interface Size {
  readonly w: number;
  readonly h: number;
}

interface Label {
  readonly x: number;
  readonly y: number;
  readonly anchor: 'start' | 'middle';
  readonly rotate: number;
}

interface Route {
  readonly wire: Wire;
  readonly d: string;
  readonly label: Label;
  readonly mid: Pt;
}

interface Layout {
  readonly size: Size;
  readonly routes: readonly Route[];
}

interface Fit {
  /** The drawing's own height, before scaling. */
  readonly natural: number;
  readonly scale: number;
}

/** How far a wire runs straight out of a node before it turns. */
const EXIT = 14;
/** How far before its target a direct wire makes its one turn. */
const JOG = 22;
/** Below this the type stops being legible, so the section grows instead. */
const MIN_SCALE = 0.8;
/** Mirrors the stacked-layout breakpoint in the stylesheet. */
const STACKED_QUERY = '(max-width: 1040px)';

const isHorizontal = (side: Side): boolean => side === 'left' || side === 'right';

const OUTWARD: Readonly<Record<Side, Pt>> = {
  top: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  bottom: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
};

function anchorPoint(rect: Rect, side: Side, at: number): Pt {
  switch (side) {
    case 'top':
      return { x: rect.x + rect.w * at, y: rect.y };
    case 'bottom':
      return { x: rect.x + rect.w * at, y: rect.y + rect.h };
    case 'left':
      return { x: rect.x, y: rect.y + rect.h * at };
    case 'right':
      return { x: rect.x + rect.w, y: rect.y + rect.h * at };
  }
}

/** Position of `el` inside `container`, ignoring transforms — the nodes rise
    into place on a transform and the whole drawing scales on one, and a
    measurement must follow neither. */
function offsetRect(el: HTMLElement, container: HTMLElement): Rect {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== container) {
    x += node.offsetLeft;
    y += node.offsetTop;
    const parent = node.offsetParent as HTMLElement | null;
    if (parent && parent !== container) {
      x += parent.clientLeft;
      y += parent.clientTop;
    }
    node = parent;
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

function dedupe(points: readonly Pt[]): Pt[] {
  const out: Pt[] = [];
  for (const p of points) {
    const last = out[out.length - 1];
    if (!last || Math.abs(last.x - p.x) > 0.5 || Math.abs(last.y - p.y) > 0.5) out.push(p);
  }
  return out;
}

function route(wire: Wire, rects: Readonly<Record<NodeKey, Rect>>, size: Size): Route {
  const from = anchorPoint(rects[wire.from.node], wire.from.side, wire.from.at);
  const to = anchorPoint(rects[wire.to.node], wire.to.side, wire.to.at);
  const raw: Pt[] = [from];
  let label: Label;

  if (!wire.lane) {
    // One turn, made just short of the target so the wire enters it square on.
    // The label sits clear of the whole run so the turn never cuts a word.
    if (isHorizontal(wire.from.side)) {
      const turnX = to.x - OUTWARD[wire.from.side].x * JOG;
      raw.push({ x: turnX, y: from.y }, { x: turnX, y: to.y }, to);
      label = { x: (from.x + to.x) / 2, y: Math.min(from.y, to.y) - 7, anchor: 'middle', rotate: 0 };
    } else {
      const turnY = to.y - OUTWARD[wire.from.side].y * JOG;
      raw.push({ x: from.x, y: turnY }, { x: to.x, y: turnY }, to);
      label = { x: Math.max(from.x, to.x) + 9, y: (from.y + to.y) / 2 + 4, anchor: 'start', rotate: 0 };
    }
  } else if (wire.lane.side === 'top' || wire.lane.side === 'bottom') {
    const laneY = wire.lane.side === 'top' ? wire.lane.offset : size.h - wire.lane.offset;
    let x1 = from.x;
    let x2 = to.x;
    if (isHorizontal(wire.from.side)) {
      x1 = from.x + OUTWARD[wire.from.side].x * EXIT;
      raw.push({ x: x1, y: from.y });
    }
    raw.push({ x: x1, y: laneY });
    if (isHorizontal(wire.to.side)) {
      x2 = to.x + OUTWARD[wire.to.side].x * EXIT;
      raw.push({ x: x2, y: laneY }, { x: x2, y: to.y }, to);
    } else {
      raw.push({ x: x2, y: laneY }, to);
    }
    const above = wire.lane.side === 'top';
    label = { x: (x1 + x2) / 2, y: above ? laneY - 6 : laneY + 15, anchor: 'middle', rotate: 0 };
  } else {
    const laneX = wire.lane.side === 'left' ? wire.lane.offset : size.w - wire.lane.offset;
    let y1 = from.y;
    let y2 = to.y;
    if (!isHorizontal(wire.from.side)) {
      y1 = from.y + OUTWARD[wire.from.side].y * EXIT;
      raw.push({ x: from.x, y: y1 });
    }
    raw.push({ x: laneX, y: y1 });
    if (!isHorizontal(wire.to.side)) {
      y2 = to.y + OUTWARD[wire.to.side].y * EXIT;
      raw.push({ x: laneX, y: y2 }, { x: to.x, y: y2 }, to);
    } else {
      raw.push({ x: laneX, y: y2 }, to);
    }
    // Read along the lane, glyphs on its outer side.
    const left = wire.lane.side === 'left';
    label = { x: left ? laneX - 5 : laneX + 5, y: (y1 + y2) / 2, anchor: 'middle', rotate: left ? -90 : 90 };
  }

  const points = dedupe(raw);
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  return { wire, d, label, mid: { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 } };
}

/* ---------------------------------------------------------------------------
   Component
   -------------------------------------------------------------------------- */

/**
 * The four-layer architecture as a live system diagram, in the manner of the
 * Helix architecture on figure.ai: the operator's station on the left, the
 * onboard core in the middle, the body on the right, and packets travelling
 * the wires between them for as long as the diagram is on screen.
 *
 * The nodes are ordinary HTML so the copy wraps and the columns can stack on a
 * phone; the wires are an SVG overlay routed from the rendered boxes after
 * layout and again on every resize. Everything stops when the diagram leaves
 * the viewport or the tab is hidden, and is a still drawing for readers who
 * prefer reduced motion.
 */
export default function ArchitectureDiagram() {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Partial<Record<NodeKey, HTMLElement>>>({});
  const pathRefs = useRef(new Map<string, SVGPathElement>());
  const dotRefs = useRef(new Map<string, SVGCircleElement>());
  /** Seconds the packets have been travelling; only advances while on screen. */
  const clockRef = useRef(0);

  const [layout, setLayout] = useState<Layout | null>(null);
  const [fit, setFit] = useState<Fit | null>(null);
  const [active, setActive] = useState(false);
  // Server-rendered as "motion on"; the client answers from the media query
  // and follows it if the reader changes their mind.
  const reduced = useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => false);

  const setNode = useCallback(
    (key: NodeKey) => (el: HTMLElement | null) => {
      if (el) nodeRefs.current[key] = el;
      else delete nodeRefs.current[key];
    },
    [],
  );

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rects: Partial<Record<NodeKey, Rect>> = {};
    for (const key of NODE_KEYS) {
      const el = nodeRefs.current[key];
      if (!el) return;
      rects[key] = offsetRect(el, container);
    }
    const all = rects as Record<NodeKey, Rect>;
    const size = { w: container.clientWidth, h: container.clientHeight };
    if (size.w === 0 || size.h === 0) return;
    // Stacked when the core sits below the station rather than beside it.
    const portrait = all.autonomy.y >= all.gcs.y + all.gcs.h - 1;
    const wires = portrait ? PORTRAIT : LANDSCAPE;
    setLayout({ size, routes: wires.map((wire) => route(wire, all, size)) });
  }, []);

  // Route the wires from the rendered boxes, and again whenever they move.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    const observer = new ResizeObserver(schedule);
    observer.observe(container);
    for (const key of NODE_KEYS) {
      const el = nodeRefs.current[key];
      if (el) observer.observe(el);
    }
    schedule();
    // Web fonts settle after hydration and change every line count.
    document.fonts?.ready.then(schedule).catch(() => undefined);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [measure]);

  // One section, one screen: the section hands the frame whatever height is
  // left under the head and above the pull quote, and the drawing scales to
  // fit it — the way the reference's fixed-aspect animation scales — down to
  // a floor below which the section is allowed to grow instead. Only when the
  // columns are side by side; stacked, the page scrolls and nothing scales.
  useEffect(() => {
    const frame = frameRef.current;
    const stage = containerRef.current;
    if (!frame || !stage) return;

    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const natural = stage.offsetHeight;
        const stacked = window.matchMedia(STACKED_QUERY).matches;
        if (stacked || natural === 0) {
          setFit(null);
          return;
        }
        const scale = Math.max(MIN_SCALE, Math.min(1, frame.clientHeight / natural));
        setFit((current) =>
          current && current.natural === natural && Math.abs(current.scale - scale) < 0.002 ? current : { natural, scale },
        );
      });
    };

    const observer = new ResizeObserver(update);
    observer.observe(frame);
    observer.observe(stage);
    update();
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  // Run only while the diagram is on screen in a visible tab.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let inView = false;
    const update = () => setActive(inView && document.visibilityState === 'visible');
    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries.some((entry) => entry.isIntersecting);
        update();
      },
      { threshold: 0.1 },
    );
    observer.observe(frame);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  // The packets: one frame loop moves every dot along its wire.
  useEffect(() => {
    if (!layout || reduced || !active) return;
    const lengths = new Map<string, number>();
    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      // Clamp so a throttled background frame cannot make the packets leap.
      clockRef.current += Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = clockRef.current;

      for (const { wire } of layout.routes) {
        const path = pathRefs.current.get(wire.id);
        if (!path) continue;
        let length = lengths.get(wire.id);
        if (length === undefined) {
          length = path.getTotalLength();
          lengths.set(wire.id, length);
        }
        if (length === 0) continue;
        for (let i = 0; i < wire.pulses; i += 1) {
          const dot = dotRefs.current.get(`${wire.id}-${i}`);
          if (!dot) continue;
          const fraction = ((t * wire.speed) / length + i / wire.pulses) % 1;
          const p = path.getPointAtLength(fraction * length);
          dot.setAttribute('cx', p.x.toFixed(1));
          dot.setAttribute('cy', p.y.toFixed(1));
        }
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [layout, reduced, active]);

  const next = layout?.routes.find((r) => r.wire.id === 'next');

  return (
    <div
      ref={frameRef}
      className={styles.frame}
      style={fit ? { minHeight: Math.round(fit.natural * MIN_SCALE), maxHeight: fit.natural } : undefined}
      role="group"
      aria-label="Arnobot system architecture: a Ground Control Station sends missions over the link layer to the Autonomy Engine on the robot, which hands the next move to Real-Time Control, which drives the Robot Hardware. Sensor data and telemetry flow back. The emergency stop is wired straight to Real-Time Control."
    >
      <div
        ref={containerRef}
        className={styles.diagram}
        style={fit ? { transform: `translate(-50%, -50%) scale(${fit.scale.toFixed(3)})` } : undefined}
      >
        {/* Column 1 — the human layer, off the robot, and the E-stop under it. */}
        <div className={styles.station}>
          <article ref={setNode('gcs')} className={cn(styles.node, styles.card)} style={{ transitionDelay: '0.05s' }}>
            <LayerCopy {...LAYERS.gcs} />
          </article>
          <div ref={setNode('estop')} className={cn(styles.node, styles.estop)} style={{ transitionDelay: '0.2s' }}>
            <span className={styles.estopDot} aria-hidden="true" />
            <span className="micro-label">E-stop</span>
          </div>
        </div>

        {/* Column 2 — the link layer: a rail beside the stack, not a fifth box. */}
        <div className={cn(styles.node, styles.rail)} style={{ transitionDelay: '0.32s' }}>
          <div className={styles.railLabel}>
            <span className={styles.railName}>{LINK.name}</span>
            <span className={styles.role}>{LINK.role}</span>
          </div>
        </div>

        {/* Column 3 — the two layers that run on the robot. */}
        <section className={cn(styles.node, styles.panel)} style={{ transitionDelay: '0.14s' }}>
          <header className={styles.panelHead}>
            <LogoMark className={styles.panelLogo} />
            <span className="micro-label">Onboard core</span>
          </header>
          <div className={styles.panelGrid}>
            <article ref={setNode('autonomy')} className={styles.card}>
              <LayerCopy {...LAYERS.autonomy} />
            </article>
            <div aria-hidden="true" />
            <article ref={setNode('reflex')} className={styles.card}>
              <LayerCopy {...LAYERS.reflex} />
            </article>
          </div>
        </section>

        {/* Column 4 — the gap the motor wire crosses. */}
        <div aria-hidden="true" />

        {/* Column 5 — the body layer. */}
        <article ref={setNode('hardware')} className={cn(styles.node, styles.card)} style={{ transitionDelay: '0.26s' }}>
          <LayerCopy {...LAYERS.hardware} />
        </article>

        {/* The wires, drawn over everything from the measured boxes. */}
        <svg
          className={styles.wires}
          width={layout?.size.w ?? 0}
          height={layout?.size.h ?? 0}
          viewBox={layout ? `0 0 ${layout.size.w} ${layout.size.h}` : undefined}
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            {(['command', 'feedback', 'estop'] as const).map((kind) => (
              <marker key={kind} id={`arch-head-${kind}`} viewBox="0 0 8 8" refX="7.5" refY="4" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0.5 0.5 L7.5 4 L0.5 7.5 Z" className={styles[`head_${kind}`]} />
              </marker>
            ))}
            {(['feedback', 'estop'] as const).map((kind) => (
              <marker key={kind} id={`arch-dot-${kind}`} viewBox="0 0 6 6" refX="3" refY="3" markerWidth="6" markerHeight="6">
                <circle cx="3" cy="3" r="2.4" className={styles[`head_${kind}`]} />
              </marker>
            ))}
          </defs>

          {layout?.routes.map(({ wire, d, label }) => (
            <g key={wire.id}>
              <path
                ref={(el) => {
                  if (el) pathRefs.current.set(wire.id, el);
                  else pathRefs.current.delete(wire.id);
                }}
                d={d}
                className={cn(styles.wire, styles[`wire_${wire.kind}`])}
                markerEnd={`url(#arch-head-${wire.kind})`}
                markerStart={wire.kind === 'command' ? undefined : `url(#arch-dot-${wire.kind})`}
              />
              {wire.label ? (
                <text className={styles.label} x={label.x} y={label.y} textAnchor={label.anchor} transform={label.rotate ? `rotate(${label.rotate} ${label.x} ${label.y})` : undefined}>
                  {wire.label}
                </text>
              ) : null}
              {!reduced
                ? Array.from({ length: wire.pulses }, (_, i) => (
                    <circle
                      key={i}
                      ref={(el) => {
                        const key = `${wire.id}-${i}`;
                        if (el) dotRefs.current.set(key, el);
                        else dotRefs.current.delete(key);
                      }}
                      cx="-20"
                      cy="-20"
                      r={wire.kind === 'command' ? 3 : 2.6}
                      className={cn(styles.pulse, styles[`pulse_${wire.kind}`])}
                    />
                  ))
                : null}
            </g>
          ))}
        </svg>

        {/* What the thinking layer hands the reflex layer — the diagram's one named packet. */}
        {next ? (
          <span className={styles.tag} style={{ left: next.mid.x, top: next.mid.y }} aria-hidden="true">
            next move
          </span>
        ) : null}
      </div>
    </div>
  );
}

function LayerCopy({ name, role, desc }: { readonly name: string; readonly role: string; readonly desc: string }) {
  return (
    <div className={styles.copy}>
      <h3 className={styles.name}>{name}</h3>
      <span className={styles.role}>{role}</span>
      <p className={styles.desc}>{desc}</p>
    </div>
  );
}

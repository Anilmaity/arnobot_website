'use client';

import { useEffect } from 'react';

/**
 * Behaviour for the /pitch deck — a direct port of the scripts in
 * presentation.src.html: scroll spy, fade-up reveal, product accordion,
 * click-to-play video facades, the two bar charts and the allocation donut.
 */

const BRAND = {
  steel: '#375E9D',
  indigo: '#230C75',
  navy: '#1F3864',
  neg: '#B32B22',
  line: '#D6DFEA',
  mute: '#7C8A9C',
};
const NS = 'http://www.w3.org/2000/svg';
const MONO = 'var(--font-plex-mono), monospace';

const fmt = (n: number) =>
  Math.abs(n).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const money = (n: number) => (n < 0 ? `(${fmt(n)})` : fmt(n));

const TOTAL_CR = 4;
const allocation = [
  { label: 'R&D & Product Development', pct: 25, color: '#230C75' },
  { label: 'Infrastructure & Lab', pct: 20, color: '#2F3F8E' },
  { label: 'Team & Hiring', pct: 15, color: '#375E9D' },
  { label: 'Business Development', pct: 10, color: '#5A85BE' },
  { label: 'Certifications & Compliance', pct: 10, color: '#8AA9D2' },
  { label: 'Testing & Field Trials', pct: 10, color: '#E39412' },
  { label: 'Working Capital', pct: 10, color: '#B7C6DA' },
];

function txt(
  parent: SVGElement,
  x: number,
  y: number,
  s: string,
  {
    size = 9.5,
    fill = BRAND.mute,
    anchor = 'middle',
    weight = 400,
  }: { size?: number; fill?: string; anchor?: string; weight?: number } = {},
) {
  const t = document.createElementNS(NS, 'text');
  t.setAttribute('x', String(x));
  t.setAttribute('y', String(y));
  t.setAttribute('text-anchor', anchor);
  t.setAttribute('font-size', String(size));
  t.setAttribute('fill', fill);
  t.setAttribute('font-weight', String(weight));
  t.style.fontFamily = MONO;
  t.textContent = s;
  parent.appendChild(t);
  return t;
}

function tipFor(svgId: string) {
  const box = document.getElementById(svgId)!.parentElement!;
  let tip = box.querySelector<HTMLDivElement>('.bar-tip');
  if (!tip) {
    tip = document.createElement('div');
    tip.className = 'bar-tip';
    box.appendChild(tip);
  }
  return { box, tip };
}
function showTip(svgId: string, x: number, y: number, text: string) {
  const svg = document.getElementById(svgId)!;
  const { box, tip } = tipFor(svgId);
  const sr = svg.getBoundingClientRect();
  const br = box.getBoundingClientRect();
  tip.textContent = text;
  tip.style.left = sr.left - br.left + (x / 320) * sr.width + 'px';
  tip.style.top = sr.top - br.top + (y / 200) * sr.height + 'px';
  tip.style.opacity = '1';
}
function hideTip(svgId: string) {
  const tip = document.getElementById(svgId)?.parentElement?.querySelector<HTMLDivElement>('.bar-tip');
  if (tip) tip.style.opacity = '0';
}

function drawBarChart(
  svgId: string,
  labels: string[],
  values: number[],
  opts: { color?: string; showDelta?: boolean } = {},
) {
  const svg = document.getElementById(svgId) as SVGSVGElement | null;
  if (!svg) return;
  svg.innerHTML = '';
  const w = 320,
    padL = 8,
    padR = 8;
  const plotTop = opts.showDelta ? 40 : 34,
    plotBottom = 152;
  const yearY = 180;
  const span = plotBottom - plotTop;

  const maxPos = Math.max(0, ...values);
  const maxNeg = Math.max(0, ...values.map((v) => -v));
  let zeroY: number, scale: number;
  if (maxNeg === 0) {
    zeroY = plotBottom;
    scale = span / maxPos;
  } else if (maxPos === 0) {
    zeroY = plotTop;
    scale = span / maxNeg;
  } else {
    const total = maxPos + maxNeg;
    zeroY = plotTop + span * (maxPos / total);
    scale = span / total;
  }

  const slot = (w - padL - padR) / values.length;
  const barW = Math.min(slot - 30, 58);

  // zero / baseline reference
  const axis = document.createElementNS(NS, 'line');
  axis.setAttribute('x1', String(padL));
  axis.setAttribute('x2', String(w - padR));
  axis.setAttribute('y1', String(zeroY));
  axis.setAttribute('y2', String(zeroY));
  axis.setAttribute('stroke', maxNeg ? BRAND.mute : BRAND.line);
  axis.setAttribute('stroke-width', '1');
  svg.appendChild(axis);
  if (maxNeg) txt(svg, w - padR, zeroY - 4, '0', { size: 8, anchor: 'end', fill: BRAND.mute });

  values.forEach((v, i) => {
    const x = padL + i * slot + (slot - barW) / 2;
    const barH = Math.max(Math.abs(v) * scale, 2.5);
    const y = v >= 0 ? zeroY - barH : zeroY;
    const base = opts.color || BRAND.steel;

    const rect = document.createElementNS(NS, 'rect');
    rect.setAttribute('x', String(x));
    rect.setAttribute('y', String(y));
    rect.setAttribute('width', String(barW));
    rect.setAttribute('height', String(barH));
    rect.setAttribute('fill', v >= 0 ? base : BRAND.neg);
    rect.style.cursor = 'pointer';
    rect.style.transition = 'fill .12s';
    rect.addEventListener('mouseenter', () => {
      rect.setAttribute('fill', v >= 0 ? BRAND.indigo : '#8E1F18');
      showTip(svgId, x + barW / 2, y, `${labels[i]}  ₹${money(v)}k`);
    });
    rect.addEventListener('mouseleave', () => {
      rect.setAttribute('fill', v >= 0 ? base : BRAND.neg);
      hideTip(svgId);
    });
    svg.appendChild(rect);

    // value printed on the bar's free end — readable without hovering
    txt(svg, x + barW / 2, v >= 0 ? y - 7 : y + barH + 12, money(v), {
      size: 10,
      fill: v >= 0 ? BRAND.navy : BRAND.neg,
      weight: 600,
    });

    txt(svg, x + barW / 2, yearY, labels[i], { size: 11 });
  });

  // year-on-year change between consecutive bars
  if (opts.showDelta) {
    for (let i = 1; i < values.length; i++) {
      const prev = values[i - 1],
        cur = values[i];
      if (!prev) continue;
      const pct = Math.round(((cur - prev) / Math.abs(prev)) * 100);
      const x = padL + (i - 0.5) * slot + slot / 2;
      txt(svg, x, 16, `${pct >= 0 ? '+' : ''}${pct}%`, { size: 9.5, fill: BRAND.steel, weight: 600 });
    }
  }
}

function drawDonut() {
  const svg = document.getElementById('donutChart') as SVGSVGElement | null;
  const legend = document.getElementById('donutLegend') as HTMLUListElement | null;
  if (!svg || !legend) return;
  svg.innerHTML = '';
  legend.innerHTML = '';

  const cx = 100,
    cy = 100,
    r = 76,
    sw = 26;
  const C = 2 * Math.PI * r;
  let offset = 0;

  function centerLabel(text: string) {
    let t = svg!.querySelector('.center-label') as SVGTextElement | null;
    if (!t) {
      t = document.createElementNS(NS, 'text');
      t.setAttribute('class', 'center-label');
      t.setAttribute('x', String(cx));
      t.setAttribute('y', String(cy + 3));
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('font-size', '8.5');
      t.setAttribute('fill', '#1F3864');
      svg!.appendChild(t);
    }
    t.textContent = text;
  }
  function reset() {
    svg!.querySelectorAll('circle').forEach((c) => c.setAttribute('opacity', '1'));
    legend!.querySelectorAll('li').forEach((l) => l.classList.remove('active'));
    centerLabel('');
  }

  allocation.forEach((a, i) => {
    const len = (a.pct / 100) * C;
    const circle = document.createElementNS(NS, 'circle');
    circle.setAttribute('cx', String(cx));
    circle.setAttribute('cy', String(cy));
    circle.setAttribute('r', String(r));
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', a.color);
    circle.setAttribute('stroke-width', String(sw));
    circle.setAttribute('stroke-dasharray', `${len} ${C - len}`);
    circle.setAttribute('stroke-dashoffset', String(-offset));
    circle.setAttribute('transform', `rotate(-90 ${cx} ${cy})`);
    circle.style.transition = 'opacity .15s';
    circle.style.cursor = 'pointer';
    circle.dataset.idx = String(i);
    svg.appendChild(circle);
    offset += len;

    const amount = (TOTAL_CR * a.pct / 100).toFixed(2).replace(/\.00$/, '');
    const li = document.createElement('li');
    li.innerHTML = `<span class="sw" style="background:${a.color}"></span><span class="lbl">${a.label}</span><span class="amt">₹${amount} Cr</span><span class="pct">${a.pct}%</span>`;
    li.dataset.idx = String(i);
    legend.appendChild(li);

    function highlight() {
      svg!.querySelectorAll('circle').forEach((c) =>
        c.setAttribute('opacity', (c as SVGCircleElement).dataset.idx === String(i) ? '1' : '0.22'),
      );
      legend!.querySelectorAll('li').forEach((l) => l.classList.toggle('active', l === li));
      centerLabel(`₹${amount} Cr · ${a.pct}%`);
    }
    circle.addEventListener('mouseenter', highlight);
    circle.addEventListener('mouseleave', reset);
    li.addEventListener('mouseenter', highlight);
    li.addEventListener('mouseleave', reset);
  });
}

export default function PitchScripts() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    // ---- scroll spy ----
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.navlist a');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            navLinks.forEach((l) => l.classList.remove('active'));
            const link = document.querySelector(`.navlist a[href="#${e.target.getAttribute('id')}"]`);
            if (link) link.classList.add('active');
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    cleanups.push(() => io.disconnect());

    // ---- fade-up reveal ----
    const fio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            fio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll('.cell, .product, .mstat, .trac-nums, .reg-strip, .gallery, .hero-photo')
      .forEach((el) => {
        el.classList.add('fade-up');
        fio.observe(el);
      });
    cleanups.push(() => fio.disconnect());

    // ---- product accordion ----
    document.querySelectorAll<HTMLElement>('.product').forEach((p) => {
      const head = p.querySelector<HTMLElement>('.head')!;
      const body = p.querySelector<HTMLElement>('.body')!;
      const onClick = () => {
        const isOpen = p.classList.contains('open');
        document.querySelectorAll<HTMLElement>('.product').forEach((o) => {
          o.classList.remove('open');
          o.querySelector<HTMLElement>('.body')!.style.maxHeight = '';
        });
        if (!isOpen) {
          p.classList.add('open');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      };
      head.addEventListener('click', onClick);
      cleanups.push(() => head.removeEventListener('click', onClick));
    });

    // ---- click-to-play video facades (YouTube + Google Drive) ----
    // Served over http(s) the poster is swapped for a real inline player; from
    // file:// both providers refuse to embed, so the video opens in a new tab.
    document.querySelectorAll<HTMLElement>('.yt').forEach((el) => {
      const id = el.dataset.yt;
      const drive = el.dataset.drive;
      const watch = drive ? `https://drive.google.com/file/d/${drive}/view` : `https://youtu.be/${id}`;
      const embed = drive
        ? `https://drive.google.com/file/d/${drive}/preview`
        : `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
      const onClick = () => {
        if (location.protocol === 'file:') {
          window.open(watch, '_blank', 'noopener');
          return;
        }
        const f = document.createElement('iframe');
        f.src = embed;
        f.title = el.getAttribute('aria-label') || 'ARNOBOT video';
        f.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture';
        f.allowFullscreen = true;
        el.replaceWith(f);
      };
      el.addEventListener('click', onClick);
      cleanups.push(() => el.removeEventListener('click', onClick));
    });

    // ---- placeholder for assets not yet dropped into /public/pitch/assets ----
    const placeholder = (img: HTMLImageElement) => {
      if (img.dataset.phDone) return;
      img.dataset.phDone = '1';
      const file = img.getAttribute('src')?.split('/').pop() || 'image';
      const ph = document.createElement('div');
      ph.className = 'img-ph';
      ph.textContent = `Image pending — ${file}`;
      img.replaceWith(ph);
    };
    document.querySelectorAll<HTMLImageElement>('main img, .rail img').forEach((img) => {
      const onError = () => placeholder(img);
      if (img.complete && img.naturalWidth === 0) placeholder(img);
      else img.addEventListener('error', onError);
      cleanups.push(() => img.removeEventListener('error', onError));
    });

    // ---- charts ----
    drawBarChart('salesChart', ['FY24', 'FY25', 'FY26'], [80.0, 200.0, 523.73], { showDelta: true });
    drawBarChart('ebitdaChart', ['FY24', 'FY25', 'FY26'], [31.87, 21.37, -1024.5]);
    drawDonut();

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}

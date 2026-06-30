'use client';

import { useEffect, useRef } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: 1 | 2 | 3 | 4;
  style?: React.CSSProperties;
}

export default function Reveal({ children, className = '', delay, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const cls = ['reveal', delay ? `reveal-d${delay}` : '', className].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={cls} style={style}>
      {children}
    </div>
  );
}

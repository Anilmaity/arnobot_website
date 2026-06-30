'use client';

import { useEffect, useState } from 'react';

export default function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav id="mainNav" className={solid ? 'solid' : ''}>
      <div className="nav-inner">
        <a href="#hero" className="nav-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/uploads/arnobot-logo-white-tm.png" alt="ARNOBOT™" />
        </a>
        <ul className="nav-links">
          <li><a href="#products">Products</a></li>
          <li><a href="#technology">Technology</a></li>
          <li><a href="#industries">Industries</a></li>
          <li><a href="#company">Company</a></li>
          <li><a href="#careers">Careers</a></li>
        </ul>
        <a href="#contact" className="nav-demo">Request a Demo</a>
      </div>
    </nav>
  );
}

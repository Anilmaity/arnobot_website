'use client';

import { useEffect, useRef } from 'react';

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;

    function resize() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const W = () => canvas!.width;
    const H = () => canvas!.height;
    let t = 0;

    const RADAR_R = () => Math.min(W(), H()) * 0.32;

    const blips = [
      { angle: 0.8, dist: 0.45, label: 'TGT-01', type: 'FRIENDLY' },
      { angle: 2.1, dist: 0.7, label: 'TGT-02', type: 'HOSTILE' },
      { angle: 3.8, dist: 0.55, label: 'TGT-03', type: 'FRIENDLY' },
      { angle: 5.0, dist: 0.3, label: 'TGT-04', type: 'UNKNOWN' },
      { angle: 1.3, dist: 0.82, label: 'TGT-05', type: 'FRIENDLY' },
      { angle: 4.4, dist: 0.65, label: 'TGT-06', type: 'HOSTILE' },
    ];

    const gridDots = Array.from({ length: 120 }, () => ({
      x: Math.random(),
      y: Math.random(),
      alpha: Math.random() * 0.3 + 0.05,
      size: Math.random() * 1.2 + 0.3,
    }));

    const hLines = Array.from({ length: 18 }, (_, i) => ({
      y: i / 18 + Math.random() * 0.02,
      x: Math.random(),
      speed: (Math.random() > 0.5 ? 1 : -1) * (0.0004 + Math.random() * 0.0006),
      w: 60 + Math.random() * 180,
      alpha: 0.08 + Math.random() * 0.14,
    }));

    const corners = [
      { x: 0.12, y: 0.18, label: 'SECTOR ALPHA', val: 'CLEAR' },
      { x: 0.88, y: 0.18, label: 'SECTOR BRAVO', val: 'ACTIVE' },
      { x: 0.12, y: 0.82, label: 'SECTOR GAMMA', val: 'SCANNING' },
      { x: 0.88, y: 0.82, label: 'SECTOR DELTA', val: 'CLEAR' },
    ];

    function drawTopographicGrid() {
      gridDots.forEach((d) => {
        ctx!.beginPath();
        ctx!.arc(d.x * W(), d.y * H(), d.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(167,188,227,${d.alpha})`;
        ctx!.fill();
      });
      const cols = 16, rows = 9;
      ctx!.strokeStyle = 'rgba(167,188,227,0.06)';
      ctx!.lineWidth = 1;
      for (let i = 0; i <= cols; i++) {
        const x = (i / cols) * W();
        ctx!.beginPath(); ctx!.moveTo(x, 0); ctx!.lineTo(x, H()); ctx!.stroke();
      }
      for (let i = 0; i <= rows; i++) {
        const y = (i / rows) * H();
        ctx!.beginPath(); ctx!.moveTo(0, y); ctx!.lineTo(W(), y); ctx!.stroke();
      }
    }

    function drawHorizontalStreaks() {
      hLines.forEach((l) => {
        l.x += l.speed;
        if (l.x > 1.3) l.x = -0.3;
        if (l.x < -0.3) l.x = 1.3;
        const x = l.x * W(), y = l.y * H();
        const g = ctx!.createLinearGradient(x, 0, x + l.w, 0);
        g.addColorStop(0, 'rgba(167,188,227,0)');
        g.addColorStop(0.4, `rgba(167,188,227,${l.alpha})`);
        g.addColorStop(1, 'rgba(167,188,227,0)');
        ctx!.fillStyle = g;
        ctx!.fillRect(x, y, l.w, 1);
      });
    }

    function drawRadar() {
      const cx = W() * 0.72, cy = H() * 0.45;
      const R = RADAR_R();
      const sweep = (t * 0.018) % (Math.PI * 2);

      const glow = ctx!.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 1.05);
      glow.addColorStop(0, 'rgba(167,188,227,0.12)');
      glow.addColorStop(1, 'rgba(167,188,227,0)');
      ctx!.fillStyle = glow;
      ctx!.beginPath(); ctx!.arc(cx, cy, R * 1.05, 0, Math.PI * 2); ctx!.fill();

      [1, 0.75, 0.5, 0.25].forEach((scale, i) => {
        ctx!.beginPath();
        ctx!.arc(cx, cy, R * scale, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(167,188,227,${0.18 - i * 0.03})`;
        ctx!.lineWidth = i === 0 ? 1.5 : 0.75;
        ctx!.stroke();
      });

      ctx!.strokeStyle = 'rgba(167,188,227,0.12)';
      ctx!.lineWidth = 0.75;
      ctx!.setLineDash([4, 8]);
      ctx!.beginPath(); ctx!.moveTo(cx - R, cy); ctx!.lineTo(cx + R, cy); ctx!.stroke();
      ctx!.beginPath(); ctx!.moveTo(cx, cy - R); ctx!.lineTo(cx, cy + R); ctx!.stroke();
      ctx!.setLineDash([]);

      ctx!.save();
      ctx!.translate(cx, cy);
      ctx!.rotate(sweep);
      const wedgeAngle = Math.PI * 0.45;
      const grad = ctx!.createLinearGradient(0, 0, R, 0);
      grad.addColorStop(0, 'rgba(167,188,227,0.35)');
      grad.addColorStop(1, 'rgba(167,188,227,0)');
      ctx!.beginPath();
      ctx!.moveTo(0, 0);
      ctx!.arc(0, 0, R, -wedgeAngle, 0);
      ctx!.closePath();
      ctx!.fillStyle = grad;
      ctx!.fill();

      ctx!.strokeStyle = 'rgba(167,188,227,0.7)';
      ctx!.lineWidth = 1.5;
      ctx!.beginPath(); ctx!.moveTo(0, 0); ctx!.lineTo(R, 0); ctx!.stroke();
      ctx!.restore();

      ctx!.save();
      ctx!.beginPath(); ctx!.arc(cx, cy, R, 0, Math.PI * 2); ctx!.clip();

      blips.forEach((b) => {
        const bx = cx + Math.cos(b.angle) * b.dist * R;
        const by = cy + Math.sin(b.angle) * b.dist * R;
        const angleDiff = (((sweep - b.angle) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const fadeAlpha = angleDiff < 0.3 ? 1 : Math.max(0, 1 - angleDiff / (Math.PI * 1.5));

        if (fadeAlpha > 0.05) {
          const color =
            b.type === 'HOSTILE'
              ? `rgba(255,100,100,${fadeAlpha})`
              : b.type === 'UNKNOWN'
              ? `rgba(255,220,100,${fadeAlpha})`
              : `rgba(167,188,227,${fadeAlpha})`;

          if (angleDiff < 0.4) {
            ctx!.beginPath();
            ctx!.arc(bx, by, 8 + angleDiff * 20, 0, Math.PI * 2);
            ctx!.strokeStyle = color.replace(`${fadeAlpha}`, `${fadeAlpha * 0.3}`);
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }

          ctx!.beginPath();
          ctx!.arc(bx, by, 3, 0, Math.PI * 2);
          ctx!.fillStyle = color;
          ctx!.fill();

          ctx!.fillStyle = color;
          ctx!.font = '500 8px Syne';
          ctx!.fillText(b.label, bx + 6, by - 4);
          ctx!.font = '300 7px DM Sans';
          ctx!.fillStyle = color.replace(`${fadeAlpha}`, `${fadeAlpha * 0.6}`);
          ctx!.fillText(b.type, bx + 6, by + 5);
        }
      });
      ctx!.restore();

      ctx!.fillStyle = 'rgba(167,188,227,0.35)';
      ctx!.font = '600 9px Syne';
      ctx!.textAlign = 'center';
      ctx!.fillText('GROUND SURVEILLANCE · ACTIVE', cx, cy + R + 18);
      ctx!.font = '300 8px DM Sans';
      ctx!.fillStyle = 'rgba(167,188,227,0.2)';
      ctx!.fillText(
        `RANGE: 5KM  ·  AZ: ${Math.floor((sweep * 180) / Math.PI).toString().padStart(3, '0')}°`,
        cx,
        cy + R + 30
      );
      ctx!.textAlign = 'left';
    }

    function drawLeftPanel() {
      const px = W() * 0.06, py = H() * 0.25;

      ctx!.fillStyle = 'rgba(167,188,227,0.6)';
      ctx!.font = '700 11px Syne';
      ctx!.fillText('MISSION STATUS', px, py);

      const items = [
        { label: 'UNITS DEPLOYED', val: '04' },
        { label: 'AREA COVERED', val: '12.4 KM²' },
        { label: 'THREATS DETECTED', val: '02' },
        { label: 'UPTIME', val: '99.7%' },
        { label: 'SIGNAL', val: 'SECURE' },
      ];

      items.forEach((item, i) => {
        const y = py + 24 + i * 28;
        ctx!.fillStyle = `rgba(167,188,227,0.03)`;
        ctx!.fillRect(px - 4, y - 12, 180, 20);

        ctx!.fillStyle = 'rgba(167,188,227,0.3)';
        ctx!.font = '300 8px DM Sans';
        ctx!.fillText(item.label, px, y);
        ctx!.fillStyle = 'rgba(167,188,227,0.8)';
        ctx!.font = '600 10px Syne';
        ctx!.fillText(item.val, px + 185, y);

        if (i < 4) {
          ctx!.fillStyle = 'rgba(167,188,227,0.08)';
          ctx!.fillRect(px, y + 4, 160, 2);
          const pct = [1, 0.62, 0.2, 0.997][i];
          ctx!.fillStyle = i === 2 ? 'rgba(255,100,100,0.5)' : 'rgba(167,188,227,0.4)';
          ctx!.fillRect(px, y + 4, 160 * pct, 2);
        }
      });

      ctx!.strokeStyle = 'rgba(167,188,227,0.08)';
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(px - 8, py + 175);
      ctx!.lineTo(px + 200, py + 175);
      ctx!.stroke();

      ctx!.fillStyle = 'rgba(167,188,227,0.4)';
      ctx!.font = '600 9px Syne';
      ctx!.fillText('POSITION', px, py + 192);
      ctx!.fillStyle = 'rgba(167,188,227,0.6)';
      ctx!.font = '300 9px DM Sans';
      ctx!.fillText('23.0225° N  72.5714° E', px, py + 206);
      ctx!.fillText(`ALT 52m  HDG ${String(Math.floor((t * 0.05) % 360)).padStart(3, '0')}°`, px, py + 220);
    }

    function drawCornerBrackets() {
      corners.forEach((c, i) => {
        const x = c.x * W(), y = c.y * H();
        const s = 28;
        const phase = Math.sin(t * 0.015 + i * 1.2);
        const alpha = 0.25 + 0.15 * phase;

        ctx!.strokeStyle = `rgba(167,188,227,${alpha})`;
        ctx!.lineWidth = 1.5;
        ([[-1, -1], [1, -1], [1, 1], [-1, 1]] as const).forEach(([sx, sy]) => {
          ctx!.beginPath();
          ctx!.moveTo(x + sx * s, y + sy * s - sy * 10);
          ctx!.lineTo(x + sx * s, y + sy * s);
          ctx!.lineTo(x + sx * s - sx * 10, y + sy * s);
          ctx!.stroke();
        });

        ctx!.fillStyle = `rgba(167,188,227,${alpha + 0.1})`;
        ctx!.font = '500 8px Syne';
        ctx!.textAlign = i % 2 === 0 ? 'left' : 'right';
        const lx = i % 2 === 0 ? x - s - 2 : x + s + 2;
        ctx!.fillText(c.label, lx, y - s - 6);
        ctx!.fillStyle = `rgba(167,188,227,${alpha * 0.7})`;
        ctx!.font = '300 7px DM Sans';
        ctx!.fillText(c.val, lx, y - s + 4);
        ctx!.textAlign = 'left';
      });
    }

    function drawScanLine() {
      const y = (t * 0.25) % H();
      const g = ctx!.createLinearGradient(0, y - 30, 0, y + 30);
      g.addColorStop(0, 'rgba(167,188,227,0)');
      g.addColorStop(0.5, 'rgba(167,188,227,0.08)');
      g.addColorStop(1, 'rgba(167,188,227,0)');
      ctx!.fillStyle = g;
      ctx!.fillRect(0, y - 30, W(), 60);
      ctx!.strokeStyle = 'rgba(167,188,227,0.18)';
      ctx!.lineWidth = 0.5;
      ctx!.beginPath(); ctx!.moveTo(0, y); ctx!.lineTo(W(), y); ctx!.stroke();
    }

    function frame() {
      ctx!.clearRect(0, 0, W(), H());
      drawTopographicGrid();
      drawHorizontalStreaks();
      drawScanLine();
      drawRadar();
      drawLeftPanel();
      drawCornerBrackets();
      t++;
      raf = requestAnimationFrame(frame);
    }

    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

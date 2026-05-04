(function() {
  const canvas = document.getElementById('intelligenceCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let t = 0;

  function resize() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
  resize();
  window.addEventListener('resize', resize);
  const W = () => canvas.width;
  const H = () => canvas.height;

  // ── AUTONOMOUS NAV WAYPOINTS ─────────────────────
  function waypoints() {
    return [
      {x:0.06,y:0.72},{x:0.14,y:0.55},{x:0.20,y:0.68},{x:0.28,y:0.48},
      {x:0.36,y:0.60},{x:0.42,y:0.40},{x:0.50,y:0.54}
    ].map(function(p){ return {x:p.x*W(), y:p.y*H()}; });
  }

  // ── MATH EQUATIONS ───────────────────────────────
  var equations = [
    'v(t) = v0 + at', 'F = ma', 'tau = I*alpha',
    'theta + (b/I)theta + (k/I) = T/I',
    'y = sigmoid(Wx + b)', 'nabla f(x) = 0',
    'P(A|B) = P(B|A)*P(A)/P(B)',
    'SLAM: p(x_t | z_t, u_t)',
    'det(J) != 0', 'E[x^2] - E[x]^2'
  ];

  // ── SURVEILLANCE CELLS ───────────────────────────
  var survCells = [];
  for (var r=0; r<6; r++) for (var c=0; c<4; c++) {
    survCells.push({r:r, c:c, alpha:Math.random()*0.12+0.03, pulse:Math.random()*Math.PI*2});
  }

  // ── TARGETING RETICLES ───────────────────────────
  var targets = [
    {x:0.63, y:0.26, size:52, label:'LOCK-01', locked:true},
    {x:0.81, y:0.52, size:40, label:'LOCK-02', locked:false},
    {x:0.72, y:0.74, size:36, label:'SCAN-03', locked:false}
  ];

  // ── CIRCUIT LINES ────────────────────────────────
  var circuits = [];
  for (var i=0; i<14; i++) {
    circuits.push({
      y: 0.05 + i*0.067,
      x: Math.random(),
      spd: (Math.random()>0.5?1:-1)*(0.0008+Math.random()*0.001),
      w: 0.06+Math.random()*0.18,
      a: 0.07+Math.random()*0.10
    });
  }

  // ── PARTICLES ────────────────────────────────────
  var particles = [];
  for (var i=0; i<55; i++) {
    particles.push({
      x:Math.random(), y:Math.random(),
      vx:(Math.random()-0.5)*0.0002, vy:(Math.random()-0.5)*0.0002,
      r:Math.random()*1.8+0.4, a:Math.random()*0.3+0.06
    });
  }

  // ── GEAR DRAW ────────────────────────────────────
  function drawGear(cx, cy, r, teeth, alpha, rot) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.strokeStyle = 'rgba(167,188,227,' + alpha + ')';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (var i=0; i<teeth*2; i++) {
      var a = (i/teeth)*Math.PI;
      var rad = i%2===0 ? r : r*0.75;
      if (i===0) ctx.moveTo(Math.cos(a)*rad, Math.sin(a)*rad);
      else ctx.lineTo(Math.cos(a)*rad, Math.sin(a)*rad);
    }
    ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.arc(0,0,r*0.28,0,Math.PI*2); ctx.stroke();
    ctx.restore();
  }

  // ── BG ───────────────────────────────────────────
  function drawBg() {
    var bg = ctx.createLinearGradient(0,0,W(),H());
    bg.addColorStop(0,'#06080f');
    bg.addColorStop(0.5,'#0c1020');
    bg.addColorStop(1,'#05060e');
    ctx.fillStyle = bg; ctx.fillRect(0,0,W(),H());
    var g = ctx.createRadialGradient(W()*0.5,H()*0.5,0,W()*0.5,H()*0.5,W()*0.55);
    g.addColorStop(0,'rgba(45,53,142,0.22)');
    g.addColorStop(0.6,'rgba(32,11,118,0.08)');
    g.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.fillRect(0,0,W(),H());
  }

  function drawCircuits() {
    circuits.forEach(function(c) {
      c.x += c.spd;
      if (c.x>1.3) c.x=-0.3; if (c.x<-0.3) c.x=1.3;
      var x=c.x*W(), y=c.y*H(), w=c.w*W();
      var g = ctx.createLinearGradient(x,0,x+w,0);
      g.addColorStop(0,'rgba(167,188,227,0)');
      g.addColorStop(0.4,'rgba(167,188,227,'+c.a+')');
      g.addColorStop(0.8,'rgba(167,188,227,'+c.a+')');
      g.addColorStop(1,'rgba(167,188,227,0)');
      ctx.fillStyle=g; ctx.fillRect(x,y,w,1);
      ctx.fillStyle='rgba(167,188,227,'+(c.a*3)+')';
      ctx.fillRect(x+w*0.78, y-1, 2, 3);
    });
  }

  function drawParticles() {
    particles.forEach(function(p) {
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=1; if(p.x>1)p.x=0;
      if(p.y<0)p.y=1; if(p.y>1)p.y=0;
      ctx.beginPath(); ctx.arc(p.x*W(),p.y*H(),p.r,0,Math.PI*2);
      ctx.fillStyle='rgba(167,188,227,'+p.a+')'; ctx.fill();
    });
  }

  function drawNavPath() {
    var wps = waypoints();
    // Background grid
    var gx=0.03*W(), gy=0.33*H(), gw=0.52*W(), gh=0.52*H();
    ctx.strokeStyle='rgba(167,188,227,0.05)'; ctx.lineWidth=0.75;
    for(var i=0;i<=10;i++){
      ctx.beginPath(); ctx.moveTo(gx+i*gw/10,gy); ctx.lineTo(gx+i*gw/10,gy+gh); ctx.stroke();
    }
    for(var i=0;i<=7;i++){
      ctx.beginPath(); ctx.moveTo(gx,gy+i*gh/7); ctx.lineTo(gx+gw,gy+i*gh/7); ctx.stroke();
    }
    // Dashed planned path
    ctx.setLineDash([5,4]); ctx.strokeStyle='rgba(167,188,227,0.18)'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(wps[0].x,wps[0].y);
    wps.forEach(function(p){ctx.lineTo(p.x,p.y);}); ctx.stroke();
    ctx.setLineDash([]);
    // Animated robot
    var totalSegs=wps.length-1;
    var progress=(t*0.007)%totalSegs;
    var seg=Math.floor(progress), pct=progress-seg;
    var a=wps[Math.min(seg,wps.length-2)], b=wps[Math.min(seg+1,wps.length-1)];
    var rx=a.x+(b.x-a.x)*pct, ry=a.y+(b.y-a.y)*pct;
    // Trail glow
    var tg=ctx.createRadialGradient(rx,ry,0,rx,ry,22);
    tg.addColorStop(0,'rgba(167,188,227,0.45)'); tg.addColorStop(1,'rgba(167,188,227,0)');
    ctx.fillStyle=tg; ctx.beginPath(); ctx.arc(rx,ry,22,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle='rgba(167,188,227,0.9)'; ctx.lineWidth=2;
    ctx.strokeRect(rx-9,ry-9,18,18);
    ctx.fillStyle='rgba(167,188,227,0.7)';
    ctx.beginPath(); ctx.arc(rx,ry,3,0,Math.PI*2); ctx.fill();
    // Waypoints
    wps.forEach(function(wp,i){
      ctx.beginPath(); ctx.arc(wp.x,wp.y,4,0,Math.PI*2);
      ctx.fillStyle=i===0?'rgba(100,255,150,0.7)':'rgba(167,188,227,0.35)'; ctx.fill();
    });
    // Labels
    ctx.fillStyle='rgba(167,188,227,0.5)'; ctx.font='600 9px Syne';
    ctx.fillText('AUTONOMOUS NAVIGATION', gx, gy-12);
    ctx.fillStyle='rgba(167,188,227,0.22)'; ctx.font='300 8px DM Sans';
    ctx.fillText('PATH PLANNING  OBSTACLE AVOIDANCE', gx, gy+gh+14);
  }

  function drawSurveillance() {
    var sx=W()*0.55, sy=H()*0.03, sw=W()*0.20, sh=H()*0.44;
    ctx.strokeStyle='rgba(167,188,227,0.14)'; ctx.lineWidth=1;
    ctx.strokeRect(sx,sy,sw,sh);
    var cols=4, rows=6, cw=sw/cols, ch=sh/rows;
    survCells.forEach(function(cell) {
      var a=cell.alpha*(0.5+0.5*Math.sin(t*0.02+cell.pulse));
      ctx.fillStyle='rgba(167,188,227,'+a+')';
      ctx.fillRect(sx+cell.c*cw+1,sy+cell.r*ch+1,cw-2,ch-2);
      ctx.strokeStyle='rgba(167,188,227,'+(a*2)+')';
      ctx.lineWidth=0.5; ctx.strokeRect(sx+cell.c*cw+1,sy+cell.r*ch+1,cw-2,ch-2);
    });
    // Scan line
    var scanY=sy+((t*1.2)%(sh*2)>sh?(sh*2-(t*1.2)%sh):(t*1.2)%sh);
    scanY=Math.max(sy,Math.min(sy+sh,scanY));
    var sg=ctx.createLinearGradient(0,scanY-14,0,scanY+14);
    sg.addColorStop(0,'rgba(167,188,227,0)');
    sg.addColorStop(0.5,'rgba(167,188,227,0.28)');
    sg.addColorStop(1,'rgba(167,188,227,0)');
    ctx.fillStyle=sg; ctx.fillRect(sx,scanY-14,sw,28);
    ctx.strokeStyle='rgba(167,188,227,0.55)'; ctx.lineWidth=0.75;
    ctx.beginPath(); ctx.moveTo(sx,scanY); ctx.lineTo(sx+sw,scanY); ctx.stroke();
    ctx.fillStyle='rgba(167,188,227,0.5)'; ctx.font='600 9px Syne';
    ctx.fillText('SURVEILLANCE GRID', sx, sy-10);
    ctx.fillStyle='rgba(167,188,227,0.22)'; ctx.font='300 8px DM Sans';
    ctx.fillText('SECTORS: 24   SCAN: ACTIVE', sx, sy+sh+14);
  }

  function drawTargeting() {
    targets.forEach(function(tgt, i) {
      var x=tgt.x*W(), y=tgt.y*H(), s=tgt.size;
      var phase=Math.sin(t*0.025+i*1.5);
      var alpha=tgt.locked?0.8+0.2*phase:0.4+0.2*phase;
      var cr=tgt.locked?'255,100,100':'167,188,227';
      var color='rgba('+cr+','+alpha+')';
      var cs=s*0.36;
      ctx.strokeStyle=color; ctx.lineWidth=tgt.locked?2:1.5;
      [[-1,-1],[1,-1],[1,1],[-1,1]].forEach(function(d) {
        ctx.beginPath();
        ctx.moveTo(x+d[0]*s/2, y+d[1]*s/2-d[1]*cs);
        ctx.lineTo(x+d[0]*s/2, y+d[1]*s/2);
        ctx.lineTo(x+d[0]*s/2-d[0]*cs, y+d[1]*s/2);
        ctx.stroke();
      });
      ctx.strokeStyle='rgba('+cr+','+(alpha*0.28)+')';
      ctx.lineWidth=0.5; ctx.setLineDash([3,5]);
      ctx.beginPath(); ctx.moveTo(x-s*0.85,y); ctx.lineTo(x+s*0.85,y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x,y-s*0.85); ctx.lineTo(x,y+s*0.85); ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath(); ctx.arc(x,y,3*(1+0.3*phase),0,Math.PI*2);
      ctx.fillStyle=color; ctx.fill();
      if(tgt.locked){
        ctx.save(); ctx.translate(x,y); ctx.rotate(t*0.03);
        ctx.strokeStyle='rgba(255,100,100,'+(alpha*0.35)+')';
        ctx.lineWidth=1; ctx.setLineDash([4,8]);
        ctx.beginPath(); ctx.arc(0,0,s*0.72,0,Math.PI*2); ctx.stroke();
        ctx.setLineDash([]); ctx.restore();
      }
      ctx.fillStyle=color; ctx.font=(tgt.locked?'700':'500')+' 8px Syne';
      ctx.fillText(tgt.label, x+s/2+8, y-4);
      ctx.font='300 7px DM Sans';
      ctx.fillStyle='rgba('+cr+','+(alpha*0.6)+')';
      ctx.fillText(tgt.locked?'TARGET LOCKED':'SCANNING...', x+s/2+8, y+6);
    });
  }

  function drawEngineering() {
    var ex=W()*0.82, ey=H()*0.60;
    drawGear(ex,ey,50,12,0.18,t*0.008);
    drawGear(ex+70,ey+22,28,8,0.14,-t*0.02);
    drawGear(ex-54,ey+40,20,6,0.12,t*0.015);
    // Dimension line
    ctx.strokeStyle='rgba(167,188,227,0.1)'; ctx.lineWidth=0.75;
    ctx.setLineDash([3,6]);
    ctx.beginPath(); ctx.moveTo(ex-62,ey+72); ctx.lineTo(ex+92,ey+72); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle='rgba(167,188,227,0.28)'; ctx.font='300 8px DM Sans';
    ctx.textAlign='center'; ctx.fillText('150mm', ex+15,ey+84);
    ctx.fillStyle='rgba(167,188,227,0.5)'; ctx.font='600 9px Syne';
    ctx.fillText('HEAVY ENGINEERING', ex+15, ey-70);
    ctx.fillStyle='rgba(167,188,227,0.22)'; ctx.font='300 7px DM Sans';
    ctx.fillText('6-DOF  PRECISION ACTUATORS', ex+15, ey-58);
    ctx.textAlign='left';
  }

  function drawMathOverlay() {
    equations.forEach(function(eq, i) {
      var alpha=0.10+0.06*Math.sin(t*0.018+i*0.7);
      ctx.fillStyle='rgba(167,188,227,'+alpha+')';
      ctx.font='300 '+(9+i%2)+'px DM Sans';
      ctx.fillText(eq, W()*0.03, H()*(0.04+i*0.087));
    });
  }

  function frame() {
    drawBg();
    drawCircuits();
    drawParticles();
    drawNavPath();
    drawSurveillance();
    drawTargeting();
    drawEngineering();
    drawMathOverlay();
    t++;
    requestAnimationFrame(frame);
  }
  frame();
})();

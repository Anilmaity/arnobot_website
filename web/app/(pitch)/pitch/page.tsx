import PitchScripts from '@/components/PitchScripts';

const A = '/pitch/assets';

export default function PitchPage() {
  return (
    <>
      <div className="grid-bg" />

      <div className="shell">
        <nav className="rail">
          <div className="rail-top">
            <div className="brand">
              <img src={`${A}/arnobot-wordmark.png`} alt="ARNOBOT™" />
              <div className="sub">Robotics Redefined</div>
            </div>
            <ul className="navlist">
              <li><a href="#overview"><span className="idx">00</span> Overview</a></li>
              <li><a href="#company"><span className="idx">01</span> Company</a></li>
              <li><a href="#products"><span className="idx">02</span> Products</a></li>
              <li><a href="#market"><span className="idx">03</span> Market</a></li>
              <li><a href="#traction"><span className="idx">04</span> Traction</a></li>
              <li><a href="#financials"><span className="idx">05</span> Financials</a></li>
              <li><a href="#ask"><span className="idx">06</span> The Ask</a></li>
              <li><a href="#recognition"><span className="idx">07</span> Recognition</a></li>
              <li><a href="#contact"><span className="idx">08</span> Contact</a></li>
            </ul>
          </div>
          <div className="rail-bottom">Ahmedabad, India<br />Est. 2024<br /><br />Private &amp; Confidential</div>
        </nav>

        <main>
          {/* HERO */}
          <section id="overview" className="hero">
            <div className="hero-inner">
              <div>
                <div className="kicker">Defence &amp; Industrial Robotics — Capability &amp; Investment Overview</div>
                <h1>Unmanned systems<br />for <em>where humans</em><br />shouldn&apos;t go.</h1>
                <p className="lede">ARNOBOT designs and builds mission-ready ground, climbing and tactical robots for hazardous environments across defence, energy, maritime and industrial sectors — engineered end-to-end, in-house.</p>
              </div>
              <figure className="hero-photo">
                <img src={`${A}/saibya-hero.jpg`} alt="SAIBYA unmanned ground vehicle alongside the ATM at a desert field exercise" />
                <figcaption>SAIBYA (surveillance fit) — field deployment</figcaption>
              </figure>
            </div>
            <div className="hero-stats">
              <div className="stat"><div className="num">2024</div><div className="lbl">Founded, Ahmedabad</div></div>
              <div className="stat"><div className="num">4</div><div className="lbl">Robotic platforms in production</div></div>
              <div className="stat"><div className="num">60+</div><div className="lbl">Competition wins since 2021</div></div>
              <div className="stat"><div className="num">3H / 5L</div><div className="lbl">Units/month in-house capacity</div></div>
              <div className="stat"><div className="num">₹4 Cr</div><div className="lbl">Current raise — Project Sentinel</div></div>
            </div>
            <div className="scroll-cue"><div className="ln" />SCROLL</div>
          </section>

          {/* COMPANY */}
          <section id="company">
            <div className="eyebrow">01 — Company &amp; Mission</div>
            <h2 className="sec-title">Engineering excellence, built from the competition floor up.</h2>
            <p className="sec-lede">Arnobot Private Limited was founded on a foundation laid during the founders&apos; academic years — a focused commitment to robotics and autonomous systems that has since scaled into a full-stack robotics company serving defence and industry.</p>

            <div className="grid-2">
              <div className="cell">
                <h4>Mission</h4>
                <p>To revolutionise operational landscapes by delivering precise, scalable and intelligent robotic platforms that enhance efficiency, reliability and safety — empowering organisations with tailored automation for their most demanding challenges.</p>
              </div>
              <div className="cell">
                <h4>Vision</h4>
                <p>To become a global leader in robotics-driven asset lifecycle management — making industrial maintenance safer, smarter and more efficient through intelligent robotics.</p>
              </div>
            </div>
            <div className="grid-2" style={{ marginTop: '1px' }}>
              <div className="cell">
                <h4>Core Activity</h4>
                <p>Unmanned Ground Vehicles (UGVs) · Industrial inspection robots · Vertical climbing robots · Defence &amp; mission-critical robotic systems · Automation for hazardous industrial environments.</p>
              </div>
              <div className="cell">
                <h4>Values</h4>
                <div className="pill-row" style={{ marginTop: '4px' }}>
                  <span className="pill">Engineering Excellence</span>
                  <span className="pill">Safety First</span>
                  <span className="pill">Client-Centric Innovation</span>
                  <span className="pill">Data-Driven Decisions</span>
                  <span className="pill">Made in India</span>
                </div>
              </div>
            </div>

            <div className="reg-strip">
              <div className="reg-item"><div className="k">CIN</div><div className="v">U28199GJ2024PTC148328</div></div>
              <div className="reg-item"><div className="k">Registered</div><div className="v">RoC Gujarat &amp; Dadra Nagar Haveli</div></div>
              <div className="reg-item"><div className="k">DPIIT Startup Reg.</div><div className="v">D1PP190026</div></div>
              <div className="reg-item"><div className="k">GST</div><div className="v">24ABACA1106F1ZJ</div></div>
              <div className="reg-item"><div className="k">Registered Office</div><div className="v">G-2, Parul Apartments, Satellite Road, Ahmedabad – 380015</div></div>
            </div>

            <div style={{ marginTop: '60px' }}>
              <div className="eyebrow" style={{ marginBottom: '24px' }}>Leadership</div>
              <div className="grid-3">
                <div className="cell bracket founder"><span className="bl" /><span className="br" />
                  <div className="ph">AS</div>
                  <h3>Anmol Shah</h3>
                  <div className="role">Founder &amp; CEO</div>
                  <div className="cred">B.E. Mechatronics — Industrial Automation &amp; Maintenance, TPM</div>
                </div>
                <div className="cell bracket founder"><span className="bl" /><span className="br" />
                  <div className="ph">AM</div>
                  <h3>Anil Maity</h3>
                  <div className="role">Co-Founder &amp; CTO</div>
                  <div className="cred">B.E. Mechatronics — Robotics &amp; Software Development</div>
                </div>
                <div className="cell bracket founder"><span className="bl" /><span className="br" />
                  <div className="ph">AS</div>
                  <h3>Amit Shah</h3>
                  <div className="role">Co-Founder &amp; Director</div>
                  <div className="cred">B.Com, LLB, D.L.P, D.T.P — Interior Designer</div>
                </div>
              </div>
              <p style={{ color: 'var(--text-3)', fontSize: '12.5px', marginTop: '14px' }}>Backed by an 8-professional core team spanning robotics engineering, product design, system integration and strategic management.</p>
            </div>
          </section>

          <div className="hazard-rule" />

          {/* PRODUCTS */}
          <section id="products" className="alt">
            <div className="eyebrow">02 — Product Range</div>
            <h2 className="sec-title">Four platforms. One mission-ready fleet.</h2>
            <p className="sec-lede">Every platform is designed, fabricated and integrated in-house. Click a unit to expand its verified specification, use case and target industries.</p>

            <div className="grid-2" id="productGrid">
              <div className="bracket product" data-p="1"><span className="bl" /><span className="br" />
                <div className="shot tile"><img src={`${A}/prod-saibya.jpg`} alt="SAIBYA heavy-duty 4×4 unmanned ground vehicle" /></div>
                <div className="head">
                  <div><div className="name">SAIBYA</div><div className="tag">Heavy-Duty Unmanned Ground Vehicle</div></div>
                  <div className="plus">+</div>
                </div>
                <div className="body"><div className="body-inner">
                  <div className="row"><div className="k">Overview</div><div className="v">Rugged, high-payload 4×4 UGV for defence logistics, hazardous material transport, industrial inspection and mission-critical ground operations. Modular deck accepts mission-specific payloads.</div></div>
                  <div className="row"><div className="k">Mission fits</div><div className="v">Night surveillance · Mine dispensing · Sub-surface cable mapping (GPR + active EM) · Weed cutting · Payload carriage.</div></div>
                  <div className="row"><div className="k">Industry</div><div className="v">Defence, solar &amp; renewables, construction, asset-heavy industry.</div></div>
                  <table className="spec-table">
                    <tbody>
                      <tr><td>External dimensions</td><td>1078 × 692 × 402 mm</td></tr>
                      <tr><td>Weight</td><td>70 kg</td></tr>
                      <tr><td>Max payload</td><td>200 kg (90 kg all-terrain)</td></tr>
                      <tr><td>Drivetrain</td><td>4×4 · zero-radius turn</td></tr>
                      <tr><td>Max speed</td><td>8 km/h</td></tr>
                      <tr><td>Climb grade / stair step</td><td>30° · 150 mm</td></tr>
                      <tr><td>Ground clearance</td><td>130 mm</td></tr>
                      <tr><td>Battery</td><td>NMC 24 V 50 Ah</td></tr>
                      <tr><td>Runtime / charge</td><td>3 h · 5 h</td></tr>
                      <tr><td>User power take-off</td><td>24 V / 12 V @ 10 A</td></tr>
                    </tbody>
                  </table>
                </div></div>
              </div>

              <div className="bracket product" data-p="2"><span className="bl" /><span className="br" />
                <div className="shot"><img src={`${A}/nexus-studio.jpg`} alt="NEXUS compact tactical ground robot" /></div>
                <div className="head">
                  <div><div className="name">NEXUS</div><div className="tag">Nano Exploration &amp; Utility System</div></div>
                  <div className="plus">+</div>
                </div>
                <div className="body"><div className="body-inner">
                  <div className="row"><div className="k">Overview</div><div className="v">Compact, invertible tactical robot — drives equally well upside down. Small enough for tight spaces, rugged enough to scout hazardous areas before a team enters.</div></div>
                  <div className="row"><div className="k">Use case</div><div className="v">Tactical reconnaissance, pre-entry surveillance, indoor security inspection, border monitoring.</div></div>
                  <div className="row"><div className="k">Industry</div><div className="v">Defence, police, protection forces, disaster response.</div></div>
                  <table className="spec-table">
                    <tbody>
                      <tr><td>Dimensions</td><td>350 × 330 × 140 mm</td></tr>
                      <tr><td>Drive</td><td>4WD — wheels or chain tracks</td></tr>
                      <tr><td>Payload</td><td>Up to 2 kg (modular)</td></tr>
                      <tr><td>RC range</td><td>300 m LOS / 100 m NLOS</td></tr>
                      <tr><td>Camera</td><td>Live digital video feed</td></tr>
                      <tr><td>Thermal tolerance</td><td>60 °C loaded, 30 min</td></tr>
                      <tr><td>Orientation</td><td>Fully invertible</td></tr>
                    </tbody>
                  </table>
                </div></div>
              </div>

              <div className="bracket product" data-p="3"><span className="bl" /><span className="br" />
                <div className="shot tile"><img src={`${A}/prod-altius.jpg`} alt="ALTIUS vertical climbing robot" /></div>
                <div className="head">
                  <div><div className="name">ALTIUS</div><div className="tag">Vertical Climbing Robot</div></div>
                  <div className="plus">+</div>
                </div>
                <div className="body"><div className="body-inner">
                  <div className="row"><div className="k">Overview</div><div className="v">Climbs ferromagnetic surfaces for inspection, cleaning and monitoring of high-altitude and hard-to-reach assets — removing the need for scaffolding, rope access and confined-space entry.</div></div>
                  <div className="row"><div className="k">Use case</div><div className="v">Ship-hull and storage-tank cleaning &amp; inspection, silo and infrastructure inspection, critical asset mapping.</div></div>
                  <div className="row"><div className="k">Industry</div><div className="v">Maritime &amp; shipbuilding, oil &amp; gas, power generation, manufacturing.</div></div>
                  <table className="spec-table">
                    <tbody>
                      <tr><td>Surface</td><td>Ferromagnetic, vertical</td></tr>
                      <tr><td>Ingress protection</td><td>Up to IP-65</td></tr>
                      <tr><td>Power</td><td>Continuous supply from station</td></tr>
                      <tr><td>Control</td><td>RF wireless drive</td></tr>
                      <tr><td>Payload</td><td>Modular tooling, multiple payloads</td></tr>
                      <tr><td>Data</td><td>Cloud-based live monitoring</td></tr>
                    </tbody>
                  </table>
                </div></div>
              </div>

              <div className="bracket product" data-p="4"><span className="bl" /><span className="br" />
                <div className="shot"><img src={`${A}/prod-atm.jpg`} alt="ATM all-terrain heavy carrier platform" /></div>
                <div className="head">
                  <div><div className="name">ATM</div><div className="tag">Any Terrain Machine</div></div>
                  <div className="plus">+</div>
                </div>
                <div className="body"><div className="body-inner">
                  <div className="row"><div className="k">Overview</div><div className="v">Heavy-class all-terrain carrier built around payload capacity and mounting flexibility for defence and heavy-construction duty.</div></div>
                  <div className="row"><div className="k">Use case</div><div className="v">Heavy payload carriage, anti-drone system carriage, accessory and weapon-station mounting.</div></div>
                  <div className="row"><div className="k">Industry</div><div className="v">Defence, construction.</div></div>
                  <div className="row"><div className="k">Configuration</div><div className="v">All-terrain wheeled carrier, camouflage finish. Detailed specification issued on request — configuration is defined per mission profile.</div></div>
                </div></div>
              </div>
            </div>

            <div style={{ marginTop: '56px' }}>
              <div className="eyebrow" style={{ marginBottom: '20px' }}>Platform &amp; Services</div>
              <div className="grid-2">
                <div className="cell svc"><div className="n">01</div><div><h4>ARNOBOT GCS Software</h4><p>Ground-control station for human–robot interaction: live video, sensor telemetry, SLAM maps, mission control and exportable field-usable mission reports.</p></div></div>
                <div className="cell svc"><div className="n">02</div><div><h4>Multi-Sensor Payload Integration</h4><p>LiDAR, thermal imaging, gas sensors, GPR and active-EM survey heads, and custom payloads tailored to defence and industrial requirements.</p></div></div>
                <div className="cell svc"><div className="n">03</div><div><h4>Field Deployment &amp; Ops Support</h4><p>On-site robot operation, mission execution and safety-critical deployment services — delivered as a managed service where the client prefers outcomes to assets.</p></div></div>
                <div className="cell svc"><div className="n">04</div><div><h4>R&amp;D Collaboration</h4><p>Joint development programmes with defence units, industry and research organisations, including custom attachment engineering on the SAIBYA chassis.</p></div></div>
              </div>
            </div>

            <div style={{ marginTop: '56px' }}>
              <div className="eyebrow" style={{ marginBottom: '20px' }}>Field Footage</div>
              <div className="video-grid">
                {/* To add another: copy a button below. YouTube -> data-yt="VIDEO_ID";
                    Google Drive -> data-drive="FILE_ID" (the file must be shared "anyone with the link"). */}
                <div className="video-slot">
                  <button className="yt" data-drive="1WRgcXtniGM7O_sUm11s0Wto3DwWiGKma" aria-label="Play: ALTIUS ship-hull trial at Alang">
                    <img src={`${A}/video-altius-alang.jpg`} alt="ARNOBOT engineers running the ALTIUS climbing robot on a ship hull at Alang" />
                    <span className="play" />
                    <span className="yt-cap">ALTIUS — ship-hull trial, Alang</span>
                  </button>
                </div>
                <div className="video-slot">
                  <button className="yt" data-drive="1-cVEB8JkxcN3BBFlSW9r0QFixCi6jm3r" aria-label="Play: ATM vehicle demonstration">
                    <img src={`${A}/video-atm-demo.jpg`} alt="ATM all-terrain vehicle demonstration ground" />
                    <span className="play" />
                    <span className="yt-cap">ATM — vehicle demonstration</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* MARKET */}
          <section id="market">
            <div className="eyebrow">03 — Market Opportunity</div>
            <h2 className="sec-title">A policy-backed shift toward remote, unmanned operations.</h2>
            <p className="sec-lede">Extreme hazards — toxins, explosions, radiation, confined spaces — across power, shipbuilding, defence and maritime operations are driving structural demand for reliable, standardised unmanned platforms.</p>

            <div className="grid-5">
              <div className="cell mstat"><div className="lbl">Industrial Robotics — India</div><div className="val">$4.86<small>Bn</small> → $13.47<small>Bn</small></div><div className="ctx">By 2033 · CAGR ≈ 13%</div></div>
              <div className="cell mstat"><div className="lbl">Defence / Deep-Tech — India</div><div className="val">$30<small>Bn</small></div><div className="ctx">Deep-tech market by 2030</div></div>
              <div className="cell mstat"><div className="lbl">UGV Market — Global</div><div className="val">$3.2<small>Bn</small> → $5.9<small>Bn</small></div><div className="ctx">By 2035 · CAGR ≈ 6–9%</div></div>
              <div className="cell mstat"><div className="lbl">Shipbuilding — India</div><div className="val">$1.12<small>Bn</small> → $8<small>Bn</small></div><div className="ctx">By 2033 · CAGR ≈ 60%</div></div>
              <div className="cell mstat"><div className="lbl">Maritime Investment — India</div><div className="val">₹3–3.5<small>L Cr</small></div><div className="ctx">Planned govt. investment by 2030</div></div>
            </div>

            <div className="grid-2" style={{ marginTop: '1px' }}>
              <div className="cell">
                <h4>Value Proposition</h4>
                <p>Robotic systems that make inspection, surveillance and asset protection safe and repeatable in environments where sending a person is slow, costly or dangerous — with the data captured, structured and reportable.</p>
              </div>
              <div className="cell">
                <h4>Customer Segments</h4>
                <div className="pill-row">
                  <span className="pill">Defence &amp; Homeland Security</span><span className="pill">Oil &amp; Gas</span><span className="pill">Power Generation</span><span className="pill">Shipyards &amp; Maritime</span><span className="pill">Renewables / Solar</span><span className="pill">Infrastructure &amp; Disaster Response</span>
                </div>
              </div>
            </div>
            <p className="fin-note">Market figures are company-compiled estimates from published third-party research; sources available on request.</p>
          </section>

          <div className="hazard-rule" />

          {/* TRACTION */}
          <section id="traction" className="alt">
            <div className="eyebrow">04 — Traction &amp; Validation</div>
            <h2 className="sec-title">From competition floor to field deployment.</h2>

            <div className="trac-nums">
              <div className="tn"><div className="num">2</div><div className="lbl">Awards</div></div>
              <div className="tn"><div className="num">2</div><div className="lbl">IP Filings</div></div>
              <div className="tn"><div className="num">1</div><div className="lbl">Publications</div></div>
              <div className="tn"><div className="num">18+</div><div className="lbl">Exhibitions</div></div>
              <div className="tn"><div className="num">2+</div><div className="lbl">Lectures</div></div>
              <div className="tn"><div className="num">2</div><div className="lbl">Recognitions</div></div>
              <div className="tn"><div className="num">1</div><div className="lbl">Provisional Patents</div></div>
            </div>

            <div className="grid-2" style={{ marginTop: '24px' }}>
              <div className="cell">
                <h4>Active Relationships</h4>
                <p>Active commercial relationships in private industry and Indian Army units, with a purchase order in line from an EPC / renewable-energy project. Field pilots completed with a ship-recycling yard, a power-generation company, multiple Army formations and an industrial surveillance project.</p>
                <div className="pill-row" style={{ marginTop: '16px' }}>
                  <span className="pill">Indian Army formations</span><span className="pill">Renewable / EPC</span><span className="pill">Ship recycling</span><span className="pill">Power generation</span><span className="pill">Industrial surveillance</span>
                </div>
              </div>
              <div className="cell">
                <h4>Revenue Streams</h4>
                <div className="pill-row" style={{ marginTop: '4px' }}>
                  <span className="pill">Product Sales</span><span className="pill">Custom Development</span><span className="pill">Service Contracts</span><span className="pill">Government Projects</span><span className="pill">Robotics-as-a-Service</span>
                </div>
                <h4 style={{ marginTop: '26px' }}>Live Opportunities</h4>
                <p>Solar-plant night surveillance (managed service and outright), sub-surface cable mapping at utility scale, defence electro-optic / weapon-station integration, and robotic HVAC duct cleaning.</p>
              </div>
            </div>
          </section>

          {/* FINANCIALS */}
          <section id="financials">
            <div className="eyebrow">05 — Financial Snapshot</div>
            <h2 className="sec-title">Early-stage trajectory, FY24–FY26.</h2>
            <p className="sec-lede">All figures in ₹ thousands, per the June 2026 snapshot. Revenue has compounded every year; FY26 earnings reflect a deliberate step-up in scale investment ahead of the current raise.</p>

            <div className="fin-wrap">
              <div className="chart-box">
                <h4>Net Sales (₹ &apos;000)</h4>
                <svg id="salesChart" viewBox="0 0 320 200" style={{ width: '100%', overflow: 'visible' }} />
                <p className="chart-note">Up 6.5× across two years — a ≈156% compound annual growth rate.</p>
              </div>
              <div className="chart-box">
                <h4>EBITDA (₹ &apos;000)</h4>
                <svg id="ebitdaChart" viewBox="0 0 320 200" style={{ width: '100%', overflow: 'visible' }} />
                <p className="chart-note">Profitable at small scale in FY24–25; FY26 is the planned investment year.</p>
              </div>
            </div>

            <table className="fin-table">
              <tbody>
                <tr><th>Particulars</th><th>FY24</th><th>FY25</th><th>FY26</th></tr>
                <tr><td>Net Sales</td><td>80.00</td><td>200.00</td><td>523.73</td></tr>
                <tr><td>EBITDA</td><td>31.87</td><td>21.37</td><td className="neg">(1,024.50)</td></tr>
                <tr><td>EBITDA %</td><td>39.8%</td><td>10.7%</td><td className="neg">-195.6%</td></tr>
                <tr><td>PAT</td><td>31.87</td><td>21.37</td><td className="neg">(1,024.50)</td></tr>
                <tr><td>Networth</td><td>131.87</td><td>153.25</td><td className="neg">(871.25)</td></tr>
                <tr><td>Promoter&apos;s Debt</td><td>1.00</td><td>—</td><td>1,105.00</td></tr>
              </tbody>
            </table>
            <p className="fin-note">Source: Project Sentinel financial snapshot, June 2026. Strictly private &amp; confidential.</p>
          </section>

          <div className="hazard-rule" />

          {/* THE ASK */}
          <section id="ask" className="alt">
            <div className="eyebrow">06 — The Ask</div>
            <h2 className="sec-title">Raising ₹4 Cr to scale product, infrastructure and field validation.</h2>
            <p className="sec-lede">Seeking strategic stakeholders who understand real-world operational needs in defence and high-risk industries. Hover a segment to see its allocation.</p>

            <div className="ask-wrap">
              <div style={{ textAlign: 'center' }}>
                <svg id="donutChart" className="donut-svg" viewBox="0 0 200 200" width="270" height="270" style={{ margin: '0 auto', display: 'block' }} />
                <div className="raise-amt">₹4 Cr</div>
                <div style={{ color: 'var(--text-3)', fontFamily: 'var(--font-plex-mono), monospace', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Total Ask</div>
              </div>
              <ul className="donut-legend" id="donutLegend" />
            </div>
          </section>

          {/* RECOGNITION */}
          <section id="recognition">
            <div className="eyebrow">07 — Recognition &amp; Media</div>
            <h2 className="sec-title">Awards, publications and press coverage.</h2>

            <div className="grid-2">
              <div className="cell">
                <h4 style={{ marginBottom: '6px' }}>Awards &amp; Recognition</h4>
                <div className="award-row"><div className="yr">Apr 2025</div><div><h4>Startup Maharathi, Startup Mahakumbh</h4><p>Bharat Mandapam, New Delhi · Category: B2B</p></div></div>
                <div className="award-row"><div className="yr">2025</div><div><h4>Robotics Startup of the Year</h4><p>World STEM &amp; Robotics Olympiad (WSRO)</p></div></div>
                <div className="award-row"><div className="yr">Jan 2025</div><div><h4>Startup Demo Day</h4><p>KPGU Vadodara — Recognition</p></div></div>
                <div className="award-row"><div className="yr">2025/26</div><div><h4>Distinguished Lecture Recognition</h4><p>Karnavati University — Startup &amp; Ecosystem</p></div></div>
                <div className="award-row" style={{ borderBottom: 'none' }}><div className="yr">2026</div><div><h4>Pride of Gujarat — Defence Category</h4><p>Vibrant Gujarat 2026, Rajkot</p></div></div>
              </div>
              <div className="cell">
                <h4 style={{ marginBottom: '6px' }}>Media Coverage</h4>
                <div className="award-row"><div className="yr">Jan 2026</div><div><h4>Efficient Manufacturing (EM) Magazine</h4><p>Vol. 17, Issue 03</p></div></div>
                <div className="award-row"><div className="yr">20 Jun 2026</div><div><h4>Divyabhaskar — City Activity</h4><p>Newspaper feature</p></div></div>
                <div className="award-row" style={{ borderBottom: 'none' }}><div className="yr">19 Jun 2026</div><div><h4>Gujarat First — News Channel</h4><p>Soft publication / on-air recognition</p></div></div>
                <div className="video-slot" style={{ marginTop: '16px' }}>
                  <button className="yt" data-yt="TWqw0dBhC78" aria-label="Play: Gujarat First coverage of ARNOBOT">
                    <img src={`${A}/video-gujarat-first.jpg`} alt="Gujarat First news coverage of ARNOBOT" />
                    <span className="play" />
                    <span className="yt-cap">Gujarat First — 19 Jun 2026</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" style={{ paddingBottom: 0, borderBottom: 'none' }}>
            <div className="eyebrow">08 — Contact</div>
            <h2 className="sec-title">Let&apos;s talk.</h2>

            <div className="contact-wrap">
              <div className="contact-card">
                <div className="role">Founder &amp; CEO — Company</div>
                <h3>Anmol Shah</h3>
                <a className="line" href="mailto:anmol@arnobot.in">anmol@arnobot.in</a>
                <a className="line" href="tel:+919925512860">+91 99255 12860</a>
                <a className="line" href="https://arnobot.in" target="_blank" rel="noopener">arnobot.in</a>
                <div className="addr">Arnobot Private Limited<br />G-2, Parul Apartments, Satellite Road<br />Ahmedabad – 380015, Gujarat, India</div>
              </div>
            </div>

            <div className="supported-by">
              <div className="lbl">Supported By</div>
              <div className="sb-pills">
                <span>i-Hub — Gujarat Government Enterprise</span>
                <span>KIIF — Karnavati Innovation &amp; Incubation Foundation</span>
                <span>AIC RRU Incubation Foundation</span>
                <span>GUSEC</span>
                <span>KPGU Vadodara</span>
                <span>SSIP Gujarat</span>
              </div>
            </div>

            <div className="foot-mark">
              <img src={`${A}/arnobot-wordmark.png`} alt="ARNOBOT™" />
              <span>Robotics Redefined · Made in India</span>
            </div>
            <div style={{ height: '36px' }} />
          </section>
          <div className="hazard-rule" />
          <div className="confidential">Strictly Private &amp; Confidential — Prepared for discussion purposes only</div>
        </main>
      </div>

      <PitchScripts />
    </>
  );
}

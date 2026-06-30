export default function Footer() {
  return (
    <footer id="footer">
      <div className="footer-main">
        <div className="footer-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/uploads/arnobot-logo-white-tm.png" alt="ARNOBOT™" />
          <p className="footer-brand-desc" style={{ color: 'rgb(255, 255, 255)', fontSize: 14 }}>
            Intelligent automation for defence, industrial inspection, and mission-critical environments. Made in India.
          </p>
        </div>
        <div className="footer-col">
          <div className="footer-col-head" style={{ fontSize: 14, color: 'rgb(217, 217, 217)', height: 30 }}>
            Products
          </div>
          <ul>
            <li><a href="#products">SAIBYA – UGV</a></li>
            <li><a href="#products">NEXUS – Tactical</a></li>
            <li><a href="#products">ALTIUS – Climbing</a></li>
            <li><a href="#products">ATM – Any Terrain Machine</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <div className="footer-col-head" style={{ fontSize: 14, color: 'rgb(211, 211, 211)' }}>
            Company
          </div>
          <ul>
            <li><a href="#company">About</a></li>
            <li><a href="#technology">Technology</a></li>
            <li><a href="#industries">Industries</a></li>
            <li><a href="#careers">Careers</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <div className="footer-col-head" style={{ fontSize: 14, color: 'rgb(211, 211, 211)' }}>
            Connect
          </div>
          <ul>
            <li><a href="#contact">Contact</a></li>
            <li><a href="https://www.linkedin.com/company/arnobot/" target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href="https://www.instagram.com/robots_arnobot/" target="_blank" rel="noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© 2026 ARNOBOT. All rights reserved.</span>
        <span className="footer-india">Made in India 🇮🇳</span>
      </div>
    </footer>
  );
}

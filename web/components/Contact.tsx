'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import { ArrowUpRight } from './icons';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="section-white">
      <div className="wrap">
        <div className="contact-split">
          <Reveal>
            <div className="eyebrow">Get in Touch</div>
            <h2 className="display-lg" style={{ marginBottom: 0 }}>
              Ready to deploy smarter robotics?
            </h2>
            <div className="contact-detail">
              G-2, Parul Apartments, Satellite Road,
              <br />
              Ahmedabad – 380015, India
              <br />
              <br />
              <a href="mailto:info.arnobot@gmail.com">info.arnobot@gmail.com</a>
              <br />
              <a href="tel:+919925512860">+91 99255 12860</a>
            </div>
            <div className="contact-socials">
              <a
                href="https://www.linkedin.com/company/arnobot/"
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                LinkedIn
                <ArrowUpRight />
              </a>
              <a
                href="https://www.instagram.com/robots_arnobot/"
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                Instagram
                <ArrowUpRight />
              </a>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <form className="form" onSubmit={onSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input className="form-field" type="text" placeholder="Rajesh" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input className="form-field" type="text" placeholder="Sharma" required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-field" type="email" placeholder="you@company.com" required />
              </div>
              <div className="form-group">
                <label className="form-label">Organisation</label>
                <input className="form-field" type="text" placeholder="BHEL / Indian Navy / etc." />
              </div>
              <div className="form-group">
                <label className="form-label">Inquiry</label>
                <select className="form-field" defaultValue="Schedule a Consultation">
                  <option>Schedule a Consultation</option>
                  <option>Request a Demo</option>
                  <option>Book Site Assessment</option>
                  <option>Partnership / Distribution</option>
                  <option>Defence Procurement</option>
                  <option>General Inquiry</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-field" placeholder="Tell us about your operational requirements…" required />
              </div>
              <div className={`form-ok${sent ? ' show' : ''}`}>Message sent — we&apos;ll be in touch shortly.</div>
              <button type="submit" className="btn-submit">
                Send Message →
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

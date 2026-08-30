'use client';

import { useCallback, useRef, useState } from 'react';
import { cn } from '@/lib/dom';
import { getIndustry } from '@/data/industries';
import { useDelegatedClick } from '@/hooks/useDelegatedClick';
import { useModalDismiss } from '@/hooks/useModalDismiss';
import type { Industry } from '@/types';

/**
 * Home-page industry detail modal — port of `#industry-modal` in index.php.
 *
 * main.js built the robot cards with innerHTML from a copy of the data; they are
 * now rendered by React from `@/data/industries`, so there is one source of
 * truth and no HTML string building.
 */
export default function IndustryModal() {
  const [industry, setIndustry] = useState<Industry | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIndustry(null), []);

  useDelegatedClick('.industry[data-industry]', (element) => {
    const next = getIndustry(element.dataset.industry);
    if (next) setIndustry(next);
  });

  // "Schedule a Demo" inside the modal hands over to the demo modal.
  useDelegatedClick('a[href*="/contact"]', close, { enabled: industry !== null });

  useModalDismiss(industry !== null, close, containerRef);

  return (
    <div
      id="industry-modal"
      className={cn('industry-modal', industry && 'active')}
      aria-hidden={industry === null}
      role="dialog"
      aria-modal={industry !== null}
      aria-labelledby="ind-modal-title"
    >
      <div className="industry-modal-overlay" onClick={close} />
      <div className="industry-modal-container" ref={containerRef}>
        <button type="button" className="industry-modal-close" aria-label="Close modal" onClick={close}>
          &times;
        </button>
        <div className="industry-modal-content">
          <div className="industry-modal-single">
            <span className="eyebrow" id="ind-modal-eyebrow">
              Robotics Solution
            </span>
            <h3 className="russo modal-ind-title" id="ind-modal-title">
              {industry?.title ?? 'Industry Name'}
            </h3>
            <p className="modal-ind-desc" id="ind-modal-desc">
              {industry?.desc ?? 'Details of industry challenge.'}
            </p>

            <div className="modal-robot-showcase">
              <h4 className="russo label-robots-used">Robots Deployed</h4>
              <div id="ind-modal-robots-container" className="modal-robots-container">
                {industry?.robots.map((robot) => (
                  <div className="modal-robot-card" key={robot.name}>
                    <div className="modal-robot-img-wrap">
                      <img src={robot.image} alt={`${robot.name} robot`} />
                    </div>
                    <div className="modal-robot-info">
                      <h5 className="russo">{robot.name}</h5>
                      <p>{robot.desc}</p>
                      <div className="modal-robot-specs">
                        {robot.specs.map((spec) => (
                          <span key={spec}>{spec}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

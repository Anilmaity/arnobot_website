import { HOME_INDUSTRY_CARDS } from '@/data/industries';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/Icons';

/**
 * "Industries We Serve" carousel.
 *
 * The markup stays server-rendered; sliding, the pagination dots and opening the
 * detail modal are wired up by `industrySlider` and `IndustryModal`.
 */
export default function IndustriesSection() {
  return (
    <section className="industries reveal" id="market">
      <div className="industries-head">
        <span className="eyebrow">Powering Progress Across</span>
        <h2 className="section-title">Industries We Serve</h2>
        <p>Robotics solutions built for mission-critical industries operating in hazardous and complex environments.</p>
      </div>

      <div className="industry-slider-wrapper">
        <button
          type="button"
          className="industry-slider-arrow prev"
          id="indSliderPrev"
          aria-label="Previous industries"
          aria-controls="indSliderTrack"
        >
          <ChevronLeftIcon size={20} />
        </button>

        <div className="industry-slider-track-container" id="indSliderTrackContainer">
          <div className="industry-grid industry-slider-track" id="indSliderTrack">
            {HOME_INDUSTRY_CARDS.map((card) => (
              <article
                className="industry"
                data-industry={card.id}
                style={{ cursor: 'pointer' }}
                key={card.id}
                role="button"
                tabIndex={0}
                aria-label={`${card.label} — view details`}
              >
                <div className="industry-img-wrap">
                  <img src={card.image} alt={card.alt} />
                </div>
                <div className="industry-info">
                  <span className="industry-title">{card.label}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="industry-slider-arrow next"
          id="indSliderNext"
          aria-label="Next industries"
          aria-controls="indSliderTrack"
        >
          <ChevronRightIcon size={20} />
        </button>
      </div>

      <div className="industry-slider-dots" id="indSliderDots" />
    </section>
  );
}

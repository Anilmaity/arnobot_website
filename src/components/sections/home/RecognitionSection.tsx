import { RECOGNITION } from '@/data/recognition';
import { cn } from '@/lib/dom';
import styles from './RecognitionSection.module.css';

/**
 * One pass of the roster. The marquee renders it twice and slides the track by
 * half its width, so the loop closes without a seam; the second copy is
 * `aria-hidden` because a screen reader should hear each distinction once.
 */
function RecognitionGroup({ duplicate }: { readonly duplicate?: boolean }) {
  return (
    <div
      className={cn(styles.group, duplicate && styles.duplicate)}
      aria-hidden={duplicate ? 'true' : undefined}
    >
      {RECOGNITION.map((item) => (
        <figure className={styles.item} key={item.id}>
          <div className={styles.tile}>
            {item.image ? (
              /* `draggable={false}` so a mouse drag pans the strip instead of
                 the browser picking the logo up as a dragged image. */
              <img
                className={styles.image}
                src={item.image}
                alt=""
                width={800}
                height={800}
                loading="lazy"
                draggable={false}
              />
            ) : (
              /* Until the badge artwork lands, the tile carries the awarding
                 body's monogram so the row still reads as a row of seals. */
              <span className={styles.seal}>{item.mark}</span>
            )}
          </div>
          <figcaption className={styles.heading}>{item.title}</figcaption>
        </figure>
      ))}
    </div>
  );
}

/**
 * "Rewards and Recognition" — the awards strip between the field shot and the
 * industries carousel.
 *
 * A continuous marquee rather than a static grid: the roster outgrows a row,
 * and a strip that keeps moving reads as a record still being added to. It
 * pauses on hover and on keyboard focus so a badge can actually be read, and
 * holds still entirely under reduced motion.
 */
export default function RecognitionSection() {
  return (
    <section className={cn(styles.band, 'reveal')} id="recognition" aria-labelledby="recognition-title">
      <div className={cn('section-head', 'is-centered', styles.head)}>
        <span className="eyebrow">Track Record</span>
        <h2 className="section-title" id="recognition-title">
          Rewards and Recognition
        </h2>
        <p className="section-lead">National and state recognition for engineering and innovation.</p>
      </div>

      {/* `data-marquee` is the handle the `marquees` behaviour grabs to turn
          the CSS marquee into a scroller you can drag; the speed is the pace
          the keyframes run at, so the hand-over is invisible. */}
      <div className={styles.marquee} data-marquee data-marquee-speed="75">
        {/* Four passes rather than two. The track slides by half its width, so
            that half has to be at least as wide as the viewport or a gap opens
            at the end of every cycle. Seven tiles make one pass ~1890px, short
            of a 1920px screen; four passes put 3780px in each half. */}
        <div className={styles.track}>
          {[0, 1, 2, 3].map((pass) => (
            <RecognitionGroup key={pass} duplicate={pass > 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

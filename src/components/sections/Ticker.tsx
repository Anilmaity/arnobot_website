import { Fragment } from 'react';

export interface TickerItem {
  readonly title: string;
  readonly text: string;
}

function TickerGroup({ items, duplicate }: { readonly items: readonly TickerItem[]; readonly duplicate?: boolean }) {
  return (
    <div className="press-ticker-group" aria-hidden={duplicate ? 'true' : undefined}>
      {items.map((item) => (
        <Fragment key={item.title}>
          <div className="ticker-item">
            <span className="ticker-dot" />
            <strong className="russo">{item.title}</strong>
            <span>{item.text}</span>
          </div>
          <div className="ticker-separator">✦</div>
        </Fragment>
      ))}
    </div>
  );
}

/**
 * The scrolling dispatch strip shared by press-release.php and media-kit.php.
 * The group is rendered twice so the CSS marquee loops seamlessly.
 */
export default function Ticker({ items, label }: { readonly items: readonly TickerItem[]; readonly label: string }) {
  return (
    <section className="press-ticker-strip" aria-label={label}>
      <div className="press-ticker-track">
        <TickerGroup items={items} />
        <TickerGroup items={items} duplicate />
      </div>
    </section>
  );
}

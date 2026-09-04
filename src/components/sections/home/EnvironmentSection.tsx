export default function EnvironmentSection() {
  return (
    <section className="environment reveal">
      {/* The band is 2.82:1 and `.environment::after` washes out the left three
          quarters, so the picture carries its weight on the right: the drive
          wheel, the chassis and the hands on it. */}
      <img
        className="environment-bg"
        src="/assets/images/environment-band.webp"
        alt="An engineer fitting a drive wheel to an ARNOBOT chassis"
      />
      <div className="environment-content">
        <h2 className="russo">
          Built for environments
          <br />
          humans can&apos;t enter.
        </h2>
      </div>
    </section>
  );
}

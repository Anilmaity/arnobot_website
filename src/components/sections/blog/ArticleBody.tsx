import type { BlogArticleId } from '@/types';
import { ImageGrid, PullQuote, SectionHeading, SpecHighlight } from './ArticleBlocks';

/**
 * The three hand-written article bodies from blog-details.php, which switched on
 * `$blog_id` with an if / elseif / else.
 */

function TacticalUgvArticle() {
  return (
    <>
      <p className="lead-text">
        Modern tactical operations require immediate situational awareness in hostile, obstructed, or contaminated zones
        where deploying human personnel creates unacceptable life risk. ARNOBOT’s autonomous Unmanned Ground Vehicles
        (UGVs) bridge this critical gap through ultra-rugged mobility, resilient communications, and intelligent payload
        integration.
      </p>

      <SectionHeading index={1}>1. Operational Challenges in Non-Permissive Terrains</SectionHeading>
      <p>
        In defense reconnaissance and counter-insurgency operations, teams frequently encounter extreme topography—from
        blast-damaged urban corridors to steep mud inclines and unpaved mountain pathways. Conventional wheeled vehicles
        face high rates of immobilization, while aerial drones suffer from flight duration limitations (typically 25–40
        minutes) and vulnerability to adverse wind conditions or radar detection.
      </p>
      <p>
        Unmanned Ground Vehicles solve both constraints by delivering extended operational endurance (up to 12 hours)
        while maintaining a low thermal and acoustic signature close to the ground. Equipped with sealed drivetrains and
        low centers of gravity, these rovers traverse high obstacles, stairs, and loose sand without risking rollover.
      </p>

      <ImageGrid
        columns={2}
        items={[
          { src: '/assets/images/saibya1.jpg', alt: 'SAIBYA tactical chassis with sensor mast' },
          { src: '/assets/images/saibya4.jpg', alt: 'High-torque hub powertrain and skid-steering' },
        ]}
      />

      <SectionHeading index={2}>2. Encrypted Multi-Link Mesh Telemetry</SectionHeading>
      <p>
        Traditional line-of-sight radio frequency (LOS RF) links degrade rapidly when operating inside reinforced
        concrete compounds, subterranean basements, or dense forest canopies. ARNOBOT integrates an encrypted
        multi-carrier mesh radio network featuring dynamic frequency hopping.
      </p>
      <p>
        This allows single or swarmed UGV units to act as self-healing relay nodes. If Vehicle A travels beyond direct
        line-of-sight behind a blast wall, Vehicle B automatically routes encrypted video and control signals back to the
        mission commander&apos;s Ground Control Station (GCS) with latency below 45 milliseconds.
      </p>

      <PullQuote author="— ARNOBOT Tactical Systems Architecture Division">
        &quot;In asymmetric theater environments, real-time intelligence without exposing frontline scouts is the
        defining difference between mission success and casualties. Autonomous ground robotics make zero-casualty
        reconnaissance an operational reality.&quot;
      </PullQuote>

      <SectionHeading index={3}>3. Multi-Sensor Surveillance &amp; AI Target Categorization</SectionHeading>
      <p>
        Onboard thermal imaging (LWIR 640x512), 30x optical zoom cameras, and directional acoustic microphones feed
        directly into an edge-accelerated neural compute module (NVIDIA Jetson Orin Industrial).
      </p>

      <div className="blog-spec-highlight-grid">
        <SpecHighlight
          title="Real-Time Target Tagging"
          icon={
            <>
              <circle cx="12" cy="12" r="10" />
              <line x1="22" y1="12" x2="18" y2="12" />
              <line x1="6" y1="12" x2="2" y2="12" />
              <line x1="12" y1="6" x2="12" y2="2" />
              <line x1="12" y1="22" x2="12" y2="18" />
            </>
          }
        >
          Edge AI identifies and tracks human silhouettes, vehicles, and thermal hotspots at ranges exceeding 800 meters.
        </SpecHighlight>

        <SpecHighlight
          title="AES-256 Encrypted Telemetry"
          icon={
            <>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </>
          }
        >
          Anti-jamming spread spectrum hardware safeguards command links against hostile electronic countermeasures.
        </SpecHighlight>
      </div>

      <SectionHeading index={4}>4. Precision Prototyping, Assembly &amp; Field Telemetry</SectionHeading>
      <p>
        Every ARNOBOT chassis undergoes rigorous stress simulation, environmental waterproofing tests, and extensive
        bench assembly in our Ahmedabad R&amp;D engineering facility before field deployment.
      </p>

      <ImageGrid
        columns={3}
        items={[
          { src: '/assets/images/designassmbly1.jpg', alt: 'ARNOBOT mechanical assembly and testing facility' },
          { src: '/assets/images/electronic-lab.png', alt: 'ARNOBOT avionics and electronics testing' },
          { src: '/assets/images/gcs_interface.png', alt: 'Tactical Ground Control Station UI' },
        ]}
      />

      <SectionHeading index={5}>5. Summary &amp; Future Outlook</SectionHeading>
      <p>
        As autonomy software continues to mature, multi-agent UGV swarms will handle perimeter patrol, CBRN
        contamination detection, and logistics supply lines completely autonomously. ARNOBOT’s modular architecture
        ensures that defence forces and industrial security operators remain equipped with the most resilient,
        field-proven robotic systems.
      </p>
    </>
  );
}

function ClimbingCrawlerArticle() {
  return (
    <>
      <p className="lead-text">
        Confined space entry into vertical storage tanks, petrochemical distillation columns, and offshore flare stacks
        has historically caused tragic maintenance fatalities and millions of dollars in extended downtime. ARNOBOT’s
        ALTIUS magnetic climbing robots replace human entry with automated, millimeter-precise non-destructive testing
        (NDT).
      </p>

      <SectionHeading index={1}>1. The Crisis of Manual Confined-Space Inspections</SectionHeading>
      <p>
        Under global API 653 and ASME standards, industrial storage tanks and high-pressure metallic vessels must undergo
        regular internal structural audits to detect wall thinning, pitting corrosion, and weld seam degradation.
        Traditionally, this required building complex scaffolding inside dark, toxic, and oxygen-depleted containers.
      </p>
      <p>
        Human inspectors suspended from harnesses face toxic gas accumulation, heat exhaustion, and fatal fall risks.
        Furthermore, scaffolding erection and dismantling routinely extend plant shutdowns to 3–4 weeks, costing
        refineries hundreds of thousands of dollars per day in lost output.
      </p>

      <ImageGrid
        columns={2}
        items={[
          { src: '/assets/images/industry-asset.png', alt: 'ALTIUS robot on a storage tank wall' },
          { src: '/assets/images/industry-industrial.png', alt: 'Petrochemical refinery deployment' },
        ]}
      />

      <SectionHeading index={2}>2. Neodymium Magnetic Adhesion &amp; Inverted Crawling</SectionHeading>
      <p>
        ARNOBOT engineers engineered a proprietary rare-earth neodymium magnetic track system. By alternating magnetic
        polarity across high-friction elastomeric tread links, ALTIUS generates over 350 kgf of continuous magnetic
        adhesion force.
      </p>
      <p>
        This enables the robot to crawl vertically, transition seamlessly across sharp weld seams, and operate completely
        upside-down on tank ceiling domes without slipping—even when surfaces are coated in oil films, moisture, or heavy
        rust scale.
      </p>

      <PullQuote author="— ARNOBOT Industrial Robotics Division">
        &quot;Eliminating human entry from hazardous industrial tanks isn’t merely an operational efficiency metric—it is
        an uncompromising workplace safety imperative. ALTIUS delivers superior audit precision in 48 hours without
        putting a single life in danger.&quot;
      </PullQuote>

      <SectionHeading index={3}>3. Ultrasonic Non-Destructive Testing (NDT) Payloads</SectionHeading>
      <p>
        Equipped with dry-coupled ultrasonic thickness probes and high-definition macro optical lenses, the crawler
        samples steel wall thickness at up to 100 data points per second.
      </p>

      <div className="blog-spec-highlight-grid">
        <SpecHighlight
          title="Automated API 653 Audit Reports"
          icon={
            <>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </>
          }
        >
          Instant digital corrosion maps with spatial coordinates for compliance certification.
        </SpecHighlight>

        <SpecHighlight
          title={<>Continuous B-Scan &amp; C-Scan Mapping</>}
          icon={<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />}
        >
          Sub-millimeter depth accuracy detecting laminations, inclusions, and hydrogen blistering.
        </SpecHighlight>
      </div>

      <SectionHeading index={4}>4. Mechanical R&amp;D, High-Temperature Testing &amp; Controls</SectionHeading>
      <p>
        In our specialized hardware testing facility, ALTIUS track assemblies are subjected to high-temperature adhesion
        simulations, chemical resistance trials, and continuous endurance runs.
      </p>

      <ImageGrid
        columns={3}
        items={[
          { src: '/assets/images/facility-design.png', alt: 'Robotic track CAD design' },
          { src: '/assets/images/lab1.jpg', alt: 'Surface adhesion testing rig' },
          { src: '/assets/images/atm-wheel-1.png', alt: 'Heavy-duty adhesion module' },
        ]}
      />

      <SectionHeading index={5}>5. Conclusion</SectionHeading>
      <p>
        Magnetic climbing crawlers represent a paradigm shift in heavy industrial asset maintenance. By slashing
        turnaround times from weeks to hours and completely safeguarding human inspectors, ARNOBOT ALTIUS sets a new
        benchmark in industrial safety and operational excellence.
      </p>
    </>
  );
}

function LidarSlamArticle() {
  return (
    <>
      <p className="lead-text">
        While satellite navigation enables outdoor vehicle routing, critical industrial applications—such as subterranean
        mining shafts, dense metal manufacturing floors, and indoor warehouses—suffer from complete satellite signal
        blockage. ARNOBOT’s multi-sensor LiDAR SLAM engine provides sub-centimeter autonomous localization without GPS.
      </p>

      <SectionHeading index={1}>1. The Challenge of GPS-Denied Autonomy</SectionHeading>
      <p>
        GPS signals operate at low power levels that cannot penetrate concrete roofs or heavy metallic framework.
        Furthermore, multipath reflection causes massive positioning errors (often exceeding 20 meters), making standard
        GPS useless for precision robotic maneuvering in indoor corridors.
      </p>
      <p>
        To operate autonomously in complex industrial plants, an unmanned ground platform must build its own spatial map
        in real time while simultaneously tracking its exact position within that map—a computational challenge known as
        Simultaneous Localization and Mapping (SLAM).
      </p>

      <ImageGrid
        columns={2}
        items={[
          { src: '/assets/images/sofetware.jpg', alt: 'Autonomous perception code and sensor fusion' },
          { src: '/assets/images/saibya7.jpg', alt: 'Underground and subterranean autonomous loop' },
        ]}
      />

      <SectionHeading index={2}>2. 3D LiDAR &amp; Visual-Inertial Sensor Fusion</SectionHeading>
      <p>
        ARNOBOT’s autonomy engine uses an Extended Kalman Filter (EKF) and graph-based optimization to combine data from
        four distinct sensor modalities:
      </p>
      <ul style={{ margin: '0 0 20px 24px', color: '#334155', lineHeight: 1.7 }}>
        <li>
          <strong>32-Beam High-Density 3D LiDAR:</strong> Emits over 600,000 laser pulses per second to generate
          geometric point clouds.
        </li>
        <li>
          <strong>Stereo Visual Odometry:</strong> Dual global-shutter cameras track visual features across successive
          image frames.
        </li>
        <li>
          <strong>Tactical-Grade 9-Axis IMU:</strong> Measures angular rates and accelerations at 400 Hz to bridge
          high-frequency movement gaps.
        </li>
        <li>
          <strong>Wheel Encoders:</strong> Provide direct wheel rotational odometry for low-speed verification.
        </li>
      </ul>

      <PullQuote author="— ARNOBOT Autonomous Software Division">
        &quot;True autonomy cannot depend on external infrastructure. By fusing multi-modal 3D perception directly on
        embedded edge silicon, ARNOBOT rovers navigate any dark tunnel or factory floor with uncompromising
        precision.&quot;
      </PullQuote>

      <SectionHeading index={3}>3. Dynamic Obstacle Avoidance &amp; Local Costmaps</SectionHeading>
      <p>
        Static maps alone are insufficient in active industrial environments where forklifts, personnel, and cargo
        palettes constantly move. Onboard neural networks run real-time semantic segmentation on raw point clouds in
        under 20 ms.
      </p>

      <div className="blog-spec-highlight-grid">
        <SpecHighlight
          title="20 ms Path Recalculation"
          icon={<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />}
        >
          Dynamic costmaps automatically reroute rovers around moving workers and temporary obstacles.
        </SpecHighlight>

        <SpecHighlight
          title="Automated Return-to-Base (RTB)"
          icon={<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />}
        >
          In case of telemetry disconnection, the rover autonomously retraces its steps back to base station.
        </SpecHighlight>
      </div>

      <SectionHeading index={4}>4. Software Engineering &amp; Embedded Hardware Infrastructure</SectionHeading>
      <p>
        Our software division develops and stress-tests all autonomy algorithms across customized hardware stacks in our
        state-of-the-art electronics laboratory.
      </p>

      <ImageGrid
        columns={3}
        items={[
          { src: '/assets/images/facility-software.png', alt: 'ARNOBOT software lab' },
          { src: '/assets/images/facility-electronics.png', alt: 'Avionics and motherboard lab' },
          { src: '/assets/images/rover-full.png', alt: 'Fully outfitted autonomous ground platform' },
        ]}
      />

      <SectionHeading index={5}>5. Summary &amp; Industrial Integration</SectionHeading>
      <p>
        By eliminating reliance on external satellite networks and beacons, ARNOBOT’s 3D LiDAR SLAM technology delivers
        unmatched autonomy across military tunnels, mining operations, logistics warehouses, and nuclear power plants.
      </p>
    </>
  );
}

const ARTICLE_BODIES: Readonly<Record<BlogArticleId, () => React.JSX.Element>> = {
  1: TacticalUgvArticle,
  2: ClimbingCrawlerArticle,
  3: LidarSlamArticle,
};

export default function ArticleBody({ id }: { readonly id: BlogArticleId }) {
  const Body = ARTICLE_BODIES[id];
  return <Body />;
}

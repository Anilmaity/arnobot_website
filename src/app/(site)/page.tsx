import HeroSection from '@/components/sections/home/HeroSection';
import AboutSection from '@/components/sections/home/AboutSection';
import ProductsSection from '@/components/sections/home/ProductsSection';
import EnvironmentSection from '@/components/sections/home/EnvironmentSection';
import IndustriesSection from '@/components/sections/home/IndustriesSection';
import ExcellenceSection from '@/components/sections/home/ExcellenceSection';
import Cta from '@/components/sections/Cta';

/** Port of index.php */
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />

      <ProductsSection />

      {/* Excellence sits above the field shot and the two fill one screen: the
          strip takes what it needs, the image takes the rest. */}
      <div className="field-band">
        <ExcellenceSection />
        <EnvironmentSection />
      </div>
      <IndustriesSection />
      <Cta />
    </main>
  );
}

import { NavBar, Footer } from '../components/layout';
import { HeroSection } from '../components/sections/HeroSection';
import { PromotionSection } from '../components/sections/PromotionSection';
import { FeaturedProductsCarousel } from '../components/sections/FeaturedProductsCarousel';
import { CategoriesSection } from '../components/sections/CategoriesSection';
import { CertificationsSection } from '../components/sections/CertificationsSection';
import { ReviewsSection } from '../components/sections/ReviewsSection';
import { FAQSection } from '../components/sections/FAQSection';
import { ContactSection } from '../components/sections/ContactSection';
import { Theme } from '@radix-ui/themes';


export default function LandingPage() {
  return (
    <Theme accentColor="purple" style={{
      background: 'linear-gradient(135deg, #E1D7F3 0%, #F9F9F9 100%)',

    }}>
      <NavBar />
      <HeroSection />
      <div className="section-separator">
        <PromotionSection />
      </div>
      <div className="section-separator-ornament">
        <FeaturedProductsCarousel />
      </div>
      <div className="section-separator">
        <CategoriesSection />
      </div>
      <div className="section-separator-ornament">
        <ReviewsSection />
      </div>
      <div className="section-separator">
        <CertificationsSection />
      </div>
      <div className="section-separator-ornament">
        <FAQSection />
      </div>
      <div className="section-separator">
        <ContactSection />
      </div>
      <Footer />
    </Theme>
  );
}

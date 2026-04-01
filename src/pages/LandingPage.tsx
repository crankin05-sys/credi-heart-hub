import LandingNav from '@/components/landing/LandingNav';
import HeroSection from '@/components/landing/HeroSection';
import TrustBar from '@/components/landing/TrustBar';
import ProblemSection from '@/components/landing/ProblemSection';
import AgentsSection from '@/components/landing/AgentsSection';
import HowItWorks from '@/components/landing/HowItWorks';
import WhoSection from '@/components/landing/WhoSection';
import StatsSection from '@/components/landing/StatsSection';
import RevenueSection from '@/components/landing/RevenueSection';
import CTASection from '@/components/landing/CTASection';
import FAQSection from '@/components/landing/FAQSection';
import LandingFooter from '@/components/landing/LandingFooter';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <LandingNav />
      <HeroSection />
      <TrustBar />
      <ProblemSection />
      <AgentsSection />
      <HowItWorks />
      <WhoSection />
      <StatsSection />
      <RevenueSection />
      <CTASection />
      <FAQSection />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;

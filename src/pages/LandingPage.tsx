import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingNav from '@/components/landing/LandingNav';
import HeroSection from '@/components/landing/HeroSection';
import TrustBar from '@/components/landing/TrustBar';
import BenefitsSection from '@/components/landing/BenefitsSection';
import DashboardPreview from '@/components/landing/DashboardPreview';
import HowItWorks from '@/components/landing/HowItWorks';
import SupportLayers from '@/components/landing/SupportLayers';
import TrustSection from '@/components/landing/TrustSection';
import CTASection from '@/components/landing/CTASection';
import FAQSection from '@/components/landing/FAQSection';
import LandingFooter from '@/components/landing/LandingFooter';
import TechChatWidget from '@/components/TechChatWidget';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleProductClick = (productId: string) => {
    // Store which product they're interested in, then send to intake
    sessionStorage.setItem('selectedProduct', productId);
    navigate('/get-started');
  };

  return (
    <div className="min-h-screen">
      <LandingNav onProductClick={handleProductClick} />
      <HeroSection />
      <TrustBar />
      <BenefitsSection />
      <DashboardPreview />
      <HowItWorks />
      <SupportLayers />
      <TrustSection />
      <CTASection />
      <FAQSection />
      <LandingFooter />
      <TechChatWidget />
    </div>
  );
};

export default LandingPage;

import { useNavigate } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';
import { ArrowRight, Phone } from 'lucide-react';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section id="cta" className="px-5 md:px-10 py-16 md:py-24 relative overflow-hidden">
      <ScrollReveal>
        <div className="relative z-10 max-w-2xl mx-auto bg-gradient-to-br from-primary to-[hsl(260,70%,55%)] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-4">
            Ready to Know Your<br />Fundability Score?
          </h2>
          <p className="text-sm md:text-base text-white/80 max-w-md mx-auto mb-8 leading-relaxed">
            Get your free fundability score and personalized insights. It takes less than 3 minutes.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => navigate('/get-started')}
              className="group bg-white text-primary text-sm font-bold px-6 py-3 border-none cursor-pointer rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              Get My Fundability Score
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button className="bg-white/15 text-white border border-white/25 text-sm font-semibold px-6 py-3 cursor-pointer rounded-xl transition-all hover:bg-white/25 inline-flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Schedule a Call
            </button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default CTASection;

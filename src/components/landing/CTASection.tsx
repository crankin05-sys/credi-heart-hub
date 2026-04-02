import { useNavigate } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';
import ParticleField from '@/components/ParticleField';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section id="cta" className="px-6 md:px-10 py-32 relative overflow-hidden">
      {/* Particle background */}
      <ParticleField />
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,hsl(var(--gold)/0.1)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />

      <ScrollReveal>
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="text-[10px] font-bold tracking-[4px] text-primary uppercase mb-4 font-mono">Get Started</div>
          <h2 className="font-display text-[clamp(36px,4.5vw,58px)] font-extrabold text-foreground leading-[1.08] mb-5 tracking-tight">
            Ready to Scale Your<br />Capital <span className="text-gradient-gold">Impact?</span>
          </h2>
          <p className="text-[15px] text-foreground/45 max-w-[480px] mx-auto mb-10 leading-[1.8]">
            Request a personalized demo to see the full platform and discuss how Credibility Suite AI fits your organization.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate('/auth')}
              className="group relative bg-gradient-to-r from-primary to-gold-lt text-primary-foreground font-body text-xs font-bold px-10 py-4 border-none cursor-pointer tracking-[1.5px] uppercase rounded-lg transition-all duration-300 hover:shadow-[0_12px_40px_hsl(var(--gold)/0.3)] hover:-translate-y-1 inline-flex items-center gap-2.5 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-gold-lt to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative">Request a Demo</span>
              <span className="relative text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
            <button className="bg-foreground/[0.04] text-foreground/70 border border-foreground/10 font-body text-xs font-semibold px-8 py-4 cursor-pointer rounded-lg transition-all duration-300 hover:border-primary/40 hover:text-primary">
              Schedule a Call
            </button>
          </div>
          <p className="text-[11px] text-foreground/20 mt-8 font-mono tracking-wide">Powered by She Wins With AI · AgentFlow Enterprise Platform</p>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default CTASection;

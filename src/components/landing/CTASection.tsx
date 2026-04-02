import { useNavigate } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';
import ParticleField from '@/components/ParticleField';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section id="cta" className="px-6 md:px-10 py-32 relative overflow-hidden">
      <ParticleField />
      
      {/* Multi-layer glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,hsl(var(--gold)/0.12)_0%,transparent_50%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,hsl(var(--info)/0.06)_0%,transparent_60%)] animate-[neon-pulse_5s_ease-in-out_infinite]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />

      <ScrollReveal>
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 glass rounded-full text-primary text-[10px] font-bold px-4 py-2 tracking-[3px] uppercase mb-5 font-mono animate-breathe">
            <span className="w-1.5 h-1.5 bg-success rounded-full animate-glow" />
            Get Started
          </div>
          <h2 className="font-display text-[clamp(36px,4.5vw,58px)] font-extrabold text-foreground leading-[1.08] mb-5 tracking-tight">
            Ready to Scale Your<br />Capital <span className="text-gradient-gold">Impact?</span>
          </h2>
          <p className="text-[15px] text-foreground/45 max-w-[480px] mx-auto mb-10 leading-[1.8]">
            Request a personalized demo to see the full platform and discover how Credibility Suite AI can transform your pipeline.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate('/get-started')}
              className="group relative bg-gradient-to-r from-primary to-gold-lt text-primary-foreground font-body text-sm font-bold px-12 py-5 border-none cursor-pointer tracking-[1.5px] uppercase rounded-xl transition-all duration-300 hover:shadow-[0_16px_60px_hsl(var(--gold)/0.35)] hover:-translate-y-1.5 inline-flex items-center gap-3 overflow-hidden btn-aurora"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-gold-lt to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative">Get Started Free</span>
              <span className="relative text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
            <button className="bg-foreground/[0.04] text-foreground/70 border border-foreground/10 font-body text-sm font-semibold px-10 py-5 cursor-pointer rounded-xl transition-all duration-300 hover:border-primary/40 hover:text-primary hover:bg-primary/[0.05]">
              Schedule a Call
            </button>
          </div>
          <p className="text-[11px] text-foreground/20 mt-10 font-mono tracking-wide">Powered by She Wins With AI · AgentFlow Enterprise Platform</p>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default CTASection;

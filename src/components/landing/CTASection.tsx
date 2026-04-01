import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section id="cta" className="bg-gradient-to-br from-card to-navy-3 border-y border-border px-6 md:px-[60px] py-20 text-center relative overflow-hidden">
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,hsl(var(--gold)/0.08)_0%,transparent_65%)]" />
      <div className="relative z-10">
        <div className="text-[10px] font-bold tracking-[3.5px] text-primary uppercase mb-3 font-mono">Get Started</div>
        <h2 className="font-display text-[clamp(36px,4vw,54px)] font-extrabold text-foreground leading-[1.1] mb-4 tracking-tight">
          Ready to Scale Your<br />Capital <em className="italic text-primary">Impact?</em>
        </h2>
        <p className="text-base text-foreground/50 max-w-[500px] mx-auto mb-9 leading-[1.75]">
          Request a personalized demo to see the full platform and discuss how Credibility Suite AI fits your organization.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-br from-primary to-gold-lt text-primary-foreground font-body text-xs font-extrabold px-9 py-4 border-none cursor-pointer tracking-[2px] uppercase rounded-sm transition-all hover:brightness-110 hover:-translate-y-0.5 shadow-[0_6px_24px_hsl(var(--gold)/0.2)] inline-flex items-center gap-2"
          >
            Request a Demo →
          </button>
          <button className="bg-transparent text-foreground/70 border border-foreground/20 font-body text-xs font-semibold px-7 py-4 cursor-pointer rounded-sm transition-all hover:border-primary hover:text-primary">
            Schedule a Call
          </button>
        </div>
        <p className="text-xs text-foreground/30 mt-6">Powered by She Wins With AI · AgentFlow Enterprise Platform</p>
      </div>
    </section>
  );
};

export default CTASection;

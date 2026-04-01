import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center px-6 md:px-[60px] pt-24 pb-20 relative overflow-hidden bg-gradient-to-br from-background via-card to-[hsl(216_50%_14%)]">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-br from-transparent via-primary/[0.03] to-primary/[0.06] clip-path-[polygon(15%_0%,100%_0%,100%_100%,0%_100%)] hidden md:block" />
      <div className="absolute -top-[200px] -right-[200px] w-[700px] h-[700px] border border-primary/[0.08] rounded-full">
        <div className="absolute inset-20 border border-primary/[0.06] rounded-full" />
        <div className="absolute inset-40 border border-primary/[0.04] rounded-full" />
      </div>

      <div className="max-w-[700px] relative z-10">
        <div className="inline-flex items-center gap-2.5 bg-primary/10 border border-primary/25 text-primary text-[11px] font-bold px-4 py-2 tracking-[2.5px] uppercase mb-7 font-mono rounded-sm">
          <span className="w-[7px] h-[7px] bg-success rounded-full shadow-[0_0_8px_hsl(var(--success))] animate-glow" />
          AI Business Intelligence Platform
        </div>

        <h1 className="font-display text-[clamp(42px,5.5vw,76px)] font-extrabold leading-[1.05] tracking-tight mb-6 text-foreground">
          Turn Any Business<br />Into a <em className="italic text-primary">Fundable</em><br />Business.
        </h1>

        <p className="text-[17px] text-foreground/65 leading-[1.8] max-w-[560px] mb-10">
          Maurice Stewart's Credibility Suite AI automates the entire path from unfundable to funded — <strong className="text-foreground">assessment, coaching, capital matching, and ongoing guidance.</strong> All powered by 6 specialized AI agents working 24/7.
        </p>

        <div className="flex gap-4 flex-wrap mb-14">
          <button
            onClick={() => navigate('/auth')}
            className="bg-gradient-to-br from-primary to-gold-lt text-primary-foreground font-body text-xs font-extrabold px-9 py-4 border-none cursor-pointer tracking-[2px] uppercase rounded-sm transition-all hover:brightness-110 hover:-translate-y-0.5 shadow-[0_6px_24px_hsl(var(--gold)/0.2)] inline-flex items-center gap-2"
          >
            Request a Demo →
          </button>
          <button
            onClick={() => document.getElementById('agents')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-transparent text-foreground/70 border border-foreground/20 font-body text-xs font-semibold px-7 py-4 cursor-pointer rounded-sm transition-all hover:border-primary hover:text-primary tracking-wide"
          >
            Meet the AI Agents
          </button>
        </div>

        <div className="grid grid-cols-3 border border-border max-w-[540px]">
          {[
            { n: '6', l: 'AI Agents' },
            { n: '24/7', l: 'Always On' },
            { n: '∞', l: 'Scalable' },
          ].map((s, i) => (
            <div key={i} className={`px-6 py-5 text-center ${i < 2 ? 'border-r border-border' : ''}`}>
              <div className="font-display text-[34px] font-bold text-primary leading-none">{s.n}</div>
              <div className="text-[10px] text-foreground/40 uppercase tracking-[1.5px] mt-1 font-mono">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

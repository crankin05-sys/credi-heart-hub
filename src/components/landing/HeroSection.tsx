import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center px-6 md:px-10 pt-28 pb-24 relative overflow-hidden noise-overlay">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[hsl(218_55%_12%)]" />
      <div className="absolute top-[-40%] right-[-20%] w-[800px] h-[800px] bg-[radial-gradient(circle,hsl(var(--gold)/0.06)_0%,transparent_70%)] animate-float" />
      <div className="absolute bottom-[-30%] left-[-15%] w-[600px] h-[600px] bg-[radial-gradient(circle,hsl(var(--info)/0.04)_0%,transparent_70%)]" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Decorative rings */}
      <div className="absolute -top-[150px] -right-[150px] w-[600px] h-[600px] hidden md:block">
        <div className="absolute inset-0 border border-primary/[0.06] rounded-full animate-[spin_60s_linear_infinite]" />
        <div className="absolute inset-16 border border-primary/[0.04] rounded-full animate-[spin_45s_linear_infinite_reverse]" />
        <div className="absolute inset-32 border border-primary/[0.03] rounded-full animate-[spin_30s_linear_infinite]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="max-w-[680px]">
          <div className="inline-flex items-center gap-2.5 glass rounded-full text-primary text-[11px] font-bold px-5 py-2.5 tracking-[2px] uppercase mb-8 font-mono animate-fade-up">
            <span className="w-2 h-2 bg-success rounded-full shadow-[0_0_10px_hsl(var(--success))] animate-glow" />
            AI-Powered Business Intelligence
          </div>

          <h1 className="font-display text-[clamp(44px,5.5vw,78px)] font-extrabold leading-[1.03] tracking-tight mb-7 text-foreground animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Turn Any Business<br />Into a <em className="italic text-gradient-gold not-italic">Fundable</em><br />Business.
          </h1>

          <p className="text-[17px] text-foreground/55 leading-[1.85] max-w-[540px] mb-11 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Credibility Suite AI automates the entire path from unfundable to funded — <span className="text-foreground/80 font-medium">assessment, coaching, capital matching, and ongoing guidance.</span> Powered by 6 specialized AI agents working 24/7.
          </p>

          <div className="flex gap-4 flex-wrap mb-16 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-primary to-gold-lt text-primary-foreground font-body text-xs font-bold px-9 py-4 border-none cursor-pointer tracking-[1.5px] uppercase rounded-lg transition-all duration-300 hover:shadow-[0_12px_40px_hsl(var(--gold)/0.3)] hover:-translate-y-1 inline-flex items-center gap-2.5"
            >
              Request a Demo
              <span className="text-sm">→</span>
            </button>
            <button
              onClick={() => document.getElementById('agents')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-foreground/[0.04] text-foreground/70 border border-foreground/10 font-body text-xs font-semibold px-7 py-4 cursor-pointer rounded-lg transition-all duration-300 hover:border-primary/40 hover:text-primary hover:bg-primary/[0.05] tracking-wide"
            >
              Meet the AI Agents
            </button>
          </div>

          <div className="grid grid-cols-3 glass rounded-xl max-w-[520px] overflow-hidden animate-fade-up" style={{ animationDelay: '0.4s' }}>
            {[
              { n: '6', l: 'AI Agents' },
              { n: '24/7', l: 'Always On' },
              { n: '∞', l: 'Scalable' },
            ].map((s, i) => (
              <div key={i} className={`px-6 py-6 text-center ${i < 2 ? 'border-r border-foreground/[0.06]' : ''}`}>
                <div className="font-display text-[36px] font-bold text-gradient-gold leading-none">{s.n}</div>
                <div className="text-[10px] text-foreground/35 uppercase tracking-[1.5px] mt-1.5 font-mono">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

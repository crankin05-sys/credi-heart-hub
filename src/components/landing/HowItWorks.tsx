import ScrollReveal from '@/components/ScrollReveal';

const steps = [
  { n: '1', title: 'Business Intake', desc: 'Enter website or answer 20 questions. AI generates complete Business Model Canvas and Fundability Score.', icon: '🔍', glow: 'hsl(var(--primary) / 0.15)' },
  { n: '2', title: 'Agents Assess', desc: 'All 6 agents analyze the business simultaneously — financial health, fundability, documentation, growth.', icon: '🤖', glow: 'hsl(var(--info) / 0.12)' },
  { n: '3', title: 'Capital Matched', desc: 'The right funding sources are identified and the business is routed to the appropriate lender.', icon: '🎯', glow: 'hsl(var(--success) / 0.12)' },
  { n: '4', title: 'Business Funded', desc: "Weekly action plans keep the business moving. Score updates in real time. When ready — funded.", icon: '🏆', glow: 'hsl(var(--gold-lt) / 0.15)' },
];

const HowItWorks = () => (
  <section className="px-6 md:px-10 py-28 relative overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(218_55%_11%)] to-background" />
    
    <div className="max-w-7xl mx-auto relative z-10">
      <ScrollReveal>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full text-primary text-[10px] font-bold px-4 py-2 tracking-[3px] uppercase mb-5 font-mono">
            <span className="w-1.5 h-1.5 bg-info rounded-full" />
            How It Works
          </div>
          <h2 className="font-display text-[clamp(32px,3.5vw,50px)] font-extrabold text-foreground leading-[1.08] mb-5 tracking-tight">
            From Intake to Funded.<br /><span className="text-gradient-gold">Fully Automated.</span>
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
        {/* Connecting line with animated glow */}
        <div className="absolute top-16 left-[12%] right-[12%] h-px hidden md:block overflow-hidden">
          <div className="h-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute inset-0 h-full bg-gradient-to-r from-transparent via-primary to-transparent animate-[shimmer-line_3s_linear_infinite] opacity-40" style={{ backgroundSize: '200% 100%' }} />
        </div>

        {steps.map((s, i) => (
          <ScrollReveal key={s.n} delay={i * 0.12}>
            <div className="text-center group">
              <div
                className="w-[90px] h-[90px] neon-card rounded-2xl flex items-center justify-center mx-auto mb-5 text-3xl transition-all duration-500 group-hover:shadow-[0_0_50px_var(--step-glow)] group-hover:scale-110 group-hover:border-primary/40 relative"
                style={{ '--step-glow': s.glow } as React.CSSProperties}
              >
                <span className="group-hover:scale-110 transition-transform duration-300 relative z-10">{s.icon}</span>
                {/* Pulse ring */}
                <div className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/20 group-hover:scale-[1.3] transition-all duration-700 opacity-0 group-hover:opacity-100" />
              </div>
              <div className="font-mono text-[10px] text-primary/60 tracking-[2px] mb-2 font-bold">STEP {s.n}</div>
              <div className="text-sm font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{s.title}</div>
              <div className="text-xs text-foreground/40 leading-[1.7] max-w-[200px] mx-auto">{s.desc}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;

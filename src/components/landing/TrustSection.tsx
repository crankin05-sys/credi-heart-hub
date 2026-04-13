import ScrollReveal from '@/components/ScrollReveal';

const outcomes = [
  { icon: '🎯', stat: '78+', label: 'Avg Readiness Score', sub: 'After completing guidance steps' },
  { icon: '⏱️', stat: '60', label: 'Days to Fundable', sub: 'Average with platform support' },
  { icon: '📋', stat: '100%', label: 'Canvas Completion', sub: 'Instant business snapshot' },
  { icon: '💡', stat: 'Free', label: 'To Get Started', sub: 'See your dashboard today' },
];

const TrustSection = () => (
  <section className="px-6 md:px-10 py-28 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(218_55%_11%)] to-background" />

    <div className="max-w-7xl mx-auto relative z-10">
      <ScrollReveal>
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 glass rounded-full text-primary text-[10px] font-bold px-4 py-2 tracking-[3px] uppercase mb-5 font-mono">
            <span className="w-1.5 h-1.5 bg-success rounded-full" />
            Results
          </div>
          <h2 className="font-display text-[clamp(32px,3.5vw,50px)] font-extrabold text-foreground leading-[1.08] mb-5 tracking-tight">
            Clarity Leads to<br /><span className="text-gradient-gold">Stronger Businesses.</span>
          </h2>
          <p className="text-[15px] text-foreground/45 leading-[1.8] max-w-[540px] mx-auto">
            When business owners understand their strengths and gaps, they make better decisions — and become more fundable.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="neon-card border-x-0 rounded-none relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] via-transparent to-primary/[0.03]" />
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 relative z-10">
            {outcomes.map((o, i) => (
              <div key={i} className={`px-8 py-14 text-center group transition-all duration-300 hover:bg-foreground/[0.03] ${
                i < outcomes.length - 1 ? 'border-r border-foreground/[0.06]' : ''
              }`}>
                <div className="text-2xl mb-3 group-hover:scale-125 transition-transform duration-300">{o.icon}</div>
                <div className="font-display text-[42px] font-bold text-gradient-gold leading-none mb-2">{o.stat}</div>
                <div className="text-[11px] text-foreground/50 uppercase tracking-[2px] font-mono mb-1 font-bold">{o.label}</div>
                <div className="text-[11px] text-foreground/25">{o.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default TrustSection;

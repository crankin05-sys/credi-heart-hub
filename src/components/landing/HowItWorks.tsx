import ScrollReveal from '@/components/ScrollReveal';

const steps = [
  { n: '1', title: 'Tell Us About Your Business', desc: 'Answer a few quick questions — credit score, annual revenue, and time in business. That\'s it.', icon: '💬', glow: 'hsl(var(--primary) / 0.15)' },
  { n: '2', title: 'Get Your Live Dashboard', desc: 'Instantly receive a completed Business Model Canvas, a funding readiness score, and plain-English insights.', icon: '📊', glow: 'hsl(var(--info) / 0.12)' },
  { n: '3', title: 'Upgrade for Deeper Guidance', desc: 'Explore your dashboard for free. When you\'re ready, unlock action plans, funding roadmaps, and coaching tools.', icon: '🚀', glow: 'hsl(var(--success) / 0.12)' },
];

const HowItWorks = () => (
  <section className="px-6 md:px-10 py-28 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(218_55%_11%)] to-background" />

    <div className="max-w-7xl mx-auto relative z-10">
      <ScrollReveal>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full text-primary text-[13px] font-bold px-4 py-2 tracking-[3px] uppercase mb-5 font-mono">
            <span className="w-1.5 h-1.5 bg-info rounded-full" />
            How It Works
          </div>
          <h2 className="font-display text-[clamp(32px,3.5vw,50px)] font-extrabold text-foreground leading-[1.08] mb-5 tracking-tight">
            Three Simple Steps to<br /><span className="text-gradient-gold">Business Clarity.</span>
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connecting line */}
        <div className="absolute top-16 left-[15%] right-[15%] h-px hidden md:block overflow-hidden">
          <div className="h-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>

        {steps.map((s, i) => (
          <ScrollReveal key={s.n} delay={i * 0.12}>
            <div className="text-center group">
              <div
                className="w-[90px] h-[90px] neon-card rounded-2xl flex items-center justify-center mx-auto mb-5 text-3xl transition-all duration-500 group-hover:shadow-[0_0_50px_var(--step-glow)] group-hover:scale-110 group-hover:border-primary/40 relative"
                style={{ '--step-glow': s.glow } as React.CSSProperties}
              >
                <span className="group-hover:scale-110 transition-transform duration-300 relative z-10">{s.icon}</span>
              </div>
              <div className="font-mono text-[13px] text-primary/80 tracking-[2px] mb-2 font-bold">STEP {s.n}</div>
              <div className="text-[16px] font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{s.title}</div>
              <div className="text-[15px] text-foreground/65 leading-[1.7] max-w-[300px] mx-auto">{s.desc}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;

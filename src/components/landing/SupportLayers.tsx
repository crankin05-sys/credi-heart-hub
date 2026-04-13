import ScrollReveal from '@/components/ScrollReveal';

const layers = [
  { icon: '💰', title: 'Funding Readiness Support', desc: 'Understand what lenders look for and get a clear path to approval. See your gaps and how to close them.' },
  { icon: '📊', title: 'Financial Health Support', desc: 'Monitor cash flow, track expenses, and spot opportunities to strengthen your financial position.' },
  { icon: '📈', title: 'Growth Planning Support', desc: 'Identify your most profitable customers, optimize pricing, and build a data-driven growth strategy.' },
  { icon: '📋', title: 'Documentation Support', desc: 'Know exactly which documents you need, get templates, and build a complete loan-ready package.' },
  { icon: '⚡', title: 'Action Plan Support', desc: 'Get a prioritized weekly plan with clear, specific steps. Stay on track and measure your progress.' },
];

const SupportLayers = () => (
  <section className="px-6 md:px-10 py-28 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,hsl(var(--primary)/0.04),transparent_70%)]" />

    <div className="max-w-7xl mx-auto relative z-10">
      <ScrollReveal>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full text-primary text-[13px] font-bold px-4 py-2 tracking-[3px] uppercase mb-5 font-mono">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            Optional Guidance
          </div>
          <h2 className="font-display text-[clamp(32px,3.5vw,50px)] font-extrabold text-foreground leading-[1.08] mb-5 tracking-tight">
            Go Deeper When<br /><span className="text-gradient-gold">You're Ready.</span>
          </h2>
          <p className="text-[17px] text-foreground/70 leading-[1.8] max-w-[540px] mx-auto">
            Your dashboard is free to explore. When you want more personalized help, these tools are here for you.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {layers.map((l, i) => (
          <ScrollReveal key={l.title} delay={i * 0.08}>
            <div className={`neon-card rounded-xl p-7 group h-full relative ${i >= 3 ? 'md:col-span-1' : ''}`}>
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="text-[28px] mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">{l.icon}</div>
                <div className="text-[16px] font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{l.title}</div>
                <div className="text-[15px] text-foreground/65 leading-[1.75]">{l.desc}</div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default SupportLayers;

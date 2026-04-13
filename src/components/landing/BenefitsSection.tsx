import ScrollReveal from '@/components/ScrollReveal';

const benefits = [
  {
    icon: '📋',
    title: 'A Completed Business Model Canvas',
    desc: 'See your entire business at a glance — customers, revenue streams, key activities, cost structure, and more — all filled in and ready to explore.',
  },
  {
    icon: '📊',
    title: 'A Quick Funding Readiness Snapshot',
    desc: 'Instantly understand where you stand with lenders. See your strengths, identify gaps, and know exactly what to improve.',
  },
  {
    icon: '🧭',
    title: 'Ongoing Guidance & Coaching Tools',
    desc: 'Get personalized next steps, growth strategies, and financial health insights — like having a trusted business advisor on call.',
  },
];

const BenefitsSection = () => (
  <section className="px-6 md:px-10 py-28 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,hsl(var(--primary)/0.04),transparent_60%)]" />

    <div className="max-w-7xl mx-auto relative z-10">
      <ScrollReveal>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full text-primary text-[10px] font-bold px-4 py-2 tracking-[3px] uppercase mb-5 font-mono">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            What You Get
          </div>
          <h2 className="font-display text-[clamp(32px,3.5vw,50px)] font-extrabold text-foreground leading-[1.08] mb-5 tracking-tight">
            Everything You Need to<br />
            <span className="text-gradient-gold">Understand & Strengthen</span> Your Business.
          </h2>
          <p className="text-[15px] text-foreground/45 leading-[1.8] max-w-[540px] mx-auto">
            No complicated systems. No confusing dashboards. Just clear insights and practical guidance.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {benefits.map((b, i) => (
          <ScrollReveal key={b.title} delay={i * 0.1}>
            <div className="neon-card rounded-xl p-8 group h-full relative text-center">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="text-[40px] mb-5 group-hover:scale-110 transition-transform duration-300 inline-block">{b.icon}</div>
                <div className="text-[16px] font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{b.title}</div>
                <div className="text-[13px] text-foreground/45 leading-[1.8]">{b.desc}</div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;

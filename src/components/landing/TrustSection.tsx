import ScrollReveal from '@/components/ScrollReveal';

const outcomes = [
  { stat: '78+', label: 'Avg Readiness Score', sub: 'After completing guidance' },
  { stat: '60', label: 'Days to Fundable', sub: 'With platform support' },
  { stat: '100%', label: 'Canvas Completion', sub: 'Instant business snapshot' },
  { stat: 'Free', label: 'To Get Started', sub: 'See your dashboard today' },
];

const TrustSection = () => (
  <section className="px-5 md:px-10 py-16 md:py-24 relative overflow-hidden bg-muted/30">
    <div className="max-w-6xl mx-auto relative z-10">
      <ScrollReveal>
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[hsl(var(--success)/0.08)] border border-[hsl(var(--success)/0.15)] rounded-full text-[hsl(var(--success))] text-xs font-bold px-4 py-1.5 tracking-wider uppercase mb-4">
            <span className="w-1.5 h-1.5 bg-[hsl(var(--success))] rounded-full" />
            Results
          </div>
          <h2 className="text-[clamp(26px,3.5vw,42px)] font-extrabold text-foreground leading-tight mb-3 tracking-tight">
            Clarity Leads to<br /><span className="text-gradient-gold">Stronger Businesses</span>
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
            When business owners understand their strengths and gaps, they make better decisions — and become more fundable.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {outcomes.map((o, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5 md:p-6 text-center group hover:border-primary/30 hover:shadow-md transition-all">
              <div className="text-3xl md:text-4xl font-bold text-gradient-gold leading-none mb-2">{o.stat}</div>
              <div className="text-xs text-foreground/70 uppercase tracking-wider font-bold mb-0.5">{o.label}</div>
              <div className="text-xs text-muted-foreground">{o.sub}</div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default TrustSection;

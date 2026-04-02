import ScrollReveal from '@/components/ScrollReveal';

const streams = [
  { icon: '🏛️', title: 'Organization Licensing', desc: 'Municipalities, nonprofits, and banks pay a monthly license fee to offer the platform.', range: '$500 – $2,000/mo' },
  { icon: '💻', title: 'SaaS Reseller Revenue', desc: 'Every software tool recommended — QuickBooks, HubSpot — earns a recurring commission.', range: '$50 – $300/mo' },
  { icon: '💰', title: 'Capital Referral Fees', desc: "Every loan closed through the platform's capital matching earns origination fees.", range: '1% – 3% per loan' },
  { icon: '📈', title: 'Fund Management Growth', desc: 'Fundable businesses feed directly into the revolving loan fund pipeline.', range: 'Ongoing growth' },
];

const RevenueSection = () => (
  <section id="revenue" className="px-6 md:px-10 py-24 max-w-7xl mx-auto">
    <ScrollReveal>
      <div className="text-center mb-16">
        <div className="text-[10px] font-bold tracking-[4px] text-primary uppercase mb-4 font-mono">Revenue Model</div>
        <h2 className="font-display text-[clamp(32px,3.5vw,50px)] font-extrabold text-foreground leading-[1.08] mb-5 tracking-tight">
          Four Revenue Streams.<br /><span className="text-gradient-gold">One Platform.</span>
        </h2>
        <p className="text-[15px] text-foreground/45 leading-[1.8] max-w-[540px] mx-auto">
          Credibility Suite AI isn't just a tool — it's a revenue engine for every organization that licenses it.
        </p>
      </div>
    </ScrollReveal>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {streams.map((s, i) => (
        <ScrollReveal key={s.title} delay={i * 0.08}>
          <div className="glass-card rounded-xl p-7 group flex gap-5 h-full relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-tl from-primary/[0.06] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="text-2xl mt-1 group-hover:scale-125 transition-transform duration-300 relative z-10">{s.icon}</div>
            <div className="flex-1 relative z-10">
              <div className="text-sm font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{s.title}</div>
              <div className="text-[12.5px] text-foreground/40 leading-[1.7] mb-3">{s.desc}</div>
              <div className="inline-flex items-center text-[12px] font-bold text-primary font-mono bg-primary/[0.08] rounded-full px-3 py-1 group-hover:bg-primary/15 transition-colors">{s.range}</div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

export default RevenueSection;

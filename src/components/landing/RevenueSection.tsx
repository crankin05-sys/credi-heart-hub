const streams = [
  { icon: '🏛️', title: 'Organization Licensing', desc: 'Municipalities, nonprofits, and banks pay a monthly license fee to offer the platform to their business clients.', range: '$500 – $2,000/month per organization' },
  { icon: '💻', title: 'SaaS Reseller Revenue', desc: 'Every software tool the platform recommends — QuickBooks, HubSpot, etc. — earns a recurring reseller commission.', range: '$50 – $300/month per business' },
  { icon: '💰', title: 'Capital Referral Fees', desc: "Every loan closed through the platform's capital matching engine earns an origination or referral fee.", range: '1% – 3% per loan funded' },
  { icon: '📈', title: 'Fund Management Growth', desc: "Businesses that become fundable through the platform feed directly into Maurice's revolving loan fund pipeline.", range: 'Ongoing fund growth & deployment' },
];

const RevenueSection = () => (
  <section id="revenue" className="px-6 md:px-[60px] py-20">
    <div className="text-[10px] font-bold tracking-[3.5px] text-primary uppercase mb-3 font-mono">Revenue Model</div>
    <h2 className="font-display text-[clamp(32px,3.5vw,48px)] font-extrabold text-foreground leading-[1.1] mb-4 tracking-tight">
      Four Ways the<br />Platform Makes You Money.
    </h2>
    <p className="text-[15px] text-foreground/55 leading-[1.8] max-w-[580px] mb-12">
      Credibility Suite AI isn't just a tool — it's a revenue engine for Maurice and every organization that licenses it.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {streams.map((s) => (
        <div key={s.title} className="bg-foreground/[0.03] border border-border p-7 transition-all duration-300 hover:border-primary/30">
          <div className="text-2xl mb-3">{s.icon}</div>
          <div className="text-sm font-extrabold text-foreground mb-2">{s.title}</div>
          <div className="text-[12.5px] text-foreground/45 leading-[1.65] mb-3">{s.desc}</div>
          <div className="text-[13px] font-bold text-primary font-mono">{s.range}</div>
        </div>
      ))}
    </div>
  </section>
);

export default RevenueSection;

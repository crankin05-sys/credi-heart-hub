const personas = [
  { icon: '🏛️', title: 'Municipalities & Counties', desc: 'Governments managing revolving loan funds and technical assistance programs for local businesses.', tags: ['Revolving Funds', 'Technical Assistance', 'Municipal'] },
  { icon: '🤝', title: 'Nonprofits & CDFIs', desc: 'Urban League chapters, SBDCs, and CDFIs that provide business coaching and capital access programs.', tags: ['Urban League', 'SBDC', 'CDFI'] },
  { icon: '🏦', title: 'Banks & Financial Institutions', desc: 'Banks that want to help business clients become loan-ready and maximize approval rates.', tags: ['Community Banks', 'Credit Unions', 'Loan Ready'] },
  { icon: '📊', title: 'Fund Managers & Capital Brokers', desc: 'Professionals who manage capital deployment and need a scalable system to assess and fund businesses.', tags: ['Fund Management', 'Capital Brokerage', 'Scale'] },
];

const WhoSection = () => (
  <section className="px-6 md:px-10 py-24 relative overflow-hidden">
    {/* Background gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(218_55%_12%)] to-background" />
    
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <div className="text-[10px] font-bold tracking-[4px] text-primary uppercase mb-4 font-mono">Who It Serves</div>
        <h2 className="font-display text-[clamp(32px,3.5vw,50px)] font-extrabold text-foreground leading-[1.08] mb-5 tracking-tight">
          Built for Organizations<br />That <em className="italic text-gradient-gold not-italic">Serve Small Businesses.</em>
        </h2>
        <p className="text-[15px] text-foreground/45 leading-[1.8] max-w-[540px] mx-auto">
          The platform is licensed to organizations — not sold directly to individual businesses. Deploy it through your existing network at scale.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 stagger-children">
        {personas.map((p) => (
          <div key={p.title} className="glass-card rounded-xl p-8 group">
            <div className="text-[32px] mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">{p.icon}</div>
            <div className="text-[16px] font-bold text-foreground mb-2.5 group-hover:text-primary transition-colors">{p.title}</div>
            <div className="text-[13px] text-foreground/40 leading-[1.75] mb-4">{p.desc}</div>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="text-[10px] font-semibold px-3 py-1.5 bg-primary/[0.08] border border-primary/20 text-primary/80 rounded-full tracking-wide">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhoSection;

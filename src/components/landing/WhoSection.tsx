const personas = [
  { icon: '🏛️', title: 'Municipalities & Counties', desc: 'Governments managing revolving loan funds and technical assistance programs for local businesses. Platform provides the TA at scale without adding staff.', tags: ['Revolving Funds', 'Technical Assistance', 'Municipal'] },
  { icon: '🤝', title: 'Nonprofits & CDFIs', desc: 'Urban League chapters, SBDCs, and CDFIs that provide business coaching and capital access programs. Replace or supplement manual coaching at a fraction of the cost.', tags: ['Urban League', 'SBDC', 'CDFI'] },
  { icon: '🏦', title: 'Banks & Financial Institutions', desc: 'Banks that want to help business clients become loan-ready. Platform identifies which clients are ready now and which need preparation — maximizing approval rates.', tags: ['Community Banks', 'Credit Unions', 'Loan Ready'] },
  { icon: '📊', title: 'Fund Managers & Capital Brokers', desc: "Professionals like Maurice who manage capital deployment and need a scalable system to assess, prepare, and fund businesses without doing it all manually.", tags: ['Fund Management', 'Capital Brokerage', 'Scale'] },
];

const WhoSection = () => (
  <section className="px-6 md:px-[60px] py-20 bg-gold-pale">
    <div className="text-[10px] font-bold tracking-[3.5px] text-primary uppercase mb-3 font-mono">Who It Serves</div>
    <h2 className="font-display text-[clamp(32px,3.5vw,48px)] font-extrabold leading-[1.1] mb-4 tracking-tight text-primary-foreground">
      Built for Organizations<br />That Serve Small Businesses.
    </h2>
    <p className="text-[15px] text-muted-foreground leading-[1.8] max-w-[580px] mb-12">
      The platform is licensed to organizations — not sold directly to individual businesses. Maurice deploys it through his existing network at scale.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {personas.map((p) => (
        <div key={p.title} className="bg-foreground border border-muted-foreground/20 p-8 rounded transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] hover:-translate-y-0.5">
          <div className="text-[32px] mb-3.5">{p.icon}</div>
          <div className="text-[15px] font-extrabold text-primary-foreground mb-2">{p.title}</div>
          <div className="text-[13px] text-muted-foreground leading-[1.7] mb-3.5">{p.desc}</div>
          <div className="flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span key={t} className="text-[10px] font-bold px-3 py-1 bg-gold-pale border border-primary/30 text-primary rounded-full tracking-wide">{t}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default WhoSection;

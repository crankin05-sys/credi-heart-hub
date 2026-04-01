const steps = [
  { n: '1', title: 'Business Intake', desc: 'Enter website or answer 20 questions. AI generates complete Business Model Canvas and Fundability Score instantly.' },
  { n: '2', title: 'Agents Assess', desc: 'All 6 agents analyze the business simultaneously — financial health, fundability, documentation, growth opportunities.' },
  { n: '3', title: 'Capital Matched', desc: "The right funding sources are identified and the business is routed to Maurice's fund or partner lenders automatically." },
  { n: '4', title: 'Business Improves', desc: "Weekly action plans keep the business moving. Score updates in real time. When they're ready — they get funded." },
];

const HowItWorks = () => (
  <section className="px-6 md:px-[60px] py-20">
    <div className="text-[10px] font-bold tracking-[3.5px] text-primary uppercase mb-3 font-mono text-center">How It Works</div>
    <h2 className="font-display text-[clamp(32px,3.5vw,48px)] font-extrabold text-foreground leading-[1.1] mb-12 tracking-tight text-center">
      From Intake to Funded.<br />Fully Automated.
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-4 relative">
      <div className="absolute top-9 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-30 hidden md:block" />
      {steps.map((s) => (
        <div key={s.n} className="text-center px-5 py-8 group">
          <div className="w-[72px] h-[72px] bg-gradient-to-br from-navy-3 to-card border border-border rounded-full flex items-center justify-center mx-auto mb-5 font-display text-2xl font-bold text-primary transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-gold-lt group-hover:text-primary-foreground group-hover:border-primary group-hover:shadow-[0_0_24px_hsl(var(--gold)/0.2)]">
            {s.n}
          </div>
          <div className="text-sm font-extrabold text-foreground mb-2">{s.title}</div>
          <div className="text-xs text-foreground/45 leading-[1.65]">{s.desc}</div>
        </div>
      ))}
    </div>
  </section>
);

export default HowItWorks;

const problems = [
  { num: '01', title: 'No Fundability Score', desc: "Business owners have no idea where they stand with lenders. They apply blind and get rejected without knowing why.", icon: '🎯' },
  { num: '02', title: 'Documentation Gaps', desc: "Missing tax returns, incomplete bank statements, no operating agreement — small gaps that block every loan application.", icon: '📋' },
  { num: '03', title: 'Wrong Capital Sources', desc: "Businesses apply for loans they don't qualify for while missing programs they're perfect for. The matching is all wrong.", icon: '🔄' },
];

const ProblemSection = () => (
  <section className="px-6 md:px-10 py-24 max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <div className="text-[10px] font-bold tracking-[4px] text-primary uppercase mb-4 font-mono">The Problem</div>
      <h2 className="font-display text-[clamp(32px,3.5vw,50px)] font-extrabold text-foreground leading-[1.08] mb-5 tracking-tight">
        Most Businesses Can't<br />Access Capital. <em className="italic text-gradient-gold not-italic">Here's Why.</em>
      </h2>
      <p className="text-[15px] text-foreground/45 leading-[1.8] max-w-[540px] mx-auto">
        It's not that businesses don't deserve funding. It's that they don't know what's blocking them — or how to fix it.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 stagger-children">
      {problems.map((p) => (
        <div key={p.num} className="glass-card rounded-xl p-8 group">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">{p.icon}</span>
            <div className="font-mono text-[11px] font-bold text-primary/50 tracking-[2px]">{p.num}</div>
          </div>
          <div className="text-[16px] font-bold text-foreground mb-3 group-hover:text-gradient-gold transition-colors">{p.title}</div>
          <div className="text-[13px] text-foreground/40 leading-[1.75]">{p.desc}</div>
        </div>
      ))}
    </div>
  </section>
);

export default ProblemSection;

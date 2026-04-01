const problems = [
  { num: '01', title: 'No Fundability Score', desc: "Business owners have no idea where they stand with lenders. They apply blind and get rejected without knowing why." },
  { num: '02', title: 'Documentation Gaps', desc: "Missing tax returns, incomplete bank statements, no operating agreement — small gaps that block every loan application." },
  { num: '03', title: 'Wrong Capital Sources', desc: "Businesses apply for loans they don't qualify for while missing programs they're perfect for. The matching is all wrong." },
];

const ProblemSection = () => (
  <section className="px-6 md:px-[60px] py-20">
    <div className="text-[10px] font-bold tracking-[3.5px] text-primary uppercase mb-3 font-mono">The Problem</div>
    <h2 className="font-display text-[clamp(32px,3.5vw,48px)] font-extrabold text-foreground leading-[1.1] mb-4 tracking-tight">
      Most Businesses Can't<br />Access Capital. Here's Why.
    </h2>
    <p className="text-[15px] text-foreground/55 leading-[1.8] max-w-[580px] mb-12">
      It's not that businesses don't deserve funding. It's that they don't know what's blocking them — or how to fix it. Credibility Suite AI solves all of it automatically.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
      {problems.map((p) => (
        <div key={p.num} className="bg-card p-9">
          <div className="font-display text-[40px] font-bold text-primary/20 mb-4">{p.num}</div>
          <div className="text-[15px] font-extrabold text-foreground mb-2.5">{p.title}</div>
          <div className="text-[13px] text-foreground/45 leading-[1.7]">{p.desc}</div>
        </div>
      ))}
    </div>
  </section>
);

export default ProblemSection;

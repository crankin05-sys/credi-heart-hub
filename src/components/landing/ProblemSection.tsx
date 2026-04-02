import ScrollReveal from '@/components/ScrollReveal';

const problems = [
  { num: '01', title: 'No Fundability Score', desc: "Business owners have no idea where they stand with lenders. They apply blind and get rejected without knowing why.", icon: '🎯' },
  { num: '02', title: 'Documentation Gaps', desc: "Missing tax returns, incomplete bank statements, no operating agreement — small gaps that block every loan application.", icon: '📋' },
  { num: '03', title: 'Wrong Capital Sources', desc: "Businesses apply for loans they don't qualify for while missing programs they're perfect for.", icon: '🔄' },
];

const ProblemSection = () => (
  <section className="px-6 md:px-10 py-24 max-w-7xl mx-auto">
    <ScrollReveal>
      <div className="text-center mb-16">
        <div className="text-[10px] font-bold tracking-[4px] text-primary uppercase mb-4 font-mono">The Problem</div>
        <h2 className="font-display text-[clamp(32px,3.5vw,50px)] font-extrabold text-foreground leading-[1.08] mb-5 tracking-tight">
          Most Businesses Can't<br />Access Capital. <span className="text-gradient-gold">Here's Why.</span>
        </h2>
        <p className="text-[15px] text-foreground/45 leading-[1.8] max-w-[540px] mx-auto">
          It's not that businesses don't deserve funding. It's that they don't know what's blocking them — or how to fix it.
        </p>
      </div>
    </ScrollReveal>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {problems.map((p, i) => (
        <ScrollReveal key={p.num} delay={i * 0.1}>
          <div className="glass-card rounded-xl p-8 group h-full relative overflow-hidden">
            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl group-hover:scale-125 transition-transform duration-300">{p.icon}</span>
                <div className="font-mono text-[11px] font-bold text-primary/50 tracking-[2px]">{p.num}</div>
              </div>
              <div className="text-[16px] font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{p.title}</div>
              <div className="text-[13px] text-foreground/40 leading-[1.75]">{p.desc}</div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

export default ProblemSection;

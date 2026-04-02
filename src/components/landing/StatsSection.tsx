const stats = [
  { n: '75+', l: 'Fundability Score', sub: 'Target threshold for capital' },
  { n: '60', l: 'Days to Fundable', sub: 'Average with platform guidance' },
  { n: '$0', l: 'Per Lead Cost', sub: 'Organizations bring pipeline' },
  { n: '∞', l: 'Scale', sub: 'Serves thousands simultaneously' },
];

const StatsSection = () => (
  <section className="glass border-y border-foreground/[0.06] relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] via-transparent to-primary/[0.03]" />
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 relative z-10">
      {stats.map((s, i) => (
        <div key={i} className={`px-8 py-12 text-center group transition-all duration-300 hover:bg-foreground/[0.02] ${
          i < stats.length - 1 ? 'border-r border-foreground/[0.06]' : ''
        }`}>
          <div className="font-display text-[48px] font-bold text-gradient-gold leading-none mb-2 group-hover:scale-105 transition-transform duration-300">{s.n}</div>
          <div className="text-[11px] text-foreground/40 uppercase tracking-[2px] font-mono mb-1">{s.l}</div>
          <div className="text-[11px] text-foreground/20">{s.sub}</div>
        </div>
      ))}
    </div>
  </section>
);

export default StatsSection;

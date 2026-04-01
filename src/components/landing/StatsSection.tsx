const stats = [
  { n: '75+', l: 'Fundability Score', sub: 'Target threshold for capital access' },
  { n: '60', l: 'Days to Fundable', sub: 'Average time with platform guidance' },
  { n: '$0', l: 'Per Lead Cost', sub: 'Organizations bring their own pipeline' },
  { n: '∞', l: 'Scale', sub: 'One platform serves thousands simultaneously' },
];

const StatsSection = () => (
  <section className="bg-card border-y border-border">
    <div className="grid grid-cols-2 md:grid-cols-4">
      {stats.map((s, i) => (
        <div key={i} className={`px-8 py-10 text-center ${i < stats.length - 1 ? 'border-r border-border' : ''}`}>
          <div className="font-display text-[52px] font-bold text-primary leading-none mb-1.5">{s.n}</div>
          <div className="text-[11px] text-foreground/40 uppercase tracking-[2px] font-mono">{s.l}</div>
          <div className="text-xs text-foreground/25 mt-1">{s.sub}</div>
        </div>
      ))}
    </div>
  </section>
);

export default StatsSection;

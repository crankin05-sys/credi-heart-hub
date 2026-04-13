const items = [
  'Business Snapshot', 'Funding Readiness', 'Growth Guidance',
  'Financial Health', 'Documentation Support', 'Action Planning',
  'Business Model Canvas', 'Personalized Coaching',
];

const TrustBar = () => (
  <div className="relative overflow-hidden">
    <div className="section-glow-divider" />
    <div className="neon-card border-x-0 rounded-none py-6 relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
      <div className="flex whitespace-nowrap animate-[marquee_35s_linear_infinite]">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-10 text-[11px] font-semibold text-foreground/35 tracking-[2px] uppercase font-mono">
            {item}
            <span className="w-2 h-2 bg-gradient-to-r from-primary to-gold-lt rounded-full opacity-60" />
          </span>
        ))}
      </div>
    </div>
    <div className="section-glow-divider" />
  </div>
);

export default TrustBar;

const items = [
  'Fundability Scoring', 'Capital Matching', 'Financial Health Monitoring',
  'SBA & AR Financing', 'Documentation Compliance', 'Growth Strategy',
  'Weekly Execution Plans', 'QuickBooks Integration',
];

const TrustBar = () => (
  <div className="glass border-y border-foreground/[0.06] py-5 overflow-hidden relative">
    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
    <div className="flex whitespace-nowrap animate-[marquee_35s_linear_infinite]">
      {[...items, ...items].map((item, i) => (
        <span key={i} className="inline-flex items-center gap-4 px-10 text-[11px] font-semibold text-foreground/30 tracking-[2px] uppercase font-mono">
          {item}
          <span className="w-1.5 h-1.5 bg-primary/40 rounded-full" />
        </span>
      ))}
    </div>
  </div>
);

export default TrustBar;

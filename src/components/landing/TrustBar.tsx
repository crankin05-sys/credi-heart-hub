const items = [
  'Fundability Scoring', 'Capital Matching', 'Financial Health Monitoring',
  'SBA & AR Financing', 'Documentation Compliance', 'Growth Strategy',
  'Weekly Execution Plans', 'QuickBooks Integration',
];

const TrustBar = () => (
  <div className="bg-card border-y border-border py-5 overflow-hidden">
    <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite]">
      {[...items, ...items].map((item, i) => (
        <span key={i} className="inline-flex items-center gap-3 px-12 text-[11px] font-bold text-foreground/40 tracking-[2px] uppercase font-mono">
          {item}
          <span className="w-1 h-1 bg-primary rounded-full opacity-60" />
        </span>
      ))}
    </div>
  </div>
);

export default TrustBar;

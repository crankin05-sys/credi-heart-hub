interface TopbarProps {
  title: string;
  subtitle?: string;
  onLoanQueue?: () => void;
}

const Topbar = ({ title, subtitle, onLoanQueue }: TopbarProps) => {
  return (
    <header className="bg-background/60 backdrop-blur-xl border-b border-foreground/[0.06] px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div>
        <h1 className="text-[16px] font-bold text-foreground tracking-tight">{title}</h1>
        {subtitle && <p className="text-[11px] text-muted-foreground font-mono mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 glass rounded-full text-success text-[9px] font-semibold px-3.5 py-2 tracking-[1px] font-mono">
          <span className="w-1.5 h-1.5 bg-success rounded-full animate-glow" />
          Live Data
        </div>
        {onLoanQueue && (
          <button
            onClick={onLoanQueue}
            className="bg-gradient-to-r from-primary to-gold-lt text-primary-foreground border-none font-body text-[11px] font-bold px-5 py-2.5 cursor-pointer tracking-[1px] uppercase rounded-lg transition-all duration-300 hover:shadow-[0_4px_16px_hsl(var(--gold)/0.25)] hover:-translate-y-0.5"
          >
            Review Loan Queue →
          </button>
        )}
      </div>
    </header>
  );
};

export default Topbar;

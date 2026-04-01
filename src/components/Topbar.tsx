interface TopbarProps {
  title: string;
  subtitle?: string;
  onLoanQueue?: () => void;
}

const Topbar = ({ title, subtitle, onLoanQueue }: TopbarProps) => {
  return (
    <header className="bg-background border-b border-border px-6 py-3.5 flex justify-between items-center sticky top-0 z-50">
      <div>
        <h1 className="text-[15px] font-extrabold text-foreground">{title}</h1>
        {subtitle && <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 bg-success/[0.12] border border-success/25 text-success text-[9px] font-bold px-3 py-1.5 rounded-full tracking-[1.5px] font-mono">
          <span className="w-1.5 h-1.5 bg-success rounded-full animate-glow" />
          Live Data
        </div>
        {onLoanQueue && (
          <button
            onClick={onLoanQueue}
            className="bg-gradient-to-br from-primary to-gold-lt text-primary-foreground border-none font-body text-[11px] font-extrabold px-4 py-2 cursor-pointer tracking-[1.5px] uppercase rounded-sm transition-all hover:brightness-110"
          >
            Review Loan Queue →
          </button>
        )}
      </div>
    </header>
  );
};

export default Topbar;

import { Sparkles } from 'lucide-react';

interface TopbarProps {
  title: string;
  subtitle?: string;
  onLoanQueue?: () => void;
}

const Topbar = ({ title, subtitle, onLoanQueue }: TopbarProps) => {
  return (
    <header className="bg-background/80 backdrop-blur-xl border-b border-border px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div>
        <h1 className="text-base font-bold text-foreground tracking-tight">{title}</h1>
        {subtitle && <p className="text-[11px] text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-primary/[0.06] rounded-full text-primary text-[10px] font-semibold px-3.5 py-2">
          <Sparkles className="w-3 h-3" />
          AI Active
        </div>
        {onLoanQueue && (
          <button
            onClick={onLoanQueue}
            className="bg-gradient-to-r from-[hsl(230,80%,56%)] to-[hsl(260,70%,60%)] text-white border-none text-[11px] font-semibold px-5 py-2.5 cursor-pointer rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            Review Loan Queue →
          </button>
        )}
      </div>
    </header>
  );
};

export default Topbar;

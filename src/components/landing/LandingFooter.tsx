const LandingFooter = () => (
  <footer className="relative overflow-hidden">
    <div className="section-glow-divider" />
    <div className="px-6 md:px-10 py-12 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_50%_100%,hsl(var(--primary)/0.04),transparent_60%)]" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-primary to-gold-lt flex items-center justify-center text-sm font-black text-primary-foreground rounded-lg font-display shadow-[0_4px_16px_hsl(var(--gold)/0.2)]">
            CS
          </div>
          <div className="font-display text-lg font-bold text-foreground">
            Credibility Suite <span className="text-gradient-gold">AI</span>
          </div>
        </div>
        <div className="text-[11px] text-foreground/25 font-mono tracking-wide">
          Powered by She Wins With AI · Atlanta, GA 30309
        </div>
        <div className="neon-card text-primary text-[9px] font-bold px-5 py-2.5 tracking-[2px] uppercase rounded-full hover:border-primary/30 transition-all cursor-pointer">
          Enterprise Platform
        </div>
      </div>
    </div>
  </footer>
);

export default LandingFooter;

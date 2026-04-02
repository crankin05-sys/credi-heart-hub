const LandingFooter = () => (
  <footer className="border-t border-foreground/[0.06] px-6 md:px-10 py-10">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-gold-lt flex items-center justify-center text-sm font-black text-primary-foreground rounded-lg font-display">
          CS
        </div>
        <div className="font-display text-lg font-bold text-foreground">
          Credibility Suite <span className="text-gradient-gold">AI</span>
        </div>
      </div>
      <div className="text-[11px] text-foreground/25 font-mono tracking-wide">
        Powered by She Wins With AI · Atlanta, GA 30309
      </div>
      <div className="glass text-primary text-[9px] font-bold px-4 py-2 tracking-[2px] uppercase rounded-full">
        Enterprise Platform
      </div>
    </div>
  </footer>
);

export default LandingFooter;

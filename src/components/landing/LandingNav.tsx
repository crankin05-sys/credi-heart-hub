import { useNavigate } from 'react-router-dom';

const LandingNav = () => {
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="bg-background/97 border-b border-border px-6 md:px-[60px] py-4 flex justify-between items-center sticky top-0 z-[200] backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-gradient-to-br from-primary to-gold-lt flex items-center justify-center text-base font-black text-primary-foreground rounded font-display">
          CS
        </div>
        <div className="font-display text-xl font-bold text-foreground tracking-wide">
          Credibility Suite <span className="text-primary">AI</span>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <button onClick={() => scrollTo('agents')} className="text-[13px] font-semibold text-foreground/60 hover:text-primary transition-colors tracking-wide bg-transparent border-none cursor-pointer">The Platform</button>
        <button onClick={() => scrollTo('agents')} className="text-[13px] font-semibold text-foreground/60 hover:text-primary transition-colors tracking-wide bg-transparent border-none cursor-pointer">AI Agents</button>
        <button onClick={() => scrollTo('revenue')} className="text-[13px] font-semibold text-foreground/60 hover:text-primary transition-colors tracking-wide bg-transparent border-none cursor-pointer">Revenue Model</button>
        <button onClick={() => scrollTo('cta')} className="text-[13px] font-semibold text-foreground/60 hover:text-primary transition-colors tracking-wide bg-transparent border-none cursor-pointer">Contact</button>
        <button
          onClick={() => navigate('/auth')}
          className="bg-gradient-to-br from-primary to-gold-lt text-primary-foreground font-body text-xs font-extrabold px-6 py-3 border-none cursor-pointer tracking-[1.5px] uppercase rounded-sm transition-all hover:brightness-110 shadow-[0_4px_16px_hsl(var(--gold)/0.2)]"
        >
          Request a Demo →
        </button>
      </div>
    </nav>
  );
};

export default LandingNav;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingNav = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${
      scrolled 
        ? 'glass py-3 shadow-[0_8px_32px_hsl(0_0%_0%/0.3)]' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-gold-lt flex items-center justify-center text-base font-black text-primary-foreground rounded-lg font-display shadow-[0_4px_16px_hsl(var(--gold)/0.25)]">
            CS
          </div>
          <div className="font-display text-xl font-bold text-foreground tracking-wide">
            Credibility Suite <span className="text-gradient-gold">AI</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Platform', id: 'agents' },
            { label: 'AI Agents', id: 'agents' },
            { label: 'Revenue', id: 'revenue' },
            { label: 'Contact', id: 'cta' },
          ].map(item => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.id)}
              className="text-[13px] font-semibold text-foreground/50 hover:text-foreground transition-all duration-300 tracking-wide bg-transparent border-none cursor-pointer relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-gold-lt group-hover:w-full transition-all duration-300" />
            </button>
          ))}
          <button
            onClick={() => navigate('/get-started')}}
            className="bg-gradient-to-r from-primary to-gold-lt text-primary-foreground font-body text-xs font-bold px-6 py-2.5 border-none cursor-pointer tracking-[1px] uppercase rounded-lg transition-all duration-300 hover:shadow-[0_8px_24px_hsl(var(--gold)/0.3)] hover:-translate-y-0.5"
          >
            Get Started →
          </button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Sparkles } from 'lucide-react';

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
        ? 'bg-white/90 backdrop-blur-xl border-b border-border py-3 shadow-sm' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(230,80%,56%)] to-[hsl(260,70%,60%)] flex items-center justify-center shadow-md">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div className={`text-lg font-bold transition-colors ${scrolled ? 'text-foreground' : 'text-white'}`}>
            Credibility Suite <span className="text-gradient-ai">AI</span>
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
              className={`text-[13px] font-medium transition-all duration-300 bg-transparent border-none cursor-pointer relative group ${scrolled ? 'text-muted-foreground hover:text-foreground' : 'text-white/60 hover:text-white'}`}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[hsl(230,80%,56%)] to-[hsl(260,70%,60%)] group-hover:w-full transition-all duration-300" />
            </button>
          ))}
          <button
            onClick={() => navigate('/get-started')}
            className="bg-gradient-to-r from-[hsl(230,80%,56%)] to-[hsl(260,70%,60%)] text-white text-xs font-semibold px-6 py-2.5 border-none cursor-pointer rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;

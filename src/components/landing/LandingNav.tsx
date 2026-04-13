import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, LogIn, LayoutDashboard, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const LandingNav = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
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
            Credibility Suite
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'How It Works', id: 'dashboard-preview' },
            { label: 'Guidance Tools', id: 'support-layers' },
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
          {user ? (
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-r from-[hsl(230,80%,56%)] to-[hsl(260,70%,60%)] text-white text-xs font-semibold px-6 py-2.5 border-none cursor-pointer rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              My Dashboard
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/auth')}
                className={`text-[13px] font-semibold transition-all duration-300 bg-transparent border-none cursor-pointer flex items-center gap-1.5 ${scrolled ? 'text-foreground hover:text-primary' : 'text-white/80 hover:text-white'}`}
              >
                <LogIn className="w-3.5 h-3.5" />
                Log In
              </button>
              <button
                onClick={() => navigate('/get-started')}
                className="bg-gradient-to-r from-[hsl(230,80%,56%)] to-[hsl(260,70%,60%)] text-white text-xs font-semibold px-6 py-2.5 border-none cursor-pointer rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;

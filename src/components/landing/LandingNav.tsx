import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, LayoutDashboard, ArrowRight, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const LandingNav = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-400 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-xl border-b border-border py-2 shadow-sm'
          : 'bg-transparent py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-[hsl(260,70%,60%)] flex items-center justify-center shadow-md">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div className={`text-base font-bold transition-colors ${scrolled ? 'text-foreground' : 'text-white'}`}>
              Credibility Suite
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {[
              { label: 'How It Works', id: 'how-it-works' },
              { label: 'FAQ', id: 'faq' },
              { label: 'Contact', id: 'cta' },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.id)}
                className={`text-[13px] font-medium transition-all bg-transparent border-none cursor-pointer px-3 py-2 rounded-lg ${
                  scrolled ? 'text-muted-foreground hover:text-foreground hover:bg-muted' : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className={`w-px h-5 mx-2 ${scrolled ? 'bg-border' : 'bg-white/15'}`} />

            {user ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-gradient-to-r from-primary to-[hsl(260,70%,60%)] text-white text-xs font-semibold px-5 py-2 border-none cursor-pointer rounded-lg transition-all hover:shadow-md hover:-translate-y-0.5 flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </button>
            ) : (
              <button
                onClick={() => navigate('/get-started')}
                className="bg-gradient-to-r from-primary to-[hsl(260,70%,60%)] text-white text-xs font-semibold px-5 py-2 border-none cursor-pointer rounded-lg transition-all hover:shadow-md hover:-translate-y-0.5 flex items-center gap-1.5"
              >
                Check My Score <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden bg-transparent border-none cursor-pointer p-2 rounded-lg transition-colors ${
              scrolled ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[199] bg-[#0a1628] pt-16 px-5 overflow-y-auto md:hidden animate-fade-in">
          <div className="space-y-1 mb-6 mt-4">
            {[
              { label: 'How It Works', id: 'how-it-works' },
              { label: 'FAQ', id: 'faq' },
              { label: 'Contact', id: 'cta' },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.id)}
                className="w-full text-left px-3 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.08] transition-colors bg-transparent border-none cursor-pointer text-sm"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pb-8">
            {user ? (
              <button
                onClick={() => { setMobileOpen(false); navigate('/dashboard'); }}
                className="w-full bg-gradient-to-r from-primary to-[hsl(260,70%,60%)] text-white font-semibold text-sm py-3.5 rounded-xl border-none cursor-pointer flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" /> My Dashboard
              </button>
            ) : (
              <button
                onClick={() => { setMobileOpen(false); navigate('/get-started'); }}
                className="w-full bg-gradient-to-r from-primary to-[hsl(260,70%,60%)] text-white font-semibold text-sm py-3.5 rounded-xl border-none cursor-pointer flex items-center justify-center gap-2"
              >
                Check My Score — Free <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LandingNav;

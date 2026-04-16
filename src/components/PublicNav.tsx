import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Brain, LayoutDashboard, ArrowRight, Menu, X, LogIn, Home, Info, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface NavItem {
  label: string;
  to: string;
  icon: typeof Home;
}

const NAV: NavItem[] = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'About', to: '/about', icon: Info },
  { label: 'Get Started', to: '/get-started', icon: Sparkles },
];

/**
 * Persistent top navigation for public-facing pages.
 * Light theme by default — sits on top of any background.
 */
const PublicNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-xl border-b border-border py-2 shadow-sm'
            : 'bg-background/70 backdrop-blur-md border-b border-border/50 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-[hsl(260,70%,60%)] flex items-center justify-center shadow-md">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold text-foreground">Credibility Suite</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-[13px] font-medium px-3 py-2 rounded-lg transition-all no-underline ${
                  isActive(item.to)
                    ? 'text-primary bg-primary/[0.08]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="w-px h-5 mx-2 bg-border" />

            {user ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-gradient-to-r from-primary to-[hsl(260,70%,60%)] text-white text-xs font-semibold px-5 py-2 border-none cursor-pointer rounded-lg transition-all hover:shadow-md hover:-translate-y-0.5 flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/auth')}
                  className="text-[13px] font-medium text-foreground/80 hover:text-foreground bg-transparent border-none cursor-pointer px-3 py-2 rounded-lg hover:bg-muted flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" /> Login
                </button>
                <button
                  onClick={() => navigate('/get-started')}
                  className="bg-gradient-to-r from-primary to-[hsl(260,70%,60%)] text-white text-xs font-semibold px-5 py-2 border-none cursor-pointer rounded-lg transition-all hover:shadow-md hover:-translate-y-0.5 flex items-center gap-1.5"
                >
                  Check My Score <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden bg-transparent border-none cursor-pointer p-2 rounded-lg text-foreground hover:bg-muted"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[199] bg-background pt-16 px-5 overflow-y-auto md:hidden animate-fade-in">
          <div className="space-y-1 mb-6 mt-4">
            {NAV.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm no-underline transition-colors ${
                    isActive(item.to)
                      ? 'text-primary bg-primary/[0.08]'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="w-4 h-4" /> {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pb-8 space-y-2">
            {user ? (
              <button
                onClick={() => { setMobileOpen(false); navigate('/dashboard'); }}
                className="w-full bg-gradient-to-r from-primary to-[hsl(260,70%,60%)] text-white font-semibold text-sm py-3.5 rounded-xl border-none cursor-pointer flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" /> My Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => { setMobileOpen(false); navigate('/auth'); }}
                  className="w-full bg-muted text-foreground font-semibold text-sm py-3.5 rounded-xl border border-border cursor-pointer flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" /> Login
                </button>
                <button
                  onClick={() => { setMobileOpen(false); navigate('/get-started'); }}
                  className="w-full bg-gradient-to-r from-primary to-[hsl(260,70%,60%)] text-white font-semibold text-sm py-3.5 rounded-xl border-none cursor-pointer flex items-center justify-center gap-2"
                >
                  Check My Score <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PublicNav;

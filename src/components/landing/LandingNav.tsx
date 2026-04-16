import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, LogIn, LayoutDashboard, ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const PRODUCTS = [
  { label: 'Business Loans', id: 'funding', desc: 'SBA, term loans, lines of credit & more' },
  { label: 'Credit Repair', id: 'credit', desc: 'AI-powered credit analysis & dispute filing' },
  { label: 'Coaching', id: 'coaching', desc: 'Growth strategy & business model guidance' },
  { label: 'Financial Health', id: 'financial', desc: 'Cash flow analysis & profitability tools' },
  { label: 'Documents', id: 'docs', desc: 'Underwriting prep & document organization' },
];

interface LandingNavProps {
  onProductClick?: (productId: string) => void;
}

const LandingNav = ({ onProductClick }: LandingNavProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProductSelect = (productId: string) => {
    setShowProducts(false);
    setMobileOpen(false);
    if (onProductClick) {
      onProductClick(productId);
    } else {
      navigate('/get-started');
    }
  };

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-border py-2 shadow-sm'
          : 'bg-transparent py-3'
      }`}>
        {/* Main nav row */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[hsl(230,80%,56%)] to-[hsl(260,70%,60%)] flex items-center justify-center shadow-md">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div className={`text-lg font-bold transition-colors ${scrolled ? 'text-foreground' : 'text-white'}`}>
              Credibility Suite
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {/* Products dropdown */}
            <div className="relative"
              onMouseEnter={() => setShowProducts(true)}
              onMouseLeave={() => setShowProducts(false)}
            >
              <button
                className={`text-[13px] font-semibold transition-all duration-300 bg-transparent border-none cursor-pointer px-4 py-2 rounded-lg flex items-center gap-1.5 ${
                  scrolled ? 'text-foreground hover:bg-foreground/5' : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Products <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showProducts ? 'rotate-180' : ''}`} />
              </button>

              {showProducts && (
                <div className="absolute top-full left-0 mt-1 w-[320px] bg-white rounded-xl border border-border shadow-xl overflow-hidden animate-fade-up">
                  {PRODUCTS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleProductSelect(p.id)}
                      className="w-full text-left px-5 py-3.5 hover:bg-primary/[0.04] transition-colors border-none bg-transparent cursor-pointer group"
                    >
                      <div className="text-[14px] font-semibold text-foreground group-hover:text-primary transition-colors">{p.label}</div>
                      <div className="text-[12px] text-muted-foreground mt-0.5">{p.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {[
              { label: 'How It Works', id: 'dashboard-preview' },
              { label: 'Guidance Tools', id: 'support-layers' },
              { label: 'Contact', id: 'cta' },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.id)}
                className={`text-[13px] font-medium transition-all duration-300 bg-transparent border-none cursor-pointer px-4 py-2 rounded-lg ${
                  scrolled ? 'text-muted-foreground hover:text-foreground hover:bg-foreground/5' : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="w-px h-6 bg-white/10 mx-2" />

            {user ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-gradient-to-r from-[hsl(230,80%,56%)] to-[hsl(260,70%,60%)] text-white text-xs font-semibold px-6 py-2.5 border-none cursor-pointer rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                My Dashboard
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/auth')}
                  className={`text-[13px] font-semibold transition-all duration-300 bg-transparent border-none cursor-pointer flex items-center gap-1.5 px-3 py-2 rounded-lg ${
                    scrolled ? 'text-foreground hover:text-primary' : 'text-white/80 hover:text-white'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Log In
                </button>
                <button
                  onClick={() => navigate('/get-started')}
                  className="bg-gradient-to-r from-[hsl(230,80%,56%)] to-[hsl(260,70%,60%)] text-white text-xs font-semibold px-5 py-2.5 border-none cursor-pointer rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
                >
                  Get Started <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden bg-transparent border-none cursor-pointer p-2 ${scrolled ? 'text-foreground' : 'text-white'}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Product strip under nav on desktop */}
        {scrolled && (
          <div className="hidden md:block border-t border-border/50 bg-white/60 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center gap-1 py-1">
              {PRODUCTS.map(p => (
                <button
                  key={p.id}
                  onClick={() => handleProductSelect(p.id)}
                  className="text-[12px] font-medium text-muted-foreground hover:text-primary hover:bg-primary/[0.04] transition-all bg-transparent border-none cursor-pointer px-3 py-1.5 rounded-lg"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[199] bg-[#0a1628]/95 backdrop-blur-xl pt-20 px-6 overflow-y-auto md:hidden">
          <div className="space-y-1 mb-8">
            <div className="text-[11px] font-bold text-white/40 uppercase tracking-[2px] px-4 mb-3">Products</div>
            {PRODUCTS.map(p => (
              <button
                key={p.id}
                onClick={() => handleProductSelect(p.id)}
                className="w-full text-left px-4 py-3.5 rounded-xl text-white/80 hover:bg-white/[0.08] transition-colors bg-transparent border-none cursor-pointer"
              >
                <div className="text-[15px] font-semibold">{p.label}</div>
                <div className="text-[12px] text-white/40 mt-0.5">{p.desc}</div>
              </button>
            ))}
          </div>

          <div className="space-y-1 mb-8">
            <div className="text-[11px] font-bold text-white/40 uppercase tracking-[2px] px-4 mb-3">Navigate</div>
            {[
              { label: 'How It Works', id: 'dashboard-preview' },
              { label: 'Guidance Tools', id: 'support-layers' },
              { label: 'Contact', id: 'cta' },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.id)}
                className="w-full text-left px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.08] transition-colors bg-transparent border-none cursor-pointer text-[15px]"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="space-y-3 pb-10">
            {user ? (
              <button
                onClick={() => { setMobileOpen(false); navigate('/dashboard'); }}
                className="w-full bg-gradient-to-r from-[hsl(230,80%,56%)] to-[hsl(260,70%,60%)] text-white font-semibold text-[15px] py-4 rounded-xl border-none cursor-pointer flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" /> My Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => { setMobileOpen(false); navigate('/get-started'); }}
                  className="w-full bg-gradient-to-r from-[hsl(230,80%,56%)] to-[hsl(260,70%,60%)] text-white font-semibold text-[15px] py-4 rounded-xl border-none cursor-pointer flex items-center justify-center gap-2"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setMobileOpen(false); navigate('/auth'); }}
                  className="w-full text-white/70 font-semibold text-[15px] py-3 rounded-xl border border-white/15 bg-transparent cursor-pointer flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" /> Log In
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LandingNav;

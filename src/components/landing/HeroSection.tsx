import { useNavigate } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';
import { ArrowRight, Eye, CheckCircle2 } from 'lucide-react';
import heroImage from '@/assets/hero-funded.jpg';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-[90vh] flex items-center px-5 md:px-10 pt-24 pb-16 md:pb-24 relative overflow-hidden bg-[#0a1628]">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      {/* Gradient orbs */}
      <div className="absolute top-[10%] right-[15%] w-[500px] h-[500px] bg-[radial-gradient(circle,hsl(220_70%_30%/0.3),transparent_70%)] blur-[60px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,hsl(200_80%_40%/0.1),transparent_70%)] blur-[60px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <ScrollReveal>
              <div className="inline-flex items-center gap-2.5 bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-full text-[#7db4ff] text-xs font-bold px-4 py-2 tracking-[1.5px] uppercase mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                Your Business Command Center
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-[clamp(28px,5vw,56px)] font-extrabold leading-[1.1] tracking-tight mb-5 text-white">
                See Your Business{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#4d8fef] to-[#38bdf8] bg-clip-text text-transparent">Clearly.</span>
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#4d8fef] to-[#38bdf8] rounded-full opacity-60" />
                </span>
                <br />
                Strengthen What Matters.
                <br />
                <span className="bg-gradient-to-r from-[#4d8fef] to-[#38bdf8] bg-clip-text text-transparent">Become More Fundable.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-base md:text-lg text-white/75 leading-relaxed max-w-[500px] mb-6">
                Get a live Business Model Canvas, a quick fundability snapshot, and personalized guidance for growth, financial health, and capital readiness.
              </p>
            </ScrollReveal>

            {/* Trust bullets */}
            <ScrollReveal delay={0.25}>
              <div className="flex flex-wrap gap-x-5 gap-y-2 mb-8">
                {['Free to start', 'Takes 3 minutes', 'No credit check'].map(item => (
                  <div key={item} className="flex items-center gap-1.5 text-sm text-white/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {item}
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => navigate('/get-started')}
                  className="group relative bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white text-sm font-bold px-6 py-3.5 border-none cursor-pointer rounded-xl transition-all duration-300 hover:shadow-[0_12px_40px_hsl(220_80%_50%/0.35)] hover:-translate-y-0.5 inline-flex items-center gap-2 overflow-hidden"
                >
                  <span>Get My Fundability Score</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => document.getElementById('dashboard-preview')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group bg-white/[0.08] text-white/90 border border-white/15 text-sm font-semibold px-5 py-3.5 cursor-pointer rounded-xl transition-all duration-300 hover:border-white/30 hover:text-white hover:bg-white/[0.12]"
                >
                  <span className="inline-flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    See the Dashboard
                  </span>
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Hero Image */}
          <ScrollReveal delay={0.3} direction="right">
            <div className="hidden lg:block relative">
              <div className="relative rounded-2xl overflow-hidden">
                <img src={heroImage} alt="Entrepreneur reviewing their business dashboard" width={800} height={1024} className="w-full h-auto object-cover rounded-2xl" loading="eager" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-[#0a1628]/40 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/60 via-transparent to-[#0a1628]/30 pointer-events-none" />
                {/* Overlay card */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/10 backdrop-blur-xl rounded-xl border border-white/15 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] flex items-center justify-center">
                      <span className="text-white text-lg font-bold">72</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-bold">Funding Readiness: Strong</div>
                      <div className="text-white/70 text-xs truncate">Business Model Canvas complete · 3 next steps ready</div>
                    </div>
                    <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse flex-shrink-0" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom stats - mobile friendly */}
        <ScrollReveal delay={0.5}>
          <div className="grid grid-cols-3 bg-white/[0.06] backdrop-blur-sm border border-white/[0.1] rounded-xl max-w-md overflow-hidden mt-8 lg:mt-6">
            {[
              { n: '✓', l: 'Live Dashboard', icon: '📊' },
              { n: '24/7', l: 'Guidance', icon: '🧭' },
              { n: '∞', l: 'Growth Tools', icon: '📈' },
            ].map((s, i) => (
              <div key={i} className={`px-3 md:px-6 py-4 md:py-5 text-center ${i < 2 ? 'border-r border-white/[0.1]' : ''}`}>
                <div className="text-sm mb-0.5">{s.icon}</div>
                <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#4d8fef] to-[#38bdf8] bg-clip-text text-transparent leading-none">{s.n}</div>
                <div className="text-[10px] md:text-[11px] text-white/60 uppercase tracking-wider mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HeroSection;

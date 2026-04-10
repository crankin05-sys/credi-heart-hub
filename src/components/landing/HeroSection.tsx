import { useNavigate } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';
import TypingEffect from '@/components/TypingEffect';
import { Sparkles, ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-funded.jpg';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center px-6 md:px-10 pt-28 pb-24 relative overflow-hidden bg-[#0a1628]">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      {/* Gradient orbs */}
      <div className="absolute top-[10%] right-[15%] w-[500px] h-[500px] bg-[radial-gradient(circle,hsl(220_70%_30%/0.3),transparent_70%)] blur-[60px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,hsl(200_80%_40%/0.1),transparent_70%)] blur-[60px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <ScrollReveal>
              <div className="inline-flex items-center gap-2.5 bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-full text-[#5b9cf5] text-[11px] font-bold px-5 py-2.5 tracking-[2px] uppercase mb-8">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                AI-Powered Business Intelligence
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-[clamp(40px,5vw,72px)] font-extrabold leading-[1.05] tracking-tight mb-7 text-white">
                Turn Any Business<br />Into a{' '}
                <span className="relative">
                  <span className="bg-gradient-to-r from-[#4d8fef] to-[#38bdf8] bg-clip-text text-transparent">Fundable</span>
                  <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#4d8fef] to-[#38bdf8] rounded-full opacity-60" />
                </span>
                <br />Business.
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-[17px] text-white/50 leading-[1.85] max-w-[520px] mb-3">
                Credibility Suite AI automates the entire path from unfundable to funded —
              </p>
              <p className="text-[17px] text-white/80 font-medium mb-10 h-[28px]">
                <TypingEffect
                  texts={[
                    'Automated business assessment.',
                    'AI-powered capital matching.',
                    '24/7 fundability coaching.',
                    'Real-time documentation tracking.',
                    'Intelligent growth strategy.',
                  ]}
                  speed={40}
                  pauseTime={2500}
                />
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex gap-4 flex-wrap mb-12">
                <button
                  onClick={() => navigate('/get-started')}
                  className="group relative bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white text-sm font-bold px-8 py-4 border-none cursor-pointer rounded-xl transition-all duration-300 hover:shadow-[0_12px_40px_hsl(220_80%_50%/0.35)] hover:-translate-y-1 inline-flex items-center gap-2.5 overflow-hidden"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Find Out Your Credibility Score Free</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => document.getElementById('agents')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group bg-white/[0.06] text-white/70 border border-white/10 text-sm font-semibold px-7 py-4 cursor-pointer rounded-xl transition-all duration-300 hover:border-white/25 hover:text-white hover:bg-white/[0.1]"
                >
                  <span className="inline-flex items-center gap-2">
                    Meet the AI Agents
                    <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] group-hover:bg-white group-hover:text-[#0a1628] transition-all">▶</span>
                  </span>
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Hero Image */}
          <ScrollReveal delay={0.3} direction="right">
            <div className="hidden lg:block relative">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_80px_-15px_hsl(220_80%_20%/0.5)]">
                <img src={heroImage} alt="Entrepreneur celebrating business funding approval" width={800} height={1024} className="w-full h-auto object-cover rounded-2xl" />
                {/* Overlay card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-xl rounded-xl border border-white/15 p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] flex items-center justify-center">
                      <span className="text-white text-xl font-bold">72%</span>
                    </div>
                    <div>
                      <div className="text-white text-sm font-bold">Fundability Score: Strong</div>
                      <div className="text-white/50 text-xs">3 funding programs matched · $250K approved</div>
                    </div>
                    <span className="ml-auto w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom stats */}
        <ScrollReveal delay={0.5}>
          <div className="grid grid-cols-3 bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-xl max-w-[520px] overflow-hidden mt-8 lg:mt-0">
            {[
              { n: '6', l: 'AI Agents', icon: '🤖' },
              { n: '24/7', l: 'Always On', icon: '⚡' },
              { n: '∞', l: 'Scalable', icon: '📈' },
            ].map((s, i) => (
              <div key={i} className={`px-6 py-6 text-center group hover:bg-white/[0.04] transition-all duration-300 ${i < 2 ? 'border-r border-white/[0.08]' : ''}`}>
                <div className="text-lg mb-1 group-hover:scale-125 transition-transform duration-300">{s.icon}</div>
                <div className="text-[32px] font-bold bg-gradient-to-r from-[#4d8fef] to-[#38bdf8] bg-clip-text text-transparent leading-none">{s.n}</div>
                <div className="text-[10px] text-white/35 uppercase tracking-[1.5px] mt-1.5">{s.l}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HeroSection;

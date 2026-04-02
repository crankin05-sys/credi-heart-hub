import { useNavigate } from 'react-router-dom';
import ParticleField from '@/components/ParticleField';
import TypingEffect from '@/components/TypingEffect';
import ScrollReveal from '@/components/ScrollReveal';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center px-6 md:px-10 pt-28 pb-24 relative overflow-hidden">
      {/* Multi-layer background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[hsl(218_55%_12%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,hsl(var(--primary)/0.12),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_50%,hsl(var(--info)/0.06),transparent_60%)]" />

      <ParticleField />

      {/* Animated orbs */}
      <div className="absolute top-[5%] right-[10%] w-[600px] h-[600px] hidden md:block pointer-events-none">
        <div className="w-full h-full rounded-full bg-[conic-gradient(from_0deg,hsl(var(--primary)/0.1),hsl(var(--info)/0.06),hsl(var(--gold-lt)/0.1),hsl(var(--primary)/0.04),hsl(var(--primary)/0.1))] animate-[spin_20s_linear_infinite] blur-[80px]" />
      </div>
      <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] hidden md:block pointer-events-none">
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle,hsl(var(--info)/0.08),transparent_70%)] animate-[neon-pulse_4s_ease-in-out_infinite]" />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Scan line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-[scanline_4s_linear_infinite]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <ScrollReveal>
              <div className="inline-flex items-center gap-2.5 glass rounded-full text-primary text-[11px] font-bold px-5 py-2.5 tracking-[2px] uppercase mb-8 font-mono animate-breathe">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
                </span>
                AI-Powered Business Intelligence
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-[clamp(44px,5.5vw,78px)] font-extrabold leading-[1.03] tracking-tight mb-7 text-foreground">
                Turn Any Business<br />Into a{' '}
                <span className="text-gradient-gold relative">
                  Fundable
                  <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-gold-lt rounded-full opacity-60" />
                </span>
                <br />Business.
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-[17px] text-foreground/55 leading-[1.85] max-w-[540px] mb-4">
                Credibility Suite AI automates the entire path from unfundable to funded —
              </p>
              <p className="text-[17px] text-foreground/80 font-medium mb-11 h-[28px]">
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
                  className="group relative bg-gradient-to-r from-primary to-gold-lt text-primary-foreground font-body text-xs font-bold px-9 py-4 border-none cursor-pointer tracking-[1.5px] uppercase rounded-lg transition-all duration-300 hover:shadow-[0_12px_40px_hsl(var(--gold)/0.35)] hover:-translate-y-1 inline-flex items-center gap-2.5 overflow-hidden btn-aurora"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-gold-lt to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative">Get Started Free</span>
                  <span className="relative text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
                <button
                  onClick={() => document.getElementById('agents')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group bg-foreground/[0.04] text-foreground/70 border border-foreground/10 font-body text-xs font-semibold px-7 py-4 cursor-pointer rounded-lg transition-all duration-300 hover:border-primary/40 hover:text-primary hover:bg-primary/[0.05] tracking-wide"
                >
                  <span className="inline-flex items-center gap-2">
                    Meet the AI Agents
                    <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">▶</span>
                  </span>
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Glowing Dashboard Mockup */}
          <ScrollReveal delay={0.3} direction="right">
            <div className="hero-mockup hidden lg:block">
              <div className="hero-mockup-inner">
                <div className="neon-card rounded-2xl p-6 animate-breathe relative">
                  {/* Top bar */}
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-warning/60" />
                    <div className="w-3 h-3 rounded-full bg-success/60" />
                    <span className="ml-3 text-[10px] text-foreground/30 font-mono">credibilitysuite.ai/dashboard</span>
                  </div>
                  
                  {/* Mock score */}
                  <div className="flex items-center gap-6 mb-5">
                    <div className="relative w-24 h-24">
                      <svg viewBox="0 0 100 100" className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--foreground) / 0.06)" strokeWidth="6" />
                        <circle cx="50" cy="50" r="42" fill="none" stroke="url(#score-gradient)" strokeWidth="6" strokeDasharray={`${0.72 * 264} ${264}`} strokeLinecap="round" />
                        <defs>
                          <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="hsl(var(--primary))" />
                            <stop offset="100%" stopColor="hsl(var(--gold-lt))" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display text-2xl font-bold text-gradient-gold">72</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-foreground/30 font-mono tracking-[2px] uppercase mb-1">Fundability Score</div>
                      <div className="text-sm font-bold text-foreground">Good — Almost There</div>
                      <div className="text-[11px] text-success font-medium mt-1">↑ 12 pts this month</div>
                    </div>
                  </div>

                  {/* Mock checklist */}
                  <div className="space-y-2.5">
                    {[
                      { label: 'Business License', done: true },
                      { label: 'Bank Statements', done: true },
                      { label: 'Tax Returns', done: false },
                      { label: 'Operating Agreement', done: false },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-[12px]">
                        <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] ${
                          item.done 
                            ? 'bg-success/20 text-success border border-success/30' 
                            : 'bg-foreground/5 text-foreground/20 border border-foreground/10'
                        }`}>
                          {item.done ? '✓' : ''}
                        </div>
                        <span className={item.done ? 'text-foreground/50 line-through' : 'text-foreground/70'}>{item.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Mock agent bar */}
                  <div className="mt-5 pt-4 border-t border-foreground/[0.06] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-gold-lt flex items-center justify-center text-sm">🤖</div>
                    <div className="flex-1">
                      <div className="text-[10px] text-primary font-bold">Capital Matching Agent</div>
                      <div className="text-[10px] text-foreground/30">Found 3 programs you qualify for</div>
                    </div>
                    <span className="w-2 h-2 bg-success rounded-full animate-glow" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom stats */}
        <ScrollReveal delay={0.5}>
          <div className="grid grid-cols-3 neon-card rounded-xl max-w-[520px] overflow-hidden mt-8 lg:mt-0">
            {[
              { n: '6', l: 'AI Agents', icon: '🤖' },
              { n: '24/7', l: 'Always On', icon: '⚡' },
              { n: '∞', l: 'Scalable', icon: '📈' },
            ].map((s, i) => (
              <div key={i} className={`px-6 py-6 text-center group hover:bg-foreground/[0.03] transition-all duration-300 ${i < 2 ? 'border-r border-foreground/[0.06]' : ''}`}>
                <div className="text-lg mb-1 group-hover:scale-125 transition-transform duration-300">{s.icon}</div>
                <div className="font-display text-[32px] font-bold text-gradient-gold leading-none">{s.n}</div>
                <div className="text-[10px] text-foreground/35 uppercase tracking-[1.5px] mt-1.5 font-mono">{s.l}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HeroSection;

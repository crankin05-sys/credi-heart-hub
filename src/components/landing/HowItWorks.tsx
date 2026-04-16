import ScrollReveal from '@/components/ScrollReveal';
import { MessageSquare, BarChart3, Rocket } from 'lucide-react';

const steps = [
  { n: '1', title: 'Tell Us About Your Business', desc: 'Answer a few quick questions — credit score, annual revenue, and time in business. That\'s it.', icon: MessageSquare, color: 'text-primary' },
  { n: '2', title: 'Get Your Live Dashboard', desc: 'Instantly receive a completed Business Model Canvas, a funding readiness score, and plain-English insights.', icon: BarChart3, color: 'text-info' },
  { n: '3', title: 'Upgrade for Deeper Guidance', desc: 'Explore your dashboard for free. When you\'re ready, unlock action plans, funding roadmaps, and coaching tools.', icon: Rocket, color: 'text-[hsl(var(--success))]' },
];

const HowItWorks = () => (
  <section className="px-5 md:px-10 py-16 md:py-24 relative overflow-hidden bg-muted/30">
    <div className="max-w-6xl mx-auto relative z-10">
      <ScrollReveal>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-info/[0.08] border border-info/15 rounded-full text-info text-xs font-bold px-4 py-1.5 tracking-wider uppercase mb-4">
            <span className="w-1.5 h-1.5 bg-info rounded-full" />
            How It Works
          </div>
          <h2 className="text-[clamp(26px,3.5vw,42px)] font-extrabold text-foreground leading-tight mb-3 tracking-tight">
            Three Simple Steps to<br /><span className="text-gradient-gold">Business Clarity</span>
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* Connecting line */}
        <div className="absolute top-14 left-[20%] right-[20%] h-px hidden md:block">
          <div className="h-full bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {steps.map((s, i) => (
          <ScrollReveal key={s.n} delay={i * 0.12}>
            <div className="text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-card border border-border rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:border-primary/30 group-hover:shadow-md transition-all duration-300">
                <s.icon className={`w-7 h-7 md:w-8 md:h-8 ${s.color}`} />
              </div>
              <div className="text-xs text-primary/80 tracking-widest mb-1.5 font-bold uppercase">Step {s.n}</div>
              <div className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{s.title}</div>
              <div className="text-sm text-muted-foreground leading-relaxed max-w-[280px] mx-auto">{s.desc}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;

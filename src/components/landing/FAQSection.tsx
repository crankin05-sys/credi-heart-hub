import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

const faqs = [
  { q: 'What is the Business Model Canvas?', a: "It's a visual snapshot of your entire business — your customers, revenue streams, key activities, cost structure, and more. We complete it for you based on a few quick questions, and it becomes your live dashboard for understanding and improving your business." },
  { q: 'How does the funding readiness score work?', a: "We analyze your business profile — credit, revenue, time in business, and documentation — to generate a score from 0–100. A higher score means you're closer to being loan-ready. The score updates as you take action and improve." },
  { q: 'Is it really free to get started?', a: 'Yes. You can get your completed Business Model Canvas, funding readiness score, and initial insights for free. Paid tools become available when you want deeper guidance, personalized action plans, or funding roadmaps.' },
  { q: 'What kind of guidance do I get?', a: "Your dashboard includes plain-English insights about your business — what looks strong, what might be limiting growth, and practical next steps. It's like having a knowledgeable business advisor reviewing your situation." },
  { q: 'Do I need to be tech-savvy to use this?', a: "Not at all. The platform is designed to feel like a conversation, not a complicated software system. Answer a few questions, and we do the rest. Everything is explained in plain language with clear action steps." },
];

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="px-6 md:px-10 py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,hsl(var(--primary)/0.03),transparent_60%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass rounded-full text-primary text-[13px] font-bold px-4 py-2 tracking-[3px] uppercase mb-5 font-mono">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              FAQ
            </div>
            <h2 className="font-display text-[clamp(32px,3.5vw,50px)] font-extrabold text-foreground leading-[1.08] tracking-tight">
              Common <em className="italic text-gradient-gold not-italic">Questions.</em>
            </h2>
          </div>
        </ScrollReveal>

        <div className="max-w-[700px] mx-auto">
          {faqs.map((f, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="border-b border-foreground/[0.08]">
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className={`w-full bg-transparent border-none text-left font-body text-[16px] font-semibold py-6 cursor-pointer flex justify-between items-center gap-4 transition-all duration-300 ${
                    openIdx === i ? 'text-primary' : 'text-foreground/85 hover:text-foreground'
                  }`}
                >
                  {f.q}
                  <span className={`w-9 h-9 rounded-full neon-card flex items-center justify-center text-primary text-lg flex-shrink-0 transition-all duration-300 ${
                    openIdx === i ? 'rotate-45 !bg-primary/15 !border-primary/40 shadow-[0_0_20px_hsl(var(--gold)/0.15)]' : ''
                  }`}>
                    +
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${openIdx === i ? 'max-h-[300px] pb-6' : 'max-h-0'}`}>
                  <p className="text-[15px] text-foreground/70 leading-[1.85]">{f.a}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { ChevronDown } from 'lucide-react';

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
    <section className="px-5 md:px-10 py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/[0.06] border border-primary/15 rounded-full text-primary text-xs font-bold px-4 py-1.5 tracking-wider uppercase mb-4">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              FAQ
            </div>
            <h2 className="text-[clamp(26px,3.5vw,42px)] font-extrabold text-foreground leading-tight tracking-tight">
              Common Questions
            </h2>
          </div>
        </ScrollReveal>

        <div className="max-w-2xl mx-auto space-y-2">
          {faqs.map((f, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className={`w-full bg-transparent border-none text-left text-sm font-semibold px-5 py-4 cursor-pointer flex justify-between items-center gap-3 transition-all duration-200 ${
                    openIdx === i ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {f.q}
                  <ChevronDown className={`w-4 h-4 flex-shrink-0 text-muted-foreground transition-transform duration-300 ${openIdx === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-out ${openIdx === i ? 'max-h-[300px]' : 'max-h-0'}`}>
                  <p className="text-sm text-muted-foreground leading-relaxed px-5 pb-4">{f.a}</p>
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

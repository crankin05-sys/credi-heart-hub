import { useState } from 'react';

const faqs = [
  { q: 'How does the Fundability Score work?', a: "The platform analyzes a business's financial health, credit profile, documentation completeness, and business structure to generate a score from 0–100. A score of 75+ qualifies the business for capital review. The score updates in real time as the business improves." },
  { q: 'Does it integrate with existing tools?', a: 'Yes. The platform integrates with QuickBooks, HubSpot, and other major business tools via API. Data flows automatically — no manual entry required from the business owner.' },
  { q: 'How does the capital matching work?', a: "The Capital Matching Agent analyzes each business's profile and matches them to the most appropriate funding source — revolving loan funds, SBA programs, AR financing, or partner lenders." },
  { q: 'Can organizations white-label the platform?', a: "Yes. Organizations that license the platform can brand it as their own technical assistance program. The underlying AI infrastructure is built and maintained by our team while the client-facing experience reflects the organization's brand." },
  { q: "What's the implementation timeline?", a: 'Phase 1 (foundation, website, intake, scoring) is live within 30 days. Phase 2 (all 6 AI agents) is complete within 60 days. Full platform launch including capital engine and organization portal is complete within 90 days.' },
];

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="px-6 md:px-10 py-24 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="text-[10px] font-bold tracking-[4px] text-primary uppercase mb-4 font-mono">FAQ</div>
        <h2 className="font-display text-[clamp(32px,3.5vw,50px)] font-extrabold text-foreground leading-[1.08] tracking-tight">
          Common <em className="italic text-gradient-gold not-italic">Questions.</em>
        </h2>
      </div>
      <div className="max-w-[680px] mx-auto">
        {faqs.map((f, i) => (
          <div key={i} className="border-b border-foreground/[0.06]">
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className={`w-full bg-transparent border-none text-left font-body text-sm font-semibold py-6 cursor-pointer flex justify-between items-center gap-4 transition-all duration-300 ${
                openIdx === i ? 'text-primary' : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              {f.q}
              <span className={`w-8 h-8 rounded-full glass flex items-center justify-center text-primary text-lg flex-shrink-0 transition-all duration-300 ${openIdx === i ? 'rotate-45 bg-primary/10' : ''}`}>
                +
              </span>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${openIdx === i ? 'max-h-[300px] pb-6' : 'max-h-0'}`}>
              <p className="text-[13.5px] text-foreground/40 leading-[1.85]">{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;

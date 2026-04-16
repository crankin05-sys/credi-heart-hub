import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';
import { ArrowRight, CheckCircle2, Shield, ChevronDown } from 'lucide-react';

const goalOptions = [
  { label: 'Get a business loan', value: 'loan' },
  { label: 'Check my fundability score', value: 'fundability' },
  { label: 'Improve my credit', value: 'credit' },
  { label: 'Grow my business', value: 'grow' },
  { label: 'Just exploring', value: 'exploring' },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    setOpen(false);
    navigate(`/get-started?goal=${value}`);
  };

  return (
    <section className="min-h-[85vh] flex items-center px-5 md:px-10 pt-20 pb-16 relative overflow-hidden bg-[#0a1628]">
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      <div className="absolute top-[10%] right-[15%] w-[500px] h-[500px] bg-[radial-gradient(circle,hsl(220_70%_30%/0.3),transparent_70%)] blur-[60px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10 text-center">
        <ScrollReveal>
          <h1 className="text-[clamp(30px,5.5vw,60px)] font-extrabold leading-[1.08] tracking-tight mb-5 text-white">
            Find Out If Your Business<br />
            <span className="bg-gradient-to-r from-[#4d8fef] to-[#38bdf8] bg-clip-text text-transparent">Qualifies for Funding</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-lg mx-auto mb-8">
            Answer a few questions. Get a free score showing how ready your business is for a loan — plus tips to improve it.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mb-8">
            {['Free — no credit card', '3 minutes', 'No credit pull'].map(item => (
              <div key={item} className="flex items-center gap-1.5 text-sm text-white/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {item}
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="relative inline-block">
            <button
              onClick={() => setOpen(!open)}
              className="group relative bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white text-base font-bold px-10 py-4.5 border-none cursor-pointer rounded-xl transition-all duration-300 hover:shadow-[0_12px_40px_hsl(220_80%_50%/0.35)] hover:-translate-y-0.5 inline-flex items-center gap-2.5"
            >
              What are you here for?
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fade-up">
                  {goalOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      className="w-full text-left px-5 py-3.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors border-none bg-transparent cursor-pointer flex items-center justify-between group"
                    >
                      {opt.label}
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-blue-500" />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <div className="flex items-center justify-center gap-2 mt-5 text-xs text-white/40">
            <Shield className="w-3.5 h-3.5" />
            Your information is secure and never shared with lenders without your permission.
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HeroSection;

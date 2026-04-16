import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';
import { ArrowRight, ChevronDown } from 'lucide-react';

const goalOptions = [
  { label: 'Get a business loan', value: 'loan' },
  { label: 'Check my fundability score', value: 'fundability' },
  { label: 'Improve my credit', value: 'credit' },
  { label: 'Grow my business', value: 'grow' },
  { label: 'Just exploring', value: 'exploring' },
];

const CTASection = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    setOpen(false);
    navigate(`/get-started?goal=${value}`);
  };

  return (
    <section id="cta" className="px-5 md:px-10 py-16 md:py-24 relative overflow-hidden">
      <ScrollReveal>
        <div className="relative z-10 max-w-2xl mx-auto bg-gradient-to-br from-primary to-[hsl(260,70%,55%)] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-4">
            What Are You Here For?
          </h2>
          <p className="text-sm md:text-base text-white/80 max-w-md mx-auto mb-8 leading-relaxed">
            Tell us your goal and we'll point you in the right direction. It's free and takes 3 minutes.
          </p>
          <div className="relative inline-block">
            <button
              onClick={() => setOpen(!open)}
              className="group bg-white text-primary text-sm font-bold px-8 py-3.5 border-none cursor-pointer rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              Choose your goal
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fade-up">
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
        </div>
      </ScrollReveal>
    </section>
  );
};

export default CTASection;

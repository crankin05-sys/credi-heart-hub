import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowRight, ArrowLeft, Check, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  NAICS_INDUSTRIES,
  CREDIT_SCORE_RANGES,
  FUNDING_AMOUNTS,
  BUSINESS_NEEDS,
  TIME_IN_BUSINESS,
  ANNUAL_REVENUE,
  determineFunnel,
} from '@/data/intakeOptions';

const TOTAL_STEPS = 4;

interface FormData {
  contactName: string;
  email: string;
  phone: string;
  companyName: string;
  industry: string;
  naicsCode: string;
  needs: string[];
  creditScore: string;
  amountSeeking: string;
  timeInBusiness: string;
  annualRevenue: string;
}

const IntakePage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ funnel: string; label: string; description: string } | null>(null);
  const [form, setForm] = useState<FormData>({
    contactName: '',
    email: '',
    phone: '',
    companyName: '',
    industry: '',
    naicsCode: '',
    needs: [],
    creditScore: '',
    amountSeeking: '',
    timeInBusiness: '',
    annualRevenue: '',
  });

  const update = (field: keyof FormData, value: string | string[]) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const toggleNeed = (value: string) => {
    setForm(prev => ({
      ...prev,
      needs: prev.needs.includes(value)
        ? prev.needs.filter(n => n !== value)
        : [...prev.needs, value],
    }));
  };

  const selectIndustry = (code: string, label: string) => {
    setForm(prev => ({ ...prev, industry: label, naicsCode: code }));
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return form.contactName.trim() && form.email.trim() && form.companyName.trim();
      case 2:
        return form.industry && form.naicsCode;
      case 3:
        return form.needs.length > 0;
      case 4:
        return form.creditScore && form.timeInBusiness && form.annualRevenue;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const funnelResult = determineFunnel({
      needs: form.needs,
      creditScore: form.creditScore,
      revenue: form.annualRevenue,
      timeInBusiness: form.timeInBusiness,
      amountSeeking: form.amountSeeking,
    });

    const amountEntry = FUNDING_AMOUNTS.find(a => a.value === form.amountSeeking);

    try {
      const { error } = await supabase.from('leads').insert({
        contact_name: form.contactName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        company_name: form.companyName.trim(),
        industry: form.industry,
        naics_code: form.naicsCode,
        credit_score_range: form.creditScore,
        amount_seeking: amountEntry?.amount ?? null,
        needs: form.needs,
        funnel: funnelResult.funnel,
        responses: {
          timeInBusiness: form.timeInBusiness,
          annualRevenue: form.annualRevenue,
          amountSeeking: form.amountSeeking,
        },
      });

      if (error) throw error;
      setResult(funnelResult);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const next = () => {
    if (step === TOTAL_STEPS) {
      handleSubmit();
    } else {
      setStep(s => s + 1);
    }
  };

  const back = () => setStep(s => Math.max(1, s - 1));

  // Result screen
  if (result && !showCalendly) {
    return (
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center animate-fade-up">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-[32px] font-extrabold text-white mb-3">
            You're in the{' '}
            <span className="bg-gradient-to-r from-[#4d8fef] to-[#38bdf8] bg-clip-text text-transparent">
              {result.label}
            </span>{' '}
            Path
          </h1>
          <p className="text-[17px] text-white/70 leading-[1.7] mb-10 max-w-md mx-auto">
            {result.description}
          </p>
          <p className="text-[15px] text-white/50 mb-6">
            To access the platform, schedule a quick walkthrough with our team first.
          </p>
          <button
            onClick={() => setShowCalendly(true)}
            className="bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white text-[16px] font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-[0_12px_40px_hsl(220_80%_50%/0.35)] hover:-translate-y-1 inline-flex items-center justify-center gap-2"
          >
            Book My Walkthrough
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  if (result && showCalendly) {
    return (
      <div className="min-h-screen bg-[#0a1628] flex flex-col items-center px-6 py-10">
        <div className="max-w-3xl w-full animate-fade-up">
          <h2 className="text-[28px] font-extrabold text-white text-center mb-2">
            Schedule Your Walkthrough
          </h2>
          <p className="text-[16px] text-white/60 text-center mb-8">
            Pick a time that works for you. Once confirmed, you'll get full access to the platform.
          </p>
          <div className="rounded-2xl overflow-hidden bg-white" style={{ minHeight: 700 }}>
            <iframe
              src="https://calendly.com/mauricestewart?hide_gdpr_banner=1&background_color=ffffff&text_color=1a1a2e&primary_color=2563eb"
              width="100%"
              height="700"
              frameBorder="0"
              title="Schedule a walkthrough"
            />
          </div>
          <p className="text-center mt-6">
            <button
              onClick={() => setShowCalendly(false)}
              className="text-white/50 text-[15px] font-medium hover:text-white/80 transition-colors"
            >
              ← Back to results
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1628] flex flex-col">
      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(230,80%,56%)] to-[hsl(260,70%,60%)] flex items-center justify-center shadow-md">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">Credibility Suite</span>
        </div>
        <div className="text-[14px] text-white/50 font-mono">
          Step {step} of {TOTAL_STEPS}
        </div>
      </nav>

      {/* Progress bar */}
      <div className="px-6 mb-8">
        <div className="max-w-xl mx-auto h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#2563eb] to-[#38bdf8] rounded-full transition-all duration-500"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center px-6 pb-12">
        <div className="max-w-xl w-full animate-fade-up" key={step}>

          {/* STEP 1: Contact Info */}
          {step === 1 && (
            <div>
              <h2 className="text-[28px] font-extrabold text-white mb-2">Let's get to know you.</h2>
              <p className="text-[16px] text-white/60 mb-8">Tell us a bit about yourself and your business.</p>

              <div className="space-y-5">
                <div>
                  <label className="block text-[14px] font-semibold text-white/80 mb-2">Your Full Name *</label>
                  <input
                    type="text"
                    value={form.contactName}
                    onChange={e => update('contactName', e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3.5 text-[16px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#2563eb]/50 focus:ring-1 focus:ring-[#2563eb]/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-white/80 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => update('email', e.target.value)}
                    placeholder="jane@mybusiness.com"
                    className="w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3.5 text-[16px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#2563eb]/50 focus:ring-1 focus:ring-[#2563eb]/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-white/80 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => update('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    className="w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3.5 text-[16px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#2563eb]/50 focus:ring-1 focus:ring-[#2563eb]/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-white/80 mb-2">Business / Company Name *</label>
                  <input
                    type="text"
                    value={form.companyName}
                    onChange={e => update('companyName', e.target.value)}
                    placeholder="My Awesome Business LLC"
                    className="w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3.5 text-[16px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#2563eb]/50 focus:ring-1 focus:ring-[#2563eb]/30 transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Industry & NAICS */}
          {step === 2 && (
            <div>
              <h2 className="text-[28px] font-extrabold text-white mb-2">What industry are you in?</h2>
              <p className="text-[16px] text-white/60 mb-8">Select the category that best fits your business. This helps us tailor your guidance.</p>

              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
                {NAICS_INDUSTRIES.map(ind => (
                  <button
                    key={ind.code}
                    onClick={() => selectIndustry(ind.code, ind.label)}
                    className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                      form.naicsCode === ind.code
                        ? 'bg-[#2563eb]/15 border-[#2563eb]/40 text-white'
                        : 'bg-white/[0.04] border-white/[0.08] text-white/70 hover:bg-white/[0.07] hover:border-white/[0.15]'
                    }`}
                  >
                    <div>
                      <div className="text-[15px] font-semibold">{ind.label}</div>
                      <div className="text-[13px] text-white/40 mt-0.5">NAICS {ind.code}</div>
                    </div>
                    {form.naicsCode === ind.code && (
                      <div className="w-6 h-6 rounded-full bg-[#2563eb] flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Needs (Multi-Select) */}
          {step === 3 && (
            <div>
              <h2 className="text-[28px] font-extrabold text-white mb-2">What do you need help with?</h2>
              <p className="text-[16px] text-white/60 mb-8">Select all that apply — this helps us put you in the right path.</p>

              <div className="grid grid-cols-1 gap-3">
                {BUSINESS_NEEDS.map(need => (
                  <button
                    key={need.value}
                    onClick={() => toggleNeed(need.value)}
                    className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 flex items-center gap-4 ${
                      form.needs.includes(need.value)
                        ? 'bg-[#2563eb]/15 border-[#2563eb]/40 text-white'
                        : 'bg-white/[0.04] border-white/[0.08] text-white/70 hover:bg-white/[0.07] hover:border-white/[0.15]'
                    }`}
                  >
                    <span className="text-[24px]">{need.icon}</span>
                    <span className="text-[15px] font-semibold flex-1">{need.label}</span>
                    {form.needs.includes(need.value) && (
                      <div className="w-6 h-6 rounded-full bg-[#2563eb] flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Credit Score, Revenue, Time, Amount */}
          {step === 4 && (
            <div>
              <h2 className="text-[28px] font-extrabold text-white mb-2">A few more details.</h2>
              <p className="text-[16px] text-white/60 mb-8">This helps us understand where you are and what funnel fits best.</p>

              <div className="space-y-6">
                {/* Credit Score */}
                <div>
                  <label className="block text-[14px] font-semibold text-white/80 mb-2">Estimated Credit Score *</label>
                  <div className="space-y-2">
                    {CREDIT_SCORE_RANGES.map(cs => (
                      <button
                        key={cs.value}
                        onClick={() => update('creditScore', cs.value)}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 text-[15px] font-medium ${
                          form.creditScore === cs.value
                            ? 'bg-[#2563eb]/15 border-[#2563eb]/40 text-white'
                            : 'bg-white/[0.04] border-white/[0.08] text-white/60 hover:bg-white/[0.07]'
                        }`}
                      >
                        {cs.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time in Business */}
                <div>
                  <label className="block text-[14px] font-semibold text-white/80 mb-2">Time in Business *</label>
                  <div className="space-y-2">
                    {TIME_IN_BUSINESS.map(t => (
                      <button
                        key={t.value}
                        onClick={() => update('timeInBusiness', t.value)}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 text-[15px] font-medium ${
                          form.timeInBusiness === t.value
                            ? 'bg-[#2563eb]/15 border-[#2563eb]/40 text-white'
                            : 'bg-white/[0.04] border-white/[0.08] text-white/60 hover:bg-white/[0.07]'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Annual Revenue */}
                <div>
                  <label className="block text-[14px] font-semibold text-white/80 mb-2">Annual Revenue *</label>
                  <div className="space-y-2">
                    {ANNUAL_REVENUE.map(r => (
                      <button
                        key={r.value}
                        onClick={() => update('annualRevenue', r.value)}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 text-[15px] font-medium ${
                          form.annualRevenue === r.value
                            ? 'bg-[#2563eb]/15 border-[#2563eb]/40 text-white'
                            : 'bg-white/[0.04] border-white/[0.08] text-white/60 hover:bg-white/[0.07]'
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount Seeking */}
                <div>
                  <label className="block text-[14px] font-semibold text-white/80 mb-2">How much funding are you seeking?</label>
                  <div className="space-y-2">
                    {FUNDING_AMOUNTS.map(a => (
                      <button
                        key={a.value}
                        onClick={() => update('amountSeeking', a.value)}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 text-[15px] font-medium ${
                          form.amountSeeking === a.value
                            ? 'bg-[#2563eb]/15 border-[#2563eb]/40 text-white'
                            : 'bg-white/[0.04] border-white/[0.08] text-white/60 hover:bg-white/[0.07]'
                        }`}
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/[0.08]">
            {step > 1 ? (
              <button
                onClick={back}
                className="flex items-center gap-2 text-[15px] text-white/60 font-medium hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-[15px] text-white/60 font-medium hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Home
              </button>
            )}
            <button
              onClick={next}
              disabled={!canProceed() || submitting}
              className="bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white text-[15px] font-bold px-8 py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_8px_30px_hsl(220_80%_50%/0.3)] hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : step === TOTAL_STEPS ? (
                <>
                  See My Results
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntakePage;

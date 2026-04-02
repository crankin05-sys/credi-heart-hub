import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import ScrollReveal from '@/components/ScrollReveal';

const industries = [
  'Restaurant / Food Service',
  'Construction / Contracting',
  'Healthcare / Medical',
  'Professional Services',
  'Retail / E-Commerce',
  'Technology / Software',
  'Real Estate',
  'Transportation / Logistics',
  'Manufacturing',
  'Beauty / Personal Care',
  'Education / Training',
  'Other',
];

const capitalRanges = [
  'Under $25,000',
  '$25,000 – $50,000',
  '$50,000 – $100,000',
  '$100,000 – $250,000',
  '$250,000 – $500,000',
  '$500,000+',
];

const fundingPurposes = [
  'Working Capital',
  'Equipment Purchase',
  'Inventory',
  'Expansion / Growth',
  'Debt Refinancing',
  'Marketing / Advertising',
  'Hiring / Payroll',
  'Real Estate / Lease',
];

const TOTAL_STEPS = 5;

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Step 1: Personal info
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  // Step 2: Business info
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');

  // Step 3: Capital needs
  const [capitalRange, setCapitalRange] = useState('');
  const [fundingPurpose, setFundingPurpose] = useState<string[]>([]);

  // Step 4: Current status
  const [hasBusinessBank, setHasBusinessBank] = useState<boolean | null>(null);
  const [hasTaxReturns, setHasTaxReturns] = useState<boolean | null>(null);
  const [yearsInBusiness, setYearsInBusiness] = useState('');

  // Step 5: Create account
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePurpose = (p: string) => {
    setFundingPurpose(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  const capitalNeedNumeric = (range: string): number => {
    const map: Record<string, number> = {
      'Under $25,000': 25000,
      '$25,000 – $50,000': 50000,
      '$50,000 – $100,000': 100000,
      '$100,000 – $250,000': 250000,
      '$250,000 – $500,000': 500000,
      '$500,000+': 750000,
    };
    return map[range] || 50000;
  };

  const canProceed = () => {
    switch (step) {
      case 1: return fullName.trim().length > 0;
      case 2: return businessName.trim().length > 0 && industry.length > 0;
      case 3: return capitalRange.length > 0;
      case 4: return hasBusinessBank !== null && hasTaxReturns !== null && yearsInBusiness.length > 0;
      case 5: return email.trim().length > 0 && password.length >= 6;
      default: return false;
    }
  };

  const handleSignUp = async () => {
    setError('');
    setMessage('');
    setLoading(true);

    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: window.location.origin,
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // Build checklist based on answers
        const checklist = [
          { label: 'Business License / Registration', complete: false },
          { label: 'EIN / Tax ID', complete: false },
          { label: 'Business Bank Account', complete: hasBusinessBank || false },
          { label: 'Bank Statements (3 months)', complete: false },
          { label: 'Tax Returns (2 years)', complete: hasTaxReturns || false },
          { label: 'Profit & Loss Statement', complete: false },
          { label: 'Balance Sheet', complete: false },
          { label: 'Business Plan', complete: false },
          { label: 'Operating Agreement', complete: false },
          { label: 'Debt Schedule', complete: false },
          { label: 'Personal Financial Statement', complete: false },
          { label: 'Insurance Documentation', complete: false },
        ];

        const completedCount = checklist.filter(c => c.complete).length;
        const initialScore = Math.round((completedCount / checklist.length) * 40) + 10; // Base score

        // Create business record
        await supabase.from('businesses').insert({
          user_id: authData.user.id,
          name: businessName,
          industry,
          capital_need: capitalNeedNumeric(capitalRange),
          checklist,
          score: initialScore,
          status: 'assessment',
          notes: `Funding purpose: ${fundingPurpose.join(', ')}. Years in business: ${yearsInBusiness}. Capital range: ${capitalRange}.`,
          top_gap: hasBusinessBank ? (hasTaxReturns ? 'Financial Statements' : 'Tax Returns') : 'Business Bank Account',
        });

        // Update profile with phone
        if (phone) {
          await supabase.from('profiles').update({ phone }).eq('user_id', authData.user.id);
        }

        setMessage('Check your email for a verification link to complete sign up!');
      }
    } catch (e: any) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const next = () => {
    if (step === TOTAL_STEPS) {
      handleSignUp();
    } else {
      setStep(s => s + 1);
    }
  };

  const back = () => setStep(s => Math.max(1, s - 1));
  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-[999] overflow-auto py-8">
      {/* Background effects */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,hsl(var(--gold)/0.06)_0%,transparent_70%)]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-[radial-gradient(circle,hsl(var(--info)/0.04)_0%,transparent_70%)]" />

      <div className="w-full max-w-[480px] px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block no-underline">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-gold-lt flex items-center justify-center text-base font-black text-primary-foreground rounded-lg font-display shadow-[0_4px_16px_hsl(var(--gold)/0.25)]">
                CS
              </div>
              <div className="font-display text-xl font-bold text-foreground">
                Credibility Suite <span className="text-gradient-gold">AI</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-500 ${
                  i + 1 < step ? 'bg-primary text-primary-foreground shadow-[0_0_12px_hsl(var(--gold)/0.3)]'
                    : i + 1 === step ? 'bg-gradient-to-br from-primary to-gold-lt text-primary-foreground shadow-[0_0_16px_hsl(var(--gold)/0.3)] scale-110'
                    : 'bg-foreground/[0.06] text-foreground/30'
                }`}>
                  {i + 1 < step ? '✓' : i + 1}
                </div>
              </div>
            ))}
          </div>
          <div className="h-1 bg-foreground/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-gold-lt rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 animate-shimmer" />
            </div>
          </div>
          <div className="text-[10px] text-foreground/30 font-mono text-center mt-2 tracking-wide">
            Step {step} of {TOTAL_STEPS}
          </div>
        </div>

        {/* Step content */}
        <div className="glass-card rounded-2xl p-8 animate-fade-up" key={step}>
          {step === 1 && (
            <div>
              <div className="text-2xl mb-3">👋</div>
              <h2 className="font-display text-xl font-bold text-foreground mb-1">Let's get started</h2>
              <p className="text-xs text-foreground/40 mb-6">Tell us about yourself so we can personalize your experience.</p>
              
              <label className="block text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground mb-1.5 font-mono">Full Name *</label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="e.g. Sarah Johnson"
                className="w-full bg-background/50 border border-foreground/[0.08] text-foreground font-body text-sm px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-lg mb-4 placeholder:text-foreground/20"
              />

              <label className="block text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground mb-1.5 font-mono">Phone (Optional)</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="e.g. (404) 555-1234"
                className="w-full bg-background/50 border border-foreground/[0.08] text-foreground font-body text-sm px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-lg placeholder:text-foreground/20"
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="text-2xl mb-3">🏢</div>
              <h2 className="font-display text-xl font-bold text-foreground mb-1">About your business</h2>
              <p className="text-xs text-foreground/40 mb-6">We'll use this to set up your fundability profile.</p>
              
              <label className="block text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground mb-1.5 font-mono">Business Name *</label>
              <input
                type="text"
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
                placeholder="e.g. Johnson's Catering LLC"
                className="w-full bg-background/50 border border-foreground/[0.08] text-foreground font-body text-sm px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-lg mb-4 placeholder:text-foreground/20"
              />

              <label className="block text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground mb-1.5 font-mono">Industry *</label>
              <div className="grid grid-cols-2 gap-2">
                {industries.map(ind => (
                  <button
                    key={ind}
                    type="button"
                    onClick={() => setIndustry(ind)}
                    className={`text-left text-[11px] font-medium px-3 py-2.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                      industry === ind
                        ? 'border-primary bg-primary/[0.1] text-primary shadow-[0_0_12px_hsl(var(--gold)/0.1)]'
                        : 'border-foreground/[0.06] text-foreground/50 hover:border-foreground/15 hover:text-foreground/70 bg-transparent'
                    }`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="text-2xl mb-3">💰</div>
              <h2 className="font-display text-xl font-bold text-foreground mb-1">Capital needs</h2>
              <p className="text-xs text-foreground/40 mb-6">How much funding are you looking for?</p>
              
              <label className="block text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground mb-1.5 font-mono">Amount Needed *</label>
              <div className="grid grid-cols-2 gap-2 mb-5">
                {capitalRanges.map(range => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setCapitalRange(range)}
                    className={`text-left text-[11px] font-medium px-3 py-2.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                      capitalRange === range
                        ? 'border-primary bg-primary/[0.1] text-primary shadow-[0_0_12px_hsl(var(--gold)/0.1)]'
                        : 'border-foreground/[0.06] text-foreground/50 hover:border-foreground/15 bg-transparent'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>

              <label className="block text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground mb-1.5 font-mono">What's the funding for? (Select all)</label>
              <div className="grid grid-cols-2 gap-2">
                {fundingPurposes.map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => togglePurpose(p)}
                    className={`text-left text-[11px] font-medium px-3 py-2 rounded-lg border transition-all duration-200 cursor-pointer ${
                      fundingPurpose.includes(p)
                        ? 'border-primary bg-primary/[0.1] text-primary'
                        : 'border-foreground/[0.06] text-foreground/50 hover:border-foreground/15 bg-transparent'
                    }`}
                  >
                    {fundingPurpose.includes(p) ? '✓ ' : ''}{p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="text-2xl mb-3">📋</div>
              <h2 className="font-display text-xl font-bold text-foreground mb-1">Current status</h2>
              <p className="text-xs text-foreground/40 mb-6">This helps us calculate your initial fundability score.</p>
              
              <label className="block text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground mb-2 font-mono">Do you have a business bank account? *</label>
              <div className="flex gap-3 mb-5">
                {[true, false].map(val => (
                  <button
                    key={String(val)}
                    type="button"
                    onClick={() => setHasBusinessBank(val)}
                    className={`flex-1 text-sm font-medium py-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                      hasBusinessBank === val
                        ? 'border-primary bg-primary/[0.1] text-primary shadow-[0_0_12px_hsl(var(--gold)/0.1)]'
                        : 'border-foreground/[0.06] text-foreground/50 hover:border-foreground/15 bg-transparent'
                    }`}
                  >
                    {val ? '✓ Yes' : '✗ No'}
                  </button>
                ))}
              </div>

              <label className="block text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground mb-2 font-mono">Have you filed business tax returns? *</label>
              <div className="flex gap-3 mb-5">
                {[true, false].map(val => (
                  <button
                    key={String(val)}
                    type="button"
                    onClick={() => setHasTaxReturns(val)}
                    className={`flex-1 text-sm font-medium py-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                      hasTaxReturns === val
                        ? 'border-primary bg-primary/[0.1] text-primary shadow-[0_0_12px_hsl(var(--gold)/0.1)]'
                        : 'border-foreground/[0.06] text-foreground/50 hover:border-foreground/15 bg-transparent'
                    }`}
                  >
                    {val ? '✓ Yes' : '✗ No'}
                  </button>
                ))}
              </div>

              <label className="block text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground mb-1.5 font-mono">How long have you been in business? *</label>
              <div className="grid grid-cols-2 gap-2">
                {['Less than 1 year', '1-2 years', '2-5 years', '5+ years'].map(y => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => setYearsInBusiness(y)}
                    className={`text-left text-[11px] font-medium px-3 py-2.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                      yearsInBusiness === y
                        ? 'border-primary bg-primary/[0.1] text-primary shadow-[0_0_12px_hsl(var(--gold)/0.1)]'
                        : 'border-foreground/[0.06] text-foreground/50 hover:border-foreground/15 bg-transparent'
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <div className="text-2xl mb-3">🔐</div>
              <h2 className="font-display text-xl font-bold text-foreground mb-1">Create your account</h2>
              <p className="text-xs text-foreground/40 mb-6">Almost there! Create your login to access your personalized fundability dashboard.</p>
              
              <label className="block text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground mb-1.5 font-mono">Email *</label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder="you@company.com"
                className="w-full bg-background/50 border border-foreground/[0.08] text-foreground font-body text-sm px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-lg mb-4 placeholder:text-foreground/20"
              />

              <label className="block text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground mb-1.5 font-mono">Password * (min 6 characters)</label>
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                placeholder="••••••••"
                minLength={6}
                className="w-full bg-background/50 border border-foreground/[0.08] text-foreground font-body text-sm px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-lg mb-4 placeholder:text-foreground/20"
              />

              {/* Summary card */}
              <div className="glass rounded-xl p-4 mb-2">
                <div className="text-[9px] font-bold tracking-[2px] uppercase text-primary font-mono mb-2">Your Profile Summary</div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between"><span className="text-foreground/40">Name</span><span className="text-foreground font-medium">{fullName}</span></div>
                  <div className="flex justify-between"><span className="text-foreground/40">Business</span><span className="text-foreground font-medium">{businessName}</span></div>
                  <div className="flex justify-between"><span className="text-foreground/40">Industry</span><span className="text-foreground font-medium">{industry}</span></div>
                  <div className="flex justify-between"><span className="text-foreground/40">Capital</span><span className="text-primary font-bold">{capitalRange}</span></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-5">
          {step > 1 && (
            <button
              type="button"
              onClick={back}
              className="flex-shrink-0 bg-foreground/[0.04] text-foreground/60 border border-foreground/[0.08] font-body text-xs font-medium px-6 py-3 cursor-pointer rounded-lg transition-all hover:border-foreground/20 hover:text-foreground"
            >
              ← Back
            </button>
          )}
          <button
            type="button"
            onClick={next}
            disabled={!canProceed() || loading}
            className="flex-1 bg-gradient-to-r from-primary to-gold-lt text-primary-foreground border-none font-body text-xs font-bold py-3.5 cursor-pointer tracking-[1px] uppercase rounded-lg transition-all duration-300 hover:shadow-[0_8px_24px_hsl(var(--gold)/0.3)] hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {loading ? '⏳ Creating Account...' : step === TOTAL_STEPS ? 'Create Account & Get Started →' : 'Continue →'}
          </button>
        </div>

        {error && <p className="text-[11px] text-destructive text-center mt-3 glass rounded-lg px-3 py-2">{error}</p>}
        {message && <p className="text-[11px] text-success text-center mt-3 glass rounded-lg px-3 py-2">✓ {message}</p>}

        {/* Sign in link */}
        <p className="text-[11px] text-foreground/30 text-center mt-5">
          Already have an account?{' '}
          <Link to="/auth" className="text-primary font-bold hover:text-gold-lt transition-colors no-underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default OnboardingPage;

import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

/* ──────── scoring model ──────── */
const creditScoreOptions = [
  { label: '750+', value: 'excellent', points: 35 },
  { label: '700–749', value: 'good', points: 28 },
  { label: '650–699', value: 'fair', points: 18 },
  { label: '600–649', value: 'below_avg', points: 10 },
  { label: 'Below 600', value: 'poor', points: 4 },
  { label: "I don't know", value: 'unknown', points: 12 },
];

const revenueOptions = [
  { label: '$50k+ / month', value: '50k+', points: 35 },
  { label: '$25k–$50k / month', value: '25k-50k', points: 28 },
  { label: '$10k–$25k / month', value: '10k-25k', points: 20 },
  { label: '$5k–$10k / month', value: '5k-10k', points: 12 },
  { label: 'Under $5k / month', value: 'under5k', points: 5 },
  { label: 'Pre-revenue', value: 'pre', points: 2 },
];

const timeOptions = [
  { label: '5+ years', value: '5+', points: 30 },
  { label: '2–5 years', value: '2-5', points: 24 },
  { label: '1–2 years', value: '1-2', points: 16 },
  { label: '6–12 months', value: '6-12', points: 8 },
  { label: 'Less than 6 months', value: '<6', points: 3 },
];

const capitalPurposeOptions = [
  { label: 'Working Capital', value: 'working_capital' },
  { label: 'Equipment Purchase', value: 'equipment' },
  { label: 'Inventory', value: 'inventory' },
  { label: 'Expansion / Growth', value: 'expansion' },
  { label: 'Debt Refinancing', value: 'refinancing' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Hiring / Payroll', value: 'hiring' },
  { label: 'Real Estate / Lease', value: 'real_estate' },
];

const derogatoryOptions = [
  { label: 'None', value: 'none', penalty: 0 },
  { label: '1–2 items', value: '1-2', penalty: -8 },
  { label: '3–5 items', value: '3-5', penalty: -15 },
  { label: '6+ items', value: '6+', penalty: -25 },
  { label: "I don't know", value: 'unknown', penalty: -5 },
];

const getScoreLabel = (s: number) => {
  if (s >= 80) return { text: "Excellent — You're likely fundable!", color: 'text-success', emoji: '🔥' };
  if (s >= 60) return { text: 'Good — Almost there!', color: 'text-primary', emoji: '⚡' };
  if (s >= 40) return { text: "Building — Let's close the gaps", color: 'text-warning', emoji: '🚀' };
  return { text: "Getting Started — We'll guide you", color: 'text-foreground/60', emoji: '💡' };
};

/* ──────── Funding route logic ──────── */
const getFundingRoute = (credit: string, rev: string, derogs: string) => {
  const highCredit = ['excellent', 'good'].includes(credit);
  const highRevenue = ['50k+', '25k-50k', '10k-25k'].includes(rev);
  const cleanCredit = derogs === 'none';

  if (highCredit && cleanCredit) {
    return { route: 'standard', label: 'Standard SBA / Term Loan', color: 'text-success', icon: '🏦', desc: 'You qualify for traditional lending programs with the best rates.' };
  }
  if (highCredit && !cleanCredit) {
    return { route: 'credit-repair', label: 'Credit Repair → Standard', color: 'text-warning', icon: '🔧', desc: 'Strong credit but derogatories detected. Our Credit Sweep Agent can clear these in ~90 days.' };
  }
  if (!highCredit && highRevenue) {
    return { route: 'revenue-based', label: 'Revenue-Based Funding', color: 'text-info', icon: '💰', desc: 'Lower credit but strong revenue — you can qualify for revenue-based programs.' };
  }
  if (!highCredit && !highRevenue && !cleanCredit) {
    return { route: 'mca-fallback', label: 'MCA / Alternative Funding', color: 'text-warning', icon: '⚡', desc: 'Quick access funding available. We recommend also working on credit repair for better rates.' };
  }
  return { route: 'building', label: 'Build Your Profile', color: 'text-foreground/60', icon: '📈', desc: 'Let our AI agents guide you to build fundability from the ground up.' };
};

const OnboardingPage = () => {
  const navigate = useNavigate();
  type Phase = 'choose' | '1a' | '1b-q1' | '1b-q2' | '1b-result' | 'signup' | 'pricing';
  const [phase, setPhase] = useState<Phase>('choose');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /* 1A fields */
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [emailField, setEmailField] = useState('');
  const [phone, setPhone] = useState('');

  /* 1B fields — Stage 1 (3 core) */
  const [creditScore, setCreditScore] = useState('');
  const [revenue, setRevenue] = useState('');
  const [timeInBusiness, setTimeInBusiness] = useState('');

  /* 1B fields — Stage 2 (underwriting) */
  const [derogatories, setDerogatories] = useState('');
  const [capitalPurpose, setCapitalPurpose] = useState('');
  const [hasBusinessPlan, setHasBusinessPlan] = useState('');
  const [hasProjections, setHasProjections] = useState('');
  const [founderExpertise, setFounderExpertise] = useState('');
  const [incomeVerifiable, setIncomeVerifiable] = useState('');

  /* signup */
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const fundabilityScore = useMemo(() => {
    const cs = creditScoreOptions.find(o => o.value === creditScore)?.points || 0;
    const rv = revenueOptions.find(o => o.value === revenue)?.points || 0;
    const tb = timeOptions.find(o => o.value === timeInBusiness)?.points || 0;
    const dp = derogatoryOptions.find(o => o.value === derogatories)?.penalty || 0;

    // Underwriting bonuses
    let bonus = 0;
    if (hasBusinessPlan === 'yes') bonus += 3;
    if (hasProjections === 'yes') bonus += 3;
    if (founderExpertise === 'expert' || founderExpertise === 'experienced') bonus += 3;
    if (incomeVerifiable === 'yes') bonus += 4;

    return Math.max(0, Math.min(100, cs + rv + tb + dp + bonus));
  }, [creditScore, revenue, timeInBusiness, derogatories, hasBusinessPlan, hasProjections, founderExpertise, incomeVerifiable]);

  const scoreInfo = getScoreLabel(fundabilityScore);
  const fundingRoute = getFundingRoute(creditScore, revenue, derogatories);

  const handleSignUp = async () => {
    setError('');
    setLoading(true);
    try {
      const name = fullName || companyName || 'My Business';
      const email = signupEmail || emailField;
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: signupPassword,
        options: { data: { full_name: fullName }, emailRedirectTo: window.location.origin },
      });
      if (authError) throw authError;
      if (!authData.user) throw new Error('Unable to create your account.');

      if (!authData.session) {
        setError('Check your email for a verification link.');
        setLoading(false);
        return;
      }

      const checklist = [
        { label: 'Business License / Registration', complete: false },
        { label: 'EIN / Tax ID', complete: false },
        { label: 'Business Bank Account', complete: false },
        { label: 'Bank Statements (3 months)', complete: false },
        { label: 'Tax Returns (2 years)', complete: false },
        { label: 'Profit & Loss Statement', complete: false },
        { label: 'Balance Sheet', complete: false },
        { label: 'Business Plan', complete: hasBusinessPlan === 'yes' },
        { label: 'Financial Projections', complete: hasProjections === 'yes' },
        { label: 'Operating Agreement', complete: false },
        { label: 'Debt Schedule', complete: false },
        { label: 'Personal Financial Statement', complete: false },
        { label: 'Insurance Documentation', complete: false },
      ];

      const notesArr = [
        `Credit: ${creditScore}`,
        `Revenue: ${revenue}`,
        `Time: ${timeInBusiness}`,
        `Derogatories: ${derogatories}`,
        `Capital purpose: ${capitalPurpose}`,
        `Business plan: ${hasBusinessPlan}`,
        `Projections: ${hasProjections}`,
        `Founder expertise: ${founderExpertise}`,
        `Income verifiable: ${incomeVerifiable}`,
        `Funding route: ${fundingRoute.route}`,
      ];

      await supabase.from('businesses').insert({
        user_id: authData.user.id,
        name: companyName || name,
        industry: null,
        capital_need: null,
        checklist,
        score: fundabilityScore || 10,
        status: 'assessment',
        notes: notesArr.join('. '),
        top_gap: derogatories !== 'none' ? 'Credit Repair' : 'Business Bank Account',
        loan_product: fundingRoute.route,
      });

      if (phone) {
        await supabase.from('profiles').update({ phone }).eq('user_id', authData.user.id);
      }

      navigate('/dashboard', { replace: true });
    } catch (e: any) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  /* ──────── Shared UI helpers ──────── */
  const InputField = ({ label, value, onChange, placeholder, type = 'text', required = false }: any) => (
    <div className="mb-4">
      <label className="block text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground mb-1.5 font-mono">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e: any) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-background/50 border border-foreground/[0.08] text-foreground font-body text-sm px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-xl placeholder:text-foreground/20"
      />
    </div>
  );

  const OptionGrid = ({ options, selected, onSelect, cols = 2 }: { options: { label: string; value: string }[]; selected: string; onSelect: (v: string) => void; cols?: number }) => (
    <div className={`grid gap-2.5 ${cols === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onSelect(opt.value)}
          className={`text-left text-[12px] font-medium px-4 py-3 rounded-xl border transition-all duration-300 cursor-pointer ${
            selected === opt.value
              ? 'border-primary bg-primary/[0.12] text-primary shadow-[0_0_20px_hsl(var(--gold)/0.15)] scale-[1.02]'
              : 'border-foreground/[0.06] text-foreground/50 hover:border-foreground/15 hover:text-foreground/70 bg-transparent'
          }`}
        >
          {selected === opt.value && '✓ '}{opt.label}
        </button>
      ))}
    </div>
  );

  const YesNoSelect = ({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) => (
    <div className="flex gap-2.5">
      {[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }].map(opt => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onSelect(opt.value)}
          className={`flex-1 text-[12px] font-medium py-3 rounded-xl border transition-all duration-300 cursor-pointer ${
            selected === opt.value
              ? 'border-primary bg-primary/[0.12] text-primary shadow-[0_0_20px_hsl(var(--gold)/0.15)]'
              : 'border-foreground/[0.06] text-foreground/50 hover:border-foreground/15 bg-transparent'
          }`}
        >
          {selected === opt.value ? '✓ ' : ''}{opt.label}
        </button>
      ))}
    </div>
  );

  const ScoreRing = ({ score }: { score: number }) => {
    const r = 54;
    const c = 2 * Math.PI * r;
    const offset = c - (c * score) / 100;
    return (
      <div className="relative w-36 h-36 mx-auto">
        <svg viewBox="0 0 128 128" className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="64" cy="64" r={r} fill="none" stroke="hsl(var(--foreground) / 0.06)" strokeWidth="8" />
          <circle cx="64" cy="64" r={r} fill="none" stroke="url(#onb-grad)" strokeWidth="8" strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={offset} className="transition-all duration-1000 ease-out" />
          <defs>
            <linearGradient id="onb-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--gold-lt))" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-4xl font-extrabold text-gradient-gold leading-none">{score}</span>
          <span className="text-[9px] text-foreground/30 uppercase tracking-[2px] font-mono mt-1">out of 100</span>
        </div>
      </div>
    );
  };

  const BackBtn = ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick} className="flex-shrink-0 bg-foreground/[0.04] text-foreground/60 border border-foreground/[0.08] font-body text-xs font-medium px-6 py-3 cursor-pointer rounded-xl transition-all hover:border-foreground/20">← Back</button>
  );

  const PrimaryBtn = ({ onClick, disabled, children }: any) => (
    <button onClick={onClick} disabled={disabled}
      className="flex-1 bg-gradient-to-r from-primary to-gold-lt text-primary-foreground border-none font-body text-xs font-bold py-3.5 cursor-pointer tracking-[1px] uppercase rounded-xl transition-all duration-300 hover:shadow-[0_8px_28px_hsl(var(--gold)/0.3)] hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed btn-aurora relative overflow-hidden">
      <span className="relative">{children}</span>
    </button>
  );

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-[999] overflow-auto py-8">
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,hsl(var(--gold)/0.06)_0%,transparent_70%)] animate-[neon-pulse_6s_ease-in-out_infinite]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-[radial-gradient(circle,hsl(var(--info)/0.05)_0%,transparent_70%)] animate-[neon-pulse_8s_ease-in-out_infinite]" />
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="w-full max-w-[520px] px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-block no-underline">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-gold-lt flex items-center justify-center text-base font-black text-primary-foreground rounded-xl font-display shadow-[0_4px_20px_hsl(var(--gold)/0.3)]">CS</div>
              <div className="font-display text-xl font-bold text-foreground">Credibility Suite <span className="text-gradient-gold">AI</span></div>
            </div>
          </Link>
        </div>

        {/* ─── Choose Path ─── */}
        {phase === 'choose' && (
          <div className="animate-fade-up">
            <div className="text-center mb-8">
              <h1 className="font-display text-2xl md:text-3xl font-extrabold text-foreground mb-2">
                Let's Get You <span className="text-gradient-gold">Funded</span>
              </h1>
              <p className="text-sm text-foreground/40 max-w-sm mx-auto">Choose how you'd like to start. Either way, we'll show you your path to fundability.</p>
            </div>
            <div className="grid gap-4">
              <button onClick={() => setPhase('1a')} className="group neon-card rounded-2xl p-6 text-left cursor-pointer transition-all duration-500 hover:border-primary/40 hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-gold-lt/20 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">🏢</div>
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors">Quick Business Canvas</h3>
                    <p className="text-xs text-foreground/40 leading-relaxed">Enter your basic info and get an instant Business Model Canvas — see your strengths at a glance.</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-[9px] font-bold uppercase tracking-[1.5px] text-primary bg-primary/10 px-2.5 py-1 rounded-full">~1 min</span>
                      <span className="text-[9px] text-foreground/25 font-mono">5 fields</span>
                    </div>
                  </div>
                </div>
              </button>
              <button onClick={() => setPhase('1b-q1')} className="group neon-card rounded-2xl p-6 text-left cursor-pointer transition-all duration-500 hover:border-gold-lt/40 hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-3 right-3">
                  <span className="text-[8px] font-bold uppercase tracking-[1.5px] text-primary-foreground bg-gradient-to-r from-primary to-gold-lt px-2.5 py-1 rounded-full shadow-[0_2px_12px_hsl(var(--gold)/0.3)]">⭐ Recommended</span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-lt/20 to-primary/20 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">📊</div>
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground mb-1 group-hover:text-gradient-gold transition-colors">Fundability Assessment</h3>
                    <p className="text-xs text-foreground/40 leading-relaxed">Answer quick questions to get your fundability score and see which funding programs you qualify for.</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-[9px] font-bold uppercase tracking-[1.5px] text-primary bg-primary/10 px-2.5 py-1 rounded-full">~2 min</span>
                      <span className="text-[9px] text-foreground/25 font-mono">2 quick steps</span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
            <p className="text-[11px] text-foreground/25 text-center mt-6">
              Already have an account? <Link to="/auth" className="text-primary font-bold hover:text-gold-lt transition-colors no-underline">Sign In</Link>
            </p>
          </div>
        )}

        {/* ─── 1A — Basic Info ─── */}
        {phase === '1a' && (
          <div className="animate-fade-up">
            <div className="glass-card rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl">🏢</div>
                <div>
                  <h2 className="font-display text-lg font-bold text-foreground">Basic Business Info</h2>
                  <p className="text-[11px] text-foreground/35">We'll generate your Business Model Canvas.</p>
                </div>
              </div>
              <InputField label="Your Full Name" value={fullName} onChange={setFullName} placeholder="e.g. Sarah Johnson" required />
              <InputField label="Company Name" value={companyName} onChange={setCompanyName} placeholder="e.g. Johnson's Catering LLC" required />
              <InputField label="Website" value={website} onChange={setWebsite} placeholder="e.g. www.example.com" />
              <InputField label="Email" value={emailField} onChange={setEmailField} placeholder="you@company.com" type="email" required />
              <InputField label="Phone" value={phone} onChange={setPhone} placeholder="(404) 555-1234" type="tel" />
            </div>
            <div className="flex gap-3 mt-5">
              <BackBtn onClick={() => setPhase('choose')} />
              <PrimaryBtn onClick={() => { setSignupEmail(emailField); setPhase('signup'); }} disabled={!fullName.trim() || !companyName.trim() || !emailField.trim()}>
                Generate My Canvas →
              </PrimaryBtn>
            </div>
          </div>
        )}

        {/* ─── 1B Step 1 — Three Core Questions ─── */}
        {phase === '1b-q1' && (
          <div className="animate-fade-up">
            <div className="glass-card rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-gold-lt/20 flex items-center justify-center text-xl">📊</div>
                <div>
                  <h2 className="font-display text-lg font-bold text-foreground">Fundability Check</h2>
                  <p className="text-[11px] text-foreground/35">Step 1 of 2 — Core metrics</p>
                </div>
              </div>
              {/* Progress dots */}
              <div className="flex items-center gap-2 mb-6">
                <div className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-primary to-gold-lt" />
                <div className="h-1.5 flex-1 rounded-full bg-foreground/[0.06]" />
              </div>

              <div className="mb-6">
                <label className="block text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground mb-2.5 font-mono">1. What's your personal credit score?</label>
                <OptionGrid options={creditScoreOptions} selected={creditScore} onSelect={setCreditScore} />
              </div>
              <div className="mb-6">
                <label className="block text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground mb-2.5 font-mono">2. What's your monthly revenue?</label>
                <OptionGrid options={revenueOptions} selected={revenue} onSelect={setRevenue} />
              </div>
              <div>
                <label className="block text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground mb-2.5 font-mono">3. How long have you been in business?</label>
                <OptionGrid options={timeOptions} selected={timeInBusiness} onSelect={setTimeInBusiness} />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <BackBtn onClick={() => setPhase('choose')} />
              <PrimaryBtn onClick={() => setPhase('1b-q2')} disabled={!creditScore || !revenue || !timeInBusiness}>
                Next Step →
              </PrimaryBtn>
            </div>
          </div>
        )}

        {/* ─── 1B Step 2 — Underwriting & Viability ─── */}
        {phase === '1b-q2' && (
          <div className="animate-fade-up">
            <div className="glass-card rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-info/20 to-primary/20 flex items-center justify-center text-xl">🔍</div>
                <div>
                  <h2 className="font-display text-lg font-bold text-foreground">Deeper Assessment</h2>
                  <p className="text-[11px] text-foreground/35">Step 2 of 2 — Helps us match you to the right programs</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <div className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-primary to-gold-lt" />
                <div className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-primary to-gold-lt" />
              </div>

              <div className="mb-5">
                <label className="block text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground mb-2.5 font-mono">4. Any derogatories or collections on your credit?</label>
                <OptionGrid options={derogatoryOptions} selected={derogatories} onSelect={setDerogatories} cols={3} />
              </div>

              <div className="mb-5">
                <label className="block text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground mb-2.5 font-mono">5. Primary purpose for capital?</label>
                <OptionGrid options={capitalPurposeOptions} selected={capitalPurpose} onSelect={setCapitalPurpose} />
              </div>

              <div className="mb-5">
                <label className="block text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground mb-2.5 font-mono">6. Can you verify your income (tax returns, bank statements)?</label>
                <YesNoSelect selected={incomeVerifiable} onSelect={setIncomeVerifiable} />
              </div>

              <div className="mb-5">
                <label className="block text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground mb-2.5 font-mono">7. Do you have a business plan?</label>
                <YesNoSelect selected={hasBusinessPlan} onSelect={setHasBusinessPlan} />
              </div>

              <div className="mb-5">
                <label className="block text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground mb-2.5 font-mono">8. Do you have financial projections?</label>
                <YesNoSelect selected={hasProjections} onSelect={setHasProjections} />
              </div>

              <div>
                <label className="block text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground mb-2.5 font-mono">9. Your expertise in this industry?</label>
                <OptionGrid options={[
                  { label: 'Expert (10+ yrs)', value: 'expert' },
                  { label: 'Experienced (3–10 yrs)', value: 'experienced' },
                  { label: 'Some experience', value: 'some' },
                  { label: 'New to industry', value: 'new' },
                ]} selected={founderExpertise} onSelect={setFounderExpertise} />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <BackBtn onClick={() => setPhase('1b-q1')} />
              <PrimaryBtn onClick={() => setPhase('1b-result')} disabled={!derogatories || !capitalPurpose || !incomeVerifiable}>
                See My Results →
              </PrimaryBtn>
            </div>
          </div>
        )}

        {/* ─── 1B Result — Score + Funding Route ─── */}
        {phase === '1b-result' && (
          <div className="animate-fade-up">
            <div className="neon-card rounded-2xl p-8 text-center animate-breathe">
              <div className="mb-2 text-3xl">{scoreInfo.emoji}</div>
              <h2 className="font-display text-xl font-bold text-foreground mb-6">Your Fundability Likelihood</h2>

              <ScoreRing score={fundabilityScore} />

              <div className={`font-display text-base font-bold mt-5 ${scoreInfo.color}`}>{scoreInfo.text}</div>

              {/* Funding Route Card */}
              <div className="glass rounded-xl p-4 mt-6 text-left">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{fundingRoute.icon}</span>
                  <div>
                    <div className="text-[8px] text-foreground/30 uppercase tracking-[1.5px] font-mono">Recommended Path</div>
                    <div className={`text-sm font-bold ${fundingRoute.color}`}>{fundingRoute.label}</div>
                  </div>
                </div>
                <p className="text-[11px] text-foreground/45 leading-relaxed">{fundingRoute.desc}</p>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-3 gap-2 mt-5">
                {[
                  { label: 'Credit', val: creditScoreOptions.find(o => o.value === creditScore)?.label },
                  { label: 'Revenue', val: revenueOptions.find(o => o.value === revenue)?.label },
                  { label: 'Derogatories', val: derogatoryOptions.find(o => o.value === derogatories)?.label },
                ].map((item, i) => (
                  <div key={i} className="glass rounded-xl px-3 py-2">
                    <div className="text-[8px] text-foreground/30 uppercase tracking-[1.5px] font-mono mb-0.5">{item.label}</div>
                    <div className="text-[10px] font-bold text-foreground/70">{item.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <BackBtn onClick={() => setPhase('1b-q2')} />
              <PrimaryBtn onClick={() => setPhase('pricing')}>
                Unlock Full Dashboard →
              </PrimaryBtn>
            </div>
          </div>
        )}

        {/* ─── Pricing ─── */}
        {phase === 'pricing' && (
          <div className="animate-fade-up">
            <div className="text-center mb-6">
              <h2 className="font-display text-2xl font-extrabold text-foreground mb-2">Unlock <span className="text-gradient-gold">My Fundability</span></h2>
              <p className="text-xs text-foreground/40">Full access to your dashboard, 5 AI agents, and guided path to funding.</p>
            </div>
            <div className="gradient-border rounded-2xl">
              <div className="bg-[hsl(218_55%_12%)] rounded-2xl p-7">
                <div className="flex items-baseline gap-1 justify-center mb-1">
                  <span className="font-display text-4xl font-extrabold text-gradient-gold">$99</span>
                  <span className="text-sm text-foreground/40 font-medium">/month</span>
                </div>
                <p className="text-[11px] text-foreground/30 text-center mb-6">Cancel anytime · No setup fees</p>
                <div className="space-y-3 mb-7">
                  {[
                    '📊 Full Fundability Dashboard & Score',
                    '🤖 5 AI Agents: Fundability, Capital, Financial, Execution, Growth',
                    '🔍 Deep assessment with funding program routing',
                    '💰 AI-powered capital matching by credit & revenue',
                    '🔧 Credit Sweep Agent — clear derogatories in ~90 days',
                    '📄 Document tracking & verification',
                    '🎯 Personalized action plan with checklists',
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-[12px] text-foreground/60">
                      <span className="text-success text-sm">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
                <button onClick={() => setPhase('signup')}
                  className="w-full bg-gradient-to-r from-primary to-gold-lt text-primary-foreground border-none font-body text-sm font-bold py-4 cursor-pointer tracking-[1px] uppercase rounded-xl transition-all duration-300 hover:shadow-[0_12px_40px_hsl(var(--gold)/0.35)] hover:-translate-y-1 btn-aurora relative overflow-hidden">
                  <span className="relative">Start My Free Trial →</span>
                </button>
                <p className="text-[10px] text-foreground/25 text-center mt-3">7-day free trial · Billed monthly after</p>
              </div>
            </div>
            <button onClick={() => setPhase('1b-result')} className="w-full text-[11px] text-foreground/30 text-center mt-4 cursor-pointer hover:text-foreground/50 transition-colors bg-transparent border-none">
              ← Back to my score
            </button>
          </div>
        )}

        {/* ─── Sign Up ─── */}
        {phase === 'signup' && (
          <div className="animate-fade-up">
            <div className="glass-card rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center text-xl">🔐</div>
                <div>
                  <h2 className="font-display text-lg font-bold text-foreground">Create Your Account</h2>
                  <p className="text-[11px] text-foreground/35">Last step — access your personalized dashboard.</p>
                </div>
              </div>
              {!fullName && <InputField label="Full Name" value={fullName} onChange={setFullName} placeholder="e.g. Sarah Johnson" required />}
              {!companyName && <InputField label="Company Name" value={companyName} onChange={setCompanyName} placeholder="e.g. Johnson's Catering LLC" required />}
              <InputField label="Email" value={signupEmail} onChange={(v: string) => { setSignupEmail(v); setError(''); }} placeholder="you@company.com" type="email" required />
              <div className="mb-4">
                <label className="block text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground mb-1.5 font-mono">Password * (min 6 characters)</label>
                <input type="password" value={signupPassword} onChange={e => { setSignupPassword(e.target.value); setError(''); }} placeholder="••••••••" minLength={6}
                  className="w-full bg-background/50 border border-foreground/[0.08] text-foreground font-body text-sm px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-xl placeholder:text-foreground/20" />
              </div>

              {/* Score + route preview */}
              {fundabilityScore > 0 && (
                <div className="glass rounded-xl p-4 mb-2">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-14 h-14 flex-shrink-0">
                      <svg viewBox="0 0 128 128" className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx="64" cy="64" r="54" fill="none" stroke="hsl(var(--foreground) / 0.06)" strokeWidth="6" />
                        <circle cx="64" cy="64" r="54" fill="none" stroke="hsl(var(--primary))" strokeWidth="6" strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 54} strokeDashoffset={2 * Math.PI * 54 - (2 * Math.PI * 54 * fundabilityScore) / 100} />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[9px] text-foreground/30 uppercase tracking-[1.5px] font-mono">Your Fundability</div>
                      <div className="font-display text-xl font-bold text-gradient-gold">{fundabilityScore}/100</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span>{fundingRoute.icon}</span>
                    <span className={`font-bold ${fundingRoute.color}`}>{fundingRoute.label}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-5">
              <BackBtn onClick={() => setPhase(fundabilityScore > 0 ? 'pricing' : 'choose')} />
              <PrimaryBtn onClick={handleSignUp} disabled={loading || !signupEmail.trim() || signupPassword.length < 6 || (!fullName.trim() && !companyName.trim())}>
                {loading ? '⏳ Creating...' : 'Create Account & Get Started →'}
              </PrimaryBtn>
            </div>
            {error && <p className="text-[11px] text-destructive text-center mt-3 glass rounded-xl px-3 py-2">{error}</p>}
            <p className="text-[11px] text-foreground/25 text-center mt-5">
              Already have an account? <Link to="/auth" className="text-primary font-bold hover:text-gold-lt transition-colors no-underline">Sign In</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;

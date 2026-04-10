import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

/* ──────── scoring options ──────── */
const creditScoreOptions = [
  { label: '780+', value: '780+', points: 10 },
  { label: '740–779', value: '740-779', points: 8 },
  { label: '680–739', value: '680-739', points: 6 },
  { label: '600–680', value: '600-680', points: 4 },
  { label: 'Below 600', value: '<600', points: 2 },
];

const revenueOptions = [
  { label: '$1M+', value: '1m+', points: 10 },
  { label: '$250K – $1M', value: '250k-1m', points: 8 },
  { label: '$100K – $250K', value: '100k-250k', points: 6 },
  { label: 'Under $100K', value: 'under100k', points: 4 },
  { label: 'Pre-revenue', value: 'pre', points: 2 },
];

const timeOptions = [
  { label: '10+ years', value: '10+', points: 10 },
  { label: '2–10 years', value: '2-10', points: 8 },
  { label: 'Less than 2 years', value: '<2', points: 4 },
  { label: 'Not started yet', value: 'not-started', points: 1 },
];

const getScoreLabel = (s: number) => {
  if (s >= 80) return { text: "Excellent — You're highly fundable!", tier: 'Tier 1', color: 'text-emerald-600', bg: 'bg-emerald-50', emoji: '🔥' };
  if (s >= 60) return { text: 'Good — Strong foundation', tier: 'Tier 2', color: 'text-blue-600', bg: 'bg-blue-50', emoji: '⚡' };
  if (s >= 40) return { text: "Building — Let's close the gaps", tier: 'Tier 3', color: 'text-amber-600', bg: 'bg-amber-50', emoji: '🚀' };
  return { text: 'Getting Started — We can help', tier: 'Tier 4', color: 'text-gray-500', bg: 'bg-gray-50', emoji: '💡' };
};

/* ──────── Canvas generator (mock AI) ──────── */
const generateCanvas = (revenue: string, time: string, businessName: string) => {
  const isEstablished = ['10+', '2-10'].includes(time);
  const hasRevenue = !['pre', 'under100k'].includes(revenue);
  return {
    valueProposition: hasRevenue
      ? `${businessName} delivers proven value with an established revenue model and market traction.`
      : `${businessName} is positioned to capture market share with a fresh approach and growth potential.`,
    customerSegments: isEstablished
      ? 'Established customer base with repeat buyers and referral networks'
      : 'Early adopters and initial market segment — room to expand',
    revenueStreams: hasRevenue
      ? 'Active revenue streams generating consistent income'
      : 'Revenue model in development — focus on first sales and validation',
    keyActivities: isEstablished
      ? 'Operations, customer fulfillment, scaling systems'
      : 'Product development, market validation, customer acquisition',
    keyResources: hasRevenue
      ? 'Team, technology, customer relationships, brand equity'
      : 'Founder expertise, initial capital, development tools',
    channels: isEstablished
      ? 'Direct sales, partnerships, digital marketing, referrals'
      : 'Social media, direct outreach, online presence building',
    growthOpportunities: hasRevenue
      ? 'Expand product lines, enter new markets, build recurring revenue'
      : 'Validate product-market fit, build initial customer base, secure funding',
    gapsRisks: !hasRevenue
      ? 'Pre-revenue risk — need to establish cash flow quickly'
      : isEstablished
        ? 'Scaling risk — systems may need upgrading for next growth phase'
        : 'Growth stage risk — capital allocation and operational efficiency',
  };
};

/* ──────── Insights generator ──────── */
const generateInsights = (credit: string, revenue: string, time: string) => {
  const insights: string[] = [];
  const highCredit = ['780+', '740-779'].includes(credit);
  const hasRevenue = !['pre', 'under100k'].includes(revenue);
  const established = ['10+', '2-10'].includes(time);

  if (highCredit && hasRevenue) insights.push('You are strong in credit and revenue — excellent foundation for traditional lending.');
  else if (highCredit && !hasRevenue) insights.push('Strong credit but revenue needs growth — focus on sales acceleration.');
  else if (!highCredit && hasRevenue) insights.push('Revenue is solid but credit needs work — consider credit repair first.');
  else insights.push('Both credit and revenue need attention — start with quick wins in each area.');

  if (established) insights.push('Your business longevity is a major strength for lenders.');
  else insights.push('Newer businesses can still qualify — we will show you the right programs.');

  if (hasRevenue && !highCredit) insights.push('Biggest opportunity: fix credit score while leveraging revenue-based funding.');
  if (highCredit && hasRevenue) insights.push('You may qualify for SBA loans with the best rates available.');
  if (!hasRevenue) insights.push('Focus: build recurring revenue streams and organize financials.');

  return insights;
};

/* ──────── Deep question options ──────── */
const businessLocationOpts = [
  { label: 'Home', value: 'home' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Virtual', value: 'virtual' },
  { label: 'Not started', value: 'not-started' },
];
const stageOpts = [
  { label: 'Idea', value: 'idea' },
  { label: 'Early', value: 'early' },
  { label: 'Growing', value: 'growing' },
  { label: 'Established', value: 'established' },
];
const profitableOpts = [
  { label: 'Yes', value: 'yes' },
  { label: 'Break-even', value: 'breakeven' },
  { label: 'No', value: 'no' },
];
const financialsOpts = [
  { label: 'Fully organized', value: 'organized' },
  { label: 'Somewhat', value: 'somewhat' },
  { label: 'Not at all', value: 'not-at-all' },
];
const cashflowOpts = [
  { label: 'Consistent', value: 'consistent' },
  { label: 'Fluctuating', value: 'fluctuating' },
  { label: 'Unpredictable', value: 'unpredictable' },
];
const customerOpts = [
  { label: 'Consumers', value: 'consumers' },
  { label: 'Businesses', value: 'businesses' },
  { label: 'Government', value: 'government' },
  { label: 'Mixed', value: 'mixed' },
];
const revenueModelOpts = [
  { label: 'One-time sales', value: 'one-time' },
  { label: 'Recurring', value: 'recurring' },
  { label: 'Mixed', value: 'mixed' },
  { label: 'Not yet generating', value: 'none' },
];
const bottleneckOpts = [
  { label: 'Customers', value: 'customers' },
  { label: 'Operations', value: 'operations' },
  { label: 'Capital', value: 'capital' },
  { label: 'Systems', value: 'systems' },
  { label: 'Team', value: 'team' },
];
const fundingPurposeOpts = [
  { label: 'Working Capital', value: 'working_capital' },
  { label: 'Equipment', value: 'equipment' },
  { label: 'Inventory', value: 'inventory' },
  { label: 'Expansion', value: 'expansion' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Hiring', value: 'hiring' },
  { label: 'Real Estate', value: 'real_estate' },
  { label: 'Debt Refinancing', value: 'refinancing' },
];
const fundingTimelineOpts = [
  { label: 'ASAP', value: 'asap' },
  { label: '30–60 days', value: '30-60' },
  { label: '2–6 months', value: '2-6' },
  { label: 'Just planning', value: 'planning' },
];

const agentModules = [
  { id: 'fundability', icon: '📊', name: 'Fundability Agent', desc: 'Improves your funding score, identifies exact blockers, shows approval pathways', color: 'border-blue-200 bg-blue-50' },
  { id: 'capital', icon: '🎯', name: 'Capital Matching Agent', desc: 'Matches you to real funding options, shows amounts + likelihood, routes deals', color: 'border-emerald-200 bg-emerald-50' },
  { id: 'financial', icon: '💰', name: 'Financial Health Agent', desc: 'Analyzes cash flow + profitability, recommends fixes', color: 'border-amber-200 bg-amber-50' },
  { id: 'docs', icon: '📄', name: 'Documentation Agent', desc: 'Prepares you for underwriting, identifies missing docs', color: 'border-purple-200 bg-purple-50' },
  { id: 'growth', icon: '📈', name: 'Growth Strategy Agent', desc: 'Builds revenue strategy, improves business model', color: 'border-pink-200 bg-pink-50' },
  { id: 'execution', icon: '⚡', name: 'Execution Agent', desc: 'Weekly action plan, "what to do next" guidance', color: 'border-cyan-200 bg-cyan-50' },
];

type Phase = 'contact' | 'snapshot' | 'results' | 'paywall' | 'deep-a' | 'deep-b' | 'deep-c' | 'deep-d' | 'signup';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('contact');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Step 1: Contact
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [website, setWebsite] = useState('');
  const [noWebsite, setNoWebsite] = useState(false);

  // Step 2: Snapshot
  const [creditScore, setCreditScore] = useState('');
  const [revenue, setRevenue] = useState('');
  const [timeInBusiness, setTimeInBusiness] = useState('');

  // Deep questions
  const [bizDescription, setBizDescription] = useState('');
  const [bizLocation, setBizLocation] = useState('');
  const [bizStage, setBizStage] = useState('');
  const [profitable, setProfitable] = useState('');
  const [financials, setFinancials] = useState('');
  const [cashflow, setCashflow] = useState('');
  const [customers, setCustomers] = useState('');
  const [revenueModel, setRevenueModel] = useState('');
  const [bottleneck, setBottleneck] = useState('');
  const [fundingPurposes, setFundingPurposes] = useState<string[]>([]);
  const [fundingTimeline, setFundingTimeline] = useState('');

  // Signup
  const [signupPassword, setSignupPassword] = useState('');

  const fundabilityScore = useMemo(() => {
    const cs = creditScoreOptions.find(o => o.value === creditScore)?.points || 0;
    const rv = revenueOptions.find(o => o.value === revenue)?.points || 0;
    const tb = timeOptions.find(o => o.value === timeInBusiness)?.points || 0;
    return Math.round(((cs + rv + tb) / 30) * 100);
  }, [creditScore, revenue, timeInBusiness]);

  const scoreInfo = getScoreLabel(fundabilityScore);
  const canvas = useMemo(() => generateCanvas(revenue, timeInBusiness, businessName || 'Your Business'), [revenue, timeInBusiness, businessName]);
  const insights = useMemo(() => generateInsights(creditScore, revenue, timeInBusiness), [creditScore, revenue, timeInBusiness]);

  const handleSignUp = async () => {
    setError('');
    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: signupPassword,
        options: { data: { full_name: `${firstName} ${lastName}` }, emailRedirectTo: window.location.origin },
      });
      if (authError) throw authError;
      if (!authData.user) throw new Error('Unable to create your account.');
      if (!authData.session) {
        setError('Check your email for a verification link, then sign in.');
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
        { label: 'Business Plan', complete: false },
        { label: 'Financial Projections', complete: false },
        { label: 'Operating Agreement', complete: false },
        { label: 'Debt Schedule', complete: false },
        { label: 'Personal Financial Statement', complete: false },
        { label: 'Insurance Documentation', complete: false },
      ];

      const notesArr = [
        `Credit: ${creditScore}`, `Revenue: ${revenue}`, `Time: ${timeInBusiness}`,
        `Location: ${bizLocation}`, `Stage: ${bizStage}`, `Profitable: ${profitable}`,
        `Financials: ${financials}`, `Cashflow: ${cashflow}`, `Customers: ${customers}`,
        `Revenue model: ${revenueModel}`, `Bottleneck: ${bottleneck}`,
        `Funding purposes: ${fundingPurposes.join(', ')}`, `Timeline: ${fundingTimeline}`,
        `Description: ${bizDescription}`, `Website: ${website}`,
      ];

      await supabase.from('businesses').insert({
        user_id: authData.user.id,
        name: businessName || `${firstName}'s Business`,
        industry: null,
        capital_need: null,
        checklist,
        score: fundabilityScore || 10,
        status: 'assessment',
        notes: notesArr.join('. '),
        top_gap: fundabilityScore < 60 ? 'Credit & Revenue' : 'Documentation',
        loan_product: fundabilityScore >= 80 ? 'standard' : fundabilityScore >= 60 ? 'revenue-based' : 'building',
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

  const toggleFundingPurpose = (val: string) => {
    setFundingPurposes(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  };

  /* ──── Step indicators ──── */
  const steps = ['Contact', 'Snapshot', 'Results', 'Upgrade', 'Details', 'Account'];
  const stepIndex = { contact: 0, snapshot: 1, results: 2, paywall: 3, 'deep-a': 4, 'deep-b': 4, 'deep-c': 4, 'deep-d': 4, signup: 5 }[phase];

  /* ──── Shared UI ──── */
  const InputField = ({ label, value, onChange, placeholder, type = 'text', required = false }: any) => (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label} {required && <span className="text-red-400">*</span>}</label>
      <input type={type} value={value} onChange={(e: any) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-white border border-gray-200 text-gray-900 text-sm px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl placeholder:text-gray-300" />
    </div>
  );

  const OptionPill = ({ options, selected, onSelect }: { options: { label: string; value: string }[]; selected: string; onSelect: (v: string) => void }) => (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button key={opt.value} type="button" onClick={() => onSelect(opt.value)}
          className={`text-sm font-medium px-4 py-2.5 rounded-full border transition-all duration-200 cursor-pointer ${
            selected === opt.value
              ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
              : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 bg-white'
          }`}>
          {opt.label}
        </button>
      ))}
    </div>
  );

  const MultiPill = ({ options, selected, onToggle }: { options: { label: string; value: string }[]; selected: string[]; onToggle: (v: string) => void }) => (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button key={opt.value} type="button" onClick={() => onToggle(opt.value)}
          className={`text-sm font-medium px-4 py-2.5 rounded-full border transition-all duration-200 cursor-pointer ${
            selected.includes(opt.value)
              ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
              : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 bg-white'
          }`}>
          {selected.includes(opt.value) && '✓ '}{opt.label}
        </button>
      ))}
    </div>
  );

  const PrimaryBtn = ({ onClick, disabled, children }: any) => (
    <button onClick={onClick} disabled={disabled}
      className="flex-1 bg-gray-900 text-white border-none text-sm font-semibold py-3.5 cursor-pointer rounded-xl transition-all duration-200 hover:bg-gray-800 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed">
      {children}
    </button>
  );

  const BackBtn = ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick} className="bg-white text-gray-500 border border-gray-200 text-sm font-medium px-5 py-3.5 cursor-pointer rounded-xl transition-all hover:border-gray-300 hover:text-gray-700">← Back</button>
  );

  const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );

  const CanvasSection = ({ title, icon, content }: { title: string; icon: string; content: string }) => (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-base">{icon}</span>
        <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">{title}</span>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{content}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top bar */}
      <div className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="no-underline flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white text-xs font-black">CS</div>
            <span className="font-semibold text-gray-900 text-sm">Credibility Suite <span className="text-blue-600">AI</span></span>
          </Link>
          <div className="flex items-center gap-1">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full transition-all ${i <= stepIndex ? 'bg-blue-600' : 'bg-gray-200'}`} />
                {i < steps.length - 1 && <div className={`w-4 h-px ${i < stepIndex ? 'bg-blue-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center py-8 px-6 overflow-auto">
        <div className="w-full max-w-lg">

          {/* ═══════ STEP 1: CONTACT CAPTURE ═══════ */}
          {phase === 'contact' && (
            <div className="animate-fade-up">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">⏱ Takes 60 seconds to get your score</div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Let's get your personalized<br />business snapshot started</h1>
                <p className="text-sm text-gray-400">Quick info so we can tailor everything to you.</p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="First Name" value={firstName} onChange={setFirstName} placeholder="Sarah" required />
                  <InputField label="Last Name" value={lastName} onChange={setLastName} placeholder="Johnson" required />
                </div>
                <InputField label="Email Address" value={email} onChange={setEmail} placeholder="you@company.com" type="email" required />
                <InputField label="Mobile Phone" value={phone} onChange={setPhone} placeholder="(404) 555-1234" type="tel" />
                <InputField label="Business Name" value={businessName} onChange={setBusinessName} placeholder="Johnson's Catering LLC" required />
                {!noWebsite && (
                  <InputField label="Business Website" value={website} onChange={setWebsite} placeholder="www.example.com" />
                )}
                <label className="flex items-center gap-2 cursor-pointer mt-1">
                  <input type="checkbox" checked={noWebsite} onChange={() => setNoWebsite(!noWebsite)} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-xs text-gray-400">I don't have a website</span>
                </label>
              </div>
              <div className="flex gap-3 mt-6">
                <PrimaryBtn onClick={() => setPhase('snapshot')} disabled={!firstName.trim() || !lastName.trim() || !email.trim() || !businessName.trim()}>
                  Continue →
                </PrimaryBtn>
              </div>
              <p className="text-xs text-gray-400 text-center mt-5">
                Already have an account? <Link to="/auth" className="text-blue-600 font-semibold hover:text-blue-700 no-underline">Sign In</Link>
              </p>
            </div>
          )}

          {/* ═══════ STEP 2: QUICK SNAPSHOT ═══════ */}
          {phase === 'snapshot' && (
            <div className="animate-fade-up">
              <SectionTitle title="Now let's quickly assess where your business stands" subtitle="3 quick questions to calculate your fundability score" />

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">What's your estimated credit score?</label>
                  <OptionPill options={creditScoreOptions} selected={creditScore} onSelect={setCreditScore} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">What's your approximate annual revenue?</label>
                  <OptionPill options={revenueOptions} selected={revenue} onSelect={setRevenue} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">How long have you been in business?</label>
                  <OptionPill options={timeOptions} selected={timeInBusiness} onSelect={setTimeInBusiness} />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <BackBtn onClick={() => setPhase('contact')} />
                <PrimaryBtn onClick={() => setPhase('results')} disabled={!creditScore || !revenue || !timeInBusiness}>
                  See My Score →
                </PrimaryBtn>
              </div>
            </div>
          )}

          {/* ═══════ STEP 3: RESULTS — SCORE + CANVAS + INSIGHTS ═══════ */}
          {phase === 'results' && (
            <div className="animate-fade-up space-y-6">
              {/* Score */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
                <p className="text-sm text-gray-400 mb-4">Your Fundability Score</p>
                <div className="relative w-40 h-40 mx-auto mb-4">
                  <svg viewBox="0 0 128 128" className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="64" cy="64" r="54" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                    <circle cx="64" cy="64" r="54" fill="none" stroke="url(#score-g)" strokeWidth="10" strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 54} strokeDashoffset={2 * Math.PI * 54 - (2 * Math.PI * 54 * fundabilityScore) / 100}
                      className="transition-all duration-1000 ease-out" />
                    <defs>
                      <linearGradient id="score-g" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-gray-900">{fundabilityScore}%</span>
                    <span className="text-xs text-gray-400">fundable</span>
                  </div>
                </div>
                <div className={`inline-flex items-center gap-2 ${scoreInfo.bg} ${scoreInfo.color} text-sm font-semibold px-4 py-2 rounded-full`}>
                  {scoreInfo.emoji} {scoreInfo.tier} — {scoreInfo.text}
                </div>
              </div>

              {/* Business Model Canvas */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">Your Business Model Canvas</h3>
                    <p className="text-xs text-gray-400">Auto-generated for {businessName || 'your business'}</p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">FREE</span>
                </div>
                <div className="p-6 grid grid-cols-2 gap-3">
                  <CanvasSection icon="💎" title="Value Proposition" content={canvas.valueProposition} />
                  <CanvasSection icon="👥" title="Customer Segments" content={canvas.customerSegments} />
                  <CanvasSection icon="💵" title="Revenue Streams" content={canvas.revenueStreams} />
                  <CanvasSection icon="⚙️" title="Key Activities" content={canvas.keyActivities} />
                  <CanvasSection icon="🏗️" title="Key Resources" content={canvas.keyResources} />
                  <CanvasSection icon="📡" title="Channels" content={canvas.channels} />
                  <CanvasSection icon="🚀" title="Growth Opportunities" content={canvas.growthOpportunities} />
                  <CanvasSection icon="⚠️" title="Gaps / Risks" content={canvas.gapsRisks} />
                </div>
              </div>

              {/* Insights */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 text-base mb-4">💡 Key Insights</h3>
                <div className="space-y-3">
                  {insights.map((insight, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</div>
                      <p className="leading-relaxed">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gray-900 rounded-2xl p-6 text-center text-white">
                <p className="text-sm text-gray-300 mb-1">This is your live business dashboard.</p>
                <p className="font-bold text-base mb-4">Upgrade to unlock step-by-step guidance, funding matches, and AI advisors.</p>
                <button onClick={() => setPhase('paywall')}
                  className="bg-white text-gray-900 font-semibold text-sm px-8 py-3.5 rounded-xl cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 border-none">
                  Unlock AI Advisors →
                </button>
              </div>
            </div>
          )}

          {/* ═══════ STEP 4: AGENT PAYWALL ═══════ */}
          {phase === 'paywall' && (
            <div className="animate-fade-up space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Unlock Your AI Business Advisors</h2>
                <p className="text-sm text-gray-400">You have your Business Model Canvas. Now unlock the systems that help you improve it and get funded.</p>
              </div>

              <div className="space-y-3">
                {agentModules.map(agent => (
                  <div key={agent.id} className={`rounded-xl border p-4 flex items-start gap-4 ${agent.color}`}>
                    <span className="text-2xl">{agent.icon}</span>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{agent.name}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{agent.desc}</p>
                    </div>
                    <div className="ml-auto flex-shrink-0">
                      <span className="text-xs text-gray-400">🔒</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="bg-white rounded-2xl border-2 border-gray-900 shadow-lg p-6 text-center">
                <div className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mb-4">MOST POPULAR</div>
                <div className="flex items-baseline justify-center gap-1 mb-1">
                  <span className="text-4xl font-bold text-gray-900">$99</span>
                  <span className="text-sm text-gray-400">/month</span>
                </div>
                <p className="text-xs text-gray-400 mb-6">Full Suite · All 6 AI Agents · Cancel anytime</p>
                <button onClick={() => setPhase('deep-a')}
                  className="w-full bg-gray-900 text-white font-semibold text-sm py-4 rounded-xl cursor-pointer transition-all hover:bg-gray-800 hover:shadow-lg border-none mb-3">
                  Start 7-Day Free Trial →
                </button>
                <p className="text-[11px] text-gray-300">No charge for 7 days · $99/mo after · Cancel anytime</p>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-400 mb-2">Or start smaller:</p>
                <div className="flex gap-3 justify-center">
                  <div className="bg-gray-50 rounded-xl border border-gray-100 px-5 py-3 text-center">
                    <div className="font-bold text-gray-900 text-lg">$29</div>
                    <div className="text-[10px] text-gray-400">1 Agent · /mo</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl border border-gray-100 px-5 py-3 text-center">
                    <div className="font-bold text-gray-900 text-lg">$49</div>
                    <div className="text-[10px] text-gray-400">2 Agents · /mo</div>
                  </div>
                </div>
              </div>

              <button onClick={() => setPhase('results')} className="w-full text-xs text-gray-400 text-center cursor-pointer hover:text-gray-600 transition-colors bg-transparent border-none py-2">
                ← Back to my results
              </button>
            </div>
          )}

          {/* ═══════ STEP 5A: BUSINESS DETAILS ═══════ */}
          {phase === 'deep-a' && (
            <div className="animate-fade-up">
              <SectionTitle title="Tell us more about your business" subtitle="Section 1 of 4 — Business Details" />
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">What does your business do?</label>
                  <textarea value={bizDescription} onChange={e => setBizDescription(e.target.value)} placeholder="Brief description..."
                    className="w-full bg-white border border-gray-200 text-gray-900 text-sm px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl placeholder:text-gray-300 min-h-[80px] resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Where is your business based?</label>
                  <OptionPill options={businessLocationOpts} selected={bizLocation} onSelect={setBizLocation} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">What stage are you in?</label>
                  <OptionPill options={stageOpts} selected={bizStage} onSelect={setBizStage} />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <BackBtn onClick={() => setPhase('paywall')} />
                <PrimaryBtn onClick={() => setPhase('deep-b')} disabled={!bizLocation || !bizStage}>Continue →</PrimaryBtn>
              </div>
            </div>
          )}

          {/* ═══════ STEP 5B: FINANCIAL DEPTH ═══════ */}
          {phase === 'deep-b' && (
            <div className="animate-fade-up">
              <SectionTitle title="Financial Depth" subtitle="Section 2 of 4 — Understanding your finances" />
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Is your business profitable?</label>
                  <OptionPill options={profitableOpts} selected={profitable} onSelect={setProfitable} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">How organized are your financials?</label>
                  <OptionPill options={financialsOpts} selected={financials} onSelect={setFinancials} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">What does your cash flow look like?</label>
                  <OptionPill options={cashflowOpts} selected={cashflow} onSelect={setCashflow} />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <BackBtn onClick={() => setPhase('deep-a')} />
                <PrimaryBtn onClick={() => setPhase('deep-c')} disabled={!profitable || !financials || !cashflow}>Continue →</PrimaryBtn>
              </div>
            </div>
          )}

          {/* ═══════ STEP 5C: BUSINESS MODEL INTELLIGENCE ═══════ */}
          {phase === 'deep-c' && (
            <div className="animate-fade-up">
              <SectionTitle title="Business Model Intelligence" subtitle="Section 3 of 4 — How you operate" />
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Who are your primary customers?</label>
                  <OptionPill options={customerOpts} selected={customers} onSelect={setCustomers} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">What is your main revenue model?</label>
                  <OptionPill options={revenueModelOpts} selected={revenueModel} onSelect={setRevenueModel} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">What is your biggest bottleneck?</label>
                  <OptionPill options={bottleneckOpts} selected={bottleneck} onSelect={setBottleneck} />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <BackBtn onClick={() => setPhase('deep-b')} />
                <PrimaryBtn onClick={() => setPhase('deep-d')} disabled={!customers || !revenueModel || !bottleneck}>Continue →</PrimaryBtn>
              </div>
            </div>
          )}

          {/* ═══════ STEP 5D: FUNDING + EXECUTION ═══════ */}
          {phase === 'deep-d' && (
            <div className="animate-fade-up">
              <SectionTitle title="Funding & Execution" subtitle="Section 4 of 4 — Almost done!" />
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">What would you use funding for? (select all)</label>
                  <MultiPill options={fundingPurposeOpts} selected={fundingPurposes} onToggle={toggleFundingPurpose} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">How soon do you need funding?</label>
                  <OptionPill options={fundingTimelineOpts} selected={fundingTimeline} onSelect={setFundingTimeline} />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <BackBtn onClick={() => setPhase('deep-c')} />
                <PrimaryBtn onClick={() => setPhase('signup')} disabled={fundingPurposes.length === 0 || !fundingTimeline}>
                  Create My Account →
                </PrimaryBtn>
              </div>
            </div>
          )}

          {/* ═══════ STEP 6: SIGNUP ═══════ */}
          {phase === 'signup' && (
            <div className="animate-fade-up">
              <SectionTitle title="Create your account" subtitle="Last step — access your full AI-powered dashboard" />
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">{fundabilityScore}%</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{firstName} {lastName}</div>
                    <div className="text-xs text-gray-400">{businessName} · Fundability {scoreInfo.tier}</div>
                  </div>
                </div>
                <InputField label="Email" value={email} onChange={(v: string) => { setEmail(v); setError(''); }} placeholder="you@company.com" type="email" required />
                <InputField label="Password" value={signupPassword} onChange={(v: string) => { setSignupPassword(v); setError(''); }} placeholder="Min 6 characters" type="password" required />
              </div>
              <div className="flex gap-3 mt-6">
                <BackBtn onClick={() => setPhase('deep-d')} />
                <PrimaryBtn onClick={handleSignUp} disabled={loading || !email.trim() || signupPassword.length < 6}>
                  {loading ? 'Creating...' : 'Create Account & Launch Dashboard →'}
                </PrimaryBtn>
              </div>
              {error && <p className="text-sm text-red-600 text-center mt-4 bg-red-50 rounded-xl px-4 py-3">{error}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;

export const NAICS_INDUSTRIES = [
  { code: '11', label: 'Agriculture, Forestry, Fishing & Hunting' },
  { code: '21', label: 'Mining, Quarrying & Oil/Gas Extraction' },
  { code: '22', label: 'Utilities' },
  { code: '23', label: 'Construction' },
  { code: '31-33', label: 'Manufacturing' },
  { code: '42', label: 'Wholesale Trade' },
  { code: '44-45', label: 'Retail Trade' },
  { code: '48-49', label: 'Transportation & Warehousing' },
  { code: '51', label: 'Information & Technology' },
  { code: '52', label: 'Finance & Insurance' },
  { code: '53', label: 'Real Estate & Rental/Leasing' },
  { code: '54', label: 'Professional, Scientific & Technical Services' },
  { code: '55', label: 'Management of Companies' },
  { code: '56', label: 'Administrative & Support Services' },
  { code: '61', label: 'Educational Services' },
  { code: '62', label: 'Health Care & Social Assistance' },
  { code: '71', label: 'Arts, Entertainment & Recreation' },
  { code: '72', label: 'Accommodation & Food Services' },
  { code: '81', label: 'Other Services (Repair, Personal, etc.)' },
  { code: '92', label: 'Public Administration' },
];

export const CREDIT_SCORE_RANGES = [
  { value: 'excellent', label: '750+  (Excellent)', min: 750 },
  { value: 'good', label: '700–749  (Good)', min: 700 },
  { value: 'fair', label: '650–699  (Fair)', min: 650 },
  { value: 'below-average', label: '600–649  (Below Average)', min: 600 },
  { value: 'poor', label: 'Below 600  (Needs Work)', min: 0 },
  { value: 'unsure', label: "I'm Not Sure", min: -1 },
];

export const FUNDING_AMOUNTS = [
  { value: 'under-10k', label: 'Under $10,000', amount: 10000 },
  { value: '10k-25k', label: '$10,000 – $25,000', amount: 25000 },
  { value: '25k-50k', label: '$25,000 – $50,000', amount: 50000 },
  { value: '50k-100k', label: '$50,000 – $100,000', amount: 100000 },
  { value: '100k-250k', label: '$100,000 – $250,000', amount: 250000 },
  { value: '250k-500k', label: '$250,000 – $500,000', amount: 500000 },
  { value: '500k-plus', label: '$500,000+', amount: 500001 },
  { value: 'not-sure', label: "I'm Not Sure Yet", amount: 0 },
];

export const BUSINESS_NEEDS = [
  { value: 'funding', label: 'I need funding for my business', icon: '💰' },
  { value: 'coaching', label: 'I need coaching on growing my business', icon: '🧭' },
  { value: 'financial-health', label: 'I need help with financial health & cash flow', icon: '📊' },
  { value: 'documentation', label: 'I need help organizing business documents', icon: '📋' },
  { value: 'business-plan', label: 'I need a business plan or strategy', icon: '📝' },
  { value: 'credit-repair', label: 'I need to improve my credit', icon: '🔧' },
  { value: 'marketing', label: 'I need help with marketing & outreach', icon: '📣' },
  { value: 'just-exploring', label: "I'm just exploring what's available", icon: '🔍' },
];

export const TIME_IN_BUSINESS = [
  { value: 'pre-revenue', label: 'Pre-revenue / Idea Stage' },
  { value: 'under-1', label: 'Less than 1 year' },
  { value: '1-2', label: '1–2 years' },
  { value: '3-5', label: '3–5 years' },
  { value: '5-plus', label: '5+ years' },
];

export const ANNUAL_REVENUE = [
  { value: 'pre-revenue', label: 'Pre-revenue' },
  { value: 'under-50k', label: 'Under $50,000' },
  { value: '50k-100k', label: '$50,000 – $100,000' },
  { value: '100k-250k', label: '$100,000 – $250,000' },
  { value: '250k-500k', label: '$250,000 – $500,000' },
  { value: '500k-1m', label: '$500,000 – $1M' },
  { value: '1m-plus', label: '$1M+' },
];

export function determineFunnel(data: {
  needs: string[];
  creditScore: string;
  revenue: string;
  timeInBusiness: string;
  amountSeeking: string;
}): { funnel: string; label: string; description: string } {
  const { needs, creditScore, revenue, timeInBusiness } = data;

  const wantsFunding = needs.includes('funding');
  const wantsCoaching = needs.includes('coaching') || needs.includes('business-plan');
  const isEarlyStage = timeInBusiness === 'pre-revenue' || timeInBusiness === 'under-1';
  const hasStrongCredit = creditScore === 'excellent' || creditScore === 'good';
  const hasRevenue = revenue !== 'pre-revenue' && revenue !== 'under-50k';

  if (wantsFunding && hasStrongCredit && hasRevenue && !isEarlyStage) {
    return {
      funnel: 'funding-ready',
      label: 'Funding Ready',
      description: 'You have a strong foundation. Let\'s get you matched with the right funding options and strengthen your application.',
    };
  }

  if (wantsFunding && !hasStrongCredit) {
    return {
      funnel: 'credit-building',
      label: 'Credit Building Path',
      description: 'Let\'s work on strengthening your credit profile first, so you can access better funding terms when you\'re ready.',
    };
  }

  if (wantsFunding && isEarlyStage) {
    return {
      funnel: 'early-stage-funding',
      label: 'Early-Stage Funding',
      description: 'We\'ll help you build the foundation lenders want to see — business structure, documentation, and early traction.',
    };
  }

  if (wantsCoaching && !wantsFunding) {
    return {
      funnel: 'growth-coaching',
      label: 'Growth Coaching',
      description: 'Your focus is growth. We\'ll build your Business Model Canvas and create a personalized strategy to scale.',
    };
  }

  if (isEarlyStage) {
    return {
      funnel: 'startup-guidance',
      label: 'Startup Guidance',
      description: 'You\'re just getting started — and that\'s great. We\'ll help you build a clear roadmap and strong business foundation.',
    };
  }

  return {
    funnel: 'general-guidance',
    label: 'Business Guidance',
    description: 'We\'ll create your Business Model Canvas and help you identify the best next steps for your specific situation.',
  };
}

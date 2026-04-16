import { useState } from 'react';
import { Check } from 'lucide-react';
import JourneyShell from './JourneyShell';
import AdviceCard from './AdviceCard';
import BookingCTA from './BookingCTA';
import { useJourneyAdvice } from './useJourneyAdvice';
import type { JourneyProps } from './types';

const stageOpts = [
  { label: 'Idea stage — need a plan', value: 'idea' },
  { label: 'Early — need direction', value: 'early' },
  { label: 'Growing — need to optimize', value: 'growing' },
  { label: 'Established — need to scale', value: 'established' },
];
const audienceOpts = [
  { label: 'Consumers (B2C)', value: 'b2c' },
  { label: 'Businesses (B2B)', value: 'b2b' },
  { label: 'Government', value: 'gov' },
  { label: 'Mixed / Not sure', value: 'mixed' },
];

const AdvisoryJourney = ({ lead, onBack }: JourneyProps) => {
  const [stage, setStage] = useState('');
  const [audience, setAudience] = useState('');
  const [showAdvice, setShowAdvice] = useState(false);
  const { advice, loading, error, fetchAdvice } = useJourneyAdvice();

  const handleContinue = () => {
    setShowAdvice(true);
    fetchAdvice('advisory', { name: lead.name, stage, audience, website: lead.website, goals: lead.goals });
  };

  const Pills = ({ options, selected, onSelect }: { options: { label: string; value: string }[]; selected: string; onSelect: (v: string) => void }) => (
    <div className="space-y-2.5">
      {options.map(o => (
        <button key={o.value} onClick={() => onSelect(o.value)}
          className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all cursor-pointer bg-transparent flex items-center gap-3 ${
            selected === o.value ? 'border-[#2563eb]/50 bg-[#2563eb]/[0.08]' : 'border-white/[0.1] hover:border-white/[0.2]'
          }`}>
          <span className={`text-sm font-medium ${selected === o.value ? 'text-white' : 'text-white/60'}`}>{o.label}</span>
          {selected === o.value && <Check className="w-4 h-4 text-[#2563eb] ml-auto" />}
        </button>
      ))}
    </div>
  );

  return (
    <JourneyShell onBack={onBack}>
      <span className="inline-block text-xs font-semibold text-[#2563eb] bg-[#2563eb]/[0.08] px-3 py-1.5 rounded-full mb-3">📋 Company Advisory</span>

      {!showAdvice ? (
        <>
          <h2 className="text-2xl font-extrabold text-white mb-1">Tell us about your business.</h2>
          <p className="text-sm text-white/50 mb-6">We'll create a personalized business snapshot and guidance.</p>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-3">What stage is your business?</label>
              <Pills options={stageOpts} selected={stage} onSelect={setStage} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-3">Who are your customers?</label>
              <Pills options={audienceOpts} selected={audience} onSelect={setAudience} />
            </div>
          </div>
          <button onClick={handleContinue} disabled={!stage || !audience}
            className="w-full mt-8 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white text-sm font-semibold py-3.5 border-none cursor-pointer rounded-xl transition-all hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed">
            Get My Business Snapshot →
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-extrabold text-white mb-1">Your Business Snapshot</h2>
          <p className="text-sm text-white/50 mb-6">AI-generated analysis and recommendations for your business.</p>
          <AdviceCard advice={advice} loading={loading} error={error} onRetry={() => fetchAdvice('advisory', { name: lead.name, stage, audience, website: lead.website, goals: lead.goals })} loadingText="Building your business snapshot..." />
          {!loading && advice && <BookingCTA title="Book an Advisory Session" subtitle="Get your full Business Model Canvas and action plan" />}
        </>
      )}
    </JourneyShell>
  );
};

export default AdvisoryJourney;

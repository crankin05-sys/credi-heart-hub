import { Loader2, RefreshCw } from 'lucide-react';

interface AdviceCardProps {
  advice: string;
  loading: boolean;
  error: string;
  onRetry?: () => void;
  loadingText?: string;
}

const AdviceCard = ({ advice, loading, error, onRetry, loadingText = 'Generating your personalized guidance...' }: AdviceCardProps) => {
  const formatAdvice = (text: string) =>
    text.split('\n').filter(l => l.trim()).map((line, i) => {
      const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>');
      return <p key={i} className="text-sm text-white/60 leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: formatted }} />;
    });

  return (
    <div className="bg-white/[0.04] rounded-2xl border border-white/[0.1] p-6 min-h-[180px]">
      {loading && !advice && (
        <div className="flex items-center justify-center gap-3 py-10">
          <Loader2 className="w-5 h-5 text-[#2563eb] animate-spin" />
          <span className="text-sm text-white/50">{loadingText}</span>
        </div>
      )}
      {error && (
        <div className="text-center py-8">
          <p className="text-sm text-red-400 mb-4">{error}</p>
          {onRetry && (
            <button onClick={onRetry} className="text-sm text-[#2563eb] font-medium inline-flex items-center gap-1.5 hover:underline cursor-pointer bg-transparent border-none">
              <RefreshCw className="w-3.5 h-3.5" /> Try again
            </button>
          )}
        </div>
      )}
      {advice && (
        <div>
          {formatAdvice(advice)}
          {loading && <span className="inline-block w-2 h-4 bg-[#2563eb]/60 animate-pulse rounded-sm" />}
        </div>
      )}
    </div>
  );
};

export default AdviceCard;

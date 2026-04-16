import { Loader2, RefreshCw } from 'lucide-react';
import AdviceRenderer from './AdviceRenderer';

interface AdviceCardProps {
  advice: string;
  loading: boolean;
  error: string;
  onRetry?: () => void;
  loadingText?: string;
}

const AdviceCard = ({ advice, loading, error, onRetry, loadingText = 'Generating your personalized guidance...' }: AdviceCardProps) => {
  return (
    <div className="bg-white/[0.04] rounded-2xl border border-white/[0.1] p-6 md:p-8 min-h-[180px]">
      {loading && !advice && (
        <div className="flex items-center justify-center gap-3 py-10">
          <Loader2 className="w-5 h-5 text-primary animate-spin" />
          <span className="text-sm text-white/50">{loadingText}</span>
        </div>
      )}
      {error && (
        <div className="text-center py-8">
          <p className="text-sm text-red-400 mb-4">{error}</p>
          {onRetry && (
            <button onClick={onRetry} className="text-sm text-primary font-medium inline-flex items-center gap-1.5 hover:underline cursor-pointer bg-transparent border-none">
              <RefreshCw className="w-3.5 h-3.5" /> Try again
            </button>
          )}
        </div>
      )}
      {advice && (
        <div>
          <AdviceRenderer text={advice} variant="dark" />
          {loading && <span className="inline-block w-2 h-4 bg-primary/60 animate-pulse rounded-sm mt-1" />}
        </div>
      )}
    </div>
  );
};

export default AdviceCard;

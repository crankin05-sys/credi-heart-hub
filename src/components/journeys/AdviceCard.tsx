import { RefreshCw, Sparkles } from 'lucide-react';
import AdviceRenderer from './AdviceRenderer';
import ScanningLoader from './ScanningLoader';

interface AdviceCardProps {
  advice: string;
  loading: boolean;
  error: string;
  onRetry?: () => void;
  loadingText?: string;
}

const AdviceCard = ({ advice, loading, error, onRetry }: AdviceCardProps) => {
  return (
    <div className="relative bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent rounded-2xl border border-white/[0.1] p-6 md:p-8 min-h-[180px] overflow-hidden">
      {/* Ambient glow */}
      {(loading || advice) && (
        <>
          <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary/20 blur-3xl animate-pulse" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-purple-500/15 blur-3xl animate-pulse [animation-delay:1s]" />
        </>
      )}

      {/* AI streaming badge */}
      {advice && (
        <div className="relative flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.08]">
          <div className="relative">
            <Sparkles className="w-4 h-4 text-primary" />
            {loading && (
              <span className="absolute inset-0 rounded-full bg-primary/40 blur-sm animate-ping" />
            )}
          </div>
          <span className="text-xs font-semibold text-white/80 tracking-wide uppercase">
            {loading ? 'AI is responding' : 'AI Strategy'}
          </span>
          {loading && (
            <div className="flex gap-1 ml-1">
              <span className="w-1 h-1 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1 h-1 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1 h-1 rounded-full bg-primary animate-bounce" />
            </div>
          )}
          {loading && (
            <div className="ml-auto flex-1 max-w-[120px] h-0.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent animate-[scan_2s_ease-in-out_infinite]" />
            </div>
          )}
        </div>
      )}

      <div className="relative">
        {loading && !advice && <ScanningLoader variant="dark" />}
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
            {loading && (
              <span className="inline-flex items-center gap-1 mt-2">
                <span className="inline-block w-1.5 h-4 bg-primary rounded-sm animate-pulse" />
                <span className="inline-block w-1 h-3 bg-primary/60 rounded-sm animate-pulse [animation-delay:0.2s]" />
                <span className="inline-block w-0.5 h-2 bg-primary/40 rounded-sm animate-pulse [animation-delay:0.4s]" />
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdviceCard;

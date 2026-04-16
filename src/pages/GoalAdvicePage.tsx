import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, Calendar, Sparkles, RefreshCw } from 'lucide-react';
import AdviceRenderer from '@/components/journeys/AdviceRenderer';
import ScanningLoader from '@/components/journeys/ScanningLoader';
import PublicNav from '@/components/PublicNav';

const goalLabels: Record<string, string> = {
  loan: 'Getting a Business Loan',
  credit: 'Improving Your Credit',
  grow: 'Growing Your Business',
  exploring: 'Your Business Options',
  fundability: 'Your Fundability',
};

const ADVICE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/goal-advice`;

const GoalAdvicePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const goal = searchParams.get('goal') || 'exploring';
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAdvice = async () => {
    setLoading(true);
    setAdvice('');
    setError('');

    try {
      const resp = await fetch(ADVICE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ goal, businessName: '' }),
      });

      if (!resp.ok || !resp.body) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to get advice');
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let full = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIdx: number;
        while ((newlineIdx = buffer.indexOf('\n')) !== -1) {
          let line = buffer.slice(0, newlineIdx);
          buffer = buffer.slice(newlineIdx + 1);
          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              full += content;
              setAdvice(full);
            }
          } catch {
            buffer = line + '\n' + buffer;
            break;
          }
        }
      }
    } catch (e: any) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, [goal]);


  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicNav />

      <div className="flex-1 flex items-start justify-center py-10 px-6 overflow-auto pt-20">
        <div className="w-full max-w-lg space-y-6 animate-fade-up">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-primary/[0.06] text-primary text-xs font-semibold px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5" /> AI-Powered Advice
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {goalLabels[goal] || 'Your Personalized Advice'}
            </h1>
            <p className="text-sm text-muted-foreground">Here's what we recommend based on your goal.</p>
          </div>

          {/* Advice card */}
          <div className="bg-background rounded-2xl border border-border shadow-sm p-6 md:p-8 min-h-[200px]">
            {loading && !advice && <ScanningLoader variant="themed" />}

            {error && (
              <div className="text-center py-8">
                <p className="text-sm text-destructive mb-4">{error}</p>
                <button onClick={fetchAdvice} className="text-sm text-primary font-medium inline-flex items-center gap-1.5 hover:underline cursor-pointer bg-transparent border-none">
                  <RefreshCw className="w-3.5 h-3.5" /> Try again
                </button>
              </div>
            )}

            {advice && (
              <div>
                <AdviceRenderer text={advice} variant="themed" />
                {loading && <span className="inline-block w-2 h-4 bg-primary/60 animate-pulse rounded-sm mt-1" />}
              </div>
            )}
          </div>

          {/* Actions */}
          {!loading && advice && (
            <div className="space-y-3">
              <button
                onClick={() => window.open('https://calendly.com/mauricestewart/1-hour-consultation', '_blank')}
                className="w-full bg-gradient-to-r from-[hsl(230,80%,56%)] to-[hsl(260,70%,60%)] text-white border-none text-sm font-semibold py-4 cursor-pointer rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Book a Free Strategy Call
              </button>

              <div className="flex gap-3">
                <button
                  onClick={() => navigate('/get-started')}
                  className="flex-1 bg-secondary text-foreground border border-border text-sm font-medium py-3 cursor-pointer rounded-xl transition-all hover:border-foreground/20 flex items-center justify-center gap-2"
                >
                  Check My Fundability Score
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('/')}
                  className="bg-background text-muted-foreground border border-border text-sm font-medium px-5 py-3 cursor-pointer rounded-xl transition-all hover:border-foreground/20"
                >
                  Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalAdvicePage;

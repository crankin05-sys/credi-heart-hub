import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import ReactMarkdown from 'react-markdown';

interface BusinessRow {
  id: string;
  name: string;
  industry: string | null;
  score: number;
  status: string;
  capital_need: number | null;
  loan_product: string | null;
  top_gap: string | null;
}

const agents = [
  { id: 'financial', icon: '💰', name: 'Financial Health Agent', desc: 'Cash flow monitoring, expense analysis, revenue trends' },
  { id: 'fundability', icon: '📊', name: 'Fundability Agent', desc: 'Real-time score analysis, gap identification, roadmap' },
  { id: 'capital', icon: '🎯', name: 'Capital Matching Agent', desc: 'Matches business to right funding sources' },
  { id: 'execution', icon: '⚡', name: 'Execution Agent', desc: 'Weekly action plan, task generation, priorities' },
  { id: 'documentation', icon: '📋', name: 'Documentation Agent', desc: 'Missing docs, compliance, underwriting prep' },
  { id: 'growth', icon: '📈', name: 'Growth Strategy Agent', desc: 'Revenue optimization, customer acquisition' },
];

const AgentsPage = () => {
  const { user } = useAuth();
  const [businesses, setBusinesses] = useState<BusinessRow[]>([]);
  const [selectedBiz, setSelectedBiz] = useState<string>('');
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string>('');
  const [agentLabel, setAgentLabel] = useState<string>('');

  useEffect(() => {
    if (!user) return;
    supabase.from('businesses').select('id, name, industry, score, status, capital_need, loan_product, top_gap')
      .eq('user_id', user.id)
      .then(({ data }) => {
        if (data && data.length > 0) {
          setBusinesses(data);
          setSelectedBiz(data[0].id);
        }
      });
  }, [user]);

  const runAgent = async () => {
    if (!selectedBiz || !selectedAgent) return;
    setLoading(true);
    setAnalysis('');
    const agent = agents.find(a => a.id === selectedAgent);
    setAgentLabel(agent?.name || '');

    try {
      const { data, error } = await supabase.functions.invoke('ai-agent', {
        body: { agentType: selectedAgent, businessId: selectedBiz },
      });
      if (error) throw error;
      setAnalysis(data.analysis);
    } catch (e: any) {
      setAnalysis(`Error: ${e.message || 'Failed to run agent'}`);
    } finally {
      setLoading(false);
    }
  };

  const biz = businesses.find(b => b.id === selectedBiz);

  return (
    <div className="animate-fade-up">
      {businesses.length === 0 ? (
        <div className="bg-card border border-border p-8 text-center">
          <p className="text-muted-foreground text-sm mb-2">No businesses found. Add businesses first to run AI agents.</p>
        </div>
      ) : (
        <>
          {/* Agent selector grid */}
          <div className="grid grid-cols-3 gap-3 mb-4 max-lg:grid-cols-2">
            {agents.map(a => (
              <button
                key={a.id}
                onClick={() => setSelectedAgent(a.id)}
                className={`text-left bg-card border p-4 transition-all cursor-pointer ${
                  selectedAgent === a.id
                    ? 'border-primary bg-primary/[0.07]'
                    : 'border-border hover:border-primary/30 hover:bg-foreground/[0.02]'
                }`}
              >
                <div className="text-2xl mb-2">{a.icon}</div>
                <div className="text-xs font-extrabold text-foreground mb-1">{a.name}</div>
                <div className="text-[10px] text-muted-foreground leading-relaxed">{a.desc}</div>
                {selectedAgent === a.id && (
                  <div className="mt-2 text-[9px] font-bold text-primary uppercase tracking-[1px] font-mono">● Selected</div>
                )}
              </button>
            ))}
          </div>

          {/* Business selector + Run */}
          <div className="bg-card border border-border p-4 mb-4 flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[200px]">
              <label className="text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground font-mono block mb-1.5">Select Business</label>
              <select
                value={selectedBiz}
                onChange={e => setSelectedBiz(e.target.value)}
                className="w-full bg-background border border-border text-foreground text-xs p-2 rounded-sm focus:border-primary focus:outline-none"
              >
                {businesses.map(b => (
                  <option key={b.id} value={b.id}>{b.name} — Score: {b.score} — {b.status}</option>
                ))}
              </select>
            </div>
            <button
              onClick={runAgent}
              disabled={!selectedAgent || loading}
              className="bg-gradient-to-br from-primary to-gold-lt text-primary-foreground border-none font-body text-[11px] font-extrabold px-6 py-2.5 cursor-pointer tracking-[1.5px] uppercase rounded-sm transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Analyzing...' : '▶ Run Agent'}
            </button>
          </div>

          {/* Business quick stats */}
          {biz && (
            <div className="grid grid-cols-4 gap-3 mb-4 max-lg:grid-cols-2">
              {[
                { label: 'Score', value: biz.score, color: biz.score >= 75 ? 'text-success' : biz.score >= 50 ? 'text-warning' : 'text-destructive' },
                { label: 'Status', value: biz.status.replace('-', ' '), color: 'text-primary' },
                { label: 'Capital Need', value: `$${(biz.capital_need || 0).toLocaleString()}`, color: 'text-info' },
                { label: 'Industry', value: biz.industry || 'N/A', color: 'text-foreground' },
              ].map((s, i) => (
                <div key={i} className="bg-card border border-border p-3">
                  <div className={`font-display text-lg font-bold ${s.color} capitalize`}>{s.value}</div>
                  <div className="text-[8px] text-muted-foreground uppercase tracking-[1.5px] font-mono">{s.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Analysis output */}
          {(analysis || loading) && (
            <div className="bg-card border border-border">
              <div className="px-4 py-3 bg-background border-b border-border flex items-center gap-2">
                <span className="text-[9px] font-bold tracking-[2px] uppercase text-primary font-mono">
                  🤖 {agentLabel} — Analysis
                </span>
                {loading && <span className="text-[9px] text-success font-mono font-bold animate-pulse">● RUNNING</span>}
              </div>
              <div className="p-4">
                {loading ? (
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-3 bg-foreground/5 rounded animate-pulse" style={{ width: `${80 - i * 10}%` }} />
                    ))}
                  </div>
                ) : (
                  <div className="prose prose-sm prose-invert max-w-none text-xs text-foreground/80 leading-relaxed [&_h1]:text-sm [&_h1]:font-bold [&_h1]:text-foreground [&_h2]:text-xs [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:text-xs [&_h3]:font-bold [&_h3]:text-foreground [&_strong]:text-foreground [&_li]:text-foreground/70 [&_ul]:space-y-1 [&_ol]:space-y-1">
                    <ReactMarkdown>{analysis}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AgentsPage;

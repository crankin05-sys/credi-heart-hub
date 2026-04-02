import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { supabase } from '@/integrations/supabase/client';

const agents = [
  { id: 'financial', icon: '💰', name: 'Financial Health Agent', desc: 'Reads QuickBooks and accounting data in real time. Flags issues before they become problems.', bullets: ['Cash flow monitoring', 'Expense ratio analysis', 'Revenue trend tracking'] },
  { id: 'fundability', icon: '📊', name: 'Fundability Agent', desc: 'Generates and updates a real-time Fundability Score. Identifies every gap blocking loan approval.', bullets: ['Real-time score updates', 'Documentation gap alerts', 'Path to fundability roadmap'] },
  { id: 'capital', icon: '🎯', name: 'Capital Matching Agent', desc: 'Matches each business to the right funding source based on their exact profile and readiness.', bullets: ['SBA & revolving funds', 'AR financing options', 'No-doc loan routing'] },
  { id: 'execution', icon: '⚡', name: 'Execution Agent', desc: 'Creates a specific weekly action plan for every business. Exactly what to do this week to hit the goal.', bullets: ['Weekly task generation', 'Progress tracking', 'Goal-based priorities'] },
  { id: 'documentation', icon: '📋', name: 'Documentation Agent', desc: 'Identifies missing documents and prepares the complete loan package — ready for underwriting.', bullets: ['Compliance checking', 'Document templates', 'Underwriting prep'] },
  { id: 'growth', icon: '📈', name: 'Growth Strategy Agent', desc: 'Revenue optimization, customer targeting, and CRM-synced outreach recommendations.', bullets: ['Revenue optimization', 'Customer acquisition', 'CRM sync & learning'] },
];

const AgentsSection = () => {
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [introText, setIntroText] = useState<string>('');
  const [loadingIntro, setLoadingIntro] = useState(false);

  const handleAgentClick = async (agentId: string) => {
    if (activeAgent === agentId) {
      setActiveAgent(null);
      setIntroText('');
      return;
    }

    setActiveAgent(agentId);
    setIntroText('');
    setLoadingIntro(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-agent', {
        body: { agentType: agentId, mode: 'intro' },
      });
      if (error) throw error;
      setIntroText(data.analysis);
    } catch {
      setIntroText("Hello! I'm ready to help analyze your business. Sign up to see me in action!");
    } finally {
      setLoadingIntro(false);
    }
  };

  const activeAgentData = agents.find(a => a.id === activeAgent);

  return (
    <section id="agents" className="px-6 md:px-10 py-24 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="text-[10px] font-bold tracking-[4px] text-primary uppercase mb-4 font-mono">The Solution</div>
        <h2 className="font-display text-[clamp(32px,3.5vw,50px)] font-extrabold text-foreground leading-[1.08] mb-5 tracking-tight">
          6 AI Agents. One Platform.<br /><em className="italic text-gradient-gold not-italic">Complete Intelligence.</em>
        </h2>
        <p className="text-[15px] text-foreground/45 leading-[1.8] max-w-[540px] mx-auto">
          Each agent is specialized, trained, and running 24 hours a day. <strong className="text-foreground/70">Click any agent to hear them introduce themselves.</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-children">
        {agents.map((a) => (
          <button
            key={a.id}
            onClick={() => handleAgentClick(a.id)}
            className={`glass-card rounded-xl p-7 group text-left transition-all duration-500 cursor-pointer ${
              activeAgent === a.id
                ? '!border-primary/40 !bg-primary/[0.08] shadow-[0_0_40px_hsl(var(--gold)/0.12)] scale-[1.02]'
                : ''
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`text-[28px] transition-transform duration-300 ${activeAgent === a.id ? 'scale-125 animate-float' : 'group-hover:scale-110'}`}>
                {a.icon}
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[10px] font-bold text-primary/40 tracking-[2px] font-mono">AGENT {a.id === 'financial' ? '01' : a.id === 'fundability' ? '02' : a.id === 'capital' ? '03' : a.id === 'execution' ? '04' : a.id === 'documentation' ? '05' : '06'}</div>
                {activeAgent === a.id && (
                  <span className="w-2 h-2 bg-success rounded-full animate-glow" />
                )}
              </div>
            </div>
            <div className={`text-sm font-bold mb-2 transition-colors duration-300 ${activeAgent === a.id ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>{a.name}</div>
            <div className="text-xs text-foreground/40 leading-[1.7] mb-4">{a.desc}</div>
            <div className="flex flex-col gap-2 pt-3 border-t border-foreground/[0.05]">
              {a.bullets.map((b, i) => (
                <div key={i} className="text-[11px] text-foreground/50 flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full flex-shrink-0" />
                  {b}
                </div>
              ))}
            </div>
            {activeAgent !== a.id && (
              <div className="mt-4 text-[10px] font-bold text-primary/60 uppercase tracking-[1.5px] font-mono flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                🤖 Click to meet me →
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Agent Speech Bubble */}
      {activeAgent && activeAgentData && (
        <div className="mt-8 animate-fade-up">
          <div className="glass-card rounded-2xl p-6 max-w-3xl mx-auto relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-gold-lt flex items-center justify-center text-2xl flex-shrink-0 shadow-[0_4px_20px_hsl(var(--gold)/0.25)] animate-float">
                {activeAgentData.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-bold text-primary">{activeAgentData.name}</span>
                  <span className="w-2 h-2 bg-success rounded-full animate-glow" />
                  <span className="text-[9px] text-success font-mono font-bold tracking-[1px]">SPEAKING</span>
                </div>
                
                {loadingIntro ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-foreground/50">
                      <span className="inline-flex gap-1">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                      Thinking...
                    </div>
                  </div>
                ) : (
                  <div className="prose prose-sm prose-invert max-w-none text-[13px] text-foreground/70 leading-[1.8] [&_strong]:text-foreground [&_p]:mb-2">
                    <ReactMarkdown>{introText}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-foreground/[0.05] flex items-center justify-between">
              <span className="text-[10px] text-foreground/30 font-mono">Powered by Credibility Suite AI</span>
              <button
                onClick={() => { setActiveAgent(null); setIntroText(''); }}
                className="text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none"
              >
                Dismiss ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AgentsSection;

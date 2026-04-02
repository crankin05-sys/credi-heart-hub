import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { supabase } from '@/integrations/supabase/client';
import ScrollReveal from '@/components/ScrollReveal';

const agents = [
  { id: 'financial', icon: '💰', name: 'Financial Health Agent', desc: 'Reads QuickBooks and accounting data in real time. Flags issues before they become problems.', bullets: ['Cash flow monitoring', 'Expense ratio analysis', 'Revenue trend tracking'], color: 'from-[hsl(43_55%_54%/0.15)]' },
  { id: 'fundability', icon: '📊', name: 'Fundability Agent', desc: 'Generates and updates a real-time Fundability Score. Identifies every gap blocking loan approval.', bullets: ['Real-time score updates', 'Documentation gap alerts', 'Path to fundability roadmap'], color: 'from-[hsl(217_91%_60%/0.1)]' },
  { id: 'capital', icon: '🎯', name: 'Capital Matching Agent', desc: 'Matches each business to the right funding source based on their exact profile and readiness.', bullets: ['SBA & revolving funds', 'AR financing options', 'No-doc loan routing'], color: 'from-[hsl(160_72%_40%/0.1)]' },
  { id: 'execution', icon: '⚡', name: 'Execution Agent', desc: 'Creates a specific weekly action plan for every business. Exactly what to do this week to hit the goal.', bullets: ['Weekly task generation', 'Progress tracking', 'Goal-based priorities'], color: 'from-[hsl(38_92%_50%/0.1)]' },
  { id: 'documentation', icon: '📋', name: 'Documentation Agent', desc: 'Identifies missing documents and prepares the complete loan package — ready for underwriting.', bullets: ['Compliance checking', 'Document templates', 'Underwriting prep'], color: 'from-[hsl(270_80%_60%/0.08)]' },
  { id: 'growth', icon: '📈', name: 'Growth Strategy Agent', desc: 'Revenue optimization, customer targeting, and CRM-synced outreach recommendations.', bullets: ['Revenue optimization', 'Customer acquisition', 'CRM sync & learning'], color: 'from-[hsl(185_90%_50%/0.08)]' },
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
    <section id="agents" className="px-6 md:px-10 py-28 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,hsl(var(--primary)/0.04),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass rounded-full text-primary text-[10px] font-bold px-4 py-2 tracking-[3px] uppercase mb-5 font-mono">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-glow" />
              The Solution
            </div>
            <h2 className="font-display text-[clamp(32px,3.5vw,50px)] font-extrabold text-foreground leading-[1.08] mb-5 tracking-tight">
              6 AI Agents. One Platform.<br /><em className="italic text-gradient-gold not-italic">Complete Intelligence.</em>
            </h2>
            <p className="text-[15px] text-foreground/45 leading-[1.8] max-w-[540px] mx-auto">
              Each agent is specialized, trained, and running 24 hours a day. <strong className="text-foreground/70">Click any agent to hear them introduce themselves.</strong>
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {agents.map((a, i) => (
            <ScrollReveal key={a.id} delay={i * 0.08}>
              <button
                onClick={() => handleAgentClick(a.id)}
                className={`w-full neon-card rounded-xl p-7 group text-left cursor-pointer relative ${
                  activeAgent === a.id
                    ? '!border-primary/50 shadow-[0_0_60px_hsl(var(--gold)/0.15)] scale-[1.02]'
                    : ''
                }`}
              >
                {/* Colored glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${a.color} to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`text-[28px] transition-all duration-300 ${activeAgent === a.id ? 'scale-125 animate-float' : 'group-hover:scale-110'}`}>
                      {a.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-[10px] font-bold text-primary/40 tracking-[2px] font-mono">AGENT {String(i + 1).padStart(2, '0')}</div>
                      {activeAgent === a.id && (
                        <span className="w-2 h-2 bg-success rounded-full animate-glow" />
                      )}
                    </div>
                  </div>
                  <div className={`text-sm font-bold mb-2 transition-colors duration-300 ${activeAgent === a.id ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>{a.name}</div>
                  <div className="text-xs text-foreground/40 leading-[1.7] mb-4">{a.desc}</div>
                  <div className="flex flex-col gap-2 pt-3 border-t border-foreground/[0.05]">
                    {a.bullets.map((b, bi) => (
                      <div key={bi} className="text-[11px] text-foreground/50 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-gradient-to-r from-primary to-gold-lt rounded-full flex-shrink-0" />
                        {b}
                      </div>
                    ))}
                  </div>
                  {activeAgent !== a.id && (
                    <div className="mt-4 text-[10px] font-bold text-primary/60 uppercase tracking-[1.5px] font-mono flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      🤖 Click to meet me →
                    </div>
                  )}
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>

        {/* Agent Speech Bubble */}
        {activeAgent && activeAgentData && (
          <div className="mt-8 animate-fade-up">
            <div className="gradient-border max-w-3xl mx-auto">
              <div className="bg-[hsl(218_55%_12%)] rounded-2xl p-6 relative">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
                
                <div className="flex items-start gap-4">
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
                      <div className="flex items-center gap-2 text-xs text-foreground/50">
                        <span className="inline-flex gap-1">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </span>
                        Thinking...
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
          </div>
        )}
      </div>
    </section>
  );
};

export default AgentsSection;

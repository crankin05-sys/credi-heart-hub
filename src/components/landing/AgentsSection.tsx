const agents = [
  { num: '01', icon: '💰', name: 'Financial Health Agent', desc: 'Reads QuickBooks and accounting data in real time. Flags issues before they become problems.', bullets: ['Cash flow monitoring', 'Expense ratio analysis', 'Revenue trend tracking'] },
  { num: '02', icon: '📊', name: 'Fundability Agent', desc: 'Generates and updates a real-time Fundability Score. Identifies every gap blocking loan approval.', bullets: ['Real-time score updates', 'Documentation gap alerts', 'Path to fundability roadmap'] },
  { num: '03', icon: '🎯', name: 'Capital Matching Agent', desc: 'Matches each business to the right funding source based on their exact profile and readiness.', bullets: ['SBA & revolving funds', 'AR financing options', 'No-doc loan routing'] },
  { num: '04', icon: '⚡', name: 'Execution Agent', desc: 'Creates a specific weekly action plan for every business. Exactly what to do this week to hit the goal.', bullets: ['Weekly task generation', 'Progress tracking', 'Goal-based priorities'] },
  { num: '05', icon: '📋', name: 'Documentation Agent', desc: 'Identifies missing documents and prepares the complete loan package — ready for underwriting.', bullets: ['Compliance checking', 'Document templates', 'Underwriting prep'] },
  { num: '06', icon: '📈', name: 'Growth Strategy Agent', desc: 'Revenue optimization, customer targeting, and CRM-synced outreach recommendations.', bullets: ['Revenue optimization', 'Customer acquisition', 'CRM sync & learning'] },
];

const AgentsSection = () => (
  <section id="agents" className="px-6 md:px-10 py-24 max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <div className="text-[10px] font-bold tracking-[4px] text-primary uppercase mb-4 font-mono">The Solution</div>
      <h2 className="font-display text-[clamp(32px,3.5vw,50px)] font-extrabold text-foreground leading-[1.08] mb-5 tracking-tight">
        6 AI Agents. One Platform.<br /><em className="italic text-gradient-gold not-italic">Complete Intelligence.</em>
      </h2>
      <p className="text-[15px] text-foreground/45 leading-[1.8] max-w-[540px] mx-auto">
        Each agent is specialized, trained, and running 24 hours a day — handling every aspect of the path to fundability.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-children">
      {agents.map((a) => (
        <div key={a.num} className="glass-card rounded-xl p-7 group">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[28px] group-hover:scale-110 transition-transform duration-300">{a.icon}</div>
            <div className="text-[10px] font-bold text-primary/40 tracking-[2px] font-mono">AGENT {a.num}</div>
          </div>
          <div className="text-sm font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{a.name}</div>
          <div className="text-xs text-foreground/40 leading-[1.7] mb-4">{a.desc}</div>
          <div className="flex flex-col gap-2 pt-3 border-t border-foreground/[0.05]">
            {a.bullets.map((b, i) => (
              <div key={i} className="text-[11px] text-foreground/50 flex items-center gap-2">
                <span className="w-1 h-1 bg-primary rounded-full flex-shrink-0" />
                {b}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default AgentsSection;

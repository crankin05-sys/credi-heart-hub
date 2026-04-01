const agents = [
  { num: 'AGENT 01', icon: '💰', name: 'Financial Health Agent', desc: 'Reads QuickBooks and accounting data in real time. Flags issues before they become problems.', bullets: ['Cash flow monitoring', 'Expense ratio analysis', 'Revenue trend tracking'] },
  { num: 'AGENT 02', icon: '📊', name: 'Fundability Agent', desc: 'Generates and updates a real-time Fundability Score. Identifies every gap blocking loan approval.', bullets: ['Real-time score updates', 'Documentation gap alerts', 'Path to fundability roadmap'] },
  { num: 'AGENT 03', icon: '🎯', name: 'Capital Matching Agent', desc: 'Matches each business to the right funding source based on their exact profile and readiness.', bullets: ['SBA & revolving funds', 'AR financing options', 'No-doc loan routing'] },
  { num: 'AGENT 04', icon: '⚡', name: 'Execution Agent', desc: 'Creates a specific weekly action plan for every business. Exactly what to do this week to hit the goal.', bullets: ['Weekly task generation', 'Progress tracking', 'Goal-based priorities'] },
  { num: 'AGENT 05', icon: '📋', name: 'Documentation Agent', desc: 'Identifies missing documents and prepares the complete loan package — ready for underwriting.', bullets: ['Compliance checking', 'Document templates', 'Underwriting prep'] },
  { num: 'AGENT 06', icon: '📈', name: 'Growth Strategy Agent', desc: 'Revenue optimization, customer targeting, and CRM-synced outreach recommendations that learn and improve.', bullets: ['Revenue optimization', 'Customer acquisition', 'CRM sync & learning'] },
];

const AgentsSection = () => (
  <section id="agents" className="px-6 md:px-[60px] py-20">
    <div className="text-[10px] font-bold tracking-[3.5px] text-primary uppercase mb-3 font-mono">The Solution</div>
    <h2 className="font-display text-[clamp(32px,3.5vw,48px)] font-extrabold text-foreground leading-[1.1] mb-4 tracking-tight">
      6 AI Agents. One Platform.<br />Complete Business Intelligence.
    </h2>
    <p className="text-[15px] text-foreground/55 leading-[1.8] max-w-[580px] mb-12">
      Each agent is specialized, trained, and running 24 hours a day — handling every aspect of a business's path to fundability and capital access.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {agents.map((a) => (
        <div key={a.num} className="bg-foreground/[0.03] border border-border p-7 transition-all duration-300 hover:bg-primary/[0.06] hover:border-primary/25 hover:-translate-y-1 cursor-default">
          <div className="text-[10px] font-bold text-primary tracking-[2px] font-mono mb-3.5">{a.num}</div>
          <div className="text-[28px] mb-3">{a.icon}</div>
          <div className="text-sm font-extrabold text-foreground mb-2">{a.name}</div>
          <div className="text-xs text-foreground/45 leading-[1.65] mb-3.5">{a.desc}</div>
          <div className="flex flex-col gap-1.5">
            {a.bullets.map((b, i) => (
              <div key={i} className="text-[11px] text-primary/80 flex items-center gap-1.5">
                <span className="text-primary font-bold">→</span> {b}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default AgentsSection;

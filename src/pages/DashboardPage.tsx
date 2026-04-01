import { useState } from 'react';
import KPIRow from '@/components/KPIRow';
import BusinessModal from '@/components/BusinessModal';
import { businesses, Business, getScoreColor, getStatusLabel } from '@/data/businesses';

interface Props {
  onNavigate: (page: string) => void;
}

const DashboardPage = ({ onNavigate }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const [selectedBiz, setSelectedBiz] = useState<Business | null>(null);

  const loanQueue = businesses.filter(b => ['capital-ready', 'improving'].includes(b.status) && b.loanProduct);

  return (
    <div className="animate-fade-up">
      {/* Alert */}
      <div className="bg-primary/[0.08] border border-primary/20 border-l-4 border-l-primary px-4 py-3 mb-4 text-xs text-foreground/70 leading-relaxed">
        <strong className="text-primary">⚡ 3 Actions Required:</strong> Williams Catering reached score 78 — ready for capital approval. Park Tech Solutions loan package is complete and awaiting your committee review. Johnson & Sons Construction is missing 2 critical documents.
      </div>

      <KPIRow />

      <div className="grid grid-cols-[2fr_1fr] gap-3.5 max-lg:grid-cols-1">
        {/* Left column */}
        <div className="space-y-3.5">
          {/* Portfolio Table */}
          <div className="bg-card border border-border">
            <div className="px-4 py-3 bg-background border-b border-border flex justify-between items-center">
              <span className="text-[9px] font-bold tracking-[2px] uppercase text-primary font-mono">
                📋 Business Portfolio — Fundability Overview
              </span>
              <span className="text-[11px] text-muted-foreground cursor-pointer hover:text-primary transition-colors" onClick={() => onNavigate('businesses')}>
                View All →
              </span>
            </div>
            {!loaded ? (
              <div className="p-8 text-center text-muted-foreground text-sm">
                Click "Load Portfolio" below to populate
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      {['Business', 'Industry', 'Score', 'Status', 'Top Gap', 'Capital Need', 'Action'].map(h => (
                        <th key={h} className="bg-navy-3 text-muted-foreground text-[8px] font-bold tracking-[2px] uppercase px-3 py-2.5 text-left border-b border-border font-mono">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {businesses.filter(b => b.status !== 'funded').map(biz => {
                      const st = getStatusLabel(biz.status);
                      return (
                        <tr key={biz.id} className="hover:bg-foreground/[0.025] cursor-pointer" onClick={() => setSelectedBiz(biz)}>
                          <td className="px-3 py-2.5 text-xs border-b border-border/40 font-bold text-foreground">{biz.name}</td>
                          <td className="px-3 py-2.5 text-[11.5px] border-b border-border/40 text-foreground/65">{biz.industry}</td>
                          <td className={`px-3 py-2.5 text-[11.5px] border-b border-border/40 font-bold ${getScoreColor(biz.score)}`}>{biz.score}</td>
                          <td className="px-3 py-2.5 border-b border-border/40">
                            <span className={`inline-block text-[8px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-[0.5px] ${st.cls}`}>{st.label}</span>
                          </td>
                          <td className="px-3 py-2.5 text-[11.5px] border-b border-border/40 text-foreground/65">{biz.topGap}</td>
                          <td className="px-3 py-2.5 text-[11.5px] border-b border-border/40 text-foreground/65">${biz.capitalNeed.toLocaleString()}</td>
                          <td className="px-3 py-2.5 border-b border-border/40">
                            <span className="text-primary text-[10px] font-bold cursor-pointer hover:text-gold-lt transition-colors">View →</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Checklist Tracker */}
          <div className="bg-card border border-border">
            <div className="px-4 py-3 bg-background border-b border-border">
              <span className="text-[9px] font-bold tracking-[2px] uppercase text-primary font-mono">
                ✅ Fundability Checklist Tracker
              </span>
            </div>
            {!loaded ? (
              <div className="p-6 text-center text-muted-foreground text-sm">Load portfolio to see checklist progress</div>
            ) : (
              businesses.filter(b => b.status !== 'funded').slice(0, 5).map(biz => {
                const done = biz.checklist.filter(c => c.complete).length;
                const pct = Math.round((done / biz.checklist.length) * 100);
                const missing = biz.checklist.filter(c => !c.complete);
                return (
                  <div key={biz.id} className="px-3.5 py-2.5 border-b border-border/50 last:border-b-0 cursor-pointer hover:bg-foreground/[0.02]" onClick={() => setSelectedBiz(biz)}>
                    <div className="text-xs font-bold text-foreground mb-1 flex justify-between items-center">
                      {biz.name}
                      <span className={`text-[10px] font-bold font-mono ${getScoreColor(biz.score)}`}>{biz.score}/100</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-foreground/5 rounded-sm overflow-hidden">
                        <div className={`h-full rounded-sm ${pct >= 90 ? 'bg-success' : pct >= 60 ? 'bg-warning' : 'bg-destructive'}`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className={`text-[10px] font-bold font-mono ${pct >= 90 ? 'text-success' : pct >= 60 ? 'text-warning' : 'text-destructive'}`}>{pct}%</span>
                    </div>
                    {missing.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {missing.slice(0, 3).map((m, i) => (
                          <span key={i} className="inline-flex items-center gap-0.5 bg-destructive/10 border border-destructive/30 text-destructive text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                            ✗ {m.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-3.5">
          {/* Loan Queue */}
          <div className="bg-card border border-border">
            <div className="px-4 py-3 bg-background border-b border-border flex justify-between items-center">
              <span className="text-[9px] font-bold tracking-[2px] uppercase text-primary font-mono">🏦 Loan Approval Queue</span>
              <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">3 Pending</span>
            </div>
            {loanQueue.map(biz => (
              <div key={biz.id} className="px-3.5 py-3 border-b border-border/50 last:border-b-0">
                <div className="text-xs font-bold text-foreground mb-0.5">{biz.name}</div>
                <div className="text-[10px] text-muted-foreground mb-1">{biz.loanProduct} · Score: {biz.score}</div>
                <div className="font-display text-xl text-primary leading-none mb-1.5">${biz.capitalNeed.toLocaleString()}</div>
                <div className="h-[3px] bg-foreground/5 rounded-sm mb-1">
                  <div className={`h-full rounded-sm ${biz.score >= 75 ? 'bg-success' : 'bg-warning'}`} style={{ width: `${biz.score}%` }} />
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>{biz.score >= 75 ? 'Package: Complete ✓' : `Missing docs`}</span>
                  <span className={biz.score >= 75 ? 'text-success font-extrabold' : 'text-primary font-extrabold'}>
                    {biz.score >= 75 ? 'APPROVE →' : 'TRACK →'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Revenue */}
          <div className="bg-card border border-border">
            <div className="px-4 py-3 bg-background border-b border-border">
              <span className="text-[9px] font-bold tracking-[2px] uppercase text-primary font-mono">💰 Platform Revenue — This Month</span>
            </div>
            {[
              { label: 'Origination Fees', value: '$12,400' },
              { label: 'SaaS Reseller Commissions', value: '$3,200' },
              { label: 'Technical Assistance Fees', value: '$6,800' },
              { label: 'Capital Referral Fees', value: '$2,050' },
            ].map((r, i) => (
              <div key={i} className="px-3.5 py-2.5 border-b border-border/40 flex justify-between items-center last:border-b-0">
                <span className="text-[11.5px] text-muted-foreground">{r.label}</span>
                <span className="font-mono text-xs font-bold text-primary">{r.value}</span>
              </div>
            ))}
            <div className="px-3.5 py-2.5 border-t-2 border-t-primary flex justify-between items-center">
              <span className="text-[11.5px] font-bold text-foreground">Total Platform Revenue</span>
              <span className="font-mono text-[15px] font-bold text-primary">$24,450</span>
            </div>
          </div>

          {/* Activity */}
          <div className="bg-card border border-border">
            <div className="px-4 py-3 bg-background border-b border-border flex justify-between items-center">
              <span className="text-[9px] font-bold tracking-[2px] uppercase text-primary font-mono">⚡ Live Activity</span>
              <span className="text-[9px] text-success font-mono font-bold">● LIVE</span>
            </div>
            {[
              { text: 'Williams Catering score reached 78 — capital ready for review', time: '4 min ago', color: 'bg-success' },
              { text: 'Documentation Agent flagged missing operating agreement for Johnson & Sons', time: '9 min ago', color: 'bg-destructive' },
              { text: 'Sunrise Daycare score improved from 64 to 71 after uploading bank statements', time: '22 min ago', color: 'bg-primary' },
              { text: '3 businesses submitted intake forms overnight — assessments queued', time: '6 hrs ago', color: 'bg-muted-foreground' },
            ].map((a, i) => (
              <div key={i} className="px-3.5 py-2.5 border-b border-border/40 flex gap-2.5 text-[11px] last:border-b-0">
                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${a.color}`} />
                <div>
                  <div className="text-foreground/55 leading-relaxed">{a.text}</div>
                  <div className="text-[9px] text-muted-foreground mt-0.5 font-mono">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Load button */}
      {!loaded && (
        <div className="mt-4 flex gap-3">
          <button onClick={() => setLoaded(true)} className="bg-gradient-to-br from-primary to-gold-lt text-primary-foreground border-none font-body text-[11px] font-extrabold px-5 py-2.5 cursor-pointer tracking-[1.5px] uppercase rounded-sm transition-all hover:brightness-110">
            ▶ Load Portfolio
          </button>
        </div>
      )}

      <BusinessModal business={selectedBiz} onClose={() => setSelectedBiz(null)} />
    </div>
  );
};

export default DashboardPage;

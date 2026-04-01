import { useState } from 'react';
import BusinessModal from '@/components/BusinessModal';
import { businesses, Business, getScoreColor, getStatusLabel } from '@/data/businesses';

const BusinessesPage = () => {
  const [selectedBiz, setSelectedBiz] = useState<Business | null>(null);

  const stages: { key: Business['status']; label: string }[] = [
    { key: 'assessment', label: 'Assessment' },
    { key: 'improving', label: 'Improving' },
    { key: 'capital-ready', label: 'Capital Ready ✓' },
    { key: 'under-review', label: 'Under Review' },
    { key: 'funded', label: 'Funded ✓' },
  ];

  return (
    <div className="animate-fade-up">
      <div className="text-sm text-muted-foreground mb-4">
        10 businesses tracked · Click any business to view full checklist
      </div>

      {/* Full Table */}
      <div className="bg-card border border-border mb-4">
        <div className="px-4 py-3 bg-background border-b border-border flex justify-between items-center">
          <span className="text-[9px] font-bold tracking-[2px] uppercase text-primary font-mono">
            📋 Full Portfolio — Fundability & Checklist Status
          </span>
          <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">{businesses.length} Businesses</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {['Business', 'Industry', 'Score', 'Status', 'Checklist', 'Top Blocking Gap', 'Capital Need', 'Action'].map(h => (
                  <th key={h} className="bg-navy-3 text-muted-foreground text-[8px] font-bold tracking-[2px] uppercase px-3 py-2.5 text-left border-b border-border font-mono">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {businesses.map(biz => {
                const st = getStatusLabel(biz.status);
                const done = biz.checklist.filter(c => c.complete).length;
                const pct = Math.round((done / biz.checklist.length) * 100);
                return (
                  <tr key={biz.id} className="hover:bg-foreground/[0.025] cursor-pointer" onClick={() => setSelectedBiz(biz)}>
                    <td className="px-3 py-2.5 text-xs border-b border-border/40 font-bold text-foreground">{biz.name}</td>
                    <td className="px-3 py-2.5 text-[11.5px] border-b border-border/40 text-foreground/65">{biz.industry}</td>
                    <td className={`px-3 py-2.5 text-[11.5px] border-b border-border/40 font-bold ${getScoreColor(biz.score)}`}>{biz.score}</td>
                    <td className="px-3 py-2.5 border-b border-border/40">
                      <span className={`inline-block text-[8px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-[0.5px] ${st.cls}`}>{st.label}</span>
                    </td>
                    <td className="px-3 py-2.5 border-b border-border/40">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1 bg-foreground/5 rounded-sm overflow-hidden">
                          <div className={`h-full rounded-sm ${pct >= 90 ? 'bg-success' : pct >= 60 ? 'bg-warning' : 'bg-destructive'}`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground">{pct}%</span>
                      </div>
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
      </div>

      {/* Pipeline cards by stage */}
      <div className="text-xs text-muted-foreground mb-3">
        Businesses sorted by fundability stage — click any card to view their checklist and gaps
      </div>
      <div className="grid grid-cols-5 gap-3 max-lg:grid-cols-2">
        {stages.map(stage => {
          const items = businesses.filter(b => b.status === stage.key);
          return (
            <div key={stage.key} className="bg-card border border-border">
              <div className="px-3 py-2.5 bg-background border-b border-border flex justify-between items-center">
                <span className="text-[9px] font-bold tracking-[1.5px] uppercase text-muted-foreground font-mono">{stage.label}</span>
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">{items.length}</span>
              </div>
              <div className="p-2 min-h-[180px] flex flex-col gap-2">
                {items.map(biz => {
                  const missing = biz.checklist.filter(c => !c.complete);
                  return (
                    <div
                      key={biz.id}
                      className={`bg-navy-3 border border-border p-2.5 rounded-sm cursor-pointer transition-all hover:border-primary/30 border-l-[3px] ${
                        biz.score >= 75 ? 'border-l-success' : biz.score >= 50 ? 'border-l-warning' : 'border-l-destructive'
                      }`}
                      onClick={() => setSelectedBiz(biz)}
                    >
                      <div className="text-[11.5px] font-bold text-foreground mb-0.5">{biz.name}</div>
                      <div className="text-[10px] text-muted-foreground mb-1.5">
                        {biz.industry} · Score: {biz.score}
                      </div>
                      {missing.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {missing.slice(0, 3).map((m, i) => (
                            <span key={i} className="text-[8px] font-bold px-1 py-0.5 bg-destructive/10 text-destructive rounded-full border border-destructive/30">
                              {m.label.length > 16 ? m.label.slice(0, 14) + '…' : m.label}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[9px] text-success font-bold">All docs complete ✓</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <BusinessModal business={selectedBiz} onClose={() => setSelectedBiz(null)} />
    </div>
  );
};

export default BusinessesPage;

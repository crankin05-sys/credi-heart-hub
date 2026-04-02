import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { getScoreColor } from '@/data/businesses';
import type { Json } from '@/integrations/supabase/types';

interface ChecklistItem {
  label: string;
  complete: boolean;
}

interface BusinessRow {
  id: string;
  name: string;
  industry: string | null;
  score: number;
  status: string;
  capital_need: number | null;
  checklist: Json;
  top_gap: string | null;
}

interface Submission {
  id: string;
  checklist_key: string;
  file_name: string;
  file_url: string;
  submitted_at: string;
  verified: boolean;
}

const ClientDashboard = () => {
  const { user } = useAuth();
  const [businesses, setBusinesses] = useState<BusinessRow[]>([]);
  const [selectedBizId, setSelectedBizId] = useState<string>('');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [uploading, setUploading] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState<string>('');

  useEffect(() => {
    if (!user) return;
    supabase
      .from('businesses')
      .select('id, name, industry, score, status, capital_need, checklist, top_gap')
      .eq('user_id', user.id)
      .then(({ data }) => {
        if (data && data.length > 0) {
          setBusinesses(data);
          setSelectedBizId(data[0].id);
        }
        setLoading(false);
      });
  }, [user]);

  useEffect(() => {
    if (!selectedBizId) return;
    supabase
      .from('checklist_submissions')
      .select('*')
      .eq('business_id', selectedBizId)
      .then(({ data }) => {
        if (data) setSubmissions(data as Submission[]);
      });
  }, [selectedBizId]);

  const biz = businesses.find(b => b.id === selectedBizId);
  const checklist: ChecklistItem[] = biz ? (Array.isArray(biz.checklist) ? biz.checklist as unknown as ChecklistItem[] : []) : [];
  const complete = checklist.filter(c => c.complete).length;
  const total = checklist.length;
  const pct = total > 0 ? Math.round((complete / total) * 100) : 0;

  const getSubmission = (key: string) => submissions.find(s => s.checklist_key === key);

  const handleUpload = async (checklistKey: string) => {
    setUploadTarget(checklistKey);
    fileInputRef.current?.click();
  };

  const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user || !selectedBizId || !uploadTarget) return;

    setUploading(uploadTarget);
    try {
      const filePath = `${user.id}/${selectedBizId}/${uploadTarget.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      const { error: subError } = await supabase
        .from('checklist_submissions')
        .upsert({
          business_id: selectedBizId,
          checklist_key: uploadTarget,
          file_url: urlData.publicUrl,
          file_name: file.name,
        }, { onConflict: 'business_id,checklist_key' });

      if (subError) throw subError;

      const updatedChecklist = checklist.map(item =>
        item.label === uploadTarget ? { ...item, complete: true } : item
      );
      await supabase
        .from('businesses')
        .update({ checklist: updatedChecklist as unknown as Json })
        .eq('id', selectedBizId);

      setSubmissions(prev => {
        const filtered = prev.filter(s => s.checklist_key !== uploadTarget);
        return [...filtered, {
          id: crypto.randomUUID(),
          checklist_key: uploadTarget,
          file_name: file.name,
          file_url: urlData.publicUrl,
          submitted_at: new Date().toISOString(),
          verified: false,
        }];
      });

      setBusinesses(prev => prev.map(b =>
        b.id === selectedBizId ? { ...b, checklist: updatedChecklist as unknown as Json, score: Math.min(100, b.score + 2) } : b
      ));
    } catch (err: any) {
      console.error('Upload error:', err);
      alert('Upload failed: ' + (err.message || 'Unknown error'));
    } finally {
      setUploading(null);
      setUploadTarget('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'capital-ready': return { label: 'Capital Ready', cls: 'bg-success/10 text-success border border-success/20' };
      case 'funded': return { label: 'Funded ✓', cls: 'bg-success/20 text-success border border-success/30' };
      case 'improving': return { label: 'Improving', cls: 'bg-warning/10 text-warning border border-warning/20' };
      default: return { label: 'Assessment', cls: 'bg-info/10 text-info border border-info/20' };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="glass rounded-2xl px-8 py-6 text-center animate-pulse">
          <div className="text-2xl mb-2">✨</div>
          <div className="text-sm text-muted-foreground">Loading your dashboard...</div>
        </div>
      </div>
    );
  }

  if (businesses.length === 0) {
    return (
      <div className="animate-fade-up max-w-lg mx-auto mt-12">
        <div className="glass-card rounded-2xl p-10 text-center">
          <div className="text-5xl mb-5">📋</div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">Welcome to Credibility Suite AI</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Your fund manager hasn't set up your business profile yet. Once they do, you'll see your fundability checklist and score here.
          </p>
        </div>
      </div>
    );
  }

  const status = biz ? getStatusBadge(biz.status) : null;

  // Score ring SVG
  const scoreRadius = 42;
  const scoreCircumference = 2 * Math.PI * scoreRadius;
  const scoreOffset = scoreCircumference - (scoreCircumference * (biz?.score || 0)) / 100;

  return (
    <div className="animate-fade-up space-y-5">
      <input type="file" ref={fileInputRef} className="hidden" onChange={onFileSelected} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx,.csv" />

      {/* Business selector if multiple */}
      {businesses.length > 1 && (
        <div className="glass-card rounded-xl p-4">
          <label className="text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground font-mono block mb-2">Select Business</label>
          <select
            value={selectedBizId}
            onChange={e => setSelectedBizId(e.target.value)}
            className="w-full bg-background/50 border border-foreground/[0.08] text-foreground text-xs p-2.5 rounded-lg focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
          >
            {businesses.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
      )}

      {biz && (
        <>
          {/* Score + Status Hero */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-8">
              {/* Score Ring */}
              <div className="score-ring flex-shrink-0">
                <svg width="108" height="108" viewBox="0 0 108 108">
                  <circle cx="54" cy="54" r={scoreRadius} fill="none" stroke="hsl(var(--foreground) / 0.05)" strokeWidth="6" />
                  <circle
                    cx="54" cy="54" r={scoreRadius} fill="none"
                    stroke="url(#scoreGradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={scoreCircumference}
                    strokeDashoffset={scoreOffset}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--gold-lt))" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className={`font-display text-[32px] font-extrabold leading-none ${getScoreColor(biz.score)}`}>
                    {biz.score}
                  </div>
                  <div className="text-[8px] text-muted-foreground uppercase tracking-[1px] font-mono mt-0.5">Score</div>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-display text-xl font-bold text-foreground">{biz.name}</h2>
                  {status && (
                    <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-[0.5px] ${status.cls}`}>{status.label}</span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground mb-4">{biz.industry} · ${(biz.capital_need || 0).toLocaleString()} capital needed</div>
                
                {/* Progress bar */}
                <div className="relative">
                  <div className="h-2 bg-foreground/[0.04] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-gold-lt transition-all duration-1000 relative"
                      style={{ width: `${pct}%` }}
                    >
                      <div className="absolute inset-0 animate-shimmer rounded-full" />
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] text-muted-foreground font-mono">{complete}/{total} complete</span>
                    <span className="text-[10px] font-bold text-primary font-mono">{pct}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status banner */}
          {pct === 100 ? (
            <div className="glass rounded-xl border border-success/20 px-5 py-4 text-sm text-success font-medium flex items-center gap-3">
              <span className="text-xl">🎉</span>
              All checklist items complete! Your business is fundability-ready. Your fund manager will review your package.
            </div>
          ) : (
            <div className="glass rounded-xl border border-primary/15 px-5 py-4 text-sm text-foreground/60 flex items-center gap-3">
              <span className="text-xl">📋</span>
              <div>
                <strong className="text-primary">{total - complete} items remaining</strong> — Upload documents below to improve your fundability score.
              </div>
            </div>
          )}

          {/* Fundability Checklist */}
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-foreground/[0.06] flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[2px] uppercase text-primary font-mono">
                📋 Your Fundability Checklist
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">{complete} of {total}</span>
            </div>
            <div className="stagger-children">
              {checklist.map((item, i) => {
                const sub = getSubmission(item.label);
                const isUploading = uploading === item.label;
                return (
                  <div key={i} className={`px-5 py-4 border-b border-foreground/[0.04] last:border-b-0 flex items-center gap-4 transition-all duration-300 ${
                    item.complete ? 'bg-success/[0.02]' : 'hover:bg-foreground/[0.02]'
                  }`}>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0 transition-all duration-300 ${
                      item.complete
                        ? 'bg-success/15 text-success shadow-[0_0_12px_hsl(var(--success)/0.15)]'
                        : 'bg-foreground/[0.05] text-muted-foreground'
                    }`}>
                      {item.complete ? '✓' : (i + 1)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-[13px] font-medium ${item.complete ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                        {item.label}
                      </div>
                      {sub && (
                        <div className="text-[10px] text-muted-foreground mt-1 font-mono flex items-center gap-2">
                          📎 {sub.file_name}
                          {sub.verified ? (
                            <span className="text-success font-bold bg-success/10 px-1.5 py-0.5 rounded-full">✓ Verified</span>
                          ) : (
                            <span className="text-warning bg-warning/10 px-1.5 py-0.5 rounded-full">Pending review</span>
                          )}
                        </div>
                      )}
                    </div>
                    {!item.complete && (
                      <button
                        onClick={() => handleUpload(item.label)}
                        disabled={isUploading}
                        className="text-[10px] font-bold text-primary bg-primary/[0.08] border border-primary/20 px-4 py-2 rounded-lg cursor-pointer hover:bg-primary/15 hover:border-primary/30 transition-all duration-300 disabled:opacity-50 flex-shrink-0 hover:-translate-y-0.5"
                      >
                        {isUploading ? '⏳ Uploading...' : '📤 Upload'}
                      </button>
                    )}
                    {item.complete && !sub && (
                      <span className="text-[10px] font-bold text-success flex-shrink-0 bg-success/10 px-2 py-1 rounded-full">✓ Complete</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Gap */}
          {biz.top_gap && biz.top_gap !== 'None' && biz.top_gap !== 'None — All docs complete' && (
            <div className="glass rounded-xl border border-warning/15 px-5 py-4 text-sm text-foreground/60 flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              <div>
                <strong className="text-warning">Top Gap:</strong> {biz.top_gap}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClientDashboard;

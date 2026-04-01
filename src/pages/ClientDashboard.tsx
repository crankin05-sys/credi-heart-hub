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

      // Upsert submission
      const { error: subError } = await supabase
        .from('checklist_submissions')
        .upsert({
          business_id: selectedBizId,
          checklist_key: uploadTarget,
          file_url: urlData.publicUrl,
          file_name: file.name,
        }, { onConflict: 'business_id,checklist_key' });

      if (subError) throw subError;

      // Update checklist in business record
      const updatedChecklist = checklist.map(item =>
        item.label === uploadTarget ? { ...item, complete: true } : item
      );
      await supabase
        .from('businesses')
        .update({ checklist: updatedChecklist as unknown as Json })
        .eq('id', selectedBizId);

      // Refresh
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

      // Update local business data
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
      case 'capital-ready': return { label: 'Capital Ready', cls: 'bg-success/15 text-success border border-success' };
      case 'funded': return { label: 'Funded ✓', cls: 'bg-success/30 text-success border border-success' };
      case 'improving': return { label: 'Improving', cls: 'bg-warning/15 text-warning border border-warning' };
      default: return { label: 'Assessment', cls: 'bg-info/15 text-info border border-info' };
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground text-sm animate-pulse">
        Loading your dashboard...
      </div>
    );
  }

  if (businesses.length === 0) {
    return (
      <div className="animate-fade-up">
        <div className="bg-card border border-border p-8 text-center">
          <div className="text-4xl mb-4">📋</div>
          <h2 className="font-display text-xl font-bold text-foreground mb-2">Welcome to Credibility Suite AI</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Your fund manager hasn't set up your business profile yet. Once they do, you'll see your fundability checklist and score here.
          </p>
        </div>
      </div>
    );
  }

  const status = biz ? getStatusBadge(biz.status) : null;

  return (
    <div className="animate-fade-up">
      <input type="file" ref={fileInputRef} className="hidden" onChange={onFileSelected} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx,.csv" />

      {/* Business selector if multiple */}
      {businesses.length > 1 && (
        <div className="bg-card border border-border p-3 mb-4">
          <label className="text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground font-mono block mb-1.5">Select Business</label>
          <select
            value={selectedBizId}
            onChange={e => setSelectedBizId(e.target.value)}
            className="w-full bg-background border border-border text-foreground text-xs p-2 rounded-sm focus:border-primary focus:outline-none"
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
          <div className="bg-card border border-border p-5 mb-4">
            <div className="flex items-center gap-6">
              <div>
                <div className={`font-display text-[56px] font-extrabold ${getScoreColor(biz.score)} leading-none`}>
                  {biz.score}
                </div>
                <div className="text-[9px] text-muted-foreground uppercase tracking-[1.5px] font-mono mt-1">Fundability Score</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="font-display text-lg font-bold text-foreground">{biz.name}</h2>
                  {status && (
                    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-[0.5px] ${status.cls}`}>{status.label}</span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground mb-2">{biz.industry} · ${(biz.capital_need || 0).toLocaleString()} capital needed</div>
                <div className="h-2.5 bg-foreground/5 rounded-sm overflow-hidden">
                  <div
                    className={`h-full rounded-sm transition-all duration-500 ${pct >= 90 ? 'bg-success' : pct >= 60 ? 'bg-warning' : 'bg-destructive'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="text-[10px] text-muted-foreground mt-1 font-mono">{complete}/{total} checklist items complete ({pct}%)</div>
              </div>
            </div>
          </div>

          {/* Pct banner */}
          {pct === 100 ? (
            <div className="bg-success/10 border border-success/30 px-4 py-3 mb-4 text-xs text-success font-bold">
              🎉 All checklist items complete! Your business is fundability-ready. Your fund manager will review your package.
            </div>
          ) : (
            <div className="bg-primary/[0.08] border border-primary/20 px-4 py-3 mb-4 text-xs text-foreground/70 leading-relaxed">
              <strong className="text-primary">📋 {total - complete} items remaining</strong> — Upload the missing documents below to improve your fundability score and get closer to capital access.
            </div>
          )}

          {/* Fundability Checklist */}
          <div className="bg-card border border-border">
            <div className="px-4 py-3 bg-background border-b border-border">
              <span className="text-[9px] font-bold tracking-[2px] uppercase text-primary font-mono">
                📋 Your Fundability Checklist
              </span>
            </div>
            {checklist.map((item, i) => {
              const sub = getSubmission(item.label);
              const isUploading = uploading === item.label;
              return (
                <div key={i} className={`px-4 py-3 border-b border-border/50 last:border-b-0 flex items-center gap-3 ${
                  item.complete ? 'bg-success/[0.03]' : 'hover:bg-foreground/[0.02]'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-extrabold flex-shrink-0 ${
                    item.complete
                      ? 'bg-success/20 text-success'
                      : 'bg-foreground/10 text-muted-foreground'
                  }`}>
                    {item.complete ? '✓' : (i + 1)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-semibold ${item.complete ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                      {item.label}
                    </div>
                    {sub && (
                      <div className="text-[10px] text-muted-foreground mt-0.5 font-mono flex items-center gap-1.5">
                        📎 {sub.file_name}
                        {sub.verified ? (
                          <span className="text-success font-bold">✓ Verified</span>
                        ) : (
                          <span className="text-warning">Pending review</span>
                        )}
                      </div>
                    )}
                  </div>
                  {!item.complete && (
                    <button
                      onClick={() => handleUpload(item.label)}
                      disabled={isUploading}
                      className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/30 px-3 py-1.5 rounded-sm cursor-pointer hover:bg-primary/20 transition-all disabled:opacity-50 flex-shrink-0"
                    >
                      {isUploading ? '⏳ Uploading...' : '📤 Upload'}
                    </button>
                  )}
                  {item.complete && !sub && (
                    <span className="text-[10px] font-bold text-success flex-shrink-0">✓ Complete</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Top Gap */}
          {biz.top_gap && biz.top_gap !== 'None' && biz.top_gap !== 'None — All docs complete' && (
            <div className="bg-warning/[0.08] border border-warning/20 px-4 py-3 mt-4 text-xs text-foreground/70">
              <strong className="text-warning">⚠️ Top Gap:</strong> {biz.top_gap}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClientDashboard;

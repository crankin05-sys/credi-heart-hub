import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { Json } from '@/integrations/supabase/types';

interface ChecklistItem { label: string; complete: boolean; }
interface BusinessRow {
  id: string; name: string; industry: string | null; score: number; status: string;
  capital_need: number | null; checklist: Json; top_gap: string | null; loan_product: string | null; notes: string | null;
}
interface Submission { id: string; checklist_key: string; file_name: string; file_url: string; submitted_at: string; verified: boolean; }

const agentDefs = [
  { id: 'fundability', icon: '📊', name: 'Fundability', desc: 'Score optimization & gap identification', weight: 0.2 },
  { id: 'capital', icon: '🎯', name: 'Capital Matching', desc: 'Funding program matching & routing', weight: 0.2 },
  { id: 'financial', icon: '💰', name: 'Financial Health', desc: 'Cash flow & profitability analysis', weight: 0.2 },
  { id: 'docs', icon: '📄', name: 'Documentation', desc: 'Underwriting preparation', weight: 0.15 },
  { id: 'growth', icon: '📈', name: 'Growth Strategy', desc: 'Revenue optimization & scaling', weight: 0.15 },
  { id: 'execution', icon: '⚡', name: 'Execution', desc: 'Weekly action plans & priorities', weight: 0.1 },
];

const computeAgentScores = (biz: BusinessRow, checklist: ChecklistItem[]) => {
  const pct = checklist.length > 0 ? checklist.filter(c => c.complete).length / checklist.length : 0;
  const notes = biz.notes || '';
  const hasRevenue = notes.includes('Revenue: 1m') || notes.includes('Revenue: 250k') || notes.includes('Revenue: 100k');
  const hasDocs = pct > 0.5;
  return agentDefs.map(a => {
    let s = 0;
    switch (a.id) {
      case 'fundability': s = Math.round(biz.score * 0.7 + pct * 30); break;
      case 'capital': s = hasRevenue ? 60 : 25; if (hasDocs) s += 20; break;
      case 'financial': s = hasRevenue ? 55 : 20; s += Math.round(pct * 20); break;
      case 'docs': s = Math.round(pct * 90 + 10); break;
      case 'growth': s = hasRevenue ? 45 : 15; s += Math.round(pct * 15); break;
      case 'execution': s = Math.round(pct * 60 + 20); break;
    }
    return { ...a, score: Math.min(100, Math.max(0, s)) };
  });
};

/* Canvas generator from notes */
const parseCanvas = (biz: BusinessRow) => {
  const notes = biz.notes || '';
  const hasRevenue = !notes.includes('Revenue: pre') && !notes.includes('Revenue: under100k');
  const established = notes.includes('Time: 10+') || notes.includes('Time: 2-10');
  return {
    valueProposition: hasRevenue
      ? `${biz.name} delivers proven value with an established revenue model and market traction.`
      : `${biz.name} is positioned to capture market share with a fresh approach and growth potential.`,
    customerSegments: established ? 'Established customer base with repeat buyers' : 'Early adopters and initial market segment',
    revenueStreams: hasRevenue ? 'Active revenue streams generating consistent income' : 'Revenue model in development',
    keyActivities: established ? 'Operations, customer fulfillment, scaling systems' : 'Product development, market validation',
    keyResources: hasRevenue ? 'Team, technology, customer relationships' : 'Founder expertise, initial capital',
    channels: established ? 'Direct sales, partnerships, digital marketing' : 'Social media, direct outreach',
    growthOpportunities: hasRevenue ? 'Expand product lines, enter new markets' : 'Validate product-market fit, build customer base',
    gapsRisks: !hasRevenue ? 'Pre-revenue risk — need to establish cash flow' : 'Scaling risk — systems may need upgrading',
  };
};

const ClientDashboard = () => {
  const { user } = useAuth();
  const [businesses, setBusinesses] = useState<BusinessRow[]>([]);
  const [selectedBizId, setSelectedBizId] = useState('');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [uploading, setUploading] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'canvas' | 'checklist' | 'agents'>('canvas');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState('');

  useEffect(() => {
    if (!user) return;
    supabase.from('businesses').select('id, name, industry, score, status, capital_need, checklist, top_gap, loan_product, notes')
      .eq('user_id', user.id).then(({ data }) => {
        if (data && data.length > 0) { setBusinesses(data); setSelectedBizId(data[0].id); }
        setLoading(false);
      });
  }, [user]);

  useEffect(() => {
    if (!selectedBizId) return;
    supabase.from('checklist_submissions').select('*').eq('business_id', selectedBizId)
      .then(({ data }) => { if (data) setSubmissions(data as Submission[]); });
  }, [selectedBizId]);

  const biz = businesses.find(b => b.id === selectedBizId);
  const checklist: ChecklistItem[] = biz ? (Array.isArray(biz.checklist) ? biz.checklist as unknown as ChecklistItem[] : []) : [];
  const complete = checklist.filter(c => c.complete).length;
  const total = checklist.length;
  const pct = total > 0 ? Math.round((complete / total) * 100) : 0;
  const agentScores = biz ? computeAgentScores(biz, checklist) : [];
  const overallScore = agentScores.length > 0 ? Math.round(agentScores.reduce((s, a) => s + a.score * a.weight, 0)) : 0;
  const canvas = biz ? parseCanvas(biz) : null;
  const getSubmission = (key: string) => submissions.find(s => s.checklist_key === key);

  const handleUpload = async (checklistKey: string) => { setUploadTarget(checklistKey); fileInputRef.current?.click(); };

  const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user || !selectedBizId || !uploadTarget) return;
    setUploading(uploadTarget);
    try {
      const filePath = `${user.id}/${selectedBizId}/${uploadTarget.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage.from('documents').upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage.from('documents').getPublicUrl(filePath);
      await supabase.from('checklist_submissions').upsert({
        business_id: selectedBizId, checklist_key: uploadTarget, file_url: urlData.publicUrl, file_name: file.name,
      }, { onConflict: 'business_id,checklist_key' });
      const updatedChecklist = checklist.map(item => item.label === uploadTarget ? { ...item, complete: true } : item);
      await supabase.from('businesses').update({ checklist: updatedChecklist as unknown as Json }).eq('id', selectedBizId);
      setSubmissions(prev => [...prev.filter(s => s.checklist_key !== uploadTarget),
        { id: crypto.randomUUID(), checklist_key: uploadTarget, file_name: file.name, file_url: urlData.publicUrl, submitted_at: new Date().toISOString(), verified: false }]);
      setBusinesses(prev => prev.map(b => b.id === selectedBizId ? { ...b, checklist: updatedChecklist as unknown as Json, score: Math.min(100, b.score + 2) } : b));
    } catch (err: any) { alert('Upload failed: ' + (err.message || 'Unknown error')); }
    finally { setUploading(null); setUploadTarget(''); if (fileInputRef.current) fileInputRef.current.value = ''; }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-6 text-center">
        <div className="text-2xl mb-2 animate-pulse">✨</div>
        <div className="text-sm text-gray-400">Loading your dashboard...</div>
      </div>
    </div>
  );

  if (businesses.length === 0) return (
    <div className="max-w-lg mx-auto mt-12">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
        <div className="text-5xl mb-5">📋</div>
        <h2 className="text-xl font-bold text-gray-900 mb-3">Welcome to Credibility Suite AI</h2>
        <p className="text-sm text-gray-400">Your business profile has not been set up yet. Complete the onboarding to get started.</p>
      </div>
    </div>
  );

  const CanvasCard = ({ icon, title, content }: { icon: string; title: string; content: string }) => (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all">
      <div className="flex items-center gap-2 mb-2">
        <span>{icon}</span>
        <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">{title}</span>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{content}</p>
    </div>
  );

  const tabs = [
    { id: 'canvas' as const, label: 'Business Canvas', icon: '🗂️' },
    { id: 'checklist' as const, label: 'Checklist', icon: '📋' },
    { id: 'agents' as const, label: 'AI Agents', icon: '🤖' },
  ];

  return (
    <div className="space-y-5">
      <input type="file" ref={fileInputRef} className="hidden" onChange={onFileSelected} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx,.csv" />

      {biz && (
        <>
          {/* Hero: Score + Business Info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 flex-shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#f3f4f6" strokeWidth="6" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="url(#dg)" strokeWidth="6" strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 42} strokeDashoffset={2 * Math.PI * 42 - (2 * Math.PI * 42 * (biz.score)) / 100}
                    className="transition-all duration-1000" />
                  <defs><linearGradient id="dg" x1="0%" y1="0%" x2="100%"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#10b981" /></linearGradient></defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">{biz.score}%</span>
                  <span className="text-[10px] text-gray-400">fundable</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-gray-900 truncate">{biz.name}</h2>
                <p className="text-xs text-gray-400 mt-0.5">{biz.industry || 'Industry TBD'} · Capital needed: ${(biz.capital_need || 0).toLocaleString()}</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-gray-500">{complete}/{total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-lg transition-all cursor-pointer border-none ${
                  activeTab === tab.id ? 'bg-white text-gray-900 shadow-sm' : 'bg-transparent text-gray-400 hover:text-gray-600'
                }`}>
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>

          {/* Canvas Tab */}
          {activeTab === 'canvas' && canvas && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">Live Business Model Canvas</h3>
                <p className="text-xs text-gray-400 mt-0.5">Auto-generated based on your profile data</p>
              </div>
              <div className="p-6 grid grid-cols-2 gap-3">
                <CanvasCard icon="💎" title="Value Proposition" content={canvas.valueProposition} />
                <CanvasCard icon="👥" title="Customer Segments" content={canvas.customerSegments} />
                <CanvasCard icon="💵" title="Revenue Streams" content={canvas.revenueStreams} />
                <CanvasCard icon="⚙️" title="Key Activities" content={canvas.keyActivities} />
                <CanvasCard icon="🏗️" title="Key Resources" content={canvas.keyResources} />
                <CanvasCard icon="📡" title="Channels" content={canvas.channels} />
                <CanvasCard icon="🚀" title="Growth Opportunities" content={canvas.growthOpportunities} />
                <CanvasCard icon="⚠️" title="Gaps / Risks" content={canvas.gapsRisks} />
              </div>
            </div>
          )}

          {/* Agents Tab */}
          {activeTab === 'agents' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">AI Agent Scores</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Overall</span>
                  <span className={`text-lg font-bold ${overallScore >= 70 ? 'text-emerald-600' : overallScore >= 45 ? 'text-amber-500' : 'text-red-500'}`}>{overallScore}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {agentScores.map(agent => {
                  const r = 30; const c = 2 * Math.PI * r;
                  const col = agent.score >= 70 ? 'text-emerald-600' : agent.score >= 45 ? 'text-amber-500' : 'text-red-500';
                  return (
                    <div key={agent.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center hover:border-blue-200 hover:shadow transition-all">
                      <div className="relative w-16 h-16 mx-auto mb-2">
                        <svg viewBox="0 0 68 68" className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
                          <circle cx="34" cy="34" r={r} fill="none" stroke="#f3f4f6" strokeWidth="4" />
                          <circle cx="34" cy="34" r={r} fill="none" stroke={agent.score >= 70 ? '#10b981' : agent.score >= 45 ? '#f59e0b' : '#ef4444'}
                            strokeWidth="4" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (c * agent.score) / 100}
                            className="transition-all duration-1000" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-sm font-bold ${col}`}>{agent.score}</span>
                        </div>
                      </div>
                      <div className="text-lg mb-1">{agent.icon}</div>
                      <div className="text-xs font-bold text-gray-700">{agent.name}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{agent.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Checklist Tab */}
          {activeTab === 'checklist' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-900">Fundability Checklist</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Upload documents to improve your score</p>
                </div>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{complete}/{total}</span>
              </div>
              <div>
                {checklist.map((item, i) => {
                  const sub = getSubmission(item.label);
                  const isUploading = uploading === item.label;
                  return (
                    <div key={i} className={`px-6 py-4 border-b border-gray-50 last:border-b-0 flex items-center gap-4 transition-all ${item.complete ? 'bg-emerald-50/50' : 'hover:bg-gray-50'}`}>
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${item.complete ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                        {item.complete ? '✓' : i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-medium ${item.complete ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{item.label}</div>
                        {sub && (
                          <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-2">
                            📎 {sub.file_name}
                            {sub.verified
                              ? <span className="text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">✓ Verified</span>
                              : <span className="text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">Pending</span>}
                          </div>
                        )}
                      </div>
                      {!item.complete && (
                        <button onClick={() => handleUpload(item.label)} disabled={isUploading}
                          className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-100 transition-all disabled:opacity-50 flex-shrink-0">
                          {isUploading ? 'Uploading...' : 'Upload'}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action items */}
          {biz.top_gap && biz.top_gap !== 'None' && (
            <div className="bg-amber-50 rounded-xl border border-amber-100 px-5 py-4 text-sm text-amber-700 flex items-center gap-3">
              <span className="text-lg">⚠️</span>
              <div><strong>Top Priority:</strong> {biz.top_gap}</div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClientDashboard;

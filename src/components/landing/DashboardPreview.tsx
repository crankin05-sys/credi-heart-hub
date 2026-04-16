import ScrollReveal from '@/components/ScrollReveal';

const canvasSections = [
  'Customers', 'Value Proposition', 'Revenue Streams', 'Channels',
  'Key Activities', 'Key Resources', 'Key Partners', 'Cost Structure',
  'Growth Opportunities', 'Funding Readiness',
];

const DashboardPreview = () => (
  <section id="dashboard-preview" className="px-5 md:px-10 py-16 md:py-20 relative overflow-hidden bg-[#0a1628]">
    <div className="max-w-5xl mx-auto relative z-10">
      <ScrollReveal>
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/[0.08] border border-white/10 rounded-full text-[#7db4ff] text-xs font-bold px-4 py-1.5 tracking-wider uppercase mb-4">
            <span className="w-1.5 h-1.5 bg-info rounded-full" />
            Your Dashboard
          </div>
          <h2 className="text-[clamp(24px,3.5vw,42px)] font-extrabold text-white leading-tight mb-3 tracking-tight">
            Your Live Business<br /><span className="bg-gradient-to-r from-[#4d8fef] to-[#38bdf8] bg-clip-text text-transparent">Command Center</span>
          </h2>
          <p className="text-sm md:text-base text-white/65 leading-relaxed max-w-md mx-auto">
            A completed Business Model Canvas that becomes your ongoing home screen. Click any section for coaching and next steps.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl p-4 md:p-6 relative overflow-hidden bg-white/[0.05] border border-white/15 shadow-lg">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/15">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#2563eb] to-[hsl(260,70%,60%)] flex items-center justify-center text-sm font-bold text-white">
                  78
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Your Business Canvas</div>
                  <div className="text-[11px] text-white/55">Funding Readiness: Strong</div>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-1.5 text-xs text-white/50">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Live
              </div>
            </div>

            {/* Canvas grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-1.5 md:gap-2">
              {canvasSections.map((section, i) => (
                <div
                  key={section}
                  className={`group rounded-lg border border-white/10 bg-white/[0.05] p-2.5 md:p-3 hover:border-[#4d8fef]/50 hover:bg-[#4d8fef]/10 transition-all cursor-pointer ${
                    i >= 8 ? 'md:col-span-2 col-span-1' : ''
                  } ${i === 9 ? 'md:col-span-1' : ''}`}
                >
                  <div className="text-[11px] md:text-xs font-bold text-white/80 group-hover:text-[#7db4ff] transition-colors mb-1">
                    {section}
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 bg-white/15 rounded-full w-full" />
                    <div className="h-1 bg-white/10 rounded-full w-3/4" />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom prompt */}
            <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
              <div className="flex-1 rounded-lg bg-white/[0.05] border border-white/10 px-3 py-2 text-xs text-white/40">
                Ask about your business...
              </div>
              <div className="w-8 h-8 rounded-lg bg-[#2563eb]/20 border border-[#2563eb]/30 flex items-center justify-center text-[#7db4ff] text-xs">
                →
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default DashboardPreview;

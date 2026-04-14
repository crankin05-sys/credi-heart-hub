import ScrollReveal from '@/components/ScrollReveal';

const canvasSections = [
  'Customers', 'Value Proposition', 'Revenue Streams', 'Channels',
  'Key Activities', 'Key Resources', 'Key Partners', 'Cost Structure',
  'Growth Opportunities', 'Funding Readiness',
];

const DashboardPreview = () => (
  <section id="dashboard-preview" className="px-6 md:px-10 py-20 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(218_55%_11%)] to-background" />

    <div className="max-w-7xl mx-auto relative z-10">
      <ScrollReveal>
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 glass rounded-full text-primary text-[13px] font-bold px-4 py-2 tracking-[3px] uppercase mb-5 font-mono">
            <span className="w-1.5 h-1.5 bg-info rounded-full" />
            Your Dashboard
          </div>
          <h2 className="font-display text-[clamp(28px,3.5vw,50px)] font-extrabold text-white leading-[1.08] mb-4 tracking-tight">
            Your Live Business<br /><span className="text-gradient-gold">Command Center.</span>
          </h2>
          <p className="text-[16px] text-white/70 leading-[1.8] max-w-[540px] mx-auto">
            A completed Business Model Canvas that becomes your ongoing home screen. Click any section to get coaching and next steps.
          </p>
        </div>
      </ScrollReveal>

      {/* Canvas mockup */}
      <ScrollReveal delay={0.15}>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-4 md:p-8 relative overflow-hidden bg-[hsl(220_30%_15%)] border border-white/20 shadow-lg">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-[hsl(260_70%_60%)] flex items-center justify-center text-[15px] font-bold text-white">
                  78
                </div>
                <div>
                  <div className="text-[14px] font-bold text-white">Your Business Canvas</div>
                  <div className="text-[12px] text-white/60">Funding Readiness: Strong</div>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 text-[13px] text-white/60 font-mono">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Live · Updated today
              </div>
            </div>

            {/* Canvas grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3">
              {canvasSections.map((section, i) => (
                <div
                  key={section}
                  className={`group rounded-lg border border-white/20 bg-white/[0.08] p-2.5 md:p-4 hover:border-primary/60 hover:bg-primary/20 transition-all duration-300 cursor-pointer ${
                    i >= 8 ? 'md:col-span-2 col-span-1' : ''
                  } ${i === 9 ? 'md:col-span-1' : ''}`}
                >
                  <div className="text-[12px] md:text-[13px] font-bold text-white group-hover:text-primary transition-colors mb-1">
                    {section}
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 md:h-2 bg-white/20 rounded-full w-full" />
                    <div className="h-1.5 md:h-2 bg-white/15 rounded-full w-3/4" />
                    <div className="h-1.5 md:h-2 bg-white/10 rounded-full w-1/2" />
                  </div>
                  <div className="mt-2 md:mt-3 text-[10px] md:text-[11px] text-primary/0 group-hover:text-primary transition-colors font-medium">
                    Click to explore →
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom prompt */}
            <div className="mt-4 pt-3 border-t border-white/15 flex items-center gap-3">
              <div className="flex-1 rounded-xl bg-white/[0.08] border border-white/15 px-4 py-2.5 text-[13px] text-white/50">
                Ask a question about your business...
              </div>
              <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary text-[14px]">
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

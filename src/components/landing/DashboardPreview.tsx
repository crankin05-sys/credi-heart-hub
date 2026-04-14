import ScrollReveal from '@/components/ScrollReveal';

const canvasSections = [
  'Customers', 'Value Proposition', 'Revenue Streams', 'Channels',
  'Key Activities', 'Key Resources', 'Key Partners', 'Cost Structure',
  'Growth Opportunities', 'Funding Readiness',
];

const DashboardPreview = () => (
  <section id="dashboard-preview" className="px-6 md:px-10 py-28 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(218_55%_11%)] to-background" />

    <div className="max-w-7xl mx-auto relative z-10">
      <ScrollReveal>
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 glass rounded-full text-primary text-[13px] font-bold px-4 py-2 tracking-[3px] uppercase mb-5 font-mono">
            <span className="w-1.5 h-1.5 bg-info rounded-full" />
            Your Dashboard
          </div>
          <h2 className="font-display text-[clamp(32px,3.5vw,50px)] font-extrabold text-foreground leading-[1.08] mb-5 tracking-tight">
            Your Live Business<br /><span className="text-gradient-gold">Command Center.</span>
          </h2>
          <p className="text-[17px] text-foreground/70 leading-[1.8] max-w-[540px] mx-auto">
            A completed Business Model Canvas that becomes your ongoing home screen. Click any section to get coaching and next steps.
          </p>
        </div>
      </ScrollReveal>

      {/* Canvas mockup */}
      <ScrollReveal delay={0.15}>
        <div className="max-w-4xl mx-auto">
          <div className="neon-card rounded-2xl p-6 md:p-8 relative overflow-hidden bg-[hsl(220_30%_12%)]">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-foreground/[0.15]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-[hsl(260_70%_60%)] flex items-center justify-center text-[15px] font-bold text-white">
                  78
                </div>
                <div>
                  <div className="text-[15px] font-bold text-foreground">Your Business Canvas</div>
                  <div className="text-[13px] text-foreground/70">Funding Readiness: Strong</div>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 text-[13px] text-foreground/60 font-mono">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                Live · Updated today
              </div>
            </div>

            {/* Canvas grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {canvasSections.map((section, i) => (
                <div
                  key={section}
                  className={`group rounded-xl border border-foreground/[0.15] bg-foreground/[0.04] p-4 hover:border-primary/40 hover:bg-primary/[0.08] transition-all duration-300 cursor-pointer ${
                    i >= 8 ? 'md:col-span-2 col-span-1' : ''
                  } ${i === 9 ? 'md:col-span-1' : ''}`}
                >
                  <div className="text-[13px] font-bold text-foreground/90 group-hover:text-primary transition-colors mb-2">
                    {section}
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-2 bg-foreground/[0.12] rounded-full w-full" />
                    <div className="h-2 bg-foreground/[0.12] rounded-full w-3/4" />
                    <div className="h-2 bg-foreground/[0.08] rounded-full w-1/2" />
                  </div>
                  <div className="mt-3 text-[11px] text-primary/0 group-hover:text-primary/80 transition-colors font-medium">
                    Click to explore →
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom prompt */}
            <div className="mt-6 pt-4 border-t border-foreground/[0.08] flex items-center gap-3">
              <div className="flex-1 rounded-xl bg-foreground/[0.04] border border-foreground/[0.08] px-4 py-3 text-[14px] text-foreground/50">
                Ask a question about your business...
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-[15px]">
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

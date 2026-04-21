import { Sparkles, Target, ListChecks, TrendingUp, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';

/**
 * Premium AI advice renderer.
 * Parses markdown into structured, card-based sections with iconography,
 * badges, and a clear typographic hierarchy. Logic-free presentation layer.
 */

type Block =
  | { kind: 'h'; level: number; text: string }
  | { kind: 'num'; n: string; text: string }
  | { kind: 'bul'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'hr' };

type Section = { title: string | null; level: number; blocks: Block[] };

const SECTION_ICONS: { match: RegExp; icon: React.ComponentType<{ className?: string }>; tone: string }[] = [
  { match: /overview|summary|context/i, tone: 'from-sky-500/20 to-blue-500/10 text-sky-300', icon: Sparkles },
  { match: /strategy|approach|plan/i, tone: 'from-violet-500/20 to-fuchsia-500/10 text-violet-300', icon: Target },
  { match: /action|step|next|do|task/i, tone: 'from-amber-500/20 to-orange-500/10 text-amber-300', icon: ListChecks },
  { match: /outcome|result|impact|expect/i, tone: 'from-emerald-500/20 to-teal-500/10 text-emerald-300', icon: TrendingUp },
  { match: /insight|tip|note|important/i, tone: 'from-yellow-500/20 to-amber-500/10 text-yellow-300', icon: Lightbulb },
];

const sectionMeta = (title: string | null) => {
  if (!title) return { Icon: Sparkles, tone: 'from-primary/20 to-purple-500/10 text-primary' };
  const found = SECTION_ICONS.find((s) => s.match.test(title));
  return found
    ? { Icon: found.icon, tone: found.tone }
    : { Icon: Sparkles, tone: 'from-primary/20 to-purple-500/10 text-primary' };
};

const AdviceRenderer = ({ text, variant = 'dark' }: { text: string; variant?: 'dark' | 'themed' }) => {
  const isDark = variant === 'dark';

  // ---- Inline formatting: bold + key-term highlight ----
  const inline = (s: string) => {
    let out = s.replace(
      /\*\*(.*?)\*\*/g,
      isDark
        ? '<strong class="font-semibold text-white bg-gradient-to-r from-primary/25 via-purple-400/15 to-transparent px-1.5 -mx-0.5 rounded-md">$1</strong>'
        : '<strong class="font-semibold text-foreground bg-gradient-to-r from-primary/15 to-transparent px-1.5 -mx-0.5 rounded-md">$1</strong>',
    );
    // Highlight currency, percentages, and key numerics as subtle pills
    out = out.replace(
      /(\$[\d,]+(?:\.\d+)?[KkMmBb]?|\b\d+%|\b\d{2,4}\+?\b)/g,
      isDark
        ? '<span class="inline-flex items-center font-mono text-[0.78em] font-semibold text-amber-300 bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.5 rounded-md mx-0.5">$1</span>'
        : '<span class="inline-flex items-center font-mono text-[0.78em] font-semibold text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded-md mx-0.5">$1</span>',
    );
    return out;
  };

  // ---- Parse lines into blocks ----
  const blocks: Block[] = [];
  for (const raw of text.split('\n')) {
    const t = raw.trim();
    if (!t) continue;
    if (/^-{3,}$/.test(t)) { blocks.push({ kind: 'hr' }); continue; }
    const h = t.match(/^(#{1,3})\s+(.+)$/);
    if (h) { blocks.push({ kind: 'h', level: h[1].length, text: h[2] }); continue; }
    const n = t.match(/^(\d+)[.)]\s+(.+)$/);
    if (n) { blocks.push({ kind: 'num', n: n[1], text: n[2] }); continue; }
    const b = t.match(/^[*\-]\s+(.+)$/);
    if (b) { blocks.push({ kind: 'bul', text: b[1] }); continue; }
    blocks.push({ kind: 'p', text: t });
  }

  // ---- Group into sections by headings ----
  const sections: Section[] = [];
  let current: Section = { title: null, level: 0, blocks: [] };
  for (const b of blocks) {
    if (b.kind === 'h') {
      if (current.title || current.blocks.length) sections.push(current);
      current = { title: b.text, level: b.level, blocks: [] };
    } else {
      current.blocks.push(b);
    }
  }
  if (current.title || current.blocks.length) sections.push(current);

  // ---- Style tokens ----
  const bodyText = isDark ? 'text-white/80' : 'text-muted-foreground';
  const subtleText = isDark ? 'text-white/60' : 'text-muted-foreground';
  const titleText = isDark ? 'text-white' : 'text-foreground';
  const cardBg = isDark
    ? 'bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent border-white/[0.08]'
    : 'bg-gradient-to-br from-background to-secondary/30 border-border';
  const ruleClass = isDark ? 'border-white/10' : 'border-border';

  const reveal = (i: number): React.CSSProperties => ({
    animation: 'adviceIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) both',
    animationDelay: `${Math.min(i * 60, 700)}ms`,
  });

  return (
    <>
      <style>{`
        @keyframes adviceIn {
          from { opacity: 0; transform: translateY(10px); filter: blur(3px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
      `}</style>
      <div className="space-y-4">
        {sections.map((sec, si) => {
          const { Icon, tone } = sectionMeta(sec.title);
          return (
            <section
              key={si}
              style={reveal(si)}
              className={`group relative rounded-2xl border ${cardBg} backdrop-blur-sm p-5 md:p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.35)]`}
            >
              {sec.title && (
                <header className="flex items-center gap-3 mb-4 pb-3 border-b border-dashed border-white/[0.06]">
                  <span
                    className={`inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br ${tone} ring-1 ring-white/10 shrink-0 shadow-sm`}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-base md:text-lg font-bold tracking-tight ${titleText} leading-tight`}
                      dangerouslySetInnerHTML={{ __html: inline(sec.title) }}
                    />
                    <p className={`text-[11px] uppercase tracking-[0.14em] font-semibold ${subtleText} mt-0.5`}>
                      Section {si + 1}
                    </p>
                  </div>
                </header>
              )}

              <div className="space-y-2.5">
                {sec.blocks.map((blk, bi) => {
                  if (blk.kind === 'hr') {
                    return <hr key={bi} className={`my-3 border-t ${ruleClass}`} />;
                  }

                  if (blk.kind === 'num') {
                    return (
                      <div
                        key={bi}
                        className="group/item flex gap-3 items-start p-2.5 -mx-2 rounded-lg hover:bg-white/[0.03] transition-colors"
                      >
                        <span className="relative inline-flex items-center justify-center min-w-[1.75rem] h-7 px-2 rounded-lg bg-gradient-to-br from-primary/25 to-purple-500/20 border border-primary/30 text-primary font-bold text-xs shadow-[0_0_12px_-2px_hsl(var(--primary)/0.4)] shrink-0">
                          {blk.n}
                        </span>
                        <p
                          className={`text-sm ${bodyText} leading-relaxed flex-1 pt-0.5`}
                          dangerouslySetInnerHTML={{ __html: inline(blk.text) }}
                        />
                      </div>
                    );
                  }

                  if (blk.kind === 'bul') {
                    return (
                      <div
                        key={bi}
                        className="group/item flex gap-3 items-start p-2 -mx-2 rounded-lg hover:bg-white/[0.03] transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0 drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)] group-hover/item:scale-110 transition-transform" />
                        <p
                          className={`text-sm ${bodyText} leading-relaxed flex-1`}
                          dangerouslySetInnerHTML={{ __html: inline(blk.text) }}
                        />
                      </div>
                    );
                  }

                  // paragraph — promote short ones to callouts
                  const isCallout = /^(note|tip|important|warning|insight)[:\-]/i.test(blk.text);
                  if (isCallout) {
                    return (
                      <div
                        key={bi}
                        className="flex gap-3 items-start p-3 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-400/20"
                      >
                        <Lightbulb className="w-4 h-4 text-amber-300 mt-0.5 shrink-0" />
                        <p
                          className={`text-sm ${bodyText} leading-relaxed flex-1`}
                          dangerouslySetInnerHTML={{ __html: inline(blk.text) }}
                        />
                      </div>
                    );
                  }
                  return (
                    <p
                      key={bi}
                      className={`text-[0.92rem] ${bodyText} leading-[1.7]`}
                      dangerouslySetInnerHTML={{ __html: inline(blk.text) }}
                    />
                  );
                })}
              </div>

              {/* Hover affordance */}
              <ArrowRight
                className={`absolute top-5 right-5 w-3.5 h-3.5 ${subtleText} opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300`}
              />
            </section>
          );
        })}
      </div>
    </>
  );
};

export default AdviceRenderer;

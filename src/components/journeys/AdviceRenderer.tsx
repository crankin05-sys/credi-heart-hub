/**
 * Rich markdown-to-JSX renderer for AI advice output.
 * Handles: ### headers, **bold**, numbered lists, bullet lists, horizontal rules.
 * Each block fades + slides in for a lively, "AI typing" feel.
 */
const AdviceRenderer = ({ text, variant = 'dark' }: { text: string; variant?: 'dark' | 'themed' }) => {
  const lines = text.split('\n');
  const elements: JSX.Element[] = [];
  let key = 0;

  const bold = (s: string) =>
    s.replace(
      /\*\*(.*?)\*\*/g,
      variant === 'dark'
        ? '<strong class="text-white font-semibold bg-gradient-to-r from-primary/20 to-transparent px-1 -mx-1 rounded">$1</strong>'
        : '<strong class="text-foreground font-semibold bg-gradient-to-r from-primary/15 to-transparent px-1 -mx-1 rounded">$1</strong>',
    );

  const textClass = variant === 'dark' ? 'text-white/75' : 'text-muted-foreground';
  const headingClass =
    variant === 'dark'
      ? 'text-white font-bold tracking-tight'
      : 'text-foreground font-bold tracking-tight';
  const ruleClass = variant === 'dark' ? 'border-white/10' : 'border-border';
  const numClass = 'text-primary';

  // Reveal animation style — staggered fade-up per block
  const reveal = (i: number): React.CSSProperties => ({
    animation: `adviceIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both`,
    animationDelay: `${Math.min(i * 40, 600)}ms`,
  });

  let blockIdx = 0;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const trimmed = raw.trim();
    if (!trimmed) continue;

    // Horizontal rule
    if (/^-{3,}$/.test(trimmed)) {
      elements.push(
        <hr key={key++} style={reveal(blockIdx++)} className={`my-5 border-t ${ruleClass}`} />,
      );
      continue;
    }

    // Header
    const h3Match = trimmed.match(/^#{1,3}\s+(.+)$/);
    if (h3Match) {
      const headerText = bold(h3Match[1]);
      elements.push(
        <h3
          key={key++}
          style={reveal(blockIdx++)}
          className={`relative text-base md:text-lg ${headingClass} mt-6 mb-3 first:mt-0 pl-3 border-l-2 border-primary/60`}
          dangerouslySetInnerHTML={{ __html: headerText }}
        />,
      );
      continue;
    }

    // Numbered list
    const numMatch = trimmed.match(/^(\d+)[.)]\s+(.+)$/);
    if (numMatch) {
      elements.push(
        <div
          key={key++}
          style={reveal(blockIdx++)}
          className="group flex gap-3 mb-2.5 items-start hover:translate-x-0.5 transition-transform"
        >
          <span
            className={`${numClass} font-bold text-xs min-w-[1.5rem] h-6 inline-flex items-center justify-center rounded-md bg-primary/10 border border-primary/20 shrink-0 group-hover:bg-primary/20 transition-colors`}
          >
            {numMatch[1]}
          </span>
          <p
            className={`text-sm ${textClass} leading-relaxed flex-1 pt-0.5`}
            dangerouslySetInnerHTML={{ __html: bold(numMatch[2]) }}
          />
        </div>,
      );
      continue;
    }

    // Bullet
    const bulletMatch = trimmed.match(/^[*\-]\s+(.+)$/);
    if (bulletMatch) {
      elements.push(
        <div
          key={key++}
          style={reveal(blockIdx++)}
          className="flex gap-3 mb-2 items-start pl-1"
        >
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_8px_hsl(var(--primary))] animate-pulse" />
          <p
            className={`text-sm ${textClass} leading-relaxed flex-1`}
            dangerouslySetInnerHTML={{ __html: bold(bulletMatch[1]) }}
          />
        </div>,
      );
      continue;
    }

    // Paragraph
    elements.push(
      <p
        key={key++}
        style={reveal(blockIdx++)}
        className={`text-sm ${textClass} leading-relaxed mb-3`}
        dangerouslySetInnerHTML={{ __html: bold(trimmed) }}
      />,
    );
  }

  return (
    <>
      <style>{`
        @keyframes adviceIn {
          from { opacity: 0; transform: translateY(8px); filter: blur(2px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
      `}</style>
      <div className="space-y-0">{elements}</div>
    </>
  );
};

export default AdviceRenderer;

/**
 * Rich markdown-to-JSX renderer for AI advice output.
 * Handles: ### headers, **bold**, numbered lists, bullet lists, horizontal rules.
 */
const AdviceRenderer = ({ text, variant = 'dark' }: { text: string; variant?: 'dark' | 'themed' }) => {
  const lines = text.split('\n');
  const elements: JSX.Element[] = [];
  let key = 0;

  const bold = (s: string) =>
    s.replace(
      /\*\*(.*?)\*\*/g,
      variant === 'dark'
        ? '<strong class="text-white font-semibold">$1</strong>'
        : '<strong class="text-foreground font-semibold">$1</strong>',
    );

  const textClass = variant === 'dark' ? 'text-white/70' : 'text-muted-foreground';
  const headingClass =
    variant === 'dark'
      ? 'text-white font-bold tracking-tight'
      : 'text-foreground font-bold tracking-tight';
  const ruleClass = variant === 'dark' ? 'border-white/10' : 'border-border';
  const numClass = variant === 'dark' ? 'text-primary' : 'text-primary';

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const trimmed = raw.trim();

    // Skip empty lines
    if (!trimmed) continue;

    // Horizontal rule ---
    if (/^-{3,}$/.test(trimmed)) {
      elements.push(<hr key={key++} className={`my-5 border-t ${ruleClass}`} />);
      continue;
    }

    // ### Header
    const h3Match = trimmed.match(/^#{1,3}\s+(.+)$/);
    if (h3Match) {
      const headerText = bold(h3Match[1]);
      elements.push(
        <h3
          key={key++}
          className={`text-base md:text-lg ${headingClass} mt-6 mb-3 first:mt-0`}
          dangerouslySetInnerHTML={{ __html: headerText }}
        />,
      );
      continue;
    }

    // Numbered list: 1. ... or 1) ...
    const numMatch = trimmed.match(/^(\d+)[.)]\s+(.+)$/);
    if (numMatch) {
      elements.push(
        <div key={key++} className="flex gap-3 mb-2.5 items-start">
          <span className={`${numClass} font-bold text-sm min-w-[1.25rem] text-right mt-0.5`}>
            {numMatch[1]}.
          </span>
          <p
            className={`text-sm ${textClass} leading-relaxed flex-1`}
            dangerouslySetInnerHTML={{ __html: bold(numMatch[2]) }}
          />
        </div>,
      );
      continue;
    }

    // Bullet: * or -
    const bulletMatch = trimmed.match(/^[*\-]\s+(.+)$/);
    if (bulletMatch) {
      elements.push(
        <div key={key++} className="flex gap-3 mb-2 items-start pl-1">
          <span className={`${numClass} mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0`} />
          <p
            className={`text-sm ${textClass} leading-relaxed flex-1`}
            dangerouslySetInnerHTML={{ __html: bold(bulletMatch[1]) }}
          />
        </div>,
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p
        key={key++}
        className={`text-sm ${textClass} leading-relaxed mb-3`}
        dangerouslySetInnerHTML={{ __html: bold(trimmed) }}
      />,
    );
  }

  return <div className="space-y-0">{elements}</div>;
};

export default AdviceRenderer;

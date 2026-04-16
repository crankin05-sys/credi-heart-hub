import { Shield, Clock, CheckCircle2 } from 'lucide-react';

const items = [
  { icon: CheckCircle2, text: 'Free to Use' },
  { icon: Clock, text: 'Results in 3 Minutes' },
  { icon: Shield, text: 'No Credit Check Required' },
];

const TopMarquee = () => (
  <div className="bg-primary/[0.08] border-b border-border py-2.5">
    <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap px-4">
      {items.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-primary tracking-wide uppercase">
          <item.icon className="w-3 h-3" />
          {item.text}
        </span>
      ))}
    </div>
  </div>
);

export default TopMarquee;

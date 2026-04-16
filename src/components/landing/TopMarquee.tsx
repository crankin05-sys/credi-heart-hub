import { Star, Zap, Shield, TrendingUp, Clock, Award } from 'lucide-react';

const announcements = [
  { icon: Star, text: 'AI Business Model Canvas Scoring' },
  { icon: Zap, text: 'Average 48hr Approval' },
  { icon: Shield, text: 'Bank-Level Security' },
  { icon: TrendingUp, text: '$50M+ Funding Secured' },
  { icon: Clock, text: '24/7 AI Support' },
  { icon: Award, text: 'Top-Rated Platform' },
];

const TopMarquee = () => (
  <div className="bg-primary/[0.08] border-b border-border overflow-hidden">
    <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite] py-2.5">
      {[...announcements, ...announcements, ...announcements].map((item, i) => (
        <span key={i} className="inline-flex items-center gap-2 px-6 text-[11px] font-semibold text-primary tracking-wide uppercase">
          <item.icon className="w-3 h-3" />
          {item.text}
          <span className="w-1 h-1 rounded-full bg-primary/30 ml-4" />
        </span>
      ))}
    </div>
  </div>
);

export default TopMarquee;

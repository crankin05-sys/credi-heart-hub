import { Star, Zap, Shield, TrendingUp, Clock, Award } from 'lucide-react';

const announcements = [
  { icon: Star, text: 'New: AI Business Model Canvas Scoring' },
  { icon: Zap, text: 'Get Funded Faster — Average 48hr Approval' },
  { icon: Shield, text: 'Bank-Level Security on All Applications' },
  { icon: TrendingUp, text: '$50M+ in Business Funding Secured' },
  { icon: Clock, text: '24/7 AI Support Available' },
  { icon: Award, text: 'Top-Rated by Small Business Owners' },
];

const TopMarquee = () => {
  return (
    <div className="bg-[hsl(230,60%,18%)] border-b border-[hsl(230,40%,25%)] overflow-hidden">
      <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite] py-2">
        {[...announcements, ...announcements, ...announcements].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-8 text-[12px] font-medium text-white/70">
            <item.icon className="w-3.5 h-3.5 text-[hsl(43,50%,55%)]" />
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TopMarquee;

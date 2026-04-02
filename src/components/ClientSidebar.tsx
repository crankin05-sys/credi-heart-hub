import { useAuth } from '@/contexts/AuthContext';

interface Props {
  activePage: string;
  onNavigate: (page: string) => void;
  onSignOut?: () => void;
}

const navItems = [
  { section: 'My Business', items: [
    { id: 'dashboard', icon: '📋', label: 'My Checklist' },
    { id: 'agents', icon: '🤖', label: 'AI Agents', badge: '6' },
  ]},
  { section: 'Account', items: [
    { id: 'settings', icon: '⚙️', label: 'Settings' },
  ]},
];

const ClientSidebar = ({ activePage, onNavigate, onSignOut }: Props) => {
  const { user } = useAuth();
  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <aside className="w-[240px] bg-background/80 backdrop-blur-xl border-r border-foreground/[0.06] fixed top-0 left-0 bottom-0 flex flex-col z-[100]">
      <div className="px-5 pt-5 pb-4 border-b border-foreground/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-gold-lt rounded-lg flex items-center justify-center text-xs font-black text-primary-foreground font-display shadow-[0_2px_8px_hsl(var(--gold)/0.2)]">
            CS
          </div>
          <div>
            <div className="font-display text-sm font-bold text-foreground leading-tight">
              Credibility Suite <span className="text-gradient-gold">AI</span>
            </div>
            <div className="text-[8px] text-muted-foreground tracking-[1.5px] uppercase font-mono">
              Client Portal
            </div>
          </div>
        </div>
      </div>

      <nav className="py-4 flex-1 overflow-y-auto px-3">
        {navItems.map(section => (
          <div key={section.section} className="mb-2">
            <div className="text-[8px] font-bold tracking-[2px] text-foreground/15 uppercase px-2 pt-3 pb-1.5 font-mono">
              {section.section}
            </div>
            {section.items.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 cursor-pointer transition-all duration-200 text-[12.5px] font-medium text-left rounded-lg mb-0.5 ${
                  activePage === item.id
                    ? 'text-primary bg-primary/[0.08] shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.15)]'
                    : 'text-foreground/40 hover:text-foreground/70 hover:bg-foreground/[0.03]'
                }`}
              >
                <span className="text-sm w-[18px] text-center flex-shrink-0">{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primary/15 text-primary">{item.badge}</span>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-foreground/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-gold-lt rounded-full flex items-center justify-center text-[10px] font-bold text-primary-foreground flex-shrink-0 shadow-[0_2px_8px_hsl(var(--gold)/0.2)]">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-semibold text-foreground truncate">{displayName}</div>
            <div className="text-[9px] text-muted-foreground font-mono truncate">{user?.email}</div>
          </div>
        </div>
        {onSignOut && (
          <button
            onClick={onSignOut}
            className="mt-3 w-full text-[10px] font-semibold text-muted-foreground hover:text-destructive transition-all bg-foreground/[0.03] hover:bg-destructive/[0.08] border border-foreground/[0.06] rounded-lg py-2 cursor-pointer tracking-[0.5px] uppercase font-mono"
          >
            Sign Out
          </button>
        )}
      </div>
    </aside>
  );
};

export default ClientSidebar;

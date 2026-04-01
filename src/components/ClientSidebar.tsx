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
    <aside className="w-[220px] bg-background border-r border-border fixed top-0 left-0 bottom-0 flex flex-col z-[100]">
      <div className="px-4 pt-[18px] pb-3.5 border-b border-border">
        <div className="font-display text-base font-bold text-foreground leading-tight">
          Credibility Suite <span className="text-primary">AI</span>
        </div>
        <div className="text-[9px] text-muted-foreground tracking-[1.5px] uppercase mt-0.5 font-mono">
          Client Portal
        </div>
      </div>

      <nav className="py-3.5 flex-1 overflow-y-auto">
        {navItems.map(section => (
          <div key={section.section}>
            <div className="text-[8px] font-bold tracking-[2px] text-foreground/20 uppercase px-3.5 pt-2 pb-0.5 font-mono">
              {section.section}
            </div>
            {section.items.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 cursor-pointer transition-all border-l-[3px] text-[12.5px] font-semibold text-left ${
                  activePage === item.id
                    ? 'text-primary bg-primary/[0.07] border-l-primary'
                    : 'text-foreground/45 border-l-transparent hover:text-foreground hover:bg-foreground/[0.03]'
                }`}
              >
                <span className="text-sm w-[18px] text-center flex-shrink-0">{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-primary/20 text-primary">{item.badge}</span>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="p-3.5 border-t border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-[30px] h-[30px] bg-gradient-to-br from-primary to-gold-lt rounded-full flex items-center justify-center text-[11px] font-extrabold text-primary-foreground flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-bold text-foreground truncate">{displayName}</div>
            <div className="text-[9px] text-muted-foreground font-mono tracking-[0.5px]">{user?.email}</div>
          </div>
        </div>
        {onSignOut && (
          <button
            onClick={onSignOut}
            className="mt-2 w-full text-[10px] font-bold text-muted-foreground hover:text-destructive transition-colors bg-transparent border border-border rounded-sm py-1.5 cursor-pointer tracking-[1px] uppercase font-mono"
          >
            Sign Out
          </button>
        )}
      </div>
    </aside>
  );
};

export default ClientSidebar;

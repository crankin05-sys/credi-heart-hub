const SettingsPage = () => {
  return (
    <div className="animate-fade-up grid grid-cols-2 gap-4 max-lg:grid-cols-1">
      {/* Profile */}
      <div className="bg-card border border-border p-5">
        <div className="text-[9px] font-bold tracking-[2px] uppercase text-primary font-mono mb-3.5">Fund Manager Profile</div>
        {[
          { label: 'Full Name', value: 'Maurice Stewart' },
          { label: 'Title', value: 'Fund Manager / CFO' },
          { label: 'Email', value: 'maurice@outsourcedcfogroup.com' },
          { label: 'Phone', value: '(555) 234-5678' },
        ].map((f, i) => (
          <div key={i}>
            <label className="block text-[9px] font-bold tracking-[1.5px] uppercase text-muted-foreground mb-1 font-mono">{f.label}</label>
            <input defaultValue={f.value} className="w-full bg-foreground/[0.04] border border-border text-foreground font-body text-[13px] px-3 py-2.5 outline-none rounded-sm mb-3 transition-colors focus:border-primary" />
          </div>
        ))}
        <button className="bg-gradient-to-br from-primary to-gold-lt text-primary-foreground border-none font-body text-[11px] font-extrabold px-5 py-2.5 cursor-pointer tracking-[1.5px] uppercase rounded-sm transition-all hover:brightness-110">
          Save Profile
        </button>
      </div>

      {/* Fund Settings */}
      <div className="bg-card border border-border p-5">
        <div className="text-[9px] font-bold tracking-[2px] uppercase text-primary font-mono mb-3.5">Fund Settings</div>
        {[
          { label: 'Fund Name', value: 'CDFI Revolving Loan Fund' },
          { label: 'Max Loan Amount', value: '$100,000' },
          { label: 'Interest Rate', value: '6.5%' },
          { label: 'Minimum Fundability Score', value: '75' },
        ].map((f, i) => (
          <div key={i}>
            <label className="block text-[9px] font-bold tracking-[1.5px] uppercase text-muted-foreground mb-1 font-mono">{f.label}</label>
            <input defaultValue={f.value} className="w-full bg-foreground/[0.04] border border-border text-foreground font-body text-[13px] px-3 py-2.5 outline-none rounded-sm mb-3 transition-colors focus:border-primary" />
          </div>
        ))}
        <button className="bg-gradient-to-br from-primary to-gold-lt text-primary-foreground border-none font-body text-[11px] font-extrabold px-5 py-2.5 cursor-pointer tracking-[1.5px] uppercase rounded-sm transition-all hover:brightness-110">
          Save Fund Settings
        </button>
      </div>

      {/* Notifications */}
      <div className="bg-card border border-border p-5">
        <div className="text-[9px] font-bold tracking-[2px] uppercase text-primary font-mono mb-3.5">Notification Preferences</div>
        {[
          { label: 'Alert Email', value: 'maurice@outsourcedcfogroup.com' },
          { label: 'Booking Link (Cal.com)', value: 'https://cal.com/mauricestewart' },
          { label: 'Score Alert Threshold', value: '75' },
        ].map((f, i) => (
          <div key={i}>
            <label className="block text-[9px] font-bold tracking-[1.5px] uppercase text-muted-foreground mb-1 font-mono">{f.label}</label>
            <input defaultValue={f.value} className="w-full bg-foreground/[0.04] border border-border text-foreground font-body text-[13px] px-3 py-2.5 outline-none rounded-sm mb-3 transition-colors focus:border-primary" />
          </div>
        ))}
        <button className="bg-gradient-to-br from-primary to-gold-lt text-primary-foreground border-none font-body text-[11px] font-extrabold px-5 py-2.5 cursor-pointer tracking-[1.5px] uppercase rounded-sm transition-all hover:brightness-110">
          Save Notifications
        </button>
      </div>

      {/* Platform Info */}
      <div className="bg-card border border-border p-5">
        <div className="text-[9px] font-bold tracking-[2px] uppercase text-primary font-mono mb-3.5">Platform Info</div>
        <div className="space-y-2 text-xs text-foreground/65">
          <div>Platform: <span className="text-foreground font-semibold">Credibility Suite AI</span></div>
          <div>Built by: <span className="text-foreground font-semibold">She Wins With AI</span></div>
          <div>Agreement: <span className="font-mono text-primary">SWAI-ENT-2026-001</span></div>
          <div>Phase: <span className="text-foreground font-semibold">Build Phase — Active</span></div>
          <div>Support: <a href="mailto:charisma@shewinswithai.com" className="text-primary font-bold hover:text-gold-lt transition-colors">charisma@shewinswithai.com</a></div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

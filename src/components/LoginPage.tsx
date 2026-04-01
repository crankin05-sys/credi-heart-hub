import { useState } from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'maurice' && password === 'stewart2026') {
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-[999]">
      <form onSubmit={handleSubmit} className="animate-fade-up bg-card border border-border border-t-[3px] border-t-primary p-11 w-[380px]">
        <div className="font-display text-xl font-bold text-foreground mb-1">
          Credibility Suite <span className="text-primary">AI</span>
        </div>
        <div className="text-[10px] text-muted-foreground tracking-[1.5px] uppercase mb-7 font-mono">
          Fund Manager · Secure Login
        </div>

        <label className="block text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground mb-1 font-mono">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={e => { setUsername(e.target.value); setError(false); }}
          className="w-full bg-foreground/5 border border-border text-foreground font-body text-[13px] px-3.5 py-2.5 outline-none transition-colors focus:border-primary rounded-sm mb-3.5"
        />

        <label className="block text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground mb-1 font-mono">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={e => { setPassword(e.target.value); setError(false); }}
          className="w-full bg-foreground/5 border border-border text-foreground font-body text-[13px] px-3.5 py-2.5 outline-none transition-colors focus:border-primary rounded-sm mb-3.5"
        />

        <button type="submit" className="w-full bg-gradient-to-br from-primary to-gold-lt text-primary-foreground border-none font-body text-xs font-extrabold py-3.5 cursor-pointer tracking-[2px] uppercase rounded-sm transition-all hover:brightness-110 mt-1">
          Access Dashboard →
        </button>

        {error && (
          <p className="text-[11px] text-destructive text-center mt-2.5">
            Invalid credentials. Please try again.
          </p>
        )}

        <p className="text-[10px] text-foreground/20 text-center mt-3.5 font-mono">
          username: maurice · password: stewart2026
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

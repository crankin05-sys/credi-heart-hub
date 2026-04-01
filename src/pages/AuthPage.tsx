import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) {
        setError(error.message);
      } else {
        setMessage('Check your email for a verification link to complete your sign up.');
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        navigate('/dashboard');
      }
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-[999]">
      <form onSubmit={handleSubmit} className="animate-fade-up bg-card border border-border border-t-[3px] border-t-primary p-11 w-[400px]">
        <Link to="/" className="block no-underline">
          <div className="font-display text-xl font-bold text-foreground mb-1">
            Credibility Suite <span className="text-primary">AI</span>
          </div>
        </Link>
        <div className="text-[10px] text-muted-foreground tracking-[1.5px] uppercase mb-7 font-mono">
          {isSignUp ? 'Create Your Account' : 'Sign In to Dashboard'}
        </div>

        {isSignUp && (
          <>
            <label className="block text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground mb-1 font-mono">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
              className="w-full bg-foreground/5 border border-border text-foreground font-body text-[13px] px-3.5 py-2.5 outline-none transition-colors focus:border-primary rounded-sm mb-3.5"
            />
          </>
        )}

        <label className="block text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground mb-1 font-mono">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); setError(''); }}
          required
          className="w-full bg-foreground/5 border border-border text-foreground font-body text-[13px] px-3.5 py-2.5 outline-none transition-colors focus:border-primary rounded-sm mb-3.5"
        />

        <label className="block text-[9px] font-bold tracking-[2px] uppercase text-muted-foreground mb-1 font-mono">Password</label>
        <input
          type="password"
          value={password}
          onChange={e => { setPassword(e.target.value); setError(''); }}
          required
          minLength={6}
          className="w-full bg-foreground/5 border border-border text-foreground font-body text-[13px] px-3.5 py-2.5 outline-none transition-colors focus:border-primary rounded-sm mb-3.5"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-br from-primary to-gold-lt text-primary-foreground border-none font-body text-xs font-extrabold py-3.5 cursor-pointer tracking-[2px] uppercase rounded-sm transition-all hover:brightness-110 mt-1 disabled:opacity-50"
        >
          {loading ? 'Please wait...' : isSignUp ? 'Create Account →' : 'Sign In →'}
        </button>

        {error && <p className="text-[11px] text-destructive text-center mt-2.5">{error}</p>}
        {message && <p className="text-[11px] text-success text-center mt-2.5">{message}</p>}

        <p className="text-[11px] text-foreground/40 text-center mt-4">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => { setIsSignUp(!isSignUp); setError(''); setMessage(''); }}
            className="text-primary font-bold bg-transparent border-none cursor-pointer hover:text-gold-lt transition-colors"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthPage;

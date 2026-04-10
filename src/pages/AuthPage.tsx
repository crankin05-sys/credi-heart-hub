import { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Brain } from 'lucide-react';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  if (!authLoading && user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setMessage(''); setLoading(true);
    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName }, emailRedirectTo: window.location.origin } });
      if (error) setError(error.message);
      else if (data.session) navigate('/dashboard', { replace: true });
      else setMessage('Check your email for a verification link.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else navigate('/dashboard', { replace: true });
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <form onSubmit={handleSubmit} className="animate-fade-up bg-background border border-border rounded-2xl shadow-lg p-10 w-[420px]">
        <Link to="/" className="no-underline flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(230,80%,56%)] to-[hsl(260,70%,60%)] flex items-center justify-center shadow-md">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">Credibility Suite <span className="text-gradient-ai">AI</span></div>
            <div className="text-[10px] text-muted-foreground">{isSignUp ? 'Create Your Account' : 'Sign In to Dashboard'}</div>
          </div>
        </Link>

        {isSignUp && (
          <>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Full Name</label>
            <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required
              className="w-full bg-secondary border border-border text-foreground text-sm px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl mb-4" />
          </>
        )}

        <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Email</label>
        <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(''); }} required
          className="w-full bg-secondary border border-border text-foreground text-sm px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl mb-4" />

        <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Password</label>
        <input type="password" value={password} onChange={e => { setPassword(e.target.value); setError(''); }} required minLength={6}
          className="w-full bg-secondary border border-border text-foreground text-sm px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl mb-4" />

        <button type="submit" disabled={loading}
          className="w-full bg-gradient-to-r from-[hsl(230,80%,56%)] to-[hsl(260,70%,60%)] text-white border-none text-sm font-semibold py-3.5 cursor-pointer rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 mt-1">
          {loading ? 'Please wait...' : isSignUp ? 'Create Account →' : 'Sign In →'}
        </button>

        {error && <p className="text-xs text-destructive text-center mt-3 bg-destructive/5 rounded-xl px-4 py-3">{error}</p>}
        {message && <p className="text-xs text-[hsl(var(--success))] text-center mt-3 bg-[hsl(var(--success)/0.05)] rounded-xl px-4 py-3">{message}</p>}

        <p className="text-xs text-muted-foreground text-center mt-5">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button type="button" onClick={() => { setIsSignUp(!isSignUp); setError(''); setMessage(''); }}
            className="text-primary font-semibold bg-transparent border-none cursor-pointer hover:underline">
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthPage;

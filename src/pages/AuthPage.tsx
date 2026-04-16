import { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Brain, Eye, EyeOff } from 'lucide-react';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  if (!authLoading && user) return <Navigate to="/dashboard" replace />;

  const ALLOWED_EMAILS = ['mauricestewart@gmail.com', 'crankin05@gmail.com'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setMessage(''); setLoading(true);

    if (!ALLOWED_EMAILS.includes(email.toLowerCase().trim())) {
      setError('Access denied. This login is restricted to authorized administrators only.');
      setLoading(false);
      return;
    }

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
    <div className="fixed inset-0 bg-background flex items-center justify-center px-5">
      <form onSubmit={handleSubmit} className="animate-fade-up bg-card border border-border rounded-2xl shadow-lg p-6 md:p-8 w-full max-w-[400px]">
        <Link to="/" className="no-underline flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-[hsl(260,70%,60%)] flex items-center justify-center shadow-md">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-base font-bold text-foreground">Credibility Suite</div>
            <div className="text-[10px] text-muted-foreground">{isSignUp ? 'Create Your Account' : 'Admin Sign In'}</div>
          </div>
        </Link>

        {isSignUp && (
          <div className="mb-4">
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Full Name</label>
            <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required
              className="w-full bg-muted border border-border text-foreground text-sm px-3.5 py-2.5 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl" 
              placeholder="Maurice Stewart" />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Email</label>
          <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(''); }} required
            className="w-full bg-muted border border-border text-foreground text-sm px-3.5 py-2.5 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl"
            placeholder="you@email.com" />
        </div>

        <div className="mb-5">
          <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Password</label>
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => { setPassword(e.target.value); setError(''); }} required minLength={6}
              className="w-full bg-muted border border-border text-foreground text-sm px-3.5 py-2.5 pr-10 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl"
              placeholder="Min. 6 characters" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors bg-transparent border-none cursor-pointer p-0">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="w-full bg-gradient-to-r from-primary to-[hsl(260,70%,60%)] text-white border-none text-sm font-semibold py-3 cursor-pointer rounded-xl transition-all hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50">
          {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
        </button>

        {error && <p className="text-xs text-destructive text-center mt-3 bg-destructive/5 rounded-xl px-3 py-2.5">{error}</p>}
        {message && <p className="text-xs text-[hsl(var(--success))] text-center mt-3 bg-[hsl(var(--success)/0.05)] rounded-xl px-3 py-2.5">{message}</p>}

        <p className="text-xs text-muted-foreground text-center mt-4">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button type="button" onClick={() => { setIsSignUp(!isSignUp); setError(''); setMessage(''); }}
            className="text-primary font-semibold bg-transparent border-none cursor-pointer hover:underline text-xs">
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthPage;

import React, { FormEvent, useState } from 'react';
import { ArrowRight, Eye, EyeOff, LockKeyhole, Scale, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('inspector');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    const success = login(email.trim(), password, role);
    if (!success) {
      setError('Invalid email, password, or selected role.');
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
  };

  return (
    <div className="classic-login-page">
      <div className="classic-login-grid" />
      <div className="classic-login-shell">
        <div className="classic-login-brand">
          <div className="classic-login-mark"><Scale size={25} strokeWidth={2.1} /></div>
          <div>
            <div className="classic-brand-name">LegalMetrology<span>AI</span></div>
            <div className="classic-brand-sub">Packaged Commodity Compliance</div>
          </div>
        </div>

        <div className="classic-login-card">
          <div className="classic-login-card-head">
            <span className="classic-eyebrow">SECURE ACCESS / 00</span>
            <h1>Sign in to the platform</h1>
            <p>Access AI inspection, statutory rules, certificate verification and your compliance workspace.</p>
          </div>

          <form onSubmit={handleSubmit} className="classic-login-form">
            <label>
              <span>Account role</span>
              <select value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
                <option value="inspector">Legal Metrology Officer</option>
                <option value="manufacturer">Packer / Manufacturer</option>
                <option value="admin">State / National Admin</option>
                <option value="consumer">Citizen / Consumer</option>
              </select>
            </label>

            <label>
              <span>Email address</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required />
            </label>

            <label>
              <span>Password</span>
              <div className="classic-login-password">
                <LockKeyhole size={16} />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" autoComplete="current-password" required />
                <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>

            {error && <div className="classic-login-error">{error}</div>}

            <button className="classic-login-submit" type="submit" disabled={submitting}>
              {submitting ? 'Signing in...' : 'Sign in'}
              <ArrowRight size={17} />
            </button>
          </form>

          <div className="classic-login-note">
            <ShieldCheck size={17} />
            <div><strong>Demo access</strong><span>Use the role-specific demo account shown below.</span></div>
          </div>
        </div>

        <div className="classic-login-accounts">
          <span>DEMO ACCOUNTS</span>
          <div>
            <button type="button" onClick={() => { setRole('inspector'); setEmail('inspector@lm.gov.in'); setPassword('demo123'); }}>Officer</button>
            <button type="button" onClick={() => { setRole('manufacturer'); setEmail('mfg@shantiagro.in'); setPassword('demo123'); }}>Manufacturer</button>
            <button type="button" onClick={() => { setRole('admin'); setEmail('admin@lm.nic.in'); setPassword('demo123'); }}>Admin</button>
            <button type="button" onClick={() => { setRole('consumer'); setEmail('consumer@example.com'); setPassword('demo123'); }}>Consumer</button>
          </div>
        </div>

        <footer className="classic-login-footer">Legal Metrology Act, 2009 <span>•</span> Packaged Commodities Rules, 2011 <span>•</span> Government of India</footer>
      </div>
    </div>
  );
};

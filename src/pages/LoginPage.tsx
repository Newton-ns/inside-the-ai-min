import React, { FormEvent, useState } from 'react';
import { ArrowRight, Eye, EyeOff, LockKeyhole, Scale, ShieldCheck, UserRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

const DEMO_IDS: Record<UserRole, string> = {
  inspector: 'LMO-DL-4402',
  manufacturer: 'MFG-SAF-1027',
  admin: 'ADM-NAT-0012',
  consumer: 'CON-2026-0184'
};

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('inspector');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    const success = login(identifier, password, role);
    if (!success) {
      setError('Invalid User ID or password for the selected role.');
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
  };

  const selectDemo = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setIdentifier(DEMO_IDS[selectedRole]);
    setPassword('demo123');
    setError('');
  };

  const isOfficer = role === 'inspector';

  return (
    <div className="classic-login-page">
      <div className="classic-login-grid" />
      <div className="classic-login-shell">
        <div className="classic-login-brand">
          <div className="classic-login-mark"><Scale size={25} strokeWidth={2.1} /></div>
          <div><div className="classic-brand-name">LegalMetrology<span>AI</span></div><div className="classic-brand-sub">Packaged Commodity Compliance</div></div>
        </div>

        <div className="classic-login-card">
          <div className="classic-login-card-head">
            <span className="classic-eyebrow">SECURE OFFICER ACCESS / 00</span>
            <h1>{isOfficer ? 'Officer Login' : 'Secure Sign in'}</h1>
            <p>{isOfficer ? 'Use your assigned Legal Metrology Officer User ID to access the inspection workspace.' : 'Use your assigned platform User ID to access your compliance workspace.'}</p>
          </div>

          <form onSubmit={handleSubmit} className="classic-login-form">
            <label>
              <span>Account role</span>
              <select value={role} onChange={(e) => { setRole(e.target.value as UserRole); setIdentifier(''); setPassword(''); setError(''); }}>
                <option value="inspector">Legal Metrology Officer</option>
                <option value="manufacturer">Packer / Manufacturer</option>
                <option value="admin">State / National Admin</option>
                <option value="consumer">Citizen / Consumer</option>
              </select>
            </label>

            <label>
              <span><UserRound size={13} style={{ verticalAlign: 'middle', marginRight: 5 }} /> User ID</span>
              <input type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder={isOfficer ? 'e.g. LMO-DL-4402' : 'Enter your User ID'} autoComplete="username" required />
            </label>

            <label>
              <span>Password</span>
              <div className="classic-login-password">
                <LockKeyhole size={16} />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" autoComplete="current-password" required />
                <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>
              </div>
            </label>

            {error && <div className="classic-login-error">{error}</div>}

            <button className="classic-login-submit" type="submit" disabled={submitting}>{submitting ? 'Signing in...' : isOfficer ? 'Access Officer Workspace' : 'Sign in'}<ArrowRight size={17} /></button>
          </form>

          <div className="classic-login-note">
            <ShieldCheck size={17} />
            <div><strong>User ID based access</strong><span>Each officer can use their assigned User ID. Password authentication is required.</span></div>
          </div>
        </div>

        <div className="classic-login-accounts">
          <span>DEMO USER IDs</span>
          <div>
            <button type="button" onClick={() => selectDemo('inspector')}>Officer · LMO-DL-4402</button>
            <button type="button" onClick={() => selectDemo('manufacturer')}>Manufacturer · MFG-SAF-1027</button>
            <button type="button" onClick={() => selectDemo('admin')}>Admin · ADM-NAT-0012</button>
            <button type="button" onClick={() => selectDemo('consumer')}>Consumer · CON-2026-0184</button>
          </div>
        </div>

        <footer className="classic-login-footer">Legal Metrology Act, 2009 <span>•</span> Packaged Commodities Rules, 2011 <span>•</span> Government of India</footer>
      </div>
    </div>
  );
};

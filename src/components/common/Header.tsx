import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserCircle, Mic, Globe, Scale, FileText, ScanLine } from 'lucide-react';
import { UserRole } from '../../types';

interface HeaderProps { onOpenVoiceAssistant?: () => void; }

export const Header: React.FC<HeaderProps> = ({ onOpenVoiceAssistant }) => {
  const { currentUser, switchRole } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Overview' },
    { to: '/scanner', label: t.nav.scanner },
    { to: '/rules', label: t.nav.rulesCatalog },
    { to: '/verify', label: 'Verify Certificate' },
  ];

  return (
    <header className="classic-header">
      <div className="classic-govbar">
        <div className="classic-container classic-govbar-inner">
          <div className="classic-gov-left">
            <span className="classic-code">SIH-26034</span>
            <span className="classic-dot">•</span>
            <span>{t.ministry}</span>
            <span className="classic-dot">•</span>
            <span>{t.govIndia}</span>
          </div>
          <div className="classic-gov-right">
            <span className="classic-status"><span className="classic-status-dot" /> Compliance engine active</span>
            <div className="classic-language">
              <Globe size={13} />
              <select value={language} onChange={(e) => setLanguage(e.target.value as any)} aria-label="Language">
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="ta">தமிழ்</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="classic-nav">
        <div className="classic-container classic-nav-inner">
          <Link to="/" className="classic-brand">
            <div className="classic-mark"><Scale size={23} strokeWidth={2.2} /></div>
            <div>
              <div className="classic-brand-name">LegalMetrology<span>AI</span></div>
              <div className="classic-brand-sub">Packaged Commodity Compliance</div>
            </div>
          </Link>

          <nav className="classic-links" aria-label="Primary navigation">
            {navLinks.map((link) => {
              const active = location.pathname === link.to || (link.to === '/verify' && location.pathname.startsWith('/verify/'));
              return <Link key={link.to} to={link.to} className={active ? 'active' : ''}>{link.label}</Link>;
            })}
          </nav>

          <div className="classic-actions">
            <button onClick={onOpenVoiceAssistant} className="classic-voice" title="Open AI Voice Assistant">
              <Mic size={15} /> <span>Voice AI</span>
            </button>
            <div className="classic-role">
              <UserCircle size={16} />
              <select value={currentUser.role} onChange={(e) => switchRole(e.target.value as UserRole)} aria-label="Current role">
                <option value="inspector">Officer</option>
                <option value="manufacturer">Manufacturer</option>
                <option value="admin">Administrator</option>
                <option value="consumer">Consumer</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="classic-sectionbar">
        <div className="classic-container classic-sectionbar-inner">
          <span>Legal Metrology Act, 2009</span>
          <span>Packaged Commodities Rules, 2011</span>
          <span>AI Inspection Platform</span>
        </div>
      </div>
    </header>
  );
};

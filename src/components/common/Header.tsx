import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserCircle, Mic, Globe, Scale, Sun, Moon, ChevronDown } from 'lucide-react';
import { UserRole } from '../../types';

interface HeaderProps { onOpenVoiceAssistant?: () => void; theme?: 'dark' | 'light'; onToggleTheme?: () => void; }

export const Header: React.FC<HeaderProps> = ({ onOpenVoiceAssistant, theme = 'dark', onToggleTheme }) => {
  const { currentUser, switchRole } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/scanner', label: t.nav.scanner },
    { to: '/rules', label: t.nav.rulesCatalog },
    { to: '/verify', label: t.nav.verifyCert },
  ];

  const roleLabels = language === 'en'
    ? { inspector: 'Officer', manufacturer: 'Manufacturer', admin: 'Administrator', consumer: 'Consumer' }
    : { inspector: t.roles.inspector, manufacturer: t.roles.manufacturer, admin: t.roles.admin, consumer: t.roles.consumer };

  const labels = {
    govPlatform: language === 'en' ? 'Government Compliance Platform' : language === 'hi' ? 'सरकारी अनुपालन पोर्टल' : 'அரசு இணக்க தளம்',
    systemActive: language === 'en' ? 'System Active' : language === 'hi' ? 'सिस्टम सक्रिय' : 'அமைப்பு செயல்பாட்டில்',
    brandSub: language === 'en' ? 'Packaged Commodity Compliance' : language === 'hi' ? 'पैकेज्ड वस्तु अनुपालन' : 'பொட்டலப் பொருள் இணக்கம்',
    voice: language === 'en' ? 'Voice AI' : language === 'hi' ? 'वॉयस AI' : 'Voice AI',
    light: language === 'en' ? 'Light' : language === 'hi' ? 'लाइट' : 'லைட்',
    dark: language === 'en' ? 'Dark' : language === 'hi' ? 'डार्क' : 'டார்க்',
    section1: language === 'en' ? 'Legal Metrology Act, 2009' : language === 'hi' ? 'विधिक मापविज्ञान अधिनियम, 2009' : 'சட்ட அளவியல் சட்டம், 2009',
    section2: language === 'en' ? 'Packaged Commodities Rules, 2011' : language === 'hi' ? 'पैकेज्ड वस्तुएं नियम, 2011' : 'பொட்டலப் பொருட்கள் விதிகள், 2011',
    section3: language === 'en' ? 'AI Inspection Platform' : language === 'hi' ? 'एआई निरीक्षण प्लेटफॉर्म' : 'AI ஆய்வு தளம்'
  };

  return (
    <header className="classic-header">
      <div className="classic-govbar">
        <div className="classic-container classic-govbar-inner">
          <div className="classic-gov-left">
            <span className="classic-code">SIH-26034</span><span className="classic-dot">•</span><span>{labels.govPlatform}</span><span className="classic-dot">•</span><span>{t.govIndia}</span>
          </div>
          <div className="classic-gov-right">
            <span className="classic-status"><span className="classic-status-dot" /> {labels.systemActive}</span>
            <div className="classic-language"><Globe size={13} /><select value={language} onChange={(e) => setLanguage(e.target.value as 'en' | 'hi' | 'ta')} aria-label="Language"><option value="en">English</option><option value="hi">हिन्दी</option><option value="ta">தமிழ்</option></select></div>
          </div>
        </div>
      </div>

      <div className="classic-nav">
        <div className="classic-container classic-nav-inner">
          <Link to="/" className="classic-brand">
            <div className="classic-mark"><Scale size={23} strokeWidth={2.2} /></div>
            <div><div className="classic-brand-name">LegalMetrology<span>AI</span></div><div className="classic-brand-sub">{labels.brandSub}</div></div>
          </Link>

          <nav className="classic-links" aria-label="Primary navigation">
            {navLinks.map((link) => {
              const active = link.to === '/'
                ? location.pathname === '/'
                : location.pathname === link.to || (link.to === '/verify' && location.pathname.startsWith('/verify/'));
              return <Link key={link.to} to={link.to} className={active ? 'active' : ''}>{link.label}</Link>;
            })}
          </nav>

          <div className="classic-actions">
            <button onClick={onToggleTheme} className="classic-theme-toggle" title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}<span>{theme === 'dark' ? labels.light : labels.dark}</span>
            </button>
            <button onClick={onOpenVoiceAssistant} className="classic-voice" title={t.voice.title}><Mic size={15} /><span>{labels.voice}</span></button>
            <div className="classic-role"><UserCircle size={16} /><select value={currentUser.role} onChange={(e) => switchRole(e.target.value as UserRole)} aria-label="Current role">{Object.entries(roleLabels).map(([role, label]) => <option key={role} value={role}>{label}</option>)}</select><ChevronDown size={12}/></div>
          </div>
        </div>
      </div>

      <div className="classic-sectionbar"><div className="classic-container classic-sectionbar-inner"><span>{labels.section1}</span><span>{labels.section2}</span><span>{labels.section3}</span></div></div>
    </header>
  );
};

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Scale, ShieldCheck, ScanLine, Building2, BarChart3, UserCheck, ArrowRight, CheckCircle2, Cpu, FileCheck, Award } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { t } = useLanguage();
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  const openPortal = (role: any, path: string) => { switchRole(role); navigate(path); };

  const portals = [
    { role:'inspector', path:'/inspector', icon:ShieldCheck, title:'Legal Metrology Officer', text:'Inspect packaged commodities, review violations and issue enforcement notices.' },
    { role:'manufacturer', path:'/manufacturer', icon:Building2, title:'Manufacturer / Packer', text:'Check packaging artwork before production and obtain compliance certificates.' },
    { role:'admin', path:'/admin', icon:BarChart3, title:'Department Administrator', text:'Monitor compliance trends, officer activity and national risk indicators.' },
    { role:'consumer', path:'/consumer', icon:UserCheck, title:'Citizen / Consumer', text:'Scan a product and understand its label, MRP and compliance status.' },
  ];

  const capabilities = [
    { icon:Cpu, title:'AI + OCR inspection', text:'Extract label information from a product image and turn it into structured compliance data.' },
    { icon:Scale, title:'Rule-based verification', text:'Compare mandatory declarations against the applicable packaged commodity requirements.' },
    { icon:FileCheck, title:'Actionable reports', text:'Generate clear findings, corrective guidance and inspection documentation.' },
    { icon:Award, title:'Digital verification', text:'Use QR-based certificates and public verification for trusted compliance records.' },
  ];

  const checks = ['Generic commodity name', 'Manufacturer / packer details', 'Net quantity and MRP', 'Date and country of origin', 'Mandatory declarations', 'Font-size requirements'];

  return (
    <div className="classic-home">
      <section className="classic-hero">
        <div className="classic-hero-lines" />
        <div className="classic-container classic-hero-grid">
          <div className="classic-hero-copy">
            <div className="classic-eyebrow"><span /> AI COMPLIANCE INSPECTION PLATFORM</div>
            <h1>{t.hero.title}</h1>
            <p>{t.hero.desc}</p>
            <div className="classic-hero-actions">
              <Link to="/scanner" className="classic-primary"><ScanLine size={18} /> {t.hero.scanNow} <ArrowRight size={17} /></Link>
              <Link to="/rules" className="classic-secondary">{t.hero.viewRules}</Link>
            </div>
            <div className="classic-hero-note"><CheckCircle2 size={15} /> Built around Legal Metrology Act, 2009 & PCR 2011</div>
          </div>
          <div className="classic-hero-panel">
            <div className="classic-panel-top"><span>INSPECTION ENGINE</span><span className="live"><i /> LIVE</span></div>
            <div className="classic-scan-frame">
              <div className="scan-corner tl"/><div className="scan-corner tr"/><div className="scan-corner bl"/><div className="scan-corner br"/>
              <Scale size={78} strokeWidth={1.2} />
              <div className="scan-line" />
            </div>
            <div className="classic-panel-footer"><span>IMAGE → OCR → RULES → RESULT</span><strong>READY</strong></div>
          </div>
        </div>
      </section>

      <section className="classic-metrics">
        <div className="classic-container metric-grid">
          <div><strong>99.4%</strong><span>{t.hero.accuracy}</span></div>
          <div><strong>&lt; 1.5s</strong><span>{t.hero.speed}</span></div>
          <div><strong>100%</strong><span>{t.hero.rulesCovered}</span></div>
          <div><strong>24/7</strong><span>Inspection availability</span></div>
        </div>
      </section>

      <section className="classic-section classic-container" id="portals">
        <div className="classic-heading"><span>01 / WORKSPACES</span><h2>One platform. Four focused workspaces.</h2><p>Choose the workspace that matches your responsibility. Each portal keeps the workflow focused instead of putting every tool on one screen.</p></div>
        <div className="portal-grid">
          {portals.map((item) => { const Icon = item.icon; return <button key={item.role} onClick={() => openPortal(item.role, item.path)} className="portal-card"><div className="portal-number">0{portals.indexOf(item)+1}</div><div className="portal-icon"><Icon size={24}/></div><h3>{item.title}</h3><p>{item.text}</p><span>Open workspace <ArrowRight size={15}/></span></button>; })}
        </div>
      </section>

      <section className="classic-feature-band">
        <div className="classic-container feature-layout">
          <div className="classic-heading left"><span>02 / INSPECTION FLOW</span><h2>From product image to compliance decision.</h2><p>The home page now explains the product first. Detailed tools stay inside their dedicated screens.</p></div>
          <div className="flow-list">
            {['Capture or upload package image','AI extracts mandatory label fields','Rules engine checks each declaration','Inspector receives a clear compliance result'].map((step, i) => <div className="flow-row" key={step}><b>0{i+1}</b><span>{step}</span><ArrowRight size={15}/></div>)}
          </div>
        </div>
      </section>

      <section className="classic-section classic-container">
        <div className="classic-heading"><span>03 / CORE CAPABILITIES</span><h2>Technology that supports the inspection.</h2></div>
        <div className="capability-grid">{capabilities.map((item) => { const Icon=item.icon; return <article className="capability" key={item.title}><Icon size={21}/><h3>{item.title}</h3><p>{item.text}</p></article>; })}</div>
      </section>

      <section className="classic-section classic-container compliance-section">
        <div className="compliance-copy"><div className="classic-heading left"><span>04 / COMPLIANCE COVERAGE</span><h2>What the system checks.</h2><p>A concise summary on the landing page. Full statutory details remain available in the Rules Catalog.</p></div><Link to="/rules" className="text-link">Open Rules Catalog <ArrowRight size={15}/></Link></div>
        <div className="check-list">{checks.map((check) => <div key={check}><CheckCircle2 size={17}/><span>{check}</span></div>)}</div>
      </section>

      <section className="classic-cta">
        <div className="classic-container cta-inner"><div><span>READY TO INSPECT?</span><h2>Start with one package.</h2><p>Upload a label and let the inspection workflow handle the rest.</p></div><Link to="/scanner" className="classic-primary">Open AI Scanner <ArrowRight size={17}/></Link></div>
      </section>
    </div>
  );
};

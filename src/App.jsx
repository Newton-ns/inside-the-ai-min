import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { VoiceInspectionAssistant } from './components/voice/VoiceInspectionAssistant';

import { LandingPage } from './pages/LandingPage';
import { ScannerPage } from './pages/ScannerPage';
import { InspectorDashboard } from './pages/InspectorDashboard';
import { ManufacturerDashboard } from './pages/ManufacturerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { ConsumerScanPage } from './pages/ConsumerScanPage';
import { RulesCatalogPage } from './pages/RulesCatalogPage';
import { PublicVerifyPage } from './pages/PublicVerifyPage';

export default function App() {
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);

  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-[#050505] text-slate-100 flex flex-col selection:bg-lime-500/30 selection:text-lime-100">
            <Header onOpenVoiceAssistant={() => setShowVoiceAssistant(true)} />

            <main className="flex-1 w-full">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/scanner" element={<div className="page-shell"><ScannerPage /></div>} />
                <Route path="/inspector" element={<div className="page-shell"><InspectorDashboard /></div>} />
                <Route path="/manufacturer" element={<div className="page-shell"><ManufacturerDashboard /></div>} />
                <Route path="/admin" element={<div className="page-shell"><AdminDashboard /></div>} />
                <Route path="/consumer" element={<div className="page-shell"><ConsumerScanPage /></div>} />
                <Route path="/rules" element={<div className="page-shell"><RulesCatalogPage /></div>} />
                <Route path="/verify" element={<div className="page-shell"><PublicVerifyPage /></div>} />
                <Route path="/verify/:id" element={<div className="page-shell"><PublicVerifyPage /></div>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            <VoiceInspectionAssistant
              isOpen={showVoiceAssistant}
              onClose={() => setShowVoiceAssistant(false)}
            />

            <Footer />
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}

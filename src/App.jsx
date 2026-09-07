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
          <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
            {/* Gov-Tech Sticky Header */}
            <Header onOpenVoiceAssistant={() => setShowVoiceAssistant(true)} />

            {/* Main Application Routes */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/scanner" element={<ScannerPage />} />
                <Route path="/inspector" element={<InspectorDashboard />} />
                <Route path="/manufacturer" element={<ManufacturerDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/consumer" element={<ConsumerScanPage />} />
                <Route path="/rules" element={<RulesCatalogPage />} />
                <Route path="/verify" element={<PublicVerifyPage />} />
                <Route path="/verify/:id" element={<PublicVerifyPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* AI Voice Assistant Modal */}
            <VoiceInspectionAssistant
              isOpen={showVoiceAssistant}
              onClose={() => setShowVoiceAssistant(false)}
            />

            {/* Directorate Footer */}
            <Footer />
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}

import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { FlowstateProvider, useFlowstate } from './context/FlowstateContext';
import { DesktopSidebar } from './components/Navigation/DesktopSidebar';
import { MobileNavbar } from './components/Navigation/MobileNavbar';

// Dedicated Pages
import { WelcomeOnboarding } from './pages/WelcomeOnboarding';
import { WellnessDashboard } from './pages/WellnessDashboard';
import { FocusStudio } from './pages/FocusStudio';
import { DigitalDetox } from './pages/DigitalDetox';
import { SleepRelax } from './pages/SleepRelax';
import { MyGarden } from './pages/MyGarden';
import { InsightsAnalytics } from './pages/InsightsAnalytics';
import { SettingsPage } from './pages/SettingsPage';
import { Sunset, X } from 'lucide-react';

function AppContent() {
  const { onboarding, digitalSunsetActive, setDigitalSunsetActive } = useFlowstate();
  const location = useLocation();
  const navigate = useNavigate();

  // If first time and not completed onboarding, redirect to /onboarding
  useEffect(() => {
    if (!onboarding?.completed && location.pathname !== '/onboarding') {
      navigate('/onboarding', { replace: true });
    }
  }, [onboarding?.completed, location.pathname, navigate]);

  const isOnboarding = location.pathname === '/onboarding';

  if (isOnboarding) {
    return <WelcomeOnboarding />;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Desktop Persistent Sidebar */}
      <DesktopSidebar />

      {/* Mobile Top Navigation */}
      <MobileNavbar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8 overflow-y-auto max-h-screen">
        {/* Subtle Sunset Banner if active */}
        {digitalSunsetActive && (
          <div className="bg-[#E09F67]/20 border-b border-[#E09F67]/40 text-[#FDE8D7] px-4 py-2 flex items-center justify-between text-xs animate-fade-in">
            <div className="flex items-center gap-2">
              <Sunset className="w-3.5 h-3.5 text-[#E09F67]" />
              <span>Digital Sunset is active — Calming warm tones & low stimulation enabled</span>
            </div>
            <button
              onClick={() => setDigitalSunsetActive(false)}
              className="text-xs hover:text-white flex items-center gap-1 opacity-80 hover:opacity-100"
            >
              <span>Exit Sunset</span>
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<WellnessDashboard />} />
            <Route path="/focus" element={<FocusStudio />} />
            <Route path="/detox" element={<DigitalDetox />} />
            <Route path="/sleep" element={<SleepRelax />} />
            <Route path="/garden" element={<MyGarden />} />
            <Route path="/insights" element={<InsightsAnalytics />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/onboarding" element={<WelcomeOnboarding />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <FlowstateProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </FlowstateProvider>
  );
}

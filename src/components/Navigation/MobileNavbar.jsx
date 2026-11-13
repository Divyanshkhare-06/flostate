import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Timer,
  BellOff,
  Moon,
  Sprout,
  BarChart3,
  Settings,
  Sparkles,
  Menu,
  X,
  Sunset,
  Sun,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useFlowstate } from '../../context/FlowstateContext';

export function MobileNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {
    onboarding,
    theme,
    setTheme,
    digitalSunsetActive,
    setDigitalSunsetActive,
    soundEnabled,
    toggleSound,
    growthPoints,
    isDemoData,
  } = useFlowstate();

  const mainBottomNav = [
    { to: '/', label: 'Overview', icon: LayoutDashboard },
    { to: '/focus', label: 'Focus', icon: Timer },
    { to: '/detox', label: 'Detox', icon: BellOff },
    { to: '/sleep', label: 'Sleep', icon: Moon },
    { to: '/garden', label: 'Garden', icon: Sprout },
  ];

  const studentName = onboarding?.studentName || 'Student';

  return (
    <div className="md:hidden">
      {/* Top Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-[var(--bg-card)]/90 backdrop-blur-md border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#A99BFF] to-[#7B68EE] flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-bold text-base tracking-tight text-[var(--text-primary)]">
            FLOWSTATE
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Digital Sunset Toggle */}
          <button
            onClick={() => setDigitalSunsetActive(!digitalSunsetActive)}
            title="Digital Sunset"
            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-all ${
              digitalSunsetActive
                ? 'bg-[#E09F67] text-white border-transparent'
                : 'bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
            }`}
          >
            <Sunset className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium hidden sm:inline">Sunset</span>
          </button>

          {/* Hamburger Drawer toggle */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-1.5 rounded-lg bg-[var(--bg-card-subtle)] text-[var(--text-primary)] border border-[var(--border-subtle)]"
            aria-label="Open menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Slide-out Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative ml-auto w-72 max-w-[80vw] h-full bg-[var(--bg-card)] border-l border-[var(--border-subtle)] p-5 flex flex-col justify-between shadow-2xl z-10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#B8E6D0] to-[#A99BFF] flex items-center justify-center font-bold text-xs text-[#171A2E]">
                    {studentName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{studentName}</p>
                    <p className="text-xs text-[var(--text-muted)]">{growthPoints} Growth Points</p>
                  </div>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {isDemoData && (
                <div className="mt-3 px-3 py-1.5 rounded-lg bg-[var(--accent-lavender-subtle)] border border-[var(--accent-lavender)]/30 text-xs text-[var(--accent-lavender-dark)] font-medium">
                  Demo Data Active
                </div>
              )}

              <nav className="mt-6 flex flex-col gap-1.5">
                <NavLink
                  to="/"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-card-subtle)]"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Overview</span>
                </NavLink>
                <NavLink
                  to="/focus"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-card-subtle)]"
                >
                  <Timer className="w-4 h-4" />
                  <span>Focus Studio</span>
                </NavLink>
                <NavLink
                  to="/detox"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-card-subtle)]"
                >
                  <BellOff className="w-4 h-4" />
                  <span>Digital Detox</span>
                </NavLink>
                <NavLink
                  to="/sleep"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-card-subtle)]"
                >
                  <Moon className="w-4 h-4" />
                  <span>Sleep & Relax</span>
                </NavLink>
                <NavLink
                  to="/garden"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-card-subtle)]"
                >
                  <Sprout className="w-4 h-4" />
                  <span>My Garden</span>
                </NavLink>
                <NavLink
                  to="/insights"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-card-subtle)]"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Insights & Analytics</span>
                </NavLink>
                <NavLink
                  to="/settings"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-card-subtle)]"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </NavLink>
              </nav>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setDigitalSunsetActive(false);
                    setTheme('light');
                  }}
                  className={`p-2 rounded-lg ${
                    theme === 'light' && !digitalSunsetActive
                      ? 'bg-[var(--bg-card-subtle)] text-[#171A2E]'
                      : 'text-[var(--text-muted)]'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setDigitalSunsetActive(false);
                    setTheme('dark');
                  }}
                  className={`p-2 rounded-lg ${
                    theme === 'dark' && !digitalSunsetActive
                      ? 'bg-[var(--bg-card-subtle)] text-[#A99BFF]'
                      : 'text-[var(--text-muted)]'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={toggleSound}
                className="p-2 rounded-lg text-[var(--text-muted)]"
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-[var(--accent-lavender-dark)]" />
                ) : (
                  <VolumeX className="w-4 h-4 opacity-50" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sticky Tab Bar */}
      <nav className="fixed bottom-0 inset-x-0 z-30 bg-[var(--bg-card)]/95 backdrop-blur-md border-t border-[var(--border-subtle)] px-2 py-1.5 flex items-center justify-around">
        {mainBottomNav.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'text-[var(--accent-lavender-dark)] font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}

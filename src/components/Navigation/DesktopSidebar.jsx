import React from 'react';
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
  Sun,
  Sunset,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useFlowstate } from '../../context/FlowstateContext';

export function DesktopSidebar() {
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

  const navItems = [
    { to: '/', label: 'Overview', icon: LayoutDashboard },
    { to: '/focus', label: 'Focus Studio', icon: Timer },
    { to: '/detox', label: 'Digital Detox', icon: BellOff },
    { to: '/sleep', label: 'Sleep & Relax', icon: Moon },
    { to: '/garden', label: 'My Garden', icon: Sprout },
    { to: '/insights', label: 'Insights', icon: BarChart3 },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  const studentName = onboarding?.studentName || 'Student';
  const primaryGoal = onboarding?.primaryGoal || 'Mindful Focus';

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-[var(--bg-card)] border-r border-[var(--border-subtle)] px-4 py-6 justify-between select-none transition-colors duration-200 z-30">
      {/* Brand & Logo */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 px-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#A99BFF] to-[#7B68EE] flex items-center justify-center text-white shadow-sm shadow-[#A99BFF]/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-lg text-[var(--text-primary)] font-['Plus_Jakarta_Sans']">
              FLOWSTATE
            </span>
            <span className="text-[11px] font-medium text-[var(--text-muted)] tracking-wider uppercase">
              Digital Wellness
            </span>
          </div>
        </div>

        {/* Demo Mode Badge if active */}
        {isDemoData && (
          <div className="mx-2 px-3 py-1.5 rounded-lg bg-[var(--accent-lavender-subtle)] border border-[var(--accent-lavender)]/30 text-xs text-[var(--accent-lavender-dark)] font-medium flex items-center justify-between">
            <span>Demo Data Active</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-[var(--accent-lavender-subtle)] text-[var(--accent-lavender-dark)] font-semibold shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-subtle)]'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Controls */}
      <div className="flex flex-col gap-4 pt-4 border-t border-[var(--border-subtle)]">
        {/* Quick Toggles */}
        <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-[var(--bg-card-subtle)]">
          {/* Theme switcher */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setDigitalSunsetActive(false);
                setTheme('light');
              }}
              title="Light theme"
              className={`p-1.5 rounded-md transition-colors ${
                theme === 'light' && !digitalSunsetActive
                  ? 'bg-[var(--bg-card)] text-[#171A2E] shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setDigitalSunsetActive(false);
                setTheme('dark');
              }}
              title="Dark theme"
              className={`p-1.5 rounded-md transition-colors ${
                theme === 'dark' && !digitalSunsetActive
                  ? 'bg-[var(--bg-card)] text-[#A99BFF] shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDigitalSunsetActive(!digitalSunsetActive)}
              title="Digital Sunset mode"
              className={`p-1.5 rounded-md transition-colors ${
                digitalSunsetActive
                  ? 'bg-[#E09F67] text-white shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Sunset className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Mute soothing chimes' : 'Enable soothing chimes'}
            className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-[var(--accent-lavender-dark)]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 opacity-50" />
            )}
          </button>
        </div>

        {/* User Profile Snippet */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#B8E6D0] to-[#A99BFF] flex items-center justify-center font-bold text-xs text-[#171A2E] shadow-xs">
            {studentName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold truncate text-[var(--text-primary)]">
                {studentName}
              </span>
            </div>
            <span className="text-[11px] text-[var(--text-muted)] truncate">
              {growthPoints} pts · {primaryGoal}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

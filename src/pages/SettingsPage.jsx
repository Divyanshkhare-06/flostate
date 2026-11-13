import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings,
  Sun,
  Moon,
  Sunset,
  Volume2,
  VolumeX,
  Bell,
  Clock,
  Bed,
  Trash2,
  AlertTriangle,
  Info,
  CheckCircle2,
  Sparkles,
  Database,
  RefreshCw,
  User,
  ShieldCheck,
} from 'lucide-react';
import { useFlowstate } from '../context/FlowstateContext';
import { Card } from '../components/Common/Card';
import { Modal } from '../components/Common/Modal';

export function SettingsPage() {
  const navigate = useNavigate();
  const {
    theme,
    setTheme,
    digitalSunsetActive,
    setDigitalSunsetActive,
    soundEnabled,
    toggleSound,
    onboarding,
    completeOnboarding,
    bedtimeSettings,
    updateBedtimeSettings,
    resetNotificationAudit,
    isDemoData,
    loadDemoData,
    resetAllData,
  } = useFlowstate();

  const [studentName, setStudentName] = useState(onboarding?.studentName || '');
  const [primaryGoal, setPrimaryGoal] = useState(onboarding?.primaryGoal || 'Improve focus');
  const [preferredDuration, setPreferredDuration] = useState(onboarding?.preferredDuration || 25);
  const [profileSaved, setProfileSaved] = useState(false);

  // Reset confirmation modal
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetAuditDone, setResetAuditDone] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    completeOnboarding({
      studentName: studentName.trim() || 'Student',
      primaryGoal,
      preferredDuration: Number(preferredDuration),
      preferredTheme: theme,
    });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleResetAuditClick = () => {
    resetNotificationAudit();
    setResetAuditDone(true);
    setTimeout(() => setResetAuditDone(false), 2500);
  };

  const handleConfirmResetAll = () => {
    resetAllData();
    setIsResetModalOpen(false);
    navigate('/onboarding');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12 animate-fade-in space-y-10">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] text-xs font-semibold mb-3 border border-[var(--border-subtle)]">
          <Settings className="w-3.5 h-3.5" />
          <span>System & Preferences</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight font-['Plus_Jakarta_Sans']">
          Settings
        </h1>
        <p className="text-sm md:text-base text-[var(--text-secondary)] mt-1 max-w-lg">
          Configure your sensory comfort, focus defaults, and personal data boundaries.
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. APPEARANCE & THEME */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-1">
            <Sun className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
              Theme & Appearance
            </h2>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mb-6">
            Choose a visual comfort mode tailored to daylight or late-night study sessions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => {
                setDigitalSunsetActive(false);
                setTheme('light');
              }}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                theme === 'light' && !digitalSunsetActive
                  ? 'border-[var(--accent-lavender)] bg-[var(--accent-lavender-subtle)]/50 shadow-xs'
                  : 'border-[var(--border-subtle)] hover:bg-[var(--bg-card-subtle)]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Sun className="w-5 h-5 text-amber-500" />
                {theme === 'light' && !digitalSunsetActive && (
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-lavender-dark)]" />
                )}
              </div>
              <div>
                <span className="text-sm font-semibold text-[var(--text-primary)] block">Light Mode</span>
                <span className="text-[11px] text-[var(--text-secondary)]">Crisp off-white & lavender</span>
              </div>
            </button>

            <button
              onClick={() => {
                setDigitalSunsetActive(false);
                setTheme('dark');
              }}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                theme === 'dark' && !digitalSunsetActive
                  ? 'border-[var(--accent-lavender)] bg-[var(--accent-lavender-subtle)]/50 shadow-xs'
                  : 'border-[var(--border-subtle)] hover:bg-[var(--bg-card-subtle)]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Moon className="w-5 h-5 text-[#A99BFF]" />
                {theme === 'dark' && !digitalSunsetActive && (
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-lavender-dark)]" />
                )}
              </div>
              <div>
                <span className="text-sm font-semibold text-[var(--text-primary)] block">Dark Mode</span>
                <span className="text-[11px] text-[var(--text-secondary)]">Deep navy for reduced glare</span>
              </div>
            </button>

            <button
              onClick={() => setDigitalSunsetActive(!digitalSunsetActive)}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                digitalSunsetActive
                  ? 'border-[#E09F67] bg-[#E09F67]/15 shadow-xs'
                  : 'border-[var(--border-subtle)] hover:bg-[var(--bg-card-subtle)]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Sunset className="w-5 h-5 text-[#E09F67]" />
                {digitalSunsetActive && (
                  <CheckCircle2 className="w-4 h-4 text-[#E09F67]" />
                )}
              </div>
              <div>
                <span className="text-sm font-semibold text-[var(--text-primary)] block">Digital Sunset</span>
                <span className="text-[11px] text-[var(--text-secondary)]">Warm amber night sanctuary</span>
              </div>
            </button>
          </div>
        </Card>

        {/* 2. AUDIO & FOCUS DEFAULTS */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-[var(--accent-lavender-dark)]" />
            <h2 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
              Focus & Audio Preferences
            </h2>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mb-6">
            Default timer lengths and synthesized Web Audio singing bowl chimes.
          </p>

          <div className="space-y-4">
            {/* Audio Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[var(--bg-card)] text-[var(--text-primary)]">
                  {soundEnabled ? (
                    <Volume2 className="w-4 h-4 text-[var(--accent-lavender-dark)]" />
                  ) : (
                    <VolumeX className="w-4 h-4 opacity-50" />
                  )}
                </div>
                <div>
                  <span className="text-xs md:text-sm font-semibold text-[var(--text-primary)] block">
                    Singing Bowl Audio Chimes
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)]">
                    Gentle harmonic chime on session end (synthesized offline via Web Audio)
                  </span>
                </div>
              </div>
              <button
                onClick={toggleSound}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  soundEnabled
                    ? 'bg-[var(--accent-lavender)] text-[#171A2E]'
                    : 'bg-slate-200 dark:bg-slate-700 text-[var(--text-secondary)]'
                }`}
              >
                {soundEnabled ? 'Enabled' : 'Muted'}
              </button>
            </div>

            {/* Notification Audit Quick Reset */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[var(--bg-card)] text-[var(--text-primary)]">
                  <Bell className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <span className="text-xs md:text-sm font-semibold text-[var(--text-primary)] block">
                    Notification Classifications
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)]">
                    Reset all 6 category classifications back to healthy defaults
                  </span>
                </div>
              </div>
              <button
                onClick={handleResetAuditClick}
                className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {resetAuditDone ? 'Reset!' : 'Reset Audit'}
              </button>
            </div>
          </div>
        </Card>

        {/* 3. STUDENT PROFILE & GOALS */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-1">
            <User className="w-4 h-4 text-[var(--accent-lavender-dark)]" />
            <h2 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
              Student Profile & Focus Goal
            </h2>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mb-6">
            Personalize your dashboard greeting and primary intention.
          </p>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                  Display Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                  Primary Wellness Focus
                </label>
                <select
                  value={primaryGoal}
                  onChange={(e) => setPrimaryGoal(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)]"
                >
                  <option value="Improve focus">Improve focus</option>
                  <option value="Reduce digital distractions">Reduce digital distractions</option>
                  <option value="Build healthier habits">Build healthier habits</option>
                  <option value="Improve sleep">Improve sleep</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              {profileSaved ? (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Profile updated</span>
                </span>
              ) : (
                <span className="text-[11px] text-[var(--text-muted)]">
                  Locally stored in this browser
                </span>
              )}
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Card>

        {/* 4. DEMO DATA & DATA MANAGEMENT */}
        <Card className="p-6 border-rose-100 dark:border-rose-950/40">
          <div className="flex items-center gap-2 mb-1">
            <Database className="w-4 h-4 text-rose-500" />
            <h2 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
              Data & Storage
            </h2>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mb-6">
            All your entries are kept 100% locally in your browser's LocalStorage. No server trackers.
          </p>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)]">
              <div>
                <span className="text-xs md:text-sm font-semibold text-[var(--text-primary)] block">
                  Sample College Student Data (Demo Mode)
                </span>
                <span className="text-[11px] text-[var(--text-muted)]">
                  {isDemoData
                    ? 'Demo mode is currently ACTIVE with sample focus history and charts.'
                    : 'Populate a realistic week of student focus sessions and habit history.'}
                </span>
              </div>
              {!isDemoData ? (
                <button
                  onClick={loadDemoData}
                  className="px-3 py-1.5 rounded-lg bg-[var(--accent-lavender-subtle)] text-[var(--accent-lavender-dark)] border border-[var(--accent-lavender)]/30 text-xs font-semibold shrink-0"
                >
                  Load Demo Data
                </button>
              ) : (
                <button
                  onClick={resetAllData}
                  className="px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-xs font-semibold shrink-0"
                >
                  Clear Demo Data
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/30">
              <div>
                <span className="text-xs md:text-sm font-semibold text-rose-700 dark:text-rose-300 block">
                  Clear All Data & Reset Application
                </span>
                <span className="text-[11px] text-rose-600/70 dark:text-rose-400/70">
                  Deletes all focus history, habits, reflections, and restarts onboarding.
                </span>
              </div>
              <button
                onClick={() => setIsResetModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition-colors shrink-0 flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset All Data</span>
              </button>
            </div>
          </div>
        </Card>

        {/* 5. APPLICATION INFORMATION */}
        <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] space-y-2">
          <div className="flex items-center gap-2 text-[var(--text-primary)] font-semibold">
            <Info className="w-4 h-4 text-[var(--accent-lavender-dark)]" />
            <span>About FLOWSTATE</span>
          </div>
          <p className="leading-relaxed">
            FLOWSTATE is a mindful digital wellness platform architected for college students. Designed around non-punitive consistency, distraction parking, circadian sleep alignment, and gentle progress.
          </p>
          <div className="pt-2 border-t border-[var(--border-subtle)] flex flex-wrap gap-4 text-[11px] text-[var(--text-muted)]">
            <span>React + Vite</span>
            <span>Tailwind CSS</span>
            <span>Framer Motion</span>
            <span>Recharts</span>
            <span>Zero Backend Required</span>
          </div>
        </div>
      </div>

      {/* CONFIRM RESET MODAL */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Confirm Data Reset"
      >
        <div className="text-center py-2">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center mx-auto mb-3">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">
            Erase all stored wellness data?
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mb-6 max-w-xs mx-auto">
            This will permanently remove your focus sessions, habit history, digital reflections, and settings from LocalStorage.
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setIsResetModalOpen(false)}
              className="flex-1 py-2.5 rounded-xl border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-card-subtle)]"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmResetAll}
              className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition-colors"
            >
              Yes, Reset Everything
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}


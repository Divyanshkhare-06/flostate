import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Target,
  Clock,
  Palette,
  CheckCircle2,
  ShieldCheck,
  Moon,
  Sun,
  Flame,
  BellOff,
  Feather,
} from 'lucide-react';
import { useFlowstate } from '../context/FlowstateContext';

export function WelcomeOnboarding() {
  const navigate = useNavigate();
  const { completeOnboarding, onboarding } = useFlowstate();

  const [step, setStep] = useState(1); // 1 = Welcome Hero, 2 = Goal, 3 = Focus Duration, 4 = Theme & Name

  const [primaryGoal, setPrimaryGoal] = useState(onboarding?.primaryGoal || 'Improve focus');
  const [preferredDuration, setPreferredDuration] = useState(onboarding?.preferredDuration || 25);
  const [preferredTheme, setPreferredTheme] = useState(onboarding?.preferredTheme || 'light');
  const [studentName, setStudentName] = useState(onboarding?.studentName || '');

  const goals = [
    {
      id: 'Improve focus',
      title: 'Improve focus',
      description: 'Study deeply without constantly switching tabs or checking your phone',
      icon: Target,
    },
    {
      id: 'Reduce digital distractions',
      title: 'Reduce digital distractions',
      description: 'Audit noisy notifications and break compulsive social media checking',
      icon: BellOff,
    },
    {
      id: 'Build healthier habits',
      title: 'Build healthier habits',
      description: 'Establish consistent daily routines and watch your habit garden bloom',
      icon: Feather,
    },
    {
      id: 'Improve sleep',
      title: 'Improve sleep',
      description: 'Gentle bedtime wind-downs and Digital Sunset to wake up refreshed',
      icon: Moon,
    },
  ];

  const durations = [
    { value: 25, label: '25 minutes', subtitle: 'Classic Pomodoro — Great for high concentration sprints' },
    { value: 45, label: '45 minutes', subtitle: 'College Block — Ideal for lecture review & problem sets' },
    { value: 60, label: '60 minutes', subtitle: 'Deep Flow — Perfect for essays, coding & thesis research' },
  ];

  const handleFinish = () => {
    completeOnboarding({
      primaryGoal,
      preferredDuration,
      preferredTheme,
      studentName: studentName.trim() || 'Student',
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden transition-colors duration-300">
      {/* Abstract Zen Background Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[420px] h-[420px] rounded-full bg-[#EAE6FF]/60 dark:bg-[#A99BFF]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[460px] h-[460px] rounded-full bg-[#B8E6D0]/40 dark:bg-[#B8E6D0]/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        {/* Step 1: Welcome Hero */}
        {step === 1 && (
          <div className="flex flex-col items-center text-center animate-fade-in">
            {/* Minimalist Logo Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] mb-6 shadow-xs">
              <Sparkles className="w-4 h-4 text-[var(--accent-lavender-dark)]" />
              <span className="text-xs font-semibold tracking-wide uppercase text-[var(--text-secondary)]">
                Welcome to FLOWSTATE
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] mb-4 font-['Plus_Jakarta_Sans'] leading-tight">
              Find your flow.
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-lg mb-8 leading-relaxed font-normal">
              A little more focus. A little less noise. A healthier you.
            </p>

            {/* Introduction paragraph */}
            <p className="text-sm text-[var(--text-muted)] max-w-md mb-10 leading-normal">
              Designed for students to study without digital anxiety, regain mental bandwidth, and build calm daily rhythms.
            </p>

            {/* 3 Short Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-10 text-left">
              <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-5 shadow-xs transition-transform hover:-translate-y-0.5">
                <div className="w-8 h-8 rounded-xl bg-[var(--accent-lavender-subtle)] flex items-center justify-center text-[var(--accent-lavender-dark)] mb-3">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                  Focus Studio
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Single-tasking timer with Distraction Parking Lot & zero-guilt Rescue Mode.
                </p>
              </div>

              <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-5 shadow-xs transition-transform hover:-translate-y-0.5">
                <div className="w-8 h-8 rounded-xl bg-[var(--accent-mint-subtle)] flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3">
                  <BellOff className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                  Digital Detox
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Classify attention-drain notifications and practice intentional mindful scrolling.
                </p>
              </div>

              <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-5 shadow-xs transition-transform hover:-translate-y-0.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-3">
                  <Moon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                  Sleep & Garden
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Digital Sunset wind-down checklist and a living garden that never punishes missed days.
                </p>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-[var(--accent-navy)] text-white font-semibold text-base hover:opacity-90 transition-all shadow-md active:scale-[0.98]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-[var(--text-muted)] mt-3">
              No account or password needed · Private to your browser
            </p>
          </div>
        )}

        {/* Step 2: Primary Goal */}
        {step === 2 && (
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold tracking-wider text-[var(--accent-lavender-dark)] uppercase">
                Step 1 of 3
              </span>
              <span className="text-xs text-[var(--text-muted)]">Personalizing your space</span>
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              What is your primary goal right now?
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              FLOWSTATE will tune your daily intentions and gentle recommendations around this focus.
            </p>

            <div className="space-y-3 mb-8">
              {goals.map((g) => {
                const Icon = g.icon;
                const isSelected = primaryGoal === g.id;
                return (
                  <div
                    key={g.id}
                    onClick={() => setPrimaryGoal(g.id)}
                    className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[var(--accent-lavender)] bg-[var(--accent-lavender-subtle)]/50 shadow-xs'
                        : 'border-[var(--border-subtle)] hover:bg-[var(--bg-card-subtle)]'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-[var(--accent-lavender)] text-[#171A2E]'
                          : 'bg-[var(--bg-card-subtle)] text-[var(--text-secondary)]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-[var(--text-primary)]">
                          {g.title}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-[var(--accent-lavender-dark)]" />
                        )}
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                        {g.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
              <button
                onClick={() => setStep(1)}
                className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--accent-navy)] text-white font-medium text-sm hover:opacity-90 transition-opacity"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Preferred Focus Duration */}
        {step === 3 && (
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold tracking-wider text-[var(--accent-lavender-dark)] uppercase">
                Step 2 of 3
              </span>
              <span className="text-xs text-[var(--text-muted)]">Focus Routine</span>
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              Select your preferred focus duration
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              You can always adjust this timer or use custom lengths inside the Focus Studio.
            </p>

            <div className="space-y-3 mb-8">
              {durations.map((d) => {
                const isSelected = preferredDuration === d.value;
                return (
                  <div
                    key={d.value}
                    onClick={() => setPreferredDuration(d.value)}
                    className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[var(--accent-lavender)] bg-[var(--accent-lavender-subtle)]/50 shadow-xs'
                        : 'border-[var(--border-subtle)] hover:bg-[var(--bg-card-subtle)]'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                        isSelected
                          ? 'bg-[var(--accent-lavender)] text-[#171A2E]'
                          : 'bg-[var(--bg-card-subtle)] text-[var(--text-secondary)]'
                      }`}
                    >
                      {d.value}m
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-[var(--text-primary)]">
                          {d.label}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-[var(--accent-lavender-dark)]" />
                        )}
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                        {d.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
              <button
                onClick={() => setStep(2)}
                className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--accent-navy)] text-white font-medium text-sm hover:opacity-90 transition-opacity"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Theme & Name Preference */}
        {step === 4 && (
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold tracking-wider text-[var(--accent-lavender-dark)] uppercase">
                Step 3 of 3
              </span>
              <span className="text-xs text-[var(--text-muted)]">Finishing touches</span>
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              Choose your visual comfort
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              Tailor your palette to your ambient study environment.
            </p>

            {/* Name Input */}
            <div className="mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                What should FLOWSTATE call you? (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Jordan, Alex, or your initials"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-hidden focus:border-[var(--accent-lavender)]"
              />
            </div>

            {/* Theme Selection */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div
                onClick={() => setPreferredTheme('light')}
                className={`p-4 rounded-2xl border flex flex-col items-center text-center cursor-pointer transition-all ${
                  preferredTheme === 'light'
                    ? 'border-[var(--accent-lavender)] bg-[var(--accent-lavender-subtle)]/40 shadow-xs'
                    : 'border-[var(--border-subtle)] hover:bg-[var(--bg-card-subtle)]'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-white text-[#171A2E] flex items-center justify-center shadow-xs mb-2 border border-slate-200">
                  <Sun className="w-5 h-5 text-amber-500" />
                </div>
                <span className="text-sm font-semibold text-[var(--text-primary)]">Light Theme</span>
                <span className="text-[11px] text-[var(--text-muted)] mt-0.5">
                  Crisp off-white & lavender for daytime productivity
                </span>
              </div>

              <div
                onClick={() => setPreferredTheme('dark')}
                className={`p-4 rounded-2xl border flex flex-col items-center text-center cursor-pointer transition-all ${
                  preferredTheme === 'dark'
                    ? 'border-[var(--accent-lavender)] bg-[var(--accent-lavender-subtle)]/40 shadow-xs'
                    : 'border-[var(--border-subtle)] hover:bg-[var(--bg-card-subtle)]'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-[#171A2E] text-white flex items-center justify-center shadow-xs mb-2 border border-slate-700">
                  <Moon className="w-5 h-5 text-[#A99BFF]" />
                </div>
                <span className="text-sm font-semibold text-[var(--text-primary)]">Dark Theme</span>
                <span className="text-[11px] text-[var(--text-muted)] mt-0.5">
                  Deep navy tones to minimize late-night eye strain
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
              <button
                onClick={() => setStep(3)}
                className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[var(--accent-navy)] text-white font-semibold text-sm hover:opacity-90 transition-all shadow-md"
              >
                <span>Enter FLOWSTATE</span>
                <Sparkles className="w-4 h-4 text-[#B8E6D0]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

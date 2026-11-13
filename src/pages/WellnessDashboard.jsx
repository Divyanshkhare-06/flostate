import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  CheckCircle2,
  Sparkles,
  Play,
  Coffee,
  Sunset,
  ArrowRight,
  Smile,
  Zap,
  Target,
  Meh,
  AlertCircle,
  BatteryLow,
  Edit2,
  Check,
} from 'lucide-react';
import { useFlowstate } from '../context/FlowstateContext';
import { Card } from '../components/Common/Card';
import { Modal } from '../components/Common/Modal';
import { BreathingGuide } from '../components/Common/BreathingGuide';
import { getTodayKey } from '../data/initialData';

export function WellnessDashboard() {
  const navigate = useNavigate();
  const {
    onboarding,
    dailyIntention,
    setDailyIntention,
    dailyIntentionCompleted,
    toggleDailyIntentionCompleted,
    logMood,
    getTodayMood,
    focusSessions,
    habits,
    habitHistory,
    setDigitalSunsetActive,
  } = useFlowstate();

  const [isBreakModalOpen, setIsBreakModalOpen] = useState(false);
  const [isEditingIntention, setIsEditingIntention] = useState(false);
  const [tempIntention, setTempIntention] = useState(dailyIntention || '');

  const todayKey = getTodayKey();
  const todayMood = getTodayMood();

  // Dynamic Time-of-Day Greeting
  const currentHour = new Date().getHours();
  const greetingTime =
    currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';
  const studentName = onboarding?.studentName ? `, ${onboarding.studentName}` : '';

  // Formatted date
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  // Metrics calculations for Today's Overview
  const todaySessions = focusSessions.filter((s) => s.dateKey === todayKey && s.completed);
  const todayMinutes = todaySessions.reduce((acc, s) => acc + (s.duration || 0), 0);
  const formattedFocusTime =
    todayMinutes >= 60
      ? `${Math.floor(todayMinutes / 60)}h ${todayMinutes % 60 > 0 ? (todayMinutes % 60) + 'm' : ''}`
      : `${todayMinutes}m`;

  const totalHabits = habits.length;
  const completedHabitsToday = habits.filter(
    (h) => habitHistory[h.id] && habitHistory[h.id][todayKey]
  ).length;

  // Mood options
  const moodOptions = [
    { label: 'Energetic', icon: Zap, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30' },
    { label: 'Focused', icon: Target, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/30' },
    { label: 'Okay', icon: Meh, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30' },
    { label: 'Overwhelmed', icon: AlertCircle, color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/30' },
    { label: 'Tired', icon: BatteryLow, color: 'text-slate-500 bg-slate-100 dark:bg-slate-800/40' },
  ];

  // Gentle recommendation mapping based on mood
  const getGentleRecommendation = () => {
    switch (todayMood) {
      case 'Overwhelmed':
        return {
          title: 'Take a breath. Start with something small.',
          body: 'When school feels heavy, shrink your scope to just one 15-minute micro-task. You don’t have to finish everything today.',
          accent: 'border-l-rose-400',
        };
      case 'Tired':
        return {
          title: 'Consider a short break before your next session.',
          body: 'Your brain consolidates memory when you rest. Step outside for fresh air or hydrate before opening another textbook.',
          accent: 'border-l-slate-400',
        };
      case 'Focused':
        return {
          title: "You're in a good place. Protect your focus.",
          body: 'Silence notifications and dive into your most mentally demanding project while your cognitive energy is peak.',
          accent: 'border-l-indigo-400',
        };
      case 'Energetic':
        return {
          title: 'Harness this energy for your most challenging task.',
          body: 'Tackle the assignment you have been postponing. High vitality makes problem-solving feel effortless.',
          accent: 'border-l-amber-400',
        };
      case 'Okay':
        return {
          title: 'Steady progress is good progress. One step at a time.',
          body: 'Consistency beats intensity. Set a gentle intention and work with calm, unhurried cadence.',
          accent: 'border-l-emerald-400',
        };
      default:
        return {
          title: 'Check in with yourself today.',
          body: 'Tap how you are feeling in the Daily Pulse above to receive an encouraging recommendation tailored to your state.',
          accent: 'border-l-[var(--accent-lavender)]',
        };
    }
  };

  const recommendation = getGentleRecommendation();

  const handleSaveIntention = () => {
    setDailyIntention(tempIntention.trim());
    setIsEditingIntention(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12 animate-fade-in">
      {/* Header with Date & Greeting */}
      <div className="mb-10">
        <p className="text-xs md:text-sm font-medium text-[var(--text-secondary)] tracking-wide uppercase">
          {formattedDate}
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight mt-1 font-['Plus_Jakarta_Sans']">
          {greetingTime}{studentName}.
        </h1>
        <p className="text-base text-[var(--text-secondary)] mt-1.5 font-normal">
          Ready to find your flow?
        </p>
      </div>

      <div className="space-y-8">
        {/* A. Daily Pulse */}
        <Card className="border-[var(--border-subtle)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">
                Daily Pulse
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mt-0.5">
                How are you feeling today?
              </p>
            </div>
            {todayMood && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--accent-lavender-subtle)] text-[var(--accent-lavender-dark)] font-medium self-start md:self-auto">
                Logged as {todayMood}
              </span>
            )}
          </div>

          <div className="grid grid-cols-5 gap-2 md:gap-3">
            {moodOptions.map((m) => {
              const Icon = m.icon;
              const isSelected = todayMood === m.label;
              return (
                <button
                  key={m.label}
                  onClick={() => logMood(m.label)}
                  className={`flex flex-col items-center justify-center p-3 md:p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-[var(--accent-lavender)] bg-[var(--accent-lavender-subtle)]/70 shadow-xs scale-102 font-semibold'
                      : 'border-[var(--border-subtle)] hover:bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <div className={`p-2 rounded-lg mb-1.5 ${m.color}`}>
                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="text-xs md:text-sm tracking-tight truncate">
                    {m.label}
                  </span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* B. Today's Overview (Only 3 key metrics) */}
        <div>
          <h2 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3 px-1">
            Today's Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Metric 1: Focus Time Today */}
            <Card className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-[var(--text-secondary)] font-medium">Focus Time Today</p>
                <p className="text-2xl font-bold text-[var(--text-primary)] mt-1 font-mono tracking-tight">
                  {formattedFocusTime}
                </p>
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                  {todayMinutes > 0 ? 'Uninterrupted flow' : 'No sessions yet'}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-lavender-subtle)] flex items-center justify-center text-[var(--accent-lavender-dark)]">
                <Clock className="w-5 h-5" />
              </div>
            </Card>

            {/* Metric 2: Completed Sessions */}
            <Card className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-[var(--text-secondary)] font-medium">Completed Sessions</p>
                <p className="text-2xl font-bold text-[var(--text-primary)] mt-1 font-mono tracking-tight">
                  {todaySessions.length}
                </p>
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                  {todaySessions.length === 1 ? '1 focus block' : `${todaySessions.length} focus blocks`}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-mint-subtle)] flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Target className="w-5 h-5" />
              </div>
            </Card>

            {/* Metric 3: Habits Completed */}
            <Card className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-[var(--text-secondary)] font-medium">Habits Completed</p>
                <p className="text-2xl font-bold text-[var(--text-primary)] mt-1 font-mono tracking-tight">
                  {completedHabitsToday} / {totalHabits}
                </p>
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                  {Math.round((completedHabitsToday / (totalHabits || 1)) * 100)}% daily consistency
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center text-purple-600 dark:text-purple-300">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </Card>
          </div>
        </div>

        {/* C. Your Daily Intention */}
        <Card className="p-6 border-[var(--border-subtle)] relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--accent-lavender-dark)]" />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Your Daily Intention
              </h2>
            </div>
            {!isEditingIntention && dailyIntention && (
              <button
                onClick={() => {
                  setTempIntention(dailyIntention);
                  setIsEditingIntention(true);
                }}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-1 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            )}
          </div>

          <p className="text-xs text-[var(--text-muted)] mb-3">
            What would make today feel productive?
          </p>

          {isEditingIntention || !dailyIntention ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="e.g. Finish chemistry review and keep phone in backpack"
                value={tempIntention}
                onChange={(e) => setTempIntention(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveIntention();
                }}
                className="flex-1 px-4 py-2.5 text-sm rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-hidden focus:border-[var(--accent-lavender)]"
                autoFocus={isEditingIntention}
              />
              <button
                onClick={handleSaveIntention}
                className="px-4 py-2.5 rounded-xl bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)]">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleDailyIntentionCompleted}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    dailyIntentionCompleted
                      ? 'bg-[var(--accent-lavender)] border-[var(--accent-lavender)] text-[#171A2E]'
                      : 'border-[var(--border-strong)] hover:border-[var(--accent-lavender)]'
                  }`}
                  aria-label="Toggle intention completed"
                >
                  {dailyIntentionCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
                <span
                  className={`text-sm ${
                    dailyIntentionCompleted
                      ? 'line-through text-[var(--text-muted)]'
                      : 'text-[var(--text-primary)] font-medium'
                  }`}
                >
                  {dailyIntention}
                </span>
              </div>
              {dailyIntentionCompleted && (
                <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  Completed (+15 pts)
                </span>
              )}
            </div>
          )}
        </Card>

        {/* D. Quick Actions */}
        <div>
          <h2 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3 px-1">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Action 1: Start Focus Session */}
            <button
              onClick={() => navigate('/focus')}
              className="flex items-center justify-between p-4 rounded-2xl bg-[var(--accent-navy)] text-white hover:opacity-95 transition-all shadow-xs group"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <div>
                  <span className="text-sm font-semibold block leading-tight">Start Focus Session</span>
                  <span className="text-[11px] text-white/70">Enter deep work</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* Action 2: Take a Break */}
            <button
              onClick={() => setIsBreakModalOpen(true)}
              className="flex items-center justify-between p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-card-subtle)] transition-all shadow-xs group"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-9 h-9 rounded-xl bg-[var(--accent-mint-subtle)] flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Coffee className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-semibold block leading-tight">Take a Break</span>
                  <span className="text-[11px] text-[var(--text-secondary)]">Mindful pause</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* Action 3: Wind Down */}
            <button
              onClick={() => {
                setDigitalSunsetActive(true);
                navigate('/sleep');
              }}
              className="flex items-center justify-between p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-card-subtle)] transition-all shadow-xs group"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Sunset className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-semibold block leading-tight">Wind Down</span>
                  <span className="text-[11px] text-[var(--text-secondary)]">Digital Sunset</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>
        </div>

        {/* E. Gentle Recommendation */}
        <div className={`p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] border-l-4 ${recommendation.accent}`}>
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                Gentle Recommendation
              </span>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                {recommendation.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                {recommendation.body}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mindful Break Modal */}
      <Modal
        isOpen={isBreakModalOpen}
        onClose={() => setIsBreakModalOpen(false)}
        title="Mindful Reset Pause"
      >
        <BreathingGuide />
      </Modal>
    </div>
  );
}


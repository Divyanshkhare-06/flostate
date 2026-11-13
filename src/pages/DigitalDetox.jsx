import React, { useState, useEffect, useRef } from 'react';
import {
  BellOff,
  Bell,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  RotateCcw,
  Play,
  Pause,
  Coffee,
  ArrowRight,
  Sparkles,
  PhoneCall,
  GraduationCap,
  Mail,
  Share2,
  Tag,
  Tv,
  HelpCircle,
  Clock,
  Save,
  MessageSquare,
} from 'lucide-react';
import { useFlowstate } from '../context/FlowstateContext';
import { Card, CardHeader } from '../components/Common/Card';
import { Modal } from '../components/Common/Modal';
import { NOTIFICATION_CATEGORIES } from '../data/initialData';
import { playChime, playSoftTick } from '../components/Audio/soundEffects';

export function DigitalDetox() {
  const {
    notificationAudit,
    setNotificationTier,
    resetNotificationAudit,
    recordMindfulScroll,
    mindfulScrollStats,
    digitalHabitsReflection,
    saveDigitalReflection,
    soundEnabled,
  } = useFlowstate();

  // Icons map for notification categories
  const iconMap = {
    PhoneCall,
    GraduationCap,
    Mail,
    Share2,
    Tag,
    Tv,
  };

  // Mindful Scrolling State
  const [scrollDuration, setScrollDuration] = useState(5); // 5, 10, 15
  const [scrollTimeLeft, setScrollTimeLeft] = useState(5 * 60);
  const [isScrollingActive, setIsScrollingActive] = useState(false);
  const [showScrollPrompt, setShowScrollPrompt] = useState(false);
  const scrollTimerRef = useRef(null);

  // Digital Habits Form State
  const [reflections, setReflections] = useState({
    interruptions: digitalHabitsReflection?.interruptions || '',
    lossOfFocus: digitalHabitsReflection?.lossOfFocus || '',
    targetHabit: digitalHabitsReflection?.targetHabit || '',
  });
  const [savedMessage, setSavedMessage] = useState(false);

  // Handle Mindful Scrolling countdown
  useEffect(() => {
    if (isScrollingActive) {
      scrollTimerRef.current = setInterval(() => {
        setScrollTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(scrollTimerRef.current);
            setIsScrollingActive(false);
            setShowScrollPrompt(true);
            playChime(soundEnabled);
            recordMindfulScroll(scrollDuration);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(scrollTimerRef.current);
    }
    return () => clearInterval(scrollTimerRef.current);
  }, [isScrollingActive, scrollDuration]);

  const handleStartScroll = (mins) => {
    setScrollDuration(mins);
    setScrollTimeLeft(mins * 60);
    setIsScrollingActive(true);
    setShowScrollPrompt(false);
    playSoftTick(soundEnabled);
  };

  const handleStopScroll = () => {
    setIsScrollingActive(false);
  };

  const handleScrollPromptChoice = (choice) => {
    setShowScrollPrompt(false);
    if (choice === 'continue') {
      handleStartScroll(5);
    } else if (choice === 'break') {
      // pause/reset
      setScrollTimeLeft(5 * 60);
    } else {
      // return to task
      setScrollTimeLeft(5 * 60);
    }
  };

  // Notification audit summary calculations
  const totalCategories = NOTIFICATION_CATEGORIES.length;
  const counts = { essential: 0, important: 0, distracting: 0 };
  NOTIFICATION_CATEGORIES.forEach((cat) => {
    const tier = notificationAudit[cat.id] || cat.defaultTier;
    counts[tier] = (counts[tier] || 0) + 1;
  });

  const handleSaveHabits = (e) => {
    e.preventDefault();
    saveDigitalReflection('interruptions', reflections.interruptions);
    saveDigitalReflection('lossOfFocus', reflections.lossOfFocus);
    saveDigitalReflection('targetHabit', reflections.targetHabit);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
    playSoftTick(soundEnabled);
  };

  const scrollMinutes = Math.floor(scrollTimeLeft / 60);
  const scrollSeconds = scrollTimeLeft % 60;
  const formattedScrollTime = `${String(scrollMinutes).padStart(2, '0')}:${String(scrollSeconds).padStart(2, '0')}`;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12 animate-fade-in space-y-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-mint-subtle)] text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-3">
          <BellOff className="w-3.5 h-3.5" />
          <span>Digital Boundaries</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight font-['Plus_Jakarta_Sans']">
          Digital Detox
        </h1>
        <p className="text-sm md:text-base text-[var(--text-secondary)] mt-1 max-w-xl">
          Quiet the artificial urgency of screens. Regain intentional control over your attention.
        </p>
      </div>

      {/* SECTION A: NOTIFICATION AUDIT */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              Notification Audit
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-0.5">
              "Your attention is valuable. Decide what deserves it."
            </p>
          </div>
          <button
            onClick={resetNotificationAudit}
            className="self-start sm:self-auto text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to defaults</span>
          </button>
        </div>

        {/* Audit Classification Summary Bar */}
        <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Your Attention Breakdown
            </span>
            <span className="text-xs text-[var(--accent-lavender-dark)] font-medium">
              Your notification preferences are ready.
            </span>
          </div>

          {/* Minimal segmented progress bar */}
          <div className="h-3 rounded-full bg-[var(--bg-card-subtle)] overflow-hidden flex gap-1 p-0.5">
            <div
              style={{ width: `${(counts.essential / totalCategories) * 100}%` }}
              className="bg-emerald-400 rounded-full transition-all"
              title={`${counts.essential} Essential`}
            />
            <div
              style={{ width: `${(counts.important / totalCategories) * 100}%` }}
              className="bg-[#A99BFF] rounded-full transition-all"
              title={`${counts.important} Important`}
            />
            <div
              style={{ width: `${(counts.distracting / totalCategories) * 100}%` }}
              className="bg-rose-400 rounded-full transition-all"
              title={`${counts.distracting} Distracting`}
            />
          </div>

          <div className="flex items-center gap-4 mt-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-[var(--text-secondary)]">{counts.essential} Essential</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A99BFF]" />
              <span className="text-[var(--text-secondary)]">{counts.important} Important</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <span className="text-[var(--text-secondary)]">{counts.distracting} Distracting</span>
            </div>
          </div>

          {counts.distracting > 0 && (
            <p className="text-xs text-[var(--text-muted)] mt-3 pt-3 border-t border-[var(--border-subtle)]">
              Recommendation: Turn off lock screen banners and sound alerts for {counts.distracting} category apps in phone settings.
            </p>
          )}
        </div>

        {/* Categories List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {NOTIFICATION_CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.icon] || Bell;
            const currentTier = notificationAudit[cat.id] || cat.defaultTier;

            return (
              <Card key={cat.id} className="p-4 flex flex-col justify-between">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-xl bg-[var(--bg-card-subtle)] text-[var(--text-secondary)]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                      {cat.title}
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-normal">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Classification buttons */}
                <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-[var(--border-subtle)]">
                  <button
                    onClick={() => setNotificationTier(cat.id, 'essential')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                      currentTier === 'essential'
                        ? 'bg-emerald-500 text-white font-semibold shadow-xs'
                        : 'bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    Essential
                  </button>
                  <button
                    onClick={() => setNotificationTier(cat.id, 'important')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                      currentTier === 'important'
                        ? 'bg-[var(--accent-lavender)] text-[#171A2E] font-semibold shadow-xs'
                        : 'bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    Important
                  </button>
                  <button
                    onClick={() => setNotificationTier(cat.id, 'distracting')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                      currentTier === 'distracting'
                        ? 'bg-rose-500 text-white font-semibold shadow-xs'
                        : 'bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    Distracting
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* SECTION B: MINDFUL SCROLLING SIMULATION */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Mindful Scrolling Simulation
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-0.5">
            A user-controlled intentional break timer. If you choose to browse feeds, set an intentional boundary first.
          </p>
        </div>

        <Card className="p-6 border-[var(--border-subtle)]">
          {!isScrollingActive ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                  Set an intentional scroll window
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-md">
                  Choose a brief timer before opening social apps or browsing news. When the timer sounds, FLOWSTATE prompts you to check your awareness.
                </p>
                <div className="flex items-center gap-2 mt-4">
                  {[5, 10, 15].map((mins) => (
                    <button
                      key={mins}
                      onClick={() => handleStartScroll(mins)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent-lavender)] transition-all"
                    >
                      {mins} minutes
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-right sm:min-w-[140px]">
                <span className="text-[11px] text-[var(--text-muted)] block">Mindful Sessions</span>
                <span className="text-xl font-bold text-[var(--text-primary)] font-mono">
                  {mindfulScrollStats.sessionsCompleted}
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 block mt-0.5">
                  {mindfulScrollStats.totalMinutesMindful} mins intentional
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center py-4">
              <div className="w-12 h-12 rounded-full bg-[var(--accent-mint-subtle)] flex items-center justify-center text-emerald-600 mb-3 animate-pulse">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">
                Intentional Browsing in Progress
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5 max-w-sm">
                Scroll with conscious awareness. Notice when dopamine seeking replaces deliberate enjoyment.
              </p>
              <div className="text-4xl font-extrabold text-[var(--text-primary)] font-mono my-4">
                {formattedScrollTime}
              </div>
              <button
                onClick={handleStopScroll}
                className="px-6 py-2.5 rounded-xl border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] hover:text-rose-500 transition-colors"
              >
                Stop Early
              </button>
            </div>
          )}
        </Card>
      </section>

      {/* SECTION C: DIGITAL HABITS REFLECTION */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Digital Habits Reflection
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-0.5">
            Identify the triggers and friction points in your daily screen usage.
          </p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSaveHabits} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                1. How often do notifications interrupt you during a study session?
              </label>
              <input
                type="text"
                placeholder="e.g. Every 15-20 minutes, mostly group chats and news alerts"
                value={reflections.interruptions}
                onChange={(e) =>
                  setReflections({ ...reflections, interruptions: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-hidden focus:border-[var(--accent-lavender)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                2. When do you usually lose focus?
              </label>
              <input
                type="text"
                placeholder="e.g. When hitting a difficult problem or reading dry lecture slides"
                value={reflections.lossOfFocus}
                onChange={(e) =>
                  setReflections({ ...reflections, lossOfFocus: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-hidden focus:border-[var(--accent-lavender)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                3. What digital habit would you like to improve this semester?
              </label>
              <input
                type="text"
                placeholder="e.g. Charge phone across the room at night, no phone for first 30 mins after waking"
                value={reflections.targetHabit}
                onChange={(e) =>
                  setReflections({ ...reflections, targetHabit: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-hidden focus:border-[var(--accent-lavender)]"
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)]">
              {savedMessage ? (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Reflections saved (+5 growth points)</span>
                </span>
              ) : (
                <span className="text-[11px] text-[var(--text-muted)]">
                  Persisted securely in LocalStorage
                </span>
              )}

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Reflections</span>
              </button>
            </div>
          </form>
        </Card>
      </section>

      {/* MINDFUL SCROLL PROMPT MODAL */}
      <Modal
        isOpen={showScrollPrompt}
        onClose={() => setShowScrollPrompt(false)}
        title="Intentionality Check"
      >
        <div className="text-center py-2">
          <div className="w-12 h-12 rounded-2xl bg-[var(--accent-lavender-subtle)] flex items-center justify-center text-[var(--accent-lavender-dark)] mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">
            Are you still scrolling intentionally?
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mb-6 max-w-xs mx-auto">
            Your mindful browsing window has elapsed. Notice how your mind feels right now.
          </p>

          <div className="space-y-2.5">
            <button
              onClick={() => handleScrollPromptChoice('task')}
              className="w-full py-3 rounded-xl bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              Return to my original task
            </button>
            <button
              onClick={() => handleScrollPromptChoice('break')}
              className="w-full py-3 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-xs font-medium hover:bg-[var(--border-subtle)] transition-colors"
            >
              Take a short screen-free break
            </button>
            <button
              onClick={() => handleScrollPromptChoice('continue')}
              className="w-full py-2.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              Continue scrolling for 5 minutes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

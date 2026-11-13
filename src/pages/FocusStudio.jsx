import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Coffee,
  Check,
  ChevronRight,
  ListPlus,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { useFlowstate } from '../context/FlowstateContext';
import { Card } from '../components/Common/Card';
import { Modal } from '../components/Common/Modal';
import { playChime, playSoftTick } from '../components/Audio/soundEffects';

export function FocusStudio() {
  const {
    onboarding,
    soundEnabled,
    addFocusSession,
    activeDistractions,
    addDistraction,
    removeDistraction,
    toggleDistractionResolved,
    clearDistractions,
  } = useFlowstate();

  const defaultDuration = onboarding?.preferredDuration || 25;

  // Session states
  const [taskName, setTaskName] = useState('');
  const [sessionGoal, setSessionGoal] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(defaultDuration);
  const [timeLeft, setTimeLeft] = useState(defaultDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionMode, setSessionMode] = useState('focus'); // 'focus' | 'shortBreak' | 'longBreak'
  const [sessionStarted, setSessionStarted] = useState(false);

  // Parking Lot input state
  const [newDistraction, setNewDistraction] = useState('');
  const [isParkingLotOpen, setIsParkingLotOpen] = useState(true);

  // Modals
  const [isRescueModeOpen, setIsRescueModeOpen] = useState(false);
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);
  const [completedSessionData, setCompletedSessionData] = useState(null);

  // Ref for timer
  const timerRef = useRef(null);
  const totalDurationSeconds = durationMinutes * 60;

  // Sync timeLeft when preset duration changes and timer is idle
  useEffect(() => {
    if (!isRunning && !sessionStarted) {
      setTimeLeft(durationMinutes * 60);
    }
  }, [durationMinutes, isRunning, sessionStarted]);

  // Main countdown timer
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, taskName, sessionGoal, durationMinutes, sessionMode]);

  const handleStart = () => {
    setIsRunning(true);
    setSessionStarted(true);
    playSoftTick(soundEnabled);
  };

  const handlePause = () => {
    setIsRunning(false);
    playSoftTick(soundEnabled);
  };

  const handleEarlyStop = () => {
    // If stopping while running or paused with significant time left
    setIsRunning(false);
    setIsRescueModeOpen(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSessionStarted(false);
    setTimeLeft(durationMinutes * 60);
  };

  const handleSessionComplete = () => {
    setIsRunning(false);
    setSessionStarted(false);
    playChime(soundEnabled);

    if (sessionMode === 'focus') {
      const parkedTexts = activeDistractions.map((d) => d.text);
      const sessionInfo = {
        taskName: taskName.trim() || 'Mindful Focus Block',
        goal: sessionGoal.trim(),
        duration: durationMinutes,
        parkedDistractions: parkedTexts,
      };
      addFocusSession(sessionInfo);
      setCompletedSessionData(sessionInfo);
      setIsCompletedModalOpen(true);
    }
  };

  // Rescue mode actions
  const handleRescueRestart10m = () => {
    setIsRescueModeOpen(false);
    setDurationMinutes(10);
    setTimeLeft(10 * 60);
    setIsRunning(true);
    setSessionStarted(true);
    playSoftTick(soundEnabled);
  };

  const handleRescueTakeBreak = () => {
    setIsRescueModeOpen(false);
    switchToBreak('shortBreak');
  };

  const switchToBreak = (mode = 'shortBreak') => {
    setIsRunning(false);
    setSessionStarted(false);
    setSessionMode(mode);
    const breakMinutes = mode === 'shortBreak' ? 5 : 15;
    setDurationMinutes(breakMinutes);
    setTimeLeft(breakMinutes * 60);
  };

  const switchToFocus = (mins = 25) => {
    setIsRunning(false);
    setSessionStarted(false);
    setSessionMode('focus');
    setDurationMinutes(mins);
    setTimeLeft(mins * 60);
  };

  const handleAddDistractionSubmit = (e) => {
    e.preventDefault();
    if (newDistraction.trim()) {
      addDistraction(newDistraction.trim());
      setNewDistraction('');
      playSoftTick(soundEnabled);
    }
  };

  // Time calculations
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // SVG Circular progress math
  const progressRatio = totalDurationSeconds > 0 ? (totalDurationSeconds - timeLeft) / totalDurationSeconds : 0;
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-10 animate-fade-in">
      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-center mb-8">
        <div className="inline-flex p-1 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xs">
          <button
            onClick={() => switchToFocus(defaultDuration)}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
              sessionMode === 'focus'
                ? 'bg-[var(--accent-lavender)] text-[#171A2E] shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Focus Session
          </button>
          <button
            onClick={() => switchToBreak('shortBreak')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
              sessionMode === 'shortBreak'
                ? 'bg-[var(--accent-mint)] text-[#171A2E] shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Short Break (5m)
          </button>
          <button
            onClick={() => switchToBreak('longBreak')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
              sessionMode === 'longBreak'
                ? 'bg-[var(--accent-mint)] text-[#171A2E] shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Long Break (15m)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left / Center: Circular Timer Interface */}
        <div className="lg:col-span-2 flex flex-col items-center">
          {/* Session Setup Inputs (if idle or not yet started) */}
          {sessionMode === 'focus' && !sessionStarted && (
            <div className="w-full max-w-md mb-6 space-y-3">
              <input
                type="text"
                placeholder="What are you working on? (e.g. Cognitive Psychology paper)"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="w-full px-4 py-3 text-sm rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-hidden focus:border-[var(--accent-lavender)] text-center shadow-xs"
              />

              {/* Preset selection pills */}
              <div className="flex items-center justify-center gap-2">
                {[25, 45, 60].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => {
                      setDurationMinutes(mins);
                      setTimeLeft(mins * 60);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      durationMinutes === mins
                        ? 'bg-[var(--accent-lavender-subtle)] border-[var(--accent-lavender)] text-[var(--accent-lavender-dark)] font-semibold'
                        : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-subtle)]'
                    }`}
                  >
                    {mins} min preset
                  </button>
                ))}

                {/* Custom slider trigger */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
                  <span>Custom:</span>
                  <input
                    type="number"
                    min="1"
                    max="180"
                    value={durationMinutes}
                    onChange={(e) => {
                      const val = Math.max(1, Math.min(180, Number(e.target.value) || 1));
                      setDurationMinutes(val);
                      setTimeLeft(val * 60);
                    }}
                    className="w-10 bg-transparent text-center font-bold text-[var(--text-primary)] focus:outline-hidden"
                  />
                  <span>m</span>
                </div>
              </div>
            </div>
          )}

          {/* Active Task Name if running */}
          {sessionStarted && (
            <div className="mb-4 text-center">
              <span className="text-xs uppercase tracking-widest text-[var(--accent-lavender-dark)] font-bold">
                {sessionMode === 'focus' ? 'Active Focus Task' : 'Restoring Calm'}
              </span>
              <h2 className="text-xl font-bold text-[var(--text-primary)] mt-0.5">
                {taskName.trim() || (sessionMode === 'focus' ? 'Deep Focus Sprint' : 'Mindful Breath')}
              </h2>
            </div>
          )}

          {/* Large Circular Countdown Timer */}
          <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center my-4 select-none">
            {/* Background SVG Circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 280 280">
              <circle
                cx="140"
                cy="140"
                r={radius}
                className="stroke-[var(--border-subtle)]"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="140"
                cy="140"
                r={radius}
                className={`transition-all duration-1000 ease-linear ${
                  sessionMode === 'focus'
                    ? 'stroke-[var(--accent-lavender)]'
                    : 'stroke-[var(--accent-mint)]'
                }`}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Centered Timer Readout */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl md:text-6xl font-extrabold text-[var(--text-primary)] font-mono tracking-tight">
                {formattedTime}
              </span>
              <span className="text-xs md:text-sm text-[var(--text-secondary)] mt-2 font-medium">
                {sessionMode === 'focus' ? (
                  isRunning ? 'Stay present. One task at a time.' : 'Ready when you are.'
                ) : (
                  'Step away. Let your thoughts settle.'
                )}
              </span>
            </div>
          </div>

          {/* Timer Controls */}
          <div className="flex items-center gap-4 mt-6">
            {!isRunning ? (
              <button
                onClick={handleStart}
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[var(--accent-navy)] text-white font-bold text-base hover:opacity-95 transition-all shadow-md active:scale-[0.98]"
              >
                <Play className="w-5 h-5 fill-current ml-0.5" />
                <span>{sessionStarted ? 'Resume Session' : 'Start Focus'}</span>
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[var(--accent-lavender)] text-[#171A2E] font-bold text-base hover:brightness-105 transition-all shadow-md active:scale-[0.98]"
              >
                <Pause className="w-5 h-5 fill-current" />
                <span>Pause</span>
              </button>
            )}

            {sessionStarted && (
              <button
                onClick={handleEarlyStop}
                className="px-4 py-3.5 rounded-2xl border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-rose-500 hover:border-rose-300 dark:hover:border-rose-900 transition-colors text-xs font-semibold"
                title="Stop Session"
              >
                Stop Early
              </button>
            )}

            {!isRunning && sessionStarted && (
              <button
                onClick={handleReset}
                className="p-3.5 rounded-2xl border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-subtle)] transition-colors"
                title="Reset Timer"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            )}
          </div>

          <p className="text-xs text-[var(--text-muted)] mt-6 text-center max-w-sm">
            Focus blocks help college students avoid cognitive fatigue. Rest at natural intervals.
          </p>
        </div>

        {/* Right: DISTRACTION PARKING LOT */}
        <div className="w-full">
          <Card className="border-[var(--border-subtle)] shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-4">
              <div className="flex items-center gap-2">
                <ListPlus className="w-4 h-4 text-[var(--accent-lavender-dark)]" />
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)] leading-tight">
                    Distraction Parking Lot
                  </h3>
                  <span className="text-[11px] text-[var(--text-muted)]">
                    Park intrusive thoughts for later
                  </span>
                </div>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] font-mono">
                {activeDistractions.length}
              </span>
            </div>

            <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
              When an urge strikes (e.g. "Check group chat", "Search flight"), write it here instead of opening a new tab.
            </p>

            {/* Quick Add Form */}
            <form onSubmit={handleAddDistractionSubmit} className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Park a distracting thought..."
                value={newDistraction}
                onChange={(e) => setNewDistraction(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-hidden focus:border-[var(--accent-lavender)]"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-xl bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity shrink-0 flex items-center justify-center"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Distraction List */}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {activeDistractions.length === 0 ? (
                <div className="text-center py-8 text-[var(--text-muted)]">
                  <Compass className="w-8 h-8 mx-auto mb-2 opacity-40 text-[var(--accent-lavender)]" />
                  <p className="text-xs">Your mental space is clear.</p>
                  <p className="text-[10px] mt-0.5">Parked thoughts will appear here.</p>
                </div>
              ) : (
                activeDistractions.map((d) => (
                  <div
                    key={d.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-colors ${
                      d.resolved
                        ? 'bg-[var(--bg-card-subtle)] border-[var(--border-subtle)] text-[var(--text-muted)]'
                        : 'bg-[var(--bg-card)] border-[var(--border-subtle)] text-[var(--text-primary)]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <button
                        onClick={() => toggleDistractionResolved(d.id)}
                        className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                          d.resolved
                            ? 'bg-[var(--accent-mint)] border-[var(--accent-mint)] text-[#171A2E]'
                            : 'border-[var(--border-strong)]'
                        }`}
                        title="Mark as handled"
                      >
                        {d.resolved && <Check className="w-3 h-3 stroke-[3]" />}
                      </button>
                      <span className={`truncate ${d.resolved ? 'line-through' : ''}`}>
                        {d.text}
                      </span>
                    </div>
                    <button
                      onClick={() => removeDistraction(d.id)}
                      className="text-[var(--text-muted)] hover:text-rose-500 p-1 transition-colors shrink-0"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {activeDistractions.length > 0 && (
              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px]">
                <span className="text-[var(--text-muted)]">
                  {activeDistractions.filter((d) => d.resolved).length} resolved
                </span>
                <button
                  onClick={clearDistractions}
                  className="text-rose-500 hover:underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* RESCUE MODE MODAL */}
      <Modal
        isOpen={isRescueModeOpen}
        onClose={() => setIsRescueModeOpen(false)}
        title="Rescue Mode"
      >
        <div className="text-center py-2">
          <div className="w-12 h-12 rounded-2xl bg-[var(--accent-mint-subtle)] flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto mb-3">
            <Coffee className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">
            Lost your flow? That's okay.
          </h3>
          <p className="text-xs text-[var(--text-secondary)] max-w-xs mx-auto mb-6 leading-relaxed">
            Concentration fluctuates naturally. You are never penalized here. Choose a gentle way to continue:
          </p>

          <div className="space-y-3">
            <button
              onClick={handleRescueRestart10m}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <span>Restart with 10 minutes</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleRescueTakeBreak}
              className="w-full flex items-center justify-between p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] text-[var(--text-primary)] text-xs font-medium hover:bg-[var(--border-subtle)] transition-colors"
            >
              <span>Take a short break (5m)</span>
              <Coffee className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Modal>

      {/* SESSION COMPLETE MODAL */}
      <Modal
        isOpen={isCompletedModalOpen}
        onClose={() => setIsCompletedModalOpen(false)}
        title="Session Completed"
      >
        <div className="text-center py-2">
          <div className="w-12 h-12 rounded-2xl bg-[var(--accent-lavender-subtle)] flex items-center justify-center text-[var(--accent-lavender-dark)] mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">
            Flow Block Concluded!
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mb-4">
            You completed <strong>{completedSessionData?.duration} minutes</strong> of focused work on{' '}
            <span className="text-[var(--text-primary)] font-medium">"{completedSessionData?.taskName}"</span>.
          </p>

          {/* Parked Distractions Review */}
          {completedSessionData?.parkedDistractions?.length > 0 && (
            <div className="my-4 text-left p-3.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)]">
              <span className="text-xs font-semibold text-[var(--text-primary)] block mb-2">
                Parked Distractions Review ({completedSessionData.parkedDistractions.length})
              </span>
              <ul className="text-xs text-[var(--text-secondary)] space-y-1">
                {completedSessionData.parkedDistractions.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-lavender)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={() => {
              setIsCompletedModalOpen(false);
              switchToBreak('shortBreak');
            }}
            className="w-full mt-2 py-3 rounded-xl bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Take 5-minute Mindful Break
          </button>
        </div>
      </Modal>
    </div>
  );
}


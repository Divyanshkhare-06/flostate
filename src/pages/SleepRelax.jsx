import React, { useState } from 'react';
import {
  Moon,
  Sunset,
  Clock,
  Sparkles,
  Plus,
  Trash2,
  Check,
  CheckCircle2,
  Heart,
  Wind,
  Bed,
  BellRing,
  Coffee,
  RotateCcw,
} from 'lucide-react';
import { useFlowstate } from '../context/FlowstateContext';
import { Card } from '../components/Common/Card';
import { BreathingGuide } from '../components/Common/BreathingGuide';
import { playCalmWave, playSoftTick } from '../components/Audio/soundEffects';

export function SleepRelax() {
  const {
    bedtimeSettings,
    updateBedtimeSettings,
    windDownRoutine,
    toggleWindDownTask,
    addWindDownTask,
    removeWindDownTask,
    digitalSunsetActive,
    setDigitalSunsetActive,
    soundEnabled,
  } = useFlowstate();

  const [newRoutineText, setNewRoutineText] = useState('');
  const [showBreathing, setShowBreathing] = useState(false);

  // Time calculations
  const [bedHour, bedMin] = bedtimeSettings.bedtime.split(':').map(Number);
  const [wakeHour, wakeMin] = bedtimeSettings.wakeTime.split(':').map(Number);

  // Calculate sleep duration in hours
  let bedTotalMins = bedHour * 60 + bedMin;
  let wakeTotalMins = wakeHour * 60 + wakeMin;
  if (wakeTotalMins <= bedTotalMins) {
    wakeTotalMins += 24 * 60; // next day
  }
  const sleepDiffMins = wakeTotalMins - bedTotalMins;
  const sleepHours = (sleepDiffMins / 60).toFixed(1);

  // Wind down start time (45 mins before bedtime)
  let windDownMins = bedTotalMins - (bedtimeSettings.windDownBufferMinutes || 45);
  if (windDownMins < 0) windDownMins += 24 * 60;
  const windDownHourFormatted = String(Math.floor(windDownMins / 60)).padStart(2, '0');
  const windDownMinFormatted = String(windDownMins % 60).padStart(2, '0');

  const handleToggleDigitalSunset = () => {
    const nextState = !digitalSunsetActive;
    setDigitalSunsetActive(nextState);
    if (nextState) {
      playCalmWave(soundEnabled);
    } else {
      playSoftTick(soundEnabled);
    }
  };

  const handleAddRoutine = (e) => {
    e.preventDefault();
    if (newRoutineText.trim()) {
      addWindDownTask(newRoutineText.trim());
      setNewRoutineText('');
      playSoftTick(soundEnabled);
    }
  };

  const completedCount = windDownRoutine.filter((r) => r.completed).length;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12 animate-fade-in space-y-10">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-xs font-semibold mb-3">
          <Moon className="w-3.5 h-3.5" />
          <span>Restorative Circadian Rhythms</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight font-['Plus_Jakarta_Sans']">
          Slow down. Tomorrow can wait.
        </h1>
        <p className="text-sm md:text-base text-[var(--text-secondary)] mt-1 max-w-lg">
          Protect your evening cognitive recovery. When studying stops, real memory consolidation begins.
        </p>
      </div>

      {/* C. UNIQUE FEATURE: DIGITAL SUNSET HERO CARD */}
      <div
        className={`p-6 md:p-8 rounded-3xl border transition-all duration-500 relative overflow-hidden ${
          digitalSunsetActive
            ? 'bg-gradient-to-br from-[#2D221D] to-[#1C1615] border-[#E09F67]/50 text-[#FDE8D7] shadow-xl'
            : 'bg-[var(--bg-card)] border-[var(--border-subtle)] text-[var(--text-primary)] shadow-xs'
        }`}
      >
        {/* Soft background aura */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
              <Sunset className="w-3.5 h-3.5" />
              <span>Digital Sunset Mode</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {digitalSunsetActive
                ? 'Disconnect from the noise. Reconnect with yourself.'
                : 'Activate Evening Digital Sunset'}
            </h2>
            <p className="text-xs md:text-sm mt-1.5 opacity-80 max-w-md leading-relaxed">
              {digitalSunsetActive
                ? 'Warm amber tones are active to reduce blue light excitation. Step away from blue screens and ease into your wind-down.'
                : 'Transforms FLOWSTATE into a muted, serene night sanctuary. Minimizes cognitive stimulation so you fall asleep naturally.'}
            </p>
          </div>

          <button
            onClick={handleToggleDigitalSunset}
            className={`px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 shrink-0 shadow-md ${
              digitalSunsetActive
                ? 'bg-[#E09F67] text-[#191516] hover:brightness-110'
                : 'bg-[var(--accent-navy)] text-white hover:opacity-90'
            }`}
          >
            <Sunset className="w-4 h-4" />
            <span>{digitalSunsetActive ? 'Digital Sunset Active' : 'Turn On Digital Sunset'}</span>
          </button>
        </div>

        {/* If Sunset is active, show the focused, distraction-free evening checklist directly */}
        {digitalSunsetActive && (
          <div className="mt-8 pt-6 border-t border-amber-900/40 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold tracking-wide uppercase text-amber-200">
                Nightly Wind-down Checklist ({completedCount}/{windDownRoutine.length})
              </h3>
              <span className="text-xs text-amber-400">
                Bedtime target: {bedtimeSettings.bedtime}
              </span>
            </div>
            <div className="space-y-2">
              {windDownRoutine.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleWindDownTask(item.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    item.completed
                      ? 'bg-amber-950/30 border-amber-800/40 text-amber-300/60'
                      : 'bg-[#251E1E] border-amber-900/40 text-amber-100 hover:border-amber-700/60'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                      item.completed
                        ? 'bg-[#E09F67] border-[#E09F67] text-[#191516]'
                        : 'border-amber-700/60'
                    }`}
                  >
                    {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className={`text-xs md:text-sm ${item.completed ? 'line-through' : ''}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* A. Bedtime Planner */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Bed className="w-4 h-4 text-[var(--accent-lavender-dark)]" />
            <h2 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
              Bedtime Planner
            </h2>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mb-6">
            Set your target sleep window to align your natural melatonin cycle.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                Target Bedtime
              </label>
              <input
                type="time"
                value={bedtimeSettings.bedtime}
                onChange={(e) => updateBedtimeSettings({ bedtime: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-mono font-semibold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                Target Wake-up
              </label>
              <input
                type="time"
                value={bedtimeSettings.wakeTime}
                onChange={(e) => updateBedtimeSettings({ wakeTime: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-mono font-semibold"
              />
            </div>
          </div>

          {/* Sleep Calculation Metric */}
          <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--text-secondary)]">Planned Sleep Duration:</span>
              <span className="text-sm font-bold text-[var(--text-primary)] font-mono">
                {sleepHours} Hours
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--text-secondary)]">Begin Wind-down at:</span>
              <span className="text-xs font-semibold text-[var(--accent-lavender-dark)] font-mono">
                {windDownHourFormatted}:{windDownMinFormatted} (45m prior)
              </span>
            </div>
          </div>

          <p className="text-[11px] text-[var(--text-muted)] mt-4 leading-normal">
            College students who sleep 7.5+ hours retain up to 35% more conceptual material than those with fragmented sleep.
          </p>
        </Card>

        {/* B. Wind-down Routine (Management) */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--accent-lavender-dark)]" />
              <h2 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
                Wind-down Routine
              </h2>
            </div>
            <span className="text-xs text-[var(--text-muted)]">
              {completedCount} / {windDownRoutine.length}
            </span>
          </div>

          <p className="text-xs text-[var(--text-secondary)] mb-4">
            Customizable steps to decompress before sleep.
          </p>

          {/* Add custom routine item */}
          <form onSubmit={handleAddRoutine} className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Add step (e.g. herbal chamomile tea)"
              value={newRoutineText}
              onChange={(e) => setNewRoutineText(e.target.value)}
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-hidden focus:border-[var(--accent-lavender)]"
            />
            <button
              type="submit"
              className="px-3 py-2 rounded-xl bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Routine Checklist */}
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {windDownRoutine.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs"
              >
                <div
                  onClick={() => toggleWindDownTask(item.id)}
                  className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0"
                >
                  <div
                    className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                      item.completed
                        ? 'bg-[var(--accent-lavender)] border-[var(--accent-lavender)] text-[#171A2E]'
                        : 'border-[var(--border-strong)]'
                    }`}
                  >
                    {item.completed && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span
                    className={`truncate ${
                      item.completed ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text-primary)]'
                    }`}
                  >
                    {item.text}
                  </span>
                </div>

                <button
                  onClick={() => removeWindDownTask(item.id)}
                  className="p-1 text-[var(--text-muted)] hover:text-rose-500 transition-colors ml-2"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Quick Trigger for Relaxation Breathing */}
          <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]">
            <button
              onClick={() => setShowBreathing(!showBreathing)}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-primary)] hover:border-[var(--accent-lavender)] transition-all"
            >
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-indigo-500" />
                <span>{showBreathing ? 'Hide Breathing Guide' : 'Practice 4-7-8 Relaxation Breathing'}</span>
              </div>
              <span className="text-[11px] text-[var(--accent-lavender-dark)]">
                {showBreathing ? 'Close' : 'Open'}
              </span>
            </button>

            {showBreathing && (
              <div className="mt-4 animate-fade-in">
                <BreathingGuide />
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}


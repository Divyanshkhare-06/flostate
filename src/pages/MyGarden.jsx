import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sprout,
  Plus,
  Trash2,
  Check,
  Sparkles,
  Lock,
  Unlock,
  Calendar,
  Award,
  ChevronRight,
  TrendingUp,
  HeartHandshake,
} from 'lucide-react';
import { useFlowstate } from '../context/FlowstateContext';
import { Card } from '../components/Common/Card';
import { Modal } from '../components/Common/Modal';
import { PlantIllustration } from '../components/Garden/PlantIllustrations';
import { PLANTS_CATALOG, getTodayKey } from '../data/initialData';

export function MyGarden() {
  const {
    habits,
    habitHistory,
    toggleHabitToday,
    addCustomHabit,
    deleteHabit,
    growthPoints,
    unlockedPlantIds,
    soundEnabled,
  } = useFlowstate();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [selectedPlantForHabit, setSelectedPlantForHabit] = useState('lavender');
  const [activeTab, setActiveTab] = useState('garden'); // 'garden' | 'habits' | 'history'

  const todayKey = getTodayKey();

  // Past 7 days keys for weekly consistency matrix
  const past7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      dateKey: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      isToday: i === 6,
    };
  });

  const handleHabitToggle = (habitId) => {
    toggleHabitToday(habitId);
    // Subtle confetti burst if completing
    const isCompleted = habitHistory[habitId]?.[todayKey];
    if (!isCompleted) {
      try {
        confetti({
          particleCount: 28,
          spread: 45,
          origin: { y: 0.8 },
          colors: ['#A99BFF', '#B8E6D0', '#EAE6FF'],
        });
      } catch (e) {
        // non-blocking
      }
    }
  };

  const handleCreateHabit = (e) => {
    e.preventDefault();
    if (newHabitName.trim()) {
      addCustomHabit(newHabitName.trim(), 'mindfulness', selectedPlantForHabit);
      setNewHabitName('');
      setIsAddModalOpen(false);
    }
  };

  // Calculate plant stage based on growthPoints and habits associated with it
  const getPlantStage = (plantId, unlockPoints) => {
    if (!unlockedPlantIds.includes(plantId)) return 0; // locked
    const pointsAboveUnlock = Math.max(0, growthPoints - unlockPoints);
    if (pointsAboveUnlock < 20) return 1; // sprout
    if (pointsAboveUnlock < 50) return 2; // growing
    if (pointsAboveUnlock < 90) return 3; // budding
    if (pointsAboveUnlock < 140) return 4; // blooming
    return 5; // flourishing
  };

  const getStageTitle = (stage) => {
    switch (stage) {
      case 1:
        return 'Sprouting';
      case 2:
        return 'Young Foliage';
      case 3:
        return 'Budding';
      case 4:
        return 'Blooming';
      case 5:
        return 'Flourishing';
      default:
        return 'Awaiting Seeds';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12 animate-fade-in space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-mint-subtle)] text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-3">
            <Sprout className="w-3.5 h-3.5" />
            <span>Living Habit Sanctuary</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight font-['Plus_Jakarta_Sans']">
            Small habits. Meaningful growth.
          </h1>
          <p className="text-sm md:text-base text-[var(--text-secondary)] mt-1 max-w-lg">
            Every conscious pause, focus block, and bedtime routine nourishes your garden. Missed days never destroy plants.
          </p>
        </div>

        {/* Growth Points Banner */}
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-lavender-subtle)] flex items-center justify-center text-[var(--accent-lavender-dark)]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
              Soil Vitality
            </span>
            <span className="text-lg font-bold text-[var(--text-primary)] font-mono">
              {growthPoints} <span className="text-xs font-normal text-[var(--text-secondary)]">Growth Points</span>
            </span>
          </div>
        </div>
      </div>

      {/* Navigation View Tabs */}
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('garden')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
              activeTab === 'garden'
                ? 'bg-[var(--accent-navy)] text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Virtual Garden
          </button>
          <button
            onClick={() => setActiveTab('habits')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
              activeTab === 'habits'
                ? 'bg-[var(--accent-navy)] text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Daily Habits Checklist
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
              activeTab === 'history'
                ? 'bg-[var(--accent-navy)] text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Weekly Grid
          </button>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--accent-lavender)] text-[#171A2E] text-xs font-semibold hover:brightness-105 transition-all shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Habit</span>
        </button>
      </div>

      {/* TAB 1: VIRTUAL GARDEN SHOWCASE */}
      {activeTab === 'garden' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLANTS_CATALOG.map((plant) => {
              const isUnlocked = unlockedPlantIds.includes(plant.id);
              const stage = getPlantStage(plant.id, plant.unlockPoints);
              const stageTitle = getStageTitle(stage);

              return (
                <Card
                  key={plant.id}
                  className={`flex flex-col items-center text-center p-6 transition-all duration-300 relative overflow-hidden ${
                    !isUnlocked ? 'opacity-65 bg-[var(--bg-card-subtle)]' : 'hover:border-[var(--accent-lavender)]/60'
                  }`}
                >
                  {/* Lock badge if locked */}
                  {!isUnlocked ? (
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-[11px] font-semibold text-[var(--text-muted)]">
                      <Lock className="w-3 h-3" />
                      <span>{plant.unlockPoints} pts</span>
                    </div>
                  ) : (
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--accent-mint-subtle)] text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                      <Unlock className="w-3 h-3" />
                      <span>Unlocked</span>
                    </div>
                  )}

                  {/* Botanical Illustration */}
                  <div className="my-2 py-2">
                    <PlantIllustration
                      type={plant.type}
                      stage={stage}
                      className="w-36 h-36 mx-auto drop-shadow-xs"
                    />
                  </div>

                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    {plant.name}
                  </h3>
                  <p className="text-xs text-[var(--accent-lavender-dark)] font-medium mt-0.5">
                    {plant.focusArea}
                  </p>
                  <p className="text-[11px] text-[var(--text-muted)] italic mt-2">
                    "{plant.quote}"
                  </p>

                  <div className="w-full mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                    <span className="text-[var(--text-secondary)]">Growth Status</span>
                    <span className="font-semibold text-[var(--text-primary)]">
                      {isUnlocked ? stageTitle : `Unlocks at ${plant.unlockPoints} pts`}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center gap-3">
            <HeartHandshake className="w-5 h-5 text-emerald-500 shrink-0" />
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              <strong>Gentle Growth Philosophy:</strong> Plants represent consistency, not perfection. If college exam season disrupts your streak, your plants remain patient and healthy. Each new habit check resumes where you left off.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: DAILY HABITS CHECKLIST */}
      {activeTab === 'habits' && (
        <div className="space-y-4 animate-fade-in max-w-3xl mx-auto">
          <p className="text-xs text-[var(--text-secondary)]">
            Tap a habit to check it off for today. Completed wellness habits add +15 soil growth points.
          </p>

          <div className="space-y-2.5">
            {habits.map((h) => {
              const isDone = !!(habitHistory[h.id] && habitHistory[h.id][todayKey]);

              return (
                <div
                  key={h.id}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    isDone
                      ? 'bg-[var(--accent-lavender-subtle)]/40 border-[var(--accent-lavender)]/50'
                      : 'bg-[var(--bg-card)] border-[var(--border-subtle)] hover:bg-[var(--bg-card-subtle)]'
                  }`}
                >
                  <div
                    onClick={() => handleHabitToggle(h.id)}
                    className="flex items-center gap-3.5 flex-1 cursor-pointer min-w-0"
                  >
                    <div
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                        isDone
                          ? 'bg-[var(--accent-lavender)] border-[var(--accent-lavender)] text-[#171A2E]'
                          : 'border-[var(--border-strong)]'
                      }`}
                    >
                      {isDone && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                    <div className="min-w-0">
                      <span
                        className={`text-sm font-semibold block leading-tight ${
                          isDone ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text-primary)]'
                        }`}
                      >
                        {h.name}
                      </span>
                      <span className="text-xs text-[var(--text-muted)] truncate block mt-0.5">
                        {h.description}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pl-3">
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] font-medium capitalize">
                      {h.category}
                    </span>
                    <button
                      onClick={() => deleteHabit(h.id)}
                      className="p-1.5 text-[var(--text-muted)] hover:text-rose-500 transition-colors"
                      title="Remove habit"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: WEEKLY MATRIX */}
      {activeTab === 'history' && (
        <Card className="p-6 animate-fade-in overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
              7-Day Habit Matrix
            </h3>
            <span className="text-xs text-[var(--text-muted)]">
              Consistent presence over time
            </span>
          </div>

          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-[var(--border-subtle)]">
                <th className="py-2.5 px-3 text-xs font-semibold text-[var(--text-secondary)]">Habit</th>
                {past7Days.map((d) => (
                  <th
                    key={d.dateKey}
                    className={`py-2.5 px-3 text-center text-xs font-semibold ${
                      d.isToday ? 'text-[var(--accent-lavender-dark)] font-bold' : 'text-[var(--text-muted)]'
                    }`}
                  >
                    <div>{d.dayName}</div>
                    <div className="text-[10px] opacity-75">{d.dayNumber}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {habits.map((h) => (
                <tr key={h.id} className="border-b border-[var(--border-subtle)]/50 hover:bg-[var(--bg-card-subtle)]">
                  <td className="py-3 px-3 text-xs font-medium text-[var(--text-primary)]">
                    {h.name}
                  </td>
                  {past7Days.map((d) => {
                    const isDone = !!(habitHistory[h.id] && habitHistory[h.id][d.dateKey]);
                    return (
                      <td key={d.dateKey} className="py-3 px-3 text-center">
                        <button
                          onClick={() => toggleHabitToday(h.id, d.dateKey)}
                          className={`w-6 h-6 rounded-md inline-flex items-center justify-center transition-colors ${
                            isDone
                              ? 'bg-emerald-500 text-white'
                              : 'bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-transparent hover:border-[var(--accent-lavender)]'
                          }`}
                          title={`Toggle for ${d.dateKey}`}
                        >
                          {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : null}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {/* CREATE HABIT MODAL */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Plant a New Habit"
      >
        <form onSubmit={handleCreateHabit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
              Habit Name
            </label>
            <input
              type="text"
              placeholder="e.g. 10-minute walk without headphones"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              className="w-full px-3 py-2.5 text-sm rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-hidden focus:border-[var(--accent-lavender)]"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
              Associated Garden Plant
            </label>
            <select
              value={selectedPlantForHabit}
              onChange={(e) => setSelectedPlantForHabit(e.target.value)}
              className="w-full px-3 py-2.5 text-sm rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)]"
            >
              {PLANTS_CATALOG.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.focusArea})
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90"
            >
              Plant Habit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}


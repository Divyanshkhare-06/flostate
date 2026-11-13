import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  BarChart3,
  Clock,
  Target,
  Sparkles,
  TrendingUp,
  Award,
  Calendar,
  Smile,
  Zap,
  Meh,
  AlertCircle,
  BatteryLow,
  Database,
  RefreshCw,
} from 'lucide-react';
import { useFlowstate } from '../context/FlowstateContext';
import { Card, CardHeader } from '../components/Common/Card';

export function InsightsAnalytics() {
  const {
    focusSessions,
    habits,
    habitHistory,
    moodHistory,
    growthPoints,
    isDemoData,
    loadDemoData,
    resetAllData,
  } = useFlowstate();

  // Past 7 Days Range
  const past7Days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const key = d.toISOString().split('T')[0];
      const label = d.toLocaleDateString('en-US', { weekday: 'short' });
      return { key, label, date: d };
    });
  }, []);

  // 1. Focus Analytics Calculations
  const totalCompletedSessions = focusSessions.filter((s) => s.completed).length;
  const totalFocusMinutes = focusSessions
    .filter((s) => s.completed)
    .reduce((sum, s) => sum + (s.duration || 0), 0);

  const totalFocusHours = (totalFocusMinutes / 60).toFixed(1);
  const avgSessionDuration =
    totalCompletedSessions > 0
      ? Math.round(totalFocusMinutes / totalCompletedSessions)
      : 0;

  // Daily focus chart data (minutes per day over last 7 days)
  const focusTrendData = useMemo(() => {
    return past7Days.map((day) => {
      const dayMinutes = focusSessions
        .filter((s) => s.completed && s.dateKey === day.key)
        .reduce((sum, s) => sum + (s.duration || 0), 0);
      return {
        day: day.label,
        minutes: dayMinutes,
      };
    });
  }, [past7Days, focusSessions]);

  // 2. Habit Analytics Calculations
  const habitCompletionStats = useMemo(() => {
    if (!habits || habits.length === 0) return { overallRate: 0, bestHabit: null, dailyData: [] };

    let totalPossible = habits.length * 7;
    let totalCompleted = 0;

    const habitCounts = {};
    habits.forEach((h) => {
      habitCounts[h.id] = { name: h.name, count: 0 };
    });

    const dailyData = past7Days.map((day) => {
      let dayCompleted = 0;
      habits.forEach((h) => {
        if (habitHistory[h.id] && habitHistory[h.id][day.key]) {
          dayCompleted++;
          habitCounts[h.id].count++;
          totalCompleted++;
        }
      });
      return {
        day: day.label,
        completed: dayCompleted,
        total: habits.length,
      };
    });

    let bestHabit = null;
    let maxCount = -1;
    Object.values(habitCounts).forEach((hc) => {
      if (hc.count > maxCount && hc.count > 0) {
        maxCount = hc.count;
        bestHabit = hc.name;
      }
    });

    const overallRate = totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;

    return { overallRate, bestHabit, dailyData };
  }, [past7Days, habits, habitHistory]);

  // 3. Mood Analytics Calculations
  const moodDistributionData = useMemo(() => {
    const counts = {
      Energetic: 0,
      Focused: 0,
      Okay: 0,
      Overwhelmed: 0,
      Tired: 0,
    };

    moodHistory.forEach((m) => {
      if (counts[m.mood] !== undefined) {
        counts[m.mood]++;
      }
    });

    const colors = {
      Energetic: '#F59E0B',
      Focused: '#6366F1',
      Okay: '#10B981',
      Overwhelmed: '#F43F5E',
      Tired: '#94A3B8',
    };

    return Object.keys(counts)
      .map((k) => ({
        name: k,
        value: counts[k],
        color: colors[k],
      }))
      .filter((item) => item.value > 0);
  }, [moodHistory]);

  // 4. Synthesize Gentle Weekly Wellness Report
  const weeklyReport = useMemo(() => {
    const sessionsThisWeek = focusTrendData.reduce((acc, d) => acc + (d.minutes > 0 ? 1 : 0), 0);
    const hoursThisWeek = (
      focusTrendData.reduce((acc, d) => acc + d.minutes, 0) / 60
    ).toFixed(1);

    const bestHabitStr = habitCompletionStats.bestHabit
      ? `You were most consistent with your "${habitCompletionStats.bestHabit}" habit.`
      : 'Begin tracking daily habits in My Garden to discover your strongest routines.';

    return {
      focusSummary: `This week, you completed ${totalCompletedSessions} focus sessions and spent ${totalFocusHours} hours in focused work.`,
      habitSummary: bestHabitStr,
      recommendation:
        'Your next small goal: maintain a regular wind-down routine to protect mental endurance.',
    };
  }, [totalCompletedSessions, totalFocusHours, focusTrendData, habitCompletionStats]);

  const hasData = totalCompletedSessions > 0 || moodHistory.length > 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12 animate-fade-in space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-lavender-subtle)] text-[var(--accent-lavender-dark)] text-xs font-semibold mb-3">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Reflective Insights</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight font-['Plus_Jakarta_Sans']">
            Insights & Analytics
          </h1>
          <p className="text-sm md:text-base text-[var(--text-secondary)] mt-1 max-w-lg">
            Gentle reflections on your concentration patterns and habit rhythms. Data stays strictly in your browser.
          </p>
        </div>

        {/* Optional Demo Mode Toggle */}
        <div className="flex items-center gap-2">
          {!isDemoData ? (
            <button
              onClick={loadDemoData}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-lavender)] transition-all shadow-xs"
              title="Loads realistic student sample data for instant chart evaluation"
            >
              <Database className="w-3.5 h-3.5 text-[var(--accent-lavender-dark)]" />
              <span>Load Sample Student Data</span>
            </button>
          ) : (
            <button
              onClick={resetAllData}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs font-semibold text-amber-700 dark:text-amber-300 transition-all shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset to Clean State</span>
            </button>
          )}
        </div>
      </div>

      {/* A. WEEKLY WELLNESS REPORT CARD */}
      <Card className="p-6 md:p-8 bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-card-subtle)] border-[var(--border-subtle)] relative overflow-hidden">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent-lavender-dark)] mb-3">
          <Sparkles className="w-4 h-4" />
          <span>Weekly Wellness Report</span>
        </div>

        <div className="space-y-2.5 max-w-2xl">
          <p className="text-base md:text-lg font-medium text-[var(--text-primary)] leading-snug">
            {weeklyReport.focusSummary}
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            {weeklyReport.habitSummary}
          </p>
          <p className="text-xs text-[var(--text-muted)] italic pt-1 border-t border-[var(--border-subtle)]">
            {weeklyReport.recommendation}
          </p>
        </div>
      </Card>

      {/* B. FOCUS ANALYTICS SECTION */}
      <section className="space-y-4">
        <h2 className="text-base font-bold text-[var(--text-primary)]">
          Focus Analytics
        </h2>

        {/* 3 Metric Mini-cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-5">
            <span className="text-xs text-[var(--text-secondary)] font-medium">Total Focus Time</span>
            <p className="text-2xl font-bold text-[var(--text-primary)] font-mono mt-1">
              {totalFocusHours} <span className="text-xs font-normal text-[var(--text-secondary)]">hours</span>
            </p>
            <span className="text-[11px] text-[var(--text-muted)] mt-0.5 block">
              {totalFocusMinutes} minutes across all blocks
            </span>
          </Card>

          <Card className="p-5">
            <span className="text-xs text-[var(--text-secondary)] font-medium">Completed Sessions</span>
            <p className="text-2xl font-bold text-[var(--text-primary)] font-mono mt-1">
              {totalCompletedSessions}
            </p>
            <span className="text-[11px] text-[var(--text-muted)] mt-0.5 block">
              Finished deep work blocks
            </span>
          </Card>

          <Card className="p-5">
            <span className="text-xs text-[var(--text-secondary)] font-medium">Average Session</span>
            <p className="text-2xl font-bold text-[var(--text-primary)] font-mono mt-1">
              {avgSessionDuration} <span className="text-xs font-normal text-[var(--text-secondary)]">min</span>
            </p>
            <span className="text-[11px] text-[var(--text-muted)] mt-0.5 block">
              Optimal cognitive duration
            </span>
          </Card>
        </div>

        {/* Recharts Daily Focus Trends Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                Daily Focus Trends (Past 7 Days)
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Minutes of focused attention per day
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={focusTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="focusGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A99BFF" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#A99BFF" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  stroke="var(--text-muted)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: 'var(--border-subtle)' }}
                />
                <YAxis
                  stroke="var(--text-muted)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  unit="m"
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-md text-xs">
                          <p className="font-semibold text-[var(--text-primary)]">{payload[0].payload.day}</p>
                          <p className="text-[var(--accent-lavender-dark)] font-bold">{payload[0].value} minutes</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="minutes"
                  stroke="#A99BFF"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#focusGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      {/* C. HABIT & MOOD ANALYTICS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Habit Completion Breakdown */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                Weekly Habit Consistency
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Completed routines over 7 days
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--accent-mint-subtle)] text-emerald-700 dark:text-emerald-300 font-semibold font-mono">
              {habitCompletionStats.overallRate}% Rate
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={habitCompletionStats.dailyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="day"
                  stroke="var(--text-muted)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: 'var(--border-subtle)' }}
                />
                <YAxis
                  stroke="var(--text-muted)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-md text-xs">
                          <p className="font-semibold text-[var(--text-primary)]">{payload[0].payload.day}</p>
                          <p className="text-emerald-600 font-bold">
                            {payload[0].value} / {payload[0].payload.total} habits
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="completed" fill="#B8E6D0" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {habitCompletionStats.bestHabit && (
            <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center gap-2 text-xs">
              <Award className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-[var(--text-secondary)]">
                Most consistent:{' '}
                <strong className="text-[var(--text-primary)]">{habitCompletionStats.bestHabit}</strong>
              </span>
            </div>
          )}
        </Card>

        {/* Mood Reflection Patterns */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                Mood Check-in Patterns
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Emotional energy balance across logs
              </p>
            </div>
            <span className="text-xs text-[var(--text-muted)]">
              {moodHistory.length} check-ins
            </span>
          </div>

          {moodDistributionData.length === 0 ? (
            <div className="h-56 flex flex-col items-center justify-center text-center text-[var(--text-muted)]">
              <Smile className="w-8 h-8 opacity-40 mb-2 text-[var(--accent-lavender)]" />
              <p className="text-xs">No mood entries logged yet.</p>
              <p className="text-[11px] mt-0.5">Check in from your Overview dashboard.</p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-around h-56">
              <div className="w-36 h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={moodDistributionData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={38}
                      outerRadius={56}
                      paddingAngle={4}
                    >
                      {moodDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="space-y-1.5 text-xs">
                {moodDistributionData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[var(--text-secondary)]">{item.name}</span>
                    <span className="font-mono font-bold text-[var(--text-primary)]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="text-[11px] text-[var(--text-muted)] mt-4 pt-3 border-t border-[var(--border-subtle)]">
            Observing mental state without self-judgment is key to healthy academic stamina.
          </p>
        </Card>
      </div>
    </div>
  );
}


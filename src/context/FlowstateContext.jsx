import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DEFAULT_HABITS,
  NOTIFICATION_CATEGORIES,
  DEFAULT_WIND_DOWN_ROUTINE,
  PLANTS_CATALOG,
  getTodayKey,
  generateSampleDemoData,
} from '../data/initialData';
import { playChime } from '../components/Audio/soundEffects';

const FlowstateContext = createContext(null);

const STORAGE_KEY = 'flowstate_app_state_v1';

export function FlowstateProvider({ children }) {
  // Safe loader from LocalStorage
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read from LocalStorage:', e);
    }

    // Default clean state
    return {
      onboarding: {
        completed: false,
        primaryGoal: 'Improve focus',
        preferredDuration: 25,
        preferredTheme: 'light',
        studentName: '',
      },
      theme: 'light', // 'light' | 'dark' | 'sunset'
      soundEnabled: true,
      dailyIntention: '',
      dailyIntentionCompleted: false,
      moodHistory: [],
      focusSessions: [],
      activeDistractions: [],
      notificationAudit: {
        emergency: 'essential',
        academic: 'important',
        work_email: 'important',
        social: 'distracting',
        promotions: 'distracting',
        entertainment: 'distracting',
      },
      mindfulScrollStats: {
        sessionsCompleted: 0,
        totalMinutesMindful: 0,
      },
      digitalHabitsReflection: {
        interruptions: '',
        lossOfFocus: '',
        targetHabit: '',
      },
      bedtimeSettings: {
        bedtime: '23:00',
        wakeTime: '07:30',
        windDownBufferMinutes: 45,
      },
      windDownRoutine: DEFAULT_WIND_DOWN_ROUTINE,
      digitalSunsetActive: false,
      habits: DEFAULT_HABITS,
      habitHistory: {},
      growthPoints: 30, // Start with small initial soil nourishment
      unlockedPlantIds: ['lavender'],
      isDemoData: false,
    };
  });

  // Save state on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [state]);

  // Handle Theme Classes on document.documentElement
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'sunset');

    if (state.digitalSunsetActive) {
      root.classList.add('sunset');
    } else if (state.theme === 'dark') {
      root.classList.add('dark');
    } else if (state.theme === 'sunset') {
      root.classList.add('sunset');
    }
  }, [state.theme, state.digitalSunsetActive]);

  // Check plant unlocking threshold whenever growth points update
  useEffect(() => {
    PLANTS_CATALOG.forEach(plant => {
      if (
        state.growthPoints >= plant.unlockPoints &&
        !state.unlockedPlantIds.includes(plant.id)
      ) {
        setState(prev => ({
          ...prev,
          unlockedPlantIds: [...prev.unlockedPlantIds, plant.id],
        }));
      }
    });
  }, [state.growthPoints, state.unlockedPlantIds]);

  // Actions
  const completeOnboarding = (data) => {
    setState(prev => ({
      ...prev,
      onboarding: {
        ...prev.onboarding,
        ...data,
        completed: true,
      },
      theme: data.preferredTheme || prev.theme,
    }));
  };

  const setTheme = (theme) => {
    setState(prev => ({ ...prev, theme }));
  };

  const toggleSound = () => {
    setState(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const setDailyIntention = (intention) => {
    setState(prev => ({ ...prev, dailyIntention: intention }));
  };

  const toggleDailyIntentionCompleted = () => {
    setState(prev => {
      const nextCompleted = !prev.dailyIntentionCompleted;
      let addedPoints = 0;
      if (nextCompleted) {
        addedPoints = 15;
        playChime(prev.soundEnabled);
      }
      return {
        ...prev,
        dailyIntentionCompleted: nextCompleted,
        growthPoints: prev.growthPoints + addedPoints,
      };
    });
  };

  const logMood = (mood, note = '') => {
    const today = getTodayKey();
    const newEntry = {
      date: today,
      mood,
      note,
      timestamp: new Date().toISOString(),
    };

    setState(prev => {
      // replace today's mood or append
      const filtered = prev.moodHistory.filter(m => m.date !== today);
      return {
        ...prev,
        moodHistory: [...filtered, newEntry],
        growthPoints: prev.growthPoints + 5,
      };
    });
  };

  const getTodayMood = () => {
    const today = getTodayKey();
    const entry = state.moodHistory.find(m => m.date === today);
    return entry ? entry.mood : null;
  };

  const addFocusSession = (sessionData) => {
    const newSession = {
      id: `session-${Date.now()}`,
      taskName: sessionData.taskName || 'Mindful Focus Block',
      goal: sessionData.goal || '',
      duration: sessionData.duration || 25,
      completed: true,
      dateKey: getTodayKey(),
      completedAt: new Date().toISOString(),
      parkedDistractions: sessionData.parkedDistractions || [],
    };

    setState(prev => {
      // check if "Complete a focus session" habit can be auto-checked
      const today = getTodayKey();
      const updatedHistory = { ...prev.habitHistory };
      const focusHabit = prev.habits.find(h => h.category === 'focus');
      if (focusHabit) {
        if (!updatedHistory[focusHabit.id]) updatedHistory[focusHabit.id] = {};
        updatedHistory[focusHabit.id][today] = true;
      }

      return {
        ...prev,
        focusSessions: [newSession, ...prev.focusSessions],
        growthPoints: prev.growthPoints + Math.round(newSession.duration * 0.8),
        habitHistory: updatedHistory,
      };
    });

    playChime(state.soundEnabled);
  };

  // Distraction Parking Lot
  const addDistraction = (text) => {
    if (!text.trim()) return;
    const item = {
      id: `distract-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      text: text.trim(),
      timestamp: new Date().toISOString(),
      resolved: false,
    };
    setState(prev => ({
      ...prev,
      activeDistractions: [item, ...prev.activeDistractions],
    }));
  };

  const removeDistraction = (id) => {
    setState(prev => ({
      ...prev,
      activeDistractions: prev.activeDistractions.filter(d => d.id !== id),
    }));
  };

  const toggleDistractionResolved = (id) => {
    setState(prev => ({
      ...prev,
      activeDistractions: prev.activeDistractions.map(d =>
        d.id === id ? { ...d, resolved: !d.resolved } : d
      ),
    }));
  };

  const clearDistractions = () => {
    setState(prev => ({ ...prev, activeDistractions: [] }));
  };

  // Notification Audit
  const setNotificationTier = (catId, tier) => {
    setState(prev => ({
      ...prev,
      notificationAudit: {
        ...prev.notificationAudit,
        [catId]: tier,
      },
    }));
  };

  const resetNotificationAudit = () => {
    const defaults = {};
    NOTIFICATION_CATEGORIES.forEach(c => {
      defaults[c.id] = c.defaultTier;
    });
    setState(prev => ({ ...prev, notificationAudit: defaults }));
  };

  // Mindful Scrolling
  const recordMindfulScroll = (minutes) => {
    setState(prev => ({
      ...prev,
      mindfulScrollStats: {
        sessionsCompleted: prev.mindfulScrollStats.sessionsCompleted + 1,
        totalMinutesMindful: prev.mindfulScrollStats.totalMinutesMindful + minutes,
      },
      growthPoints: prev.growthPoints + 10,
    }));
    playChime(state.soundEnabled);
  };

  // Digital Habits Reflection
  const saveDigitalReflection = (field, value) => {
    setState(prev => ({
      ...prev,
      digitalHabitsReflection: {
        ...prev.digitalHabitsReflection,
        [field]: value,
      },
      growthPoints: prev.growthPoints + 5,
    }));
  };

  // Sleep & Relax
  const updateBedtimeSettings = (settings) => {
    setState(prev => ({
      ...prev,
      bedtimeSettings: {
        ...prev.bedtimeSettings,
        ...settings,
      },
    }));
  };

  const toggleWindDownTask = (id) => {
    setState(prev => {
      const updated = prev.windDownRoutine.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      return { ...prev, windDownRoutine: updated, growthPoints: prev.growthPoints + 4 };
    });
  };

  const addWindDownTask = (text) => {
    if (!text.trim()) return;
    const newTask = {
      id: `wd-${Date.now()}`,
      text: text.trim(),
      completed: false,
    };
    setState(prev => ({
      ...prev,
      windDownRoutine: [...prev.windDownRoutine, newTask],
    }));
  };

  const removeWindDownTask = (id) => {
    setState(prev => ({
      ...prev,
      windDownRoutine: prev.windDownRoutine.filter(item => item.id !== id),
    }));
  };

  const setDigitalSunsetActive = (active) => {
    setState(prev => ({
      ...prev,
      digitalSunsetActive: active,
    }));
  };

  // Habits Management
  const toggleHabitToday = (habitId, dateKey = getTodayKey()) => {
    setState(prev => {
      const currentHistory = prev.habitHistory[habitId] || {};
      const wasCompleted = !!currentHistory[dateKey];
      const isNowCompleted = !wasCompleted;

      const updatedHistory = {
        ...prev.habitHistory,
        [habitId]: {
          ...currentHistory,
          [dateKey]: isNowCompleted,
        },
      };

      const pointDelta = isNowCompleted ? 15 : -15;

      return {
        ...prev,
        habitHistory: updatedHistory,
        growthPoints: Math.max(0, prev.growthPoints + pointDelta),
      };
    });

    if (state.soundEnabled) {
      playChime(true);
    }
  };

  const addCustomHabit = (name, category = 'mindfulness', plantId = 'lavender') => {
    if (!name.trim()) return;
    const newHabit = {
      id: `custom-habit-${Date.now()}`,
      name: name.trim(),
      description: 'Personal mindful routine',
      category,
      plantId,
      icon: 'CheckCircle2',
      targetDaysPerWeek: 5,
    };
    setState(prev => ({
      ...prev,
      habits: [...prev.habits, newHabit],
      growthPoints: prev.growthPoints + 10,
    }));
  };

  const deleteHabit = (habitId) => {
    setState(prev => ({
      ...prev,
      habits: prev.habits.filter(h => h.id !== habitId),
    }));
  };

  // Demo Data & Reset
  const loadDemoData = () => {
    const demo = generateSampleDemoData();
    setState(prev => ({
      ...prev,
      ...demo,
    }));
  };

  const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState({
      onboarding: {
        completed: false,
        primaryGoal: 'Improve focus',
        preferredDuration: 25,
        preferredTheme: 'light',
        studentName: '',
      },
      theme: 'light',
      soundEnabled: true,
      dailyIntention: '',
      dailyIntentionCompleted: false,
      moodHistory: [],
      focusSessions: [],
      activeDistractions: [],
      notificationAudit: {
        emergency: 'essential',
        academic: 'important',
        work_email: 'important',
        social: 'distracting',
        promotions: 'distracting',
        entertainment: 'distracting',
      },
      mindfulScrollStats: {
        sessionsCompleted: 0,
        totalMinutesMindful: 0,
      },
      digitalHabitsReflection: {
        interruptions: '',
        lossOfFocus: '',
        targetHabit: '',
      },
      bedtimeSettings: {
        bedtime: '23:00',
        wakeTime: '07:30',
        windDownBufferMinutes: 45,
      },
      windDownRoutine: DEFAULT_WIND_DOWN_ROUTINE,
      digitalSunsetActive: false,
      habits: DEFAULT_HABITS,
      habitHistory: {},
      growthPoints: 30,
      unlockedPlantIds: ['lavender'],
      isDemoData: false,
    });
  };

  return (
    <FlowstateContext.Provider
      value={{
        ...state,
        completeOnboarding,
        setTheme,
        toggleSound,
        setDailyIntention,
        toggleDailyIntentionCompleted,
        logMood,
        getTodayMood,
        addFocusSession,
        addDistraction,
        removeDistraction,
        toggleDistractionResolved,
        clearDistractions,
        setNotificationTier,
        resetNotificationAudit,
        recordMindfulScroll,
        saveDigitalReflection,
        updateBedtimeSettings,
        toggleWindDownTask,
        addWindDownTask,
        removeWindDownTask,
        setDigitalSunsetActive,
        toggleHabitToday,
        addCustomHabit,
        deleteHabit,
        loadDemoData,
        resetAllData,
      }}
    >
      {children}
    </FlowstateContext.Provider>
  );
}

export function useFlowstate() {
  const ctx = useContext(FlowstateContext);
  if (!ctx) {
    throw new Error('useFlowstate must be used within a FlowstateProvider');
  }
  return ctx;
}


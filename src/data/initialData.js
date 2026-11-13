/**
 * FLOWSTATE Initial Data, Presets, and Demo Mode Generator
 */

export const DEFAULT_HABITS = [
  {
    id: 'habit-1',
    name: 'Complete a focus session',
    description: 'At least 25 minutes of deep, uninterrupted work',
    category: 'focus',
    plantId: 'lavender',
    icon: 'Sparkles',
    targetDaysPerWeek: 5,
  },
  {
    id: 'habit-2',
    name: 'Take mindful breaks',
    description: 'Step away from screens between study blocks',
    category: 'wellness',
    plantId: 'peace_lily',
    icon: 'Coffee',
    targetDaysPerWeek: 6,
  },
  {
    id: 'habit-3',
    name: 'Read for 15 minutes',
    description: 'Off-screen reading before sleep or during daytime',
    category: 'mindfulness',
    plantId: 'bonsai',
    icon: 'BookOpen',
    targetDaysPerWeek: 5,
  },
  {
    id: 'habit-4',
    name: 'Follow bedtime routine',
    description: 'Begin wind-down 45 minutes before sleep',
    category: 'sleep',
    plantId: 'jade',
    icon: 'Moon',
    targetDaysPerWeek: 6,
  },
  {
    id: 'habit-5',
    name: 'Reduce unnecessary scrolling',
    description: 'No mindless feed browsing during study hours',
    category: 'detox',
    plantId: 'mint',
    icon: 'BellOff',
    targetDaysPerWeek: 7,
  },
];

export const NOTIFICATION_CATEGORIES = [
  {
    id: 'emergency',
    title: 'Calls & Emergency Alerts',
    description: 'Direct family calls, campus security alerts, two-factor logins',
    defaultTier: 'essential',
    icon: 'PhoneCall',
  },
  {
    id: 'academic',
    title: 'Academic Notifications',
    description: 'Canvas, Blackboard, university portal announcements, grading notices',
    defaultTier: 'important',
    icon: 'GraduationCap',
  },
  {
    id: 'work_email',
    title: 'Work & Course Emails',
    description: 'Professor replies, student organization threads, internship messages',
    defaultTier: 'important',
    icon: 'Mail',
  },
  {
    id: 'social',
    title: 'Social Media',
    description: 'Instagram DMs, TikTok notifications, Snapchat streaks, BeReal',
    defaultTier: 'distracting',
    icon: 'Share2',
  },
  {
    id: 'promotions',
    title: 'Promotional Notifications',
    description: 'Food delivery promotions, shopping discounts, sale pushes',
    defaultTier: 'distracting',
    icon: 'Tag',
  },
  {
    id: 'entertainment',
    title: 'Entertainment Applications',
    description: 'YouTube recommendations, Netflix releases, mobile gaming badges',
    defaultTier: 'distracting',
    icon: 'Tv',
  },
];

export const DEFAULT_WIND_DOWN_ROUTINE = [
  { id: 'wd-1', text: 'Stop studying and close all academic tabs', completed: false },
  { id: 'wd-2', text: 'Put away unnecessary devices or charge them outside bed range', completed: false },
  { id: 'wd-3', text: 'Read a book or physical journal for 15 minutes', completed: false },
  { id: 'wd-4', text: 'Prepare tomorrow’s priority list and bag', completed: false },
  { id: 'wd-5', text: 'Practice 4-7-8 relaxation breathing or light stretching', completed: false },
];

export const PLANTS_CATALOG = [
  {
    id: 'lavender',
    name: 'Serene Lavender',
    type: 'lavender',
    focusArea: 'Focus & Concentration',
    unlockPoints: 0,
    quote: 'Calm clarity in every petal',
  },
  {
    id: 'peace_lily',
    name: 'Peace Lily',
    type: 'peace_lily',
    focusArea: 'Mindful Breathing',
    unlockPoints: 50,
    quote: 'Quiet resilience amidst noise',
  },
  {
    id: 'bonsai',
    name: 'Zen Bonsai',
    type: 'bonsai',
    focusArea: 'Long-term Consistency',
    unlockPoints: 120,
    quote: 'Grown with patience, shaped with intention',
  },
  {
    id: 'jade',
    name: 'Jade Succulent',
    type: 'jade',
    focusArea: 'Sleep Harmony',
    unlockPoints: 200,
    quote: 'Steady vitality, peaceful recovery',
  },
  {
    id: 'mint',
    name: 'Sweet Mint',
    type: 'mint',
    focusArea: 'Digital Detox',
    unlockPoints: 300,
    quote: 'Crisp refreshment for a clutter-free mind',
  },
];

/**
 * Helper to get ISO date string YYYY-MM-DD
 */
export function getTodayKey(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  return d.toISOString().split('T')[0];
}

/**
 * Generate realistic college student demo data for testing and previewing
 */
export function generateSampleDemoData() {
  const today = new Date();
  
  // 7 days of focus sessions
  const sampleSessions = [];
  const tasks = [
    'CS 106B Algorithm Problem Set',
    'Cognitive Science Reading & Notes',
    'Organic Chemistry Lab Synthesis',
    'History Essay Thesis & Outline',
    'Statistics Final Review',
    'Linear Algebra Quiz Prep',
    'Physics Problem Set #4',
    'Philosophy Term Paper Draft',
  ];

  const durations = [25, 45, 50, 25, 60, 30, 45, 25, 45, 60, 45, 50];

  for (let i = 6; i >= 0; i--) {
    const sessionDate = new Date();
    sessionDate.setDate(today.getDate() - i);
    const dateKey = sessionDate.toISOString().split('T')[0];
    
    // 1-3 sessions per day
    const count = (i % 3 === 0) ? 2 : (i % 2 === 0 ? 3 : 1);
    for (let j = 0; j < count; j++) {
      const duration = durations[(i * 2 + j) % durations.length];
      const taskName = tasks[(i * 3 + j) % tasks.length];
      sampleSessions.push({
        id: `demo-session-${i}-${j}`,
        taskName,
        goal: 'Maintain uninterrupted flow without phone checks',
        duration, // in minutes
        completed: true,
        dateKey,
        completedAt: new Date(sessionDate.setHours(10 + j * 3, 15, 0)).toISOString(),
        parkedDistractions: j === 0 ? ['Check professor office hours', 'Order textbook'] : [],
      });
    }
  }

  // 7 days of mood entries
  const sampleMoods = [];
  const moodSeq = ['Focused', 'Energetic', 'Okay', 'Overwhelmed', 'Focused', 'Tired', 'Focused'];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    sampleMoods.push({
      date: d.toISOString().split('T')[0],
      mood: moodSeq[6 - i],
      note: i === 3 ? 'Midterm week pressure, took an extra walk' : 'Productive morning library session',
      timestamp: d.toISOString(),
    });
  }

  // Habit history for past 7 days
  const sampleHabitHistory = {};
  DEFAULT_HABITS.forEach((h, hIdx) => {
    sampleHabitHistory[h.id] = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateKey = d.toISOString().split('T')[0];
      // realistic 70-90% consistency
      const isCompleted = (i + hIdx) % 5 !== 0;
      sampleHabitHistory[h.id][dateKey] = isCompleted;
    }
  });

  return {
    onboarding: {
      completed: true,
      primaryGoal: 'Improve focus',
      preferredDuration: 45,
      preferredTheme: 'light',
      studentName: 'Alex',
    },
    dailyIntention: 'Complete CS 106B lab and wind down by 11 PM',
    moodHistory: sampleMoods,
    focusSessions: sampleSessions,
    habitHistory: sampleHabitHistory,
    notificationAudit: {
      emergency: 'essential',
      academic: 'important',
      work_email: 'important',
      social: 'distracting',
      promotions: 'distracting',
      entertainment: 'distracting',
    },
    mindfulScrollStats: {
      sessionsCompleted: 4,
      totalMinutesMindful: 35,
    },
    digitalHabitsReflection: {
      interruptions: 'During afternoon study blocks when group chats get active (3-5 times/hr).',
      lossOfFocus: 'Right when starting a difficult coding bug or transition between lecture slides.',
      targetHabit: 'Leaving my phone in my backpack on "Do Not Disturb" during focus sessions.',
    },
    bedtimeSettings: {
      bedtime: '23:00',
      wakeTime: '07:30',
      windDownBufferMinutes: 45,
    },
    windDownRoutine: [
      { id: 'wd-1', text: 'Stop studying and close all academic tabs', completed: true },
      { id: 'wd-2', text: 'Put away unnecessary devices or charge them outside bed range', completed: true },
      { id: 'wd-3', text: 'Read a book or physical journal for 15 minutes', completed: true },
      { id: 'wd-4', text: 'Prepare tomorrow’s priority list and bag', completed: false },
      { id: 'wd-5', text: 'Practice 4-7-8 relaxation breathing or light stretching', completed: false },
    ],
    growthPoints: 185,
    unlockedPlantIds: ['lavender', 'peace_lily', 'bonsai'],
    isDemoData: true,
  };
}

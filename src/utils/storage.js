const STORAGE_KEY = 'studyTrackerData';
const TOTAL_DAYS = 180;
const SUBJECTS = ['dsa', 'java', 'python', 'sql', 'coding'];

const getDefaultDayData = () => ({
  dsa: false,
  java: false,
  python: false,
  sql: false,
  coding: false
});

const getDefaultData = () => {
  const data = {};
  for (let i = 1; i <= TOTAL_DAYS; i++) {
    data[i] = getDefaultDayData();
  }
  return data;
};

export const loadData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const data = getDefaultData();
      Object.keys(parsed).forEach(day => {
        if (day >= 1 && day <= TOTAL_DAYS) {
          data[day] = { ...getDefaultDayData(), ...parsed[day] };
        }
      });
      return data;
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
  return getDefaultData();
};

export const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const resetData = () => {
  localStorage.removeItem(STORAGE_KEY);
  return getDefaultData();
};

export const calculateProgress = (data) => {
  let totalCompleted = 0;
  const subjectProgress = {
    dsa: 0,
    java: 0,
    python: 0,
    sql: 0,
    coding: 0
  };

  Object.keys(data).forEach(day => {
    const dayData = data[day];
    let dayCompleted = true;
    
    SUBJECTS.forEach(subject => {
      if (dayData[subject]) {
        subjectProgress[subject]++;
        totalCompleted++;
      } else {
        dayCompleted = false;
      }
    });
  });

  const totalPossible = TOTAL_DAYS * SUBJECTS.length;
  const overallProgress = totalPossible > 0 ? (totalCompleted / totalPossible) * 100 : 0;
  
  SUBJECTS.forEach(subject => {
    subjectProgress[subject] = (subjectProgress[subject] / TOTAL_DAYS) * 100;
  });

  return {
    overall: overallProgress,
    subjects: subjectProgress,
    totalCompleted,
    totalPossible
  };
};

export const getCompletedDays = (data) => {
  let completedDays = 0;
  Object.keys(data).forEach(day => {
    const dayData = data[day];
    const allCompleted = SUBJECTS.every(subject => dayData[subject]);
    if (allCompleted) {
      completedDays++;
    }
  });
  return completedDays;
};

export const getCurrentStreak = (data) => {
  let streak = 0;
  const todayDay = getTodayDayNumber();
  
  for (let i = 0; i < TOTAL_DAYS; i++) {
    let dayNumber = todayDay - i;
    if (dayNumber < 1) {
      dayNumber = TOTAL_DAYS + dayNumber;
    }
    
    const dayData = data[dayNumber];
    const allCompleted = SUBJECTS.every(subject => dayData[subject]);
    
    if (allCompleted) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

export const getTodayDayNumber = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const startDate = new Date('2025-12-21');
  startDate.setHours(0, 0, 0, 0);
  
  const diffTime = today - startDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return 1;
  }
  
  const dayNumber = diffDays + 1;
  
  if (dayNumber > TOTAL_DAYS) {
    const cycleDay = ((dayNumber - 1) % TOTAL_DAYS) + 1;
    return cycleDay;
  }
  
  return dayNumber;
};

export const getDateForDay = (dayNumber) => {
  if (dayNumber < 1 || dayNumber > TOTAL_DAYS) {
    return null;
  }
  
  const startDate = new Date('2025-12-21');
  startDate.setHours(0, 0, 0, 0);
  
  const targetDate = new Date(startDate);
  targetDate.setDate(startDate.getDate() + (dayNumber - 1));
  
  return targetDate;
};

export const formatDate = (date) => {
  if (!date) return '';
  
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

export { TOTAL_DAYS, SUBJECTS, getDefaultDayData };


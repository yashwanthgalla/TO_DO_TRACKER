const CODE_STORAGE_KEY = 'practiceCode';
const NOTES_STORAGE_KEY = 'practiceNotes';
const COMPLETED_PROBLEMS_KEY = 'completedProblems';

export const saveCode = (problemId, language, code) => {
  try {
    const stored = localStorage.getItem(CODE_STORAGE_KEY);
    const codeData = stored ? JSON.parse(stored) : {};
    
    if (!codeData[problemId]) {
      codeData[problemId] = {};
    }
    codeData[problemId][language] = code;
    
    localStorage.setItem(CODE_STORAGE_KEY, JSON.stringify(codeData));
  } catch (error) {
    console.error('Error saving code:', error);
  }
};

export const loadCode = (problemId, language) => {
  try {
    const stored = localStorage.getItem(CODE_STORAGE_KEY);
    if (stored) {
      const codeData = JSON.parse(stored);
      if (codeData[problemId] && codeData[problemId][language]) {
        return codeData[problemId][language];
      }
    }
  } catch (error) {
    console.error('Error loading code:', error);
  }
  return null;
};

export const saveNotes = (type, content) => {
  try {
    const stored = localStorage.getItem(NOTES_STORAGE_KEY);
    const notes = stored ? JSON.parse(stored) : {};
    notes[type] = content;
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Error saving notes:', error);
  }
};

export const loadNotes = (type) => {
  try {
    const stored = localStorage.getItem(NOTES_STORAGE_KEY);
    if (stored) {
      const notes = JSON.parse(stored);
      return notes[type] || '';
    }
  } catch (error) {
    console.error('Error loading notes:', error);
  }
  return '';
};

export const markProblemCompleted = (problemId) => {
  try {
    const stored = localStorage.getItem(COMPLETED_PROBLEMS_KEY);
    const completed = stored ? JSON.parse(stored) : [];
    if (!completed.includes(problemId)) {
      completed.push(problemId);
      localStorage.setItem(COMPLETED_PROBLEMS_KEY, JSON.stringify(completed));
    }
  } catch (error) {
    console.error('Error marking problem completed:', error);
  }
};

export const unmarkProblemCompleted = (problemId) => {
  try {
    const stored = localStorage.getItem(COMPLETED_PROBLEMS_KEY);
    const completed = stored ? JSON.parse(stored) : [];
    const filtered = completed.filter(id => id !== problemId);
    localStorage.setItem(COMPLETED_PROBLEMS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error unmarking problem:', error);
  }
};

export const isProblemCompleted = (problemId) => {
  try {
    const stored = localStorage.getItem(COMPLETED_PROBLEMS_KEY);
    if (stored) {
      const completed = JSON.parse(stored);
      return completed.includes(problemId);
    }
  } catch (error) {
    console.error('Error checking completion:', error);
  }
  return false;
};

export const getCompletedProblems = () => {
  try {
    const stored = localStorage.getItem(COMPLETED_PROBLEMS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error getting completed problems:', error);
  }
  return [];
};


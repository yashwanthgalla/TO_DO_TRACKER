import { useEffect, useState } from 'react';
import CircularProgress from './CircularProgress';
import ProgressBar from './ProgressBar';
import './Dashboard.css';
import { calculateProgress, getCompletedDays, getCurrentStreak, getTodayDayNumber, TOTAL_DAYS } from '../utils/storage';
import { getDayTasks } from '../utils/tasks';

function Dashboard({ data }) {
  const [progress, setProgress] = useState({ overall: 0, subjects: {}, totalCompleted: 0, totalPossible: 0 });
  const [completedDays, setCompletedDays] = useState(0);
  const [streak, setStreak] = useState(0);
  const [todayFocus, setTodayFocus] = useState([]);
  const [todayTasks, setTodayTasks] = useState({});

  useEffect(() => {
    const progressData = calculateProgress(data);
    setProgress(progressData);
    setCompletedDays(getCompletedDays(data));
    setStreak(getCurrentStreak(data));
    
    const todayDay = getTodayDayNumber();
    const todayData = data[todayDay] || {};
    const tasks = getDayTasks(todayDay);
    setTodayTasks(tasks);
    
    const focusItems = [];
    if (todayData.dsa) focusItems.push('DSA');
    if (todayData.java) focusItems.push('Java');
    if (todayData.python) focusItems.push('Python');
    if (todayData.sql) focusItems.push('SQL');
    if (todayData.coding) focusItems.push('Coding');
    setTodayFocus(focusItems);
  }, [data]);

  const subjects = [
    { key: 'dsa', label: 'DSA' },
    { key: 'java', label: 'Java' },
    { key: 'python', label: 'Python' },
    { key: 'sql', label: 'SQL' },
    { key: 'coding', label: 'Coding Practice' }
  ];

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Dashboard</h2>
      
      <div className="dashboard-grid">
        <div className="dashboard-card dashboard-card-main">
          <h3 className="dashboard-card-title">Overall Progress</h3>
          <CircularProgress percentage={progress.overall} />
        </div>

        <div className="dashboard-card">
          <h3 className="dashboard-card-title">Days Completed</h3>
          <div className="dashboard-stat">
            <span className="dashboard-stat-value">{completedDays}</span>
            <span className="dashboard-stat-label">/ {TOTAL_DAYS} days</span>
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="dashboard-card-title">Current Streak</h3>
          <div className="dashboard-stat">
            <span className="dashboard-stat-value">{streak}</span>
            <span className="dashboard-stat-label">days</span>
          </div>
        </div>

        <div className="dashboard-card dashboard-card-today">
          <h3 className="dashboard-card-title">Today's Focus</h3>
          <div className="dashboard-today-focus">
            {todayFocus.length > 0 ? (
              <div className="dashboard-focus-items">
                {todayFocus.map((item, index) => (
                  <span key={index} className="dashboard-focus-badge">{item}</span>
                ))}
              </div>
            ) : (
              <p className="dashboard-focus-empty">No items completed today</p>
            )}
            <div className="dashboard-today-tasks">
              <div className="dashboard-task-item">
                <span className="dashboard-task-label">DSA:</span>
                <span className={`dashboard-task-text ${todayFocus.includes('DSA') ? 'dashboard-task-completed' : ''}`}>
                  {todayTasks.dsa}
                </span>
              </div>
              <div className="dashboard-task-item">
                <span className="dashboard-task-label">Java:</span>
                <span className={`dashboard-task-text ${todayFocus.includes('Java') ? 'dashboard-task-completed' : ''}`}>
                  {todayTasks.java}
                </span>
              </div>
              <div className="dashboard-task-item">
                <span className="dashboard-task-label">Python:</span>
                <span className={`dashboard-task-text ${todayFocus.includes('Python') ? 'dashboard-task-completed' : ''}`}>
                  {todayTasks.python}
                </span>
              </div>
              <div className="dashboard-task-item">
                <span className="dashboard-task-label">SQL:</span>
                <span className={`dashboard-task-text ${todayFocus.includes('SQL') ? 'dashboard-task-completed' : ''}`}>
                  {todayTasks.sql}
                </span>
              </div>
              <div className="dashboard-task-item">
                <span className="dashboard-task-label">Coding:</span>
                <span className={`dashboard-task-text ${todayFocus.includes('Coding') ? 'dashboard-task-completed' : ''}`}>
                  {todayTasks.coding}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-subjects">
        <h3 className="dashboard-section-title">Subject Progress</h3>
        {subjects.map(subject => (
          <ProgressBar
            key={subject.key}
            label={subject.label}
            percentage={progress.subjects[subject.key] || 0}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;


import { useState } from 'react';
import './DayPlanView.css';
import { DAY_TASKS } from '../utils/tasks';
import { getDateForDay, formatDate, getTodayDayNumber } from '../utils/storage';

function DayPlanView({ data, onDaySelect }) {
  const [expandedDays, setExpandedDays] = useState(new Set([1]));
  const todayDay = getTodayDayNumber();

  const toggleDay = (day) => {
    setExpandedDays(prev => {
      const newSet = new Set(prev);
      if (newSet.has(day)) {
        newSet.delete(day);
      } else {
        newSet.add(day);
      }
      return newSet;
    });
  };

  const handleDayClick = (day) => {
    if (onDaySelect) {
      onDaySelect(day);
    }
  };

  const subjectLabels = {
    dsa: 'DSA',
    java: 'Java',
    python: 'Python',
    sql: 'SQL',
    coding: 'Coding'
  };

  const getDayCompletion = (day) => {
    const dayData = data[day] || {};
    const subjects = ['dsa', 'java', 'python', 'sql', 'coding'];
    const completed = subjects.filter(subject => dayData[subject]).length;
    return { completed, total: subjects.length };
  };

  return (
    <div className="day-plan-view">
      <h2 className="day-plan-title">Day-by-Day Study Plan</h2>
      <p className="day-plan-subtitle">Click on any day to jump to it in the tracker</p>
      
      <div className="day-plan-list">
        {Object.keys(DAY_TASKS).map(dayNum => {
          const day = parseInt(dayNum);
          const tasks = DAY_TASKS[day];
          const dayDate = getDateForDay(day);
          const formattedDate = formatDate(dayDate);
          const isExpanded = expandedDays.has(day);
          const isToday = day === todayDay;
          const completion = getDayCompletion(day);
          const isCompleted = completion.completed === completion.total;

          return (
            <div
              key={day}
              className={`day-plan-card ${isToday ? 'day-plan-card-today' : ''} ${isCompleted ? 'day-plan-card-completed' : ''}`}
            >
              <div
                className="day-plan-header"
                onClick={() => toggleDay(day)}
              >
                <div className="day-plan-header-left">
                  <span className="day-plan-number">Day {day}</span>
                  {isToday && <span className="day-plan-today-badge">Today</span>}
                  {isCompleted && <span className="day-plan-completed-badge">✓ Completed</span>}
                </div>
                <div className="day-plan-header-right">
                  <span className="day-plan-date">{formattedDate}</span>
                  <span className="day-plan-progress">
                    {completion.completed}/{completion.total}
                  </span>
                  <span className={`day-plan-arrow ${isExpanded ? 'day-plan-arrow-expanded' : ''}`}>
                    ▼
                  </span>
                </div>
              </div>

              {isExpanded && (
                <div className="day-plan-content">
                  <div className="day-plan-tasks">
                    {Object.keys(tasks).map(subject => {
                      const isTaskCompleted = data[day]?.[subject] || false;
                      return (
                        <div
                          key={subject}
                          className={`day-plan-task-item ${isTaskCompleted ? 'day-plan-task-completed' : ''}`}
                          onClick={() => handleDayClick(day)}
                        >
                          <span className="day-plan-task-label">{subjectLabels[subject]}:</span>
                          <span className="day-plan-task-text">{tasks[subject]}</span>
                          {isTaskCompleted && <span className="day-plan-task-check">✓</span>}
                        </div>
                      );
                    })}
                  </div>
                  <button
                    className="day-plan-jump-button"
                    onClick={() => handleDayClick(day)}
                  >
                    Go to Day {day}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DayPlanView;



import { useState, useEffect } from 'react';
import './DayTracker.css';
import { TOTAL_DAYS, SUBJECTS, getTodayDayNumber, getDateForDay, formatDate } from '../utils/storage';
import { getDayTasks } from '../utils/tasks';
import { Icons } from '../utils/icons';

function DayTracker({ data, onUpdate, selectedDay: externalSelectedDay, onDayChange }) {
  const [internalSelectedDay, setInternalSelectedDay] = useState(getTodayDayNumber());
  const selectedDay = externalSelectedDay !== undefined ? externalSelectedDay : internalSelectedDay;
  const [dayData, setDayData] = useState(data[selectedDay] || {});

  useEffect(() => {
    setDayData(data[selectedDay] || {});
  }, [data, selectedDay]);

  const handleToggle = (subject) => {
    const updatedDayData = {
      ...dayData,
      [subject]: !dayData[subject]
    };
    setDayData(updatedDayData);
    onUpdate(selectedDay, updatedDayData);
  };

  const handleCompleteAll = () => {
    const allCompleted = {
      dsa: true,
      java: true,
      python: true,
      sql: true,
      coding: true
    };
    setDayData(allCompleted);
    onUpdate(selectedDay, allCompleted);
  };

  const handleDayChange = (e) => {
    const day = parseInt(e.target.value);
    if (externalSelectedDay === undefined) {
      setInternalSelectedDay(day);
    }
    if (onDayChange) {
      onDayChange(day);
    }
  };

  const isAllCompleted = SUBJECTS.every(subject => dayData[subject]);
  const todayDay = getTodayDayNumber();
  const isToday = selectedDay === todayDay;
  const dayTasks = getDayTasks(selectedDay);
  const dayDate = getDateForDay(selectedDay);
  const formattedDate = formatDate(dayDate);

  const subjectLabels = {
    dsa: 'DSA',
    java: 'Java',
    python: 'Python',
    sql: 'SQL',
    coding: 'Coding Practice'
  };

  return (
    <div className="day-tracker">
      <h2 className="day-tracker-title">Daily Tracker</h2>
      
      <div className="day-tracker-selector">
        <label htmlFor="day-select" className="day-selector-label">
          Select Day:
        </label>
        <select
          id="day-select"
          className={`day-selector ${isToday ? 'day-selector-today' : ''}`}
          value={selectedDay}
          onChange={handleDayChange}
        >
          {Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1).map(day => (
            <option key={day} value={day}>
              Day {day} {day === todayDay ? '(Today)' : ''}
            </option>
          ))}
        </select>
        {isToday && (
          <span className="today-badge">
            {Icons.flame}
            <span>Today</span>
          </span>
        )}
        {formattedDate && (
          <span className="day-date-display">
            {Icons.calendar}
            <span>{formattedDate}</span>
          </span>
        )}
      </div>

      <div className={`day-tracker-content ${isToday ? 'day-tracker-today' : ''}`}>
        <div className="day-tracker-subjects">
          {SUBJECTS.map(subject => (
            <label key={subject} className="day-tracker-item">
              <input
                type="checkbox"
                checked={dayData[subject] || false}
                onChange={() => handleToggle(subject)}
                className="day-tracker-checkbox"
              />
              <div className="day-tracker-item-content">
                <span className="day-tracker-label">{subjectLabels[subject]}</span>
                <span className="day-tracker-task">{dayTasks[subject]}</span>
              </div>
            </label>
          ))}
        </div>

        <button
          className={`day-tracker-complete-all ${isAllCompleted ? 'day-tracker-complete-all-done' : ''}`}
          onClick={handleCompleteAll}
          disabled={isAllCompleted}
        >
          {isAllCompleted ? (
            <>
              {Icons.check}
              <span>All Completed</span>
            </>
          ) : (
            <span>Mark All Complete</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default DayTracker;


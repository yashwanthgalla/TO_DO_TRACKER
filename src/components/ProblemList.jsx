import { useState } from 'react';
import './ProblemList.css';
import { getAllProblems, getProblemsByDay } from '../utils/problems';
import { isProblemCompleted } from '../utils/codeStorage';

function ProblemList({ onProblemSelect, selectedDay }) {
  const [filterDay, setFilterDay] = useState(selectedDay || null);
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  const allProblems = getAllProblems();
  const problems = filterDay ? getProblemsByDay(filterDay) : allProblems;

  const filteredProblems = difficultyFilter === 'All'
    ? problems
    : problems.filter(p => p.difficulty === difficultyFilter);

  const difficultyColors = {
    Easy: '#4caf50',
    Medium: '#ff9800',
    Hard: '#f44336'
  };

  return (
    <div className="problem-list">
      <div className="problem-list-header">
        <h2 className="problem-list-title">Practice Problems</h2>
        <div className="problem-list-filters">
          <select
            className="problem-filter-select"
            value={filterDay || ''}
            onChange={(e) => setFilterDay(e.target.value ? parseInt(e.target.value) : null)}
          >
            <option value="">All Days</option>
            {Array.from({ length: 180 }, (_, i) => i + 1).map(day => (
              <option key={day} value={day}>Day {day}</option>
            ))}
          </select>
          <select
            className="problem-filter-select"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      <div className="problem-list-grid">
        {filteredProblems.length > 0 ? (
          filteredProblems.map(problem => {
            const completed = isProblemCompleted(problem.id);
            return (
              <div
                key={problem.id}
                className={`problem-card ${completed ? 'problem-card-completed' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onProblemSelect(problem.id);
                }}
              >
                <div className="problem-card-header">
                  <h3 className="problem-card-title">{problem.title}</h3>
                  {completed && <span className="problem-card-check">✓</span>}
                </div>
                <div className="problem-card-meta">
                  <span
                    className="problem-card-difficulty"
                    style={{ color: difficultyColors[problem.difficulty] }}
                  >
                    {problem.difficulty}
                  </span>
                  <span className="problem-card-day">Day {problem.day}</span>
                </div>
                <div className="problem-card-tags">
                  {problem.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="problem-card-tag">{tag}</span>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="problem-list-empty">
            No problems found for the selected filters.
          </div>
        )}
      </div>
    </div>
  );
}

export default ProblemList;


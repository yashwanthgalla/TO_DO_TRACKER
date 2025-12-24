import { useState, useEffect } from 'react';
import './Notes.css';
import { saveNotes, loadNotes } from '../utils/codeStorage';
import { getDayTasks } from '../utils/tasks';
import { getTodayDayNumber, getDateForDay, formatDate } from '../utils/storage';
import { generateNoteTemplate, getW3SchoolsLink } from '../utils/w3schoolsLinks';
import { Icons } from '../utils/icons';

function Notes() {
  const [selectedDay, setSelectedDay] = useState(getTodayDayNumber());
  const [activeTab, setActiveTab] = useState('java');
  const [javaNotes, setJavaNotes] = useState('');
  const [pythonNotes, setPythonNotes] = useState('');
  const [dsaNotes, setDsaNotes] = useState('');
  const [sqlNotes, setSqlNotes] = useState('');

  const dayTasks = getDayTasks(selectedDay);
  const dayDate = getDateForDay(selectedDay);
  const formattedDate = formatDate(dayDate);

  const loadNotesForDay = () => {
    const javaKey = `java_day_${selectedDay}`;
    const pythonKey = `python_day_${selectedDay}`;
    const dsaKey = `dsa_day_${selectedDay}`;
    const sqlKey = `sql_day_${selectedDay}`;

    const currentDayTasks = getDayTasks(selectedDay);

    let java = loadNotes(javaKey);
    let python = loadNotes(pythonKey);
    let dsa = loadNotes(dsaKey);
    let sql = loadNotes(sqlKey);

    if (!java && currentDayTasks.java) {
      java = generateNoteTemplate('java', currentDayTasks.java);
      saveNotes(javaKey, java);
    }
    if (!python && currentDayTasks.python) {
      python = generateNoteTemplate('python', currentDayTasks.python);
      saveNotes(pythonKey, python);
    }
    if (!dsa && currentDayTasks.dsa) {
      dsa = generateNoteTemplate('dsa', currentDayTasks.dsa);
      saveNotes(dsaKey, dsa);
    }
    if (!sql && currentDayTasks.sql) {
      sql = generateNoteTemplate('sql', currentDayTasks.sql);
      saveNotes(sqlKey, sql);
    }

    setJavaNotes(java || '');
    setPythonNotes(python || '');
    setDsaNotes(dsa || '');
    setSqlNotes(sql || '');
  };

  useEffect(() => {
    const prefillKey = 'notesPrefilled_v1';
    if (localStorage.getItem(prefillKey)) return;

    const jobs = [];
    for (let day = 1; day <= 180; day += 1) {
      const tasks = getDayTasks(day);
      if (tasks?.java) jobs.push({ key: `java_day_${day}`, subject: 'java', topic: tasks.java });
      if (tasks?.python) jobs.push({ key: `python_day_${day}`, subject: 'python', topic: tasks.python });
      if (tasks?.dsa) jobs.push({ key: `dsa_day_${day}`, subject: 'dsa', topic: tasks.dsa });
      if (tasks?.sql) jobs.push({ key: `sql_day_${day}`, subject: 'sql', topic: tasks.sql });
    }

    const runChunk = (startIndex) => {
      const endIndex = Math.min(startIndex + 20, jobs.length);
      for (let i = startIndex; i < endIndex; i += 1) {
        const job = jobs[i];
        const existing = loadNotes(job.key);
        if (!existing) {
          const template = generateNoteTemplate(job.subject, job.topic);
          saveNotes(job.key, template);
        }
      }

      if (endIndex < jobs.length) {
        window.setTimeout(() => runChunk(endIndex), 0);
      } else {
        localStorage.setItem(prefillKey, '1');
      }
    };

    window.setTimeout(() => runChunk(0), 0);
  }, []);

  useEffect(() => {
    loadNotesForDay();
  }, [selectedDay]);

  const handleJavaChange = (value) => {
    setJavaNotes(value);
    saveNotes(`java_day_${selectedDay}`, value);
  };

  const handlePythonChange = (value) => {
    setPythonNotes(value);
    saveNotes(`python_day_${selectedDay}`, value);
  };

  const handleDsaChange = (value) => {
    setDsaNotes(value);
    saveNotes(`dsa_day_${selectedDay}`, value);
  };

  const handleSqlChange = (value) => {
    setSqlNotes(value);
    saveNotes(`sql_day_${selectedDay}`, value);
  };

  const getCurrentNotes = () => {
    switch (activeTab) {
      case 'java':
        return javaNotes;
      case 'python':
        return pythonNotes;
      case 'dsa':
        return dsaNotes;
      case 'sql':
        return sqlNotes;
      default:
        return '';
    }
  };

  const getCurrentTopic = () => {
    switch (activeTab) {
      case 'java':
        return dayTasks.java;
      case 'python':
        return dayTasks.python;
      case 'dsa':
        return dayTasks.dsa;
      case 'sql':
        return dayTasks.sql;
      default:
        return '';
    }
  };

  const getCurrentW3Link = () => {
    const topic = getCurrentTopic();
    if (!topic) return null;
    return getW3SchoolsLink(activeTab, topic);
  };

  const handleCurrentChange = (value) => {
    switch (activeTab) {
      case 'java':
        handleJavaChange(value);
        break;
      case 'python':
        handlePythonChange(value);
        break;
      case 'dsa':
        handleDsaChange(value);
        break;
      case 'sql':
        handleSqlChange(value);
        break;
    }
  };

  const handleGenerateNotes = () => {
    const topic = getCurrentTopic();
    if (!topic) return;
    
    const template = generateNoteTemplate(activeTab, topic);
    handleCurrentChange(template);
  };

  const formatMarkdown = (text) => {
    if (!text) return '';
    
    let formatted = text
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      .replace(/\n/g, '<br>');
    
    return formatted;
  };

  return (
    <div className="notes">
      <div className="notes-header">
        <div className="notes-title-section">
          <h2 className="notes-title">Study Notes</h2>
          <div className="notes-day-selector">
            <label htmlFor="notes-day-select">Day:</label>
            <select
              id="notes-day-select"
              className="notes-day-select"
              value={selectedDay}
              onChange={(e) => setSelectedDay(parseInt(e.target.value))}
            >
              {Array.from({ length: 180 }, (_, i) => i + 1).map(day => (
                <option key={day} value={day}>Day {day}</option>
              ))}
            </select>
            {formattedDate && (
              <span className="notes-day-date">{formattedDate}</span>
            )}
          </div>
        </div>
        <div className="notes-tabs">
          <button
            className={`notes-tab ${activeTab === 'java' ? 'notes-tab-active' : ''}`}
            onClick={() => setActiveTab('java')}
          >
            Java Notes
          </button>
          <button
            className={`notes-tab ${activeTab === 'python' ? 'notes-tab-active' : ''}`}
            onClick={() => setActiveTab('python')}
          >
            Python Notes
          </button>
          <button
            className={`notes-tab ${activeTab === 'dsa' ? 'notes-tab-active' : ''}`}
            onClick={() => setActiveTab('dsa')}
          >
            DSA Notes
          </button>
          <button
            className={`notes-tab ${activeTab === 'sql' ? 'notes-tab-active' : ''}`}
            onClick={() => setActiveTab('sql')}
          >
            SQL Notes
          </button>
        </div>
      </div>

      {getCurrentTopic() && (
        <div className="notes-topic-info">
          <div className="notes-topic-header">
            <span className="notes-topic-label">Today's Topic:</span>
            <span className="notes-topic-name">{getCurrentTopic()}</span>
          </div>
          <div className="notes-topic-actions">
            <button
              className="notes-generate-button"
              onClick={handleGenerateNotes}
            >
              Generate Note Template
            </button>
            {getCurrentW3Link() && (
              <a
                href={getCurrentW3Link()}
                target="_blank"
                rel="noopener noreferrer"
                className="notes-w3-link"
              >
                {Icons.book}
                <span>Visit W3Schools Reference</span>
                {Icons.externalLink}
              </a>
            )}
          </div>
        </div>
      )}

      <div className="notes-content">
        <div className="notes-editor-section">
          <div className="notes-editor-header">
            <h3>Edit Notes</h3>
            <span className="notes-hint">Markdown supported • Original content only</span>
          </div>
          <textarea
            className="notes-textarea"
            value={getCurrentNotes()}
            onChange={(e) => handleCurrentChange(e.target.value)}
            placeholder={`Start writing your ${activeTab} notes here...\n\nYou can use Markdown:\n# Heading\n**Bold**\n*Italic*\n\`code\`\n\`\`\`\ncode block\n\`\`\``}
          />
        </div>

        <div className="notes-preview-section">
          <div className="notes-preview-header">
            <h3>Preview</h3>
          </div>
          <div
            className="notes-preview"
            dangerouslySetInnerHTML={{ __html: formatMarkdown(getCurrentNotes()) }}
          />
        </div>
      </div>
    </div>
  );
}

export default Notes;


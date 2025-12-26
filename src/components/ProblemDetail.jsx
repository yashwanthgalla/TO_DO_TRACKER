import { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import CodeRunner from './CodeRunner';
import './ProblemDetail.css';
import { getProblemById } from '../utils/problems';
import { saveCode, loadCode, markProblemCompleted, unmarkProblemCompleted, isProblemCompleted } from '../utils/codeStorage';
import { Icons } from '../utils/icons';

function ProblemDetail({ problemId, onBack }) {
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState('java');
  const [code, setCode] = useState('');
  const [completed, setCompleted] = useState(false);
  const [runSignal, setRunSignal] = useState(0);

  useEffect(() => {
    const prob = getProblemById(Number(problemId));
    setProblem(prob);
    if (prob) {
      const savedCode = loadCode(problemId, language);
      setCode(savedCode || prob.starterCode[language] || '');
      setCompleted(isProblemCompleted(problemId));
    }
  }, [problemId, language]);

  const handleLanguageChange = (newLanguage) => {
    if (problem) {
      const savedCode = loadCode(problemId, newLanguage);
      setCode(savedCode || problem.starterCode[newLanguage] || '');
      setLanguage(newLanguage);
    }
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    saveCode(problemId, language, newCode);
  };

  const handleReset = () => {
    if (problem) {
      const starterCode = problem.starterCode[language] || '';
      setCode(starterCode);
      saveCode(problemId, language, starterCode);
    }
  };

  const handleRun = () => {
    setRunSignal(prev => prev + 1);
  };

  const handleToggleCompleted = () => {
    if (completed) {
      unmarkProblemCompleted(problemId);
    } else {
      markProblemCompleted(problemId);
    }
    setCompleted(!completed);
  };

  if (!problem) {
    return (
      <div className="problem-detail">
        <div className="problem-not-found">Problem not found</div>
      </div>
    );
  }

  const difficultyColors = {
    Easy: '#4caf50',
    Medium: '#ff9800',
    Hard: '#f44336'
  };

  return (
    <div className="problem-detail">
      <div className="problem-detail-header">
        <button className="problem-back-button" onClick={onBack}>
          {Icons.arrowLeft}
          <span>Back to Problems</span>
        </button>
        <div className="problem-header-actions">
          <button
            className={`problem-complete-button ${completed ? 'problem-complete-button-done' : ''}`}
            onClick={handleToggleCompleted}
          >
            {completed ? (
              <>
                {Icons.check}
                <span>Completed</span>
              </>
            ) : (
              <span>Mark Complete</span>
            )}
          </button>
        </div>
      </div>

      <div className="problem-content">
        <div className="problem-info">
          <div className="problem-title-section">
            <h1 className="problem-title">{problem.title}</h1>
            <span
              className="problem-difficulty"
              style={{ color: difficultyColors[problem.difficulty] }}
            >
              {problem.difficulty}
            </span>
          </div>

          <div className="problem-tags">
            {problem.tags.map((tag, index) => (
              <span key={index} className="problem-tag">{tag}</span>
            ))}
          </div>

          <div className="problem-description">
            <h2>Description</h2>
            <pre className="problem-description-text">{problem.description}</pre>
          </div>

          {problem.examples && problem.examples.length > 0 && (
            <div className="problem-examples">
              <h2>Examples</h2>
              {problem.examples.map((example, index) => (
                <div key={index} className="problem-example">
                  <div className="problem-example-input">
                    <strong>Input:</strong>
                    <pre>{example.input}</pre>
                  </div>
                  <div className="problem-example-output">
                    <strong>Output:</strong>
                    <pre>{example.output}</pre>
                  </div>
                  {example.explanation && (
                    <div className="problem-example-explanation">
                      <strong>Explanation:</strong> {example.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {problem.constraints && problem.constraints.length > 0 && (
            <div className="problem-constraints">
              <h2>Constraints</h2>
              <ul>
                {problem.constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="problem-editor-section">
          <div className="problem-language-selector">
            <button
              className={`language-button ${language === 'java' ? 'language-button-active' : ''}`}
              onClick={() => handleLanguageChange('java')}
            >
              Java
            </button>
            <button
              className={`language-button ${language === 'python' ? 'language-button-active' : ''}`}
              onClick={() => handleLanguageChange('python')}
            >
              Python
            </button>
            <button
              className={`language-button ${language === 'c' ? 'language-button-active' : ''}`}
              onClick={() => handleLanguageChange('c')}
            >
              C
            </button>
          </div>

          <CodeEditor
            code={code}
            language={language}
            onChange={handleCodeChange}
            onRun={handleRun}
            onReset={handleReset}
          />

          <CodeRunner
            code={code}
            language={language}
            problem={problem}
            autoRun={false}
            runSignal={runSignal}
          />
        </div>
      </div>
    </div>
  );
}

export default ProblemDetail;


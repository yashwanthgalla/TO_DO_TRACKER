import { useEffect, useMemo, useState } from 'react';
import './CodeRunner.css';
import { ExecutionStatus, runAgainstTestCases, runWithCustomInput } from '../utils/executionEngine';

function CodeRunner({ code, language, problem, runSignal }) {
  const [mode, setMode] = useState('testcases');
  const [stdin, setStdin] = useState('');
  const [status, setStatus] = useState(ExecutionStatus.Idle);
  const [error, setError] = useState(null);
  const [testOutput, setTestOutput] = useState(null);
  const [customOutput, setCustomOutput] = useState(null);
  const [showTestCases, setShowTestCases] = useState(true);

  const hasResults = useMemo(() => {
    if (mode === 'custom') return customOutput !== null || error !== null;
    return Boolean(testOutput);
  }, [mode, customOutput, error, testOutput]);

  const runNow = () => {
    setStatus(ExecutionStatus.Running);
    setError(null);

    window.setTimeout(() => {
      if (mode === 'custom') {
        const result = runWithCustomInput({ code, language, problem, stdin });
        setStatus(result.status);
        setError(result.error);
        setCustomOutput(result.output);
        return;
      }

      const result = runAgainstTestCases({ code, language, problem });
      setStatus(result.status);
      setError(result.error);
      setTestOutput({ results: result.results, allPassed: result.allPassed });
    }, 60);
  };

  useEffect(() => {
    if (typeof runSignal === 'number' && runSignal > 0) {
      runNow();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runSignal]);

  return (
    <div className="code-console">
      <div className="code-console-header">
        <div className="code-console-title">Console</div>
        <div className="code-console-controls">
          <button
            type="button"
            className={`code-console-pill ${mode === 'testcases' ? 'code-console-pill-active' : ''}`}
            onClick={() => setMode('testcases')}
          >
            Test Cases
          </button>
          <button
            type="button"
            className={`code-console-pill ${mode === 'custom' ? 'code-console-pill-active' : ''}`}
            onClick={() => setMode('custom')}
          >
            Custom Input
          </button>
          {mode === 'testcases' && (
            <button
              type="button"
              className="code-console-link"
              onClick={() => setShowTestCases(v => !v)}
            >
              {showTestCases ? 'Hide details' : 'Show details'}
            </button>
          )}
          <span className={`code-console-status code-console-status-${status}`}>
            {status === ExecutionStatus.Idle && 'Idle'}
            {status === ExecutionStatus.Running && 'Running'}
            {status === ExecutionStatus.Success && 'Success'}
            {status === ExecutionStatus.Error && 'Error'}
          </span>
        </div>
      </div>

      <div className="code-console-body">
        <div className="code-console-io">
          <div className="code-console-pane">
            <div className="code-console-pane-title">Input (stdin)</div>
            <textarea
              className="code-console-stdin"
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              placeholder={mode === 'custom' ? 'Enter stdin. JSON works best (array/object/string).' : 'Optional: custom stdin is available in Custom Input mode.'}
              spellCheck={false}
            />
          </div>

          <div className="code-console-pane">
            <div className="code-console-pane-title">Output (stdout)</div>
            <div className="code-console-stdout">
              {!hasResults && (
                <div className="code-console-empty">Run to see output</div>
              )}

              {error && (
                <div className="code-console-error">{error}</div>
              )}

              {!error && mode === 'custom' && customOutput !== null && (
                <pre className="code-console-pre">{JSON.stringify(customOutput, null, 2)}</pre>
              )}

              {!error && mode === 'testcases' && testOutput && (
                <div className="code-console-tests">
                  <div className={`code-console-summary ${testOutput.allPassed ? 'code-console-summary-passed' : 'code-console-summary-failed'}`}>
                    {testOutput.allPassed ? 'All test cases passed' : 'Some test cases failed'}
                  </div>

                  {showTestCases && (
                    <div className="code-console-results">
                      {testOutput.results.map((result) => (
                        <div
                          key={result.testCase}
                          className={`code-console-test ${result.passed && !result.error ? 'code-console-test-passed' : 'code-console-test-failed'}`}
                        >
                          <div className="code-console-test-head">
                            <span>Test Case {result.testCase}</span>
                            <span className="code-console-test-status">
                              {result.passed && !result.error ? 'Passed' : 'Failed'}
                            </span>
                          </div>
                          <div className="code-console-test-body">
                            <div className="code-console-kv"><span>Input</span><pre>{JSON.stringify(result.input, null, 2)}</pre></div>
                            <div className="code-console-kv"><span>Expected</span><pre>{JSON.stringify(result.expected, null, 2)}</pre></div>
                            <div className="code-console-kv"><span>Actual</span><pre>{JSON.stringify(result.actual, null, 2)}</pre></div>
                            {result.error && <div className="code-console-test-error">{result.error}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeRunner;


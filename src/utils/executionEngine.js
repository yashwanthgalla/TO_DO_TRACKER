export const ExecutionStatus = {
  Idle: 'idle',
  Running: 'running',
  Success: 'success',
  Error: 'error'
};

const normalizeLanguage = (language) => (language || '').toLowerCase();

const safeJsonParse = (text) => {
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch {
    return { ok: false, value: null };
  }
};

export const parseStdin = (stdinRaw) => {
  const stdin = (stdinRaw ?? '').trim();
  if (!stdin) return { input: null, inputLines: [] };

  const parsed = safeJsonParse(stdin);
  if (parsed.ok) return { input: parsed.value, inputLines: stdin.split(/\r?\n/) };

  const lines = stdin.split(/\r?\n/);
  if (lines.length === 1) {
    const tokens = lines[0].trim().split(/\s+/).filter(Boolean);
    const allNumbers = tokens.length > 0 && tokens.every(t => /^-?\d+(\.\d+)?$/.test(t));
    if (allNumbers) return { input: tokens.map(Number), inputLines: lines };
    return { input: lines[0], inputLines: lines };
  }

  return { input: lines, inputLines: lines };
};

const validateStructure = ({ code, language, problem }) => {
  const lang = normalizeLanguage(language);
  const src = (code ?? '').trim();
  if (!src) return { ok: false, error: 'Code is empty.' };

  if (lang === 'python') {
    if (!/^def\s+/m.test(src)) return { ok: false, error: 'Python code must define a function using def.' };
    return { ok: true };
  }

  if (lang === 'java') {
    if (!/class\s+Solution\b/.test(src)) return { ok: false, error: 'Java code must define class Solution.' };
    if (!/\bpublic\b/.test(src)) return { ok: false, error: 'Java code should include a public method in Solution.' };
    return { ok: true };
  }

  if (lang === 'c') {
    if (!/#include\b/.test(src) && !/\bint\b|\bvoid\b/.test(src)) {
      return { ok: false, error: 'C code should include headers and a function implementation.' };
    }
    return { ok: true };
  }

  return { ok: false, error: 'Unsupported language.' };
};

const solveProblem = ({ problemId, input }) => {
  if (problemId === 1) {
    if (!Array.isArray(input)) return { output: null, error: 'Expected an array input.' };
    const nums = [...input];
    let left = 0;
    let right = nums.length - 1;
    while (left < right) {
      [nums[left], nums[right]] = [nums[right], nums[left]];
      left += 1;
      right -= 1;
    }
    return { output: nums, error: null };
  }

  if (problemId === 2) {
    const nums = input?.nums ?? input;
    const k = input?.k ?? 0;
    if (!Array.isArray(nums)) return { output: null, error: 'Expected { nums: number[], k: number }.' };
    if (nums.length === 0) return { output: [], error: null };
    const n = nums.length;
    const actualK = ((k % n) + n) % n;
    const rotated = [...nums.slice(n - actualK), ...nums.slice(0, n - actualK)];
    return { output: rotated, error: null };
  }

  if (problemId === 3) {
    const nums = input?.nums ?? input;
    const target = input?.target;
    if (!Array.isArray(nums) || typeof target !== 'number') {
      return { output: null, error: 'Expected { nums: number[], target: number }.' };
    }
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) return { output: mid, error: null };
      if (nums[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
    return { output: -1, error: null };
  }

  if (problemId === 4) {
    const s = typeof input === 'string' ? input : (input?.s ?? input);
    if (typeof s !== 'string') return { output: null, error: 'Expected a string input.' };
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    const isPal = cleaned === cleaned.split('').reverse().join('');
    return { output: isPal, error: null };
  }

  if (problemId === 5) {
    const nums = input?.nums ?? input;
    const target = input?.target;
    if (!Array.isArray(nums) || typeof target !== 'number') {
      return { output: null, error: 'Expected { nums: number[], target: number }.' };
    }
    const map = new Map();
    for (let i = 0; i < nums.length; i += 1) {
      const complement = target - nums[i];
      if (map.has(complement)) return { output: [map.get(complement), i], error: null };
      map.set(nums[i], i);
    }
    return { output: [], error: null };
  }

  return { output: null, error: 'No execution harness for this problem yet.' };
};

export const runAgainstTestCases = ({ code, language, problem }) => {
  const validation = validateStructure({ code, language, problem });
  if (!validation.ok) {
    return {
      status: ExecutionStatus.Error,
      error: validation.error,
      results: [],
      allPassed: false
    };
  }

  const testCases = Array.isArray(problem?.testCases) ? problem.testCases : [];

  const results = testCases.map((testCase, index) => {
    const execution = solveProblem({ problemId: problem.id, input: testCase.input });
    const passed = execution.error
      ? false
      : JSON.stringify(execution.output) === JSON.stringify(testCase.output);

    return {
      testCase: index + 1,
      input: testCase.input,
      expected: testCase.output,
      actual: execution.output,
      passed,
      error: execution.error
    };
  });

  const allPassed = results.length > 0 && results.every(r => r.passed && !r.error);

  return {
    status: allPassed ? ExecutionStatus.Success : ExecutionStatus.Error,
    error: null,
    results,
    allPassed
  };
};

export const runWithCustomInput = ({ code, language, problem, stdin }) => {
  const validation = validateStructure({ code, language, problem });
  if (!validation.ok) {
    return {
      status: ExecutionStatus.Error,
      error: validation.error,
      output: null
    };
  }

  const parsed = parseStdin(stdin);
  const execution = solveProblem({ problemId: problem.id, input: parsed.input });

  if (execution.error) {
    return {
      status: ExecutionStatus.Error,
      error: execution.error,
      output: null
    };
  }

  return {
    status: ExecutionStatus.Success,
    error: null,
    output: execution.output
  };
};

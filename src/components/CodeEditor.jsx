import { useMemo, useState, useEffect, useRef } from 'react';
import './CodeEditor.css';
import { Icons } from '../utils/icons';

function CodeEditor({ code, language, onChange, onRun, onReset }) {
  const [localCode, setLocalCode] = useState(code);
  const textareaRef = useRef(null);
  const highlightRef = useRef(null);
  const gutterInnerRef = useRef(null);

  const lineCount = useMemo(() => {
    const value = localCode ?? '';
    return Math.max(1, value.split('\n').length);
  }, [localCode]);

  const escapeHtml = (text) => {
    return (text ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  const toHtml = (text) => escapeHtml(text).replace(/\n/g, '<br>');

  const javaKeywords = useMemo(
    () => [
      'public', 'private', 'protected', 'class', 'interface', 'extends', 'implements', 'static', 'final',
      'void', 'int', 'String', 'boolean', 'char', 'double', 'float', 'long', 'short', 'byte',
      'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'return',
      'try', 'catch', 'finally', 'throw', 'throws', 'new', 'this', 'super', 'import', 'package'
    ],
    []
  );

  const pythonKeywords = useMemo(
    () => [
      'def', 'class', 'if', 'elif', 'else', 'for', 'while', 'try', 'except', 'finally', 'with', 'as',
      'import', 'from', 'return', 'yield', 'pass', 'break', 'continue', 'and', 'or', 'not', 'in', 'is',
      'None', 'True', 'False', 'lambda', 'global', 'nonlocal', 'assert', 'raise', 'del', 'async', 'await'
    ],
    []
  );

  const highlightToHtml = (rawText, lang) => {
    const source = rawText ?? '';
    if (!source) return '';

    const isJava = lang === 'java';
    const keywords = isJava ? javaKeywords : pythonKeywords;
    const keywordAlt = keywords.join('|');

    const tokenRe = isJava
      ? new RegExp(
          `(/\\*[\\s\\S]*?\\*/|//.*$|\"(?:\\\\.|[^\"\\\\])*\"|'(?:\\\\.|[^'\\\\])*'|\\b\\d+\\b|\\b(?:${keywordAlt})\\b)`,
          'gm'
        )
      : new RegExp(
          `("\"\"[\\s\\S]*?\"\"\"|'''[\\s\\S]*?'''|#.*$|\"(?:\\\\.|[^\"\\\\])*\"|'(?:\\\\.|[^'\\\\])*'|\\b\\d+\\b|\\b(?:${keywordAlt})\\b)`,
          'gm'
        );

    let html = '';
    let lastIndex = 0;
    let match;

  
        const cKeywords = useMemo(
          () => [
            'auto', 'break', 'case', 'char', 'const', 'continue', 'default', 'do', 'double', 'else', 'enum',
            'extern', 'float', 'for', 'goto', 'if', 'inline', 'int', 'long', 'register', 'restrict', 'return',
            'short', 'signed', 'sizeof', 'static', 'struct', 'switch', 'typedef', 'union', 'unsigned',
            'void', 'volatile', 'while', '_Bool', '_Complex', '_Imaginary',
            'NULL', 'true', 'false',
            '#include', '#define'
          ],
          []
        );
    while ((match = tokenRe.exec(source)) !== null) {
      const index = match.index;
      const token = match[0];
      html += toHtml(source.slice(lastIndex, index));

      let cls = 'keyword';
      if (
        token.startsWith('//') ||
        token.startsWith('/*') ||
        token.startsWith('#') ||
        token.startsWith('"""') ||
        token.startsWith("'''")
      ) {
        cls = 'comment';
      } else if (token.startsWith('"') || token.startsWith("'")) {
        cls = 'string';
      } else if (/^\d+$/.test(token)) {
        cls = 'number';
      }

      html += `<span class="${cls}">${toHtml(token)}</span>`;
      lastIndex = index + token.length;
    }

    html += toHtml(source.slice(lastIndex));
    return html;
  };

  const indexToLetters = (index) => {
    let n = index;
    let s = '';
    while (n >= 0) {
      s = String.fromCharCode(65 + (n % 26)) + s;
      n = Math.floor(n / 26) - 1;
    }
    return s;
  };

  const highlightWithTokens = (rawText, lang) => {
    const languageKey = (lang || '').toLowerCase();
    const tokens = [];

    const pushToken = (type, content) => {
      const id = `@@${type}${indexToLetters(tokens.length)}@@`;
      tokens.push({ id, type, content });
      return id;
    };

    let working = rawText ?? '';

    if (languageKey === 'python') {
      working = working.replace(/("""[\s\S]*?"""|'''[\s\S]*?''')/g, (m) => pushToken('COM', m));
      working = working.replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, (m) => pushToken('STR', m));
      working = working.replace(/#.*/gm, (m) => pushToken('COM', m));
    } else {
      working = working.replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, (m) => pushToken('STR', m));
      working = working.replace(/\/\*[\s\S]*?\*\//g, (m) => pushToken('COM', m));
      working = working.replace(/\/\/.*/gm, (m) => pushToken('COM', m));
    }

    let highlighted = escapeHtml(working);

    const javaKeywords = ['public', 'private', 'protected', 'class', 'interface', 'extends', 'implements', 'static', 'final', 'void', 'int', 'String', 'boolean', 'char', 'double', 'float', 'long', 'short', 'byte', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'return', 'try', 'catch', 'finally', 'throw', 'throws', 'new', 'this', 'super', 'import', 'package'];
    const pythonKeywords = ['def', 'class', 'if', 'elif', 'else', 'for', 'while', 'try', 'except', 'finally', 'with', 'as', 'import', 'from', 'return', 'yield', 'pass', 'break', 'continue', 'and', 'or', 'not', 'in', 'is', 'None', 'True', 'False', 'lambda', 'global', 'nonlocal', 'assert', 'raise', 'del', 'async', 'await'];

    const keywords = languageKey === 'python' ? pythonKeywords : javaKeywords;

    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
      highlighted = highlighted.replace(regex, '<span class="keyword">$1</span>');
    });

    highlighted = highlighted.replace(/\b\d+(?:\.\d+)?\b/g, '<span class="number">$&</span>');

    for (const token of tokens) {
      const tokenHtml = escapeHtml(token.content);
      const className = token.type === 'COM' ? 'comment' : 'string';
      highlighted = highlighted.split(token.id).join(`<span class="${className}">${tokenHtml}</span>`);
    }

    return highlighted;
  };

  const highlightCode = (text, lang) => {
    if (!text) return '';

    const highlighted = highlightWithTokens(text, lang);
    return highlighted.replace(/\n/g, '<br>');
  };

  useEffect(() => {
    setLocalCode(code);
  }, [code]);

  useEffect(() => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.innerHTML = highlightToHtml(localCode, language);
    }
  }, [localCode, language]);

  const handleChange = (e) => {
    const newCode = e.target.value;
    setLocalCode(newCode);
    if (onChange) {
      onChange(newCode);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (onRun) onRun();
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = localCode.substring(0, start) + '    ' + localCode.substring(end);
      setLocalCode(newCode);
      if (onChange) {
        onChange(newCode);
      }
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleScroll = (e) => {
    const el = e.target;
    if (highlightRef.current) {
      highlightRef.current.style.transform = `translate(${-el.scrollLeft}px, ${-el.scrollTop}px)`;
    }
    if (gutterInnerRef.current) {
      gutterInnerRef.current.style.transform = `translateY(-${el.scrollTop}px)`;
    }
  };

  return (
    <div className="code-editor-container">
      <div className="code-editor-toolbar">
        <span className="code-editor-language">{language.toUpperCase()}</span>
        <div className="code-editor-buttons">
          <button className="code-editor-button code-editor-run" onClick={onRun}>
            {Icons.play}
            <span>Run</span>
          </button>
          <button className="code-editor-button code-editor-reset" onClick={onReset}>
            {Icons.refresh}
            <span>Reset</span>
          </button>
        </div>
      </div>
      <div className="code-editor-wrapper">
        <div className="code-editor-gutter" aria-hidden="true">
          <div className="code-editor-gutter-inner" ref={gutterInnerRef}>
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i} className="code-editor-line-number">{i + 1}</div>
            ))}
          </div>
        </div>
        <pre className="code-editor-highlight" ref={highlightRef}></pre>
        <textarea
          ref={textareaRef}
          className="code-editor-textarea"
          value={localCode}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          spellCheck={false}
        />
      </div>
    </div>
  );
}

export default CodeEditor;


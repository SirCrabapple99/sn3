const _console = document.getElementById('console')

window.onerror = function (message, source, lineno, colno, error) {
  const el = document.createElement('div');
  el.className = 'console_error mono';
  el.innerHTML = '⊗ ' + message.replace(/^Uncaught\s(Error|TypeError|ReferenceError|SyntaxError)?:?\s*/, '')
  _console.appendChild(el);
};

const originalWarn = console.warn;
console.warn = function (...args) {
  const el = document.createElement('div');
  el.className = 'console_warn mono';
  el.innerHTML = '▲ ' + args[0]

  _console.appendChild(el);

  originalWarn.apply(console, args);
};

const originalLog = console.log;
console.log = function (...args) {
  const el = document.createElement('div');
  el.className = 'console_log mono';
  el.innerHTML = ' ' + args[0]

  _console.appendChild(el);

  originalLog.apply(console, args);
};

console.log('console.js loaded')
console.warn('warn test')
throw new Error('error test')
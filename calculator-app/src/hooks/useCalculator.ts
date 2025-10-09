import { useState } from 'react';

export interface CalculatorState {
  current: string; // currently entered number or result
  previous: string | null; // stored operand
  operation: string | null; // + - × ÷
  overwrite: boolean; // if next digit should overwrite current
}

const initial: CalculatorState = {
  current: '0',
  previous: null,
  operation: null,
  overwrite: false,
};

function compute(a: string, b: string, op: string): string {
  const x = parseFloat(a);
  const y = parseFloat(b);
  if (isNaN(x) || isNaN(y)) return '0';
  let result: number;
  switch (op) {
    case '+': result = x + y; break;
    case '−': result = x - y; break;
    case '×': result = x * y; break;
    case '÷': result = y === 0 ? NaN : x / y; break;
    default: return '0';
  }
  if (!isFinite(result)) return 'Error';
  return String(result);
}

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>(initial);

  const inputDigit = (digit: string) => {
    setState(s => {
      if (s.overwrite) {
        return { ...s, current: digit === '.' ? '0.' : digit, overwrite: false };
      }
      if (digit === '.' && s.current.includes('.')) return s;
      if (s.current === '0' && digit !== '.') return { ...s, current: digit };
      return { ...s, current: s.current + digit };
    });
  };

  const chooseOperation = (op: string) => {
    setState(s => {
      if (s.previous == null) {
        return { current: '0', previous: s.current, operation: op, overwrite: true };
      }
      if (s.overwrite) {
        return { ...s, operation: op };
      }
      const result = compute(s.previous, s.current, s.operation!);
      return { current: '0', previous: result, operation: op, overwrite: true };
    });
  };

  const clear = () => setState(initial);

  const toggleSign = () => setState(s => ({ ...s, current: s.current.startsWith('-') ? s.current.slice(1) : (s.current === '0' ? '0' : '-' + s.current) }));

  const percent = () => setState(s => ({ ...s, current: String(parseFloat(s.current) / 100) }));

  const equals = () => {
    setState(s => {
      if (s.operation == null || s.previous == null) return s;
      const result = compute(s.previous, s.current, s.operation);
      return { current: result, previous: null, operation: null, overwrite: true };
    });
  };

  const press = (symbol: string) => {
    if (/^[0-9.]$/.test(symbol)) return inputDigit(symbol);
    switch (symbol) {
      case 'AC': return clear();
      case '±': return toggleSign();
      case '%': return percent();
      case '+':
      case '−':
      case '×':
      case '÷': return chooseOperation(symbol);
      case '=': return equals();
    }
  };

  return { state, press };
}

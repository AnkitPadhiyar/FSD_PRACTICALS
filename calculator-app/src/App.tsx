import React from 'react';
import { useCalculator } from './hooks/useCalculator';
import { Display } from './components/Display';
import { Keypad } from './components/Keypad';

export const App: React.FC = () => {
  const { state, press } = useCalculator();
  const buildDisplay = () => {
    if (state.previous && state.operation) {
      // show previous + operation + current (but avoid showing 0 when current is reset)
      const cur = state.current === '0' && state.overwrite ? '' : state.current;
      return `${state.previous}${state.operation}${cur}`;
    }
    return state.current;
  };

  return (
    <div className="calculator-wrapper">
      <Display value={buildDisplay()} />
      <Keypad onPress={press} />
    </div>
  );
};

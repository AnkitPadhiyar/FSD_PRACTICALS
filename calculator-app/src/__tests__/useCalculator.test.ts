import { renderHook, act } from '@testing-library/react';
import { useCalculator } from '../hooks/useCalculator';

function pressMany(press: (s: string)=>void, sequence: string) {
  sequence.split('').forEach(ch => press(ch));
}

describe('useCalculator', () => {
  it('enters digits and decimal', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => { pressMany(result.current.press, '12'); result.current.press('.'); result.current.press('3'); });
    expect(result.current.state.current).toBe('12.3');
  });

  it('clears', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => { result.current.press('9'); result.current.press('AC'); });
    expect(result.current.state.current).toBe('0');
  });

  it('adds numbers', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => { result.current.press('2'); result.current.press('+'); result.current.press('3'); result.current.press('='); });
    expect(result.current.state.current).toBe('5');
  });

  it('divides by zero produces Error', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => { result.current.press('8'); result.current.press('÷'); result.current.press('0'); result.current.press('='); });
    expect(result.current.state.current).toBe('Error');
  });
});

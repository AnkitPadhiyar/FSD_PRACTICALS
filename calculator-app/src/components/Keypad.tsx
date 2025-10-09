import React from 'react';

interface KeypadProps {
  onPress: (symbol: string) => void;
}

const keys: string[] = [
  'AC','±','%','÷',
  '7','8','9','×',
  '4','5','6','−',
  '1','2','3','+',
  '0','.','='
];

export const Keypad: React.FC<KeypadProps> = ({ onPress }) => {
  return (
    <div className="keypad">
      {keys.map(k => (
        <button
          key={k}
          className={`btn btn-${/^[0-9.]$/.test(k) ? 'num' : 'op'}${k==='=' ? ' btn-equals' : ''}`}
          onClick={() => onPress(k)}
          aria-label={`key-${k}`}
        >
          {k}
        </button>
      ))}
    </div>
  );
};

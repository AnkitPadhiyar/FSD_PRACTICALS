import React from 'react';

interface DisplayProps { value: string; }

export const Display: React.FC<DisplayProps> = ({ value }) => {
  return <div className="display" aria-label="calculator-display">{value}</div>;
};

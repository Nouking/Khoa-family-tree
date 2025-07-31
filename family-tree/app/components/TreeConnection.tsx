import React from 'react';

interface TreeConnectionProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  type: 'parent-child' | 'spouse';
}

const TreeConnection: React.FC<TreeConnectionProps> = ({
  from,
  to,
  type
}) => {
  const strokeColor = type === 'parent-child' ? '#3b82f6' : '#10b981';
  const strokeWidth = type === 'parent-child' ? 2 : 1;
  
  return (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeDasharray={type === 'spouse' ? '5,5' : 'none'}
      data-testid={`tree-connection-${type}`}
    />
  );
};

export default TreeConnection; 
import React, { memo, useMemo } from 'react';

interface TreeConnectionProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  type: 'parent-child' | 'spouse';
}

const TreeConnection: React.FC<TreeConnectionProps> = memo(({
  from,
  to,
  type
}) => {
  // Memoize visual properties to avoid recalculation
  const connectionProps = useMemo(() => ({
    strokeColor: type === 'parent-child' ? '#3b82f6' : '#10b981',
    strokeWidth: type === 'parent-child' ? 2 : 1,
    strokeDasharray: type === 'spouse' ? '5,5' : 'none'
  }), [type]);
  
  return (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={connectionProps.strokeColor}
      strokeWidth={connectionProps.strokeWidth}
      strokeDasharray={connectionProps.strokeDasharray}
      data-testid={`tree-connection-${type}`}
    />
  );
});

TreeConnection.displayName = 'TreeConnection';

export default TreeConnection; 
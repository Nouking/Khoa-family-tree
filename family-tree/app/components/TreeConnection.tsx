import React, { memo, useMemo } from 'react';

interface TreeConnectionProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  type: 'parent-child' | 'spouse';
}

const TreeConnection: React.FC<TreeConnectionProps> = memo(({ from, to, type }) => {
  // Memoize visual properties to avoid recalculation
  const connectionProps = useMemo(() => {
    const base = {
      parentStroke: 'var(--connection-parent, #3b82f6)',
      spouseStroke: 'var(--connection-spouse, #10b981)',
      parentWidth: 2,
      spouseWidth: 2,
    };
    return base;
  }, []);

  // Precompute double-line offset for spouse connections (perpendicular 2px)
  const spouseLines = useMemo(() => {
    if (type !== 'spouse') return null;

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.hypot(dx, dy) || 1;
    // Normal vector (unit)
    const nx = -dy / len;
    const ny = dx / len;
    const offset = 2; // px offset from center line for each parallel line

    const line1 = {
      x1: from.x + nx * offset,
      y1: from.y + ny * offset,
      x2: to.x + nx * offset,
      y2: to.y + ny * offset,
    };
    const line2 = {
      x1: from.x - nx * offset,
      y1: from.y - ny * offset,
      x2: to.x - nx * offset,
      y2: to.y - ny * offset,
    };
    return { line1, line2 };
  }, [from.x, from.y, to.x, to.y, type]);

  if (type === 'spouse' && spouseLines) {
    return (
      <g data-testid="tree-connection-spouse">
        <line
          x1={spouseLines.line1.x1}
          y1={spouseLines.line1.y1}
          x2={spouseLines.line1.x2}
          y2={spouseLines.line1.y2}
          stroke={connectionProps.spouseStroke}
          strokeWidth={connectionProps.spouseWidth}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="connection-line"
          data-testid="tree-connection-spouse-line"
        />
        <line
          x1={spouseLines.line2.x1}
          y1={spouseLines.line2.y1}
          x2={spouseLines.line2.x2}
          y2={spouseLines.line2.y2}
          stroke={connectionProps.spouseStroke}
          strokeWidth={connectionProps.spouseWidth}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="connection-line"
          data-testid="tree-connection-spouse-line"
        />
      </g>
    );
  }

  // Parent-child single line
  return (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={connectionProps.parentStroke}
      strokeWidth={connectionProps.parentWidth}
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
      className="connection-line"
      data-testid={`tree-connection-${type}`}
    />
  );
});

TreeConnection.displayName = 'TreeConnection';

export default TreeConnection; 
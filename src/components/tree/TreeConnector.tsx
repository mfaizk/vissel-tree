import { memo } from 'react';

interface TreeConnectorProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export const TreeConnector = memo(function TreeConnector({
  startX,
  startY,
  endX,
  endY,
}: TreeConnectorProps) {
  const midX = startX + (endX - startX) / 2;

  const pathD = `
    M ${startX} ${startY}
    L ${midX} ${startY}
    L ${midX} ${endY}
    L ${endX} ${endY}
  `;

  return (
    <path
      d={pathD}
      fill="none"
      stroke="hsl(var(--tree-line))"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-all duration-300"
    />
  );
});

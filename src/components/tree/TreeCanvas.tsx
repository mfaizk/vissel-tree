import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { HierarchyNode } from '@/types/hierarchy';
import { TreeNode } from './TreeNode';
import { TreeConnector } from './TreeConnector';

interface TreeCanvasProps {
  data: HierarchyNode;
  searchQuery: string;
  zoom: number;
}

interface NodePosition {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const NODE_WIDTH = 200;
const NODE_HEIGHT = 36;
const HORIZONTAL_SPACING = 60;
const VERTICAL_SPACING = 20;

export function TreeCanvas({ data, searchQuery, zoom }: TreeCanvasProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(['equipments', 'engine', 'main-engine-propulsion', 'main-engine', 'air-exhaust-system'])
  );
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [nodePositions, setNodePositions] = useState<Map<string, NodePosition>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleNode = useCallback((id: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const selectNode = useCallback((id: string) => {
    setSelectedNode(id);
  }, []);

  // Filter nodes based on search query
  const isNodeVisible = useCallback(
    (node: HierarchyNode): boolean => {
      if (!searchQuery) return true;
      
      const query = searchQuery.toLowerCase();
      const matchesName = node.name.toLowerCase().includes(query);
      
      if (matchesName) return true;
      
      // Check if any children match
      if (node.children) {
        return node.children.some((child) => isNodeVisible(child));
      }
      
      return false;
    },
    [searchQuery]
  );

  const isNodeHighlighted = useCallback(
    (node: HierarchyNode): boolean => {
      if (!searchQuery) return false;
      return node.name.toLowerCase().includes(searchQuery.toLowerCase());
    },
    [searchQuery]
  );

  // Calculate positions for all visible nodes
  const calculatePositions = useCallback(
    (
      node: HierarchyNode,
      x: number,
      y: number,
      positions: Map<string, NodePosition>
    ): number => {
      if (!isNodeVisible(node)) return y;

      positions.set(node.id, {
        id: node.id,
        x,
        y,
        width: NODE_WIDTH,
        height: NODE_HEIGHT,
      });

      let currentY = y;

      if (expandedNodes.has(node.id) && node.children) {
        const childX = x + NODE_WIDTH + HORIZONTAL_SPACING;
        
        node.children.forEach((child) => {
          if (isNodeVisible(child)) {
            currentY = calculatePositions(child, childX, currentY, positions);
            currentY += VERTICAL_SPACING;
          }
        });
        
        // Remove last spacing
        if (node.children.some((c) => isNodeVisible(c))) {
          currentY -= VERTICAL_SPACING;
        }
      }

      return Math.max(currentY, y);
    },
    [expandedNodes, isNodeVisible]
  );

  // Recalculate positions when state changes
  useEffect(() => {
    const positions = new Map<string, NodePosition>();
    calculatePositions(data, 50, 50, positions);
    setNodePositions(positions);
  }, [data, calculatePositions]);

  // Calculate connections between nodes
  const connections = useMemo(() => {
    const result: { from: string; to: string }[] = [];

    const addConnections = (node: HierarchyNode) => {
      if (!isNodeVisible(node)) return;
      
      if (expandedNodes.has(node.id) && node.children) {
        node.children.forEach((child) => {
          if (isNodeVisible(child)) {
            result.push({ from: node.id, to: child.id });
            addConnections(child);
          }
        });
      }
    };

    addConnections(data);
    return result;
  }, [data, expandedNodes, isNodeVisible]);

  // Render nodes recursively
  const renderNodes = useCallback(
    (node: HierarchyNode): React.ReactNode[] => {
      if (!isNodeVisible(node)) return [];

      const position = nodePositions.get(node.id);
      if (!position) return [];

      const nodes: React.ReactNode[] = [
        <div
          key={node.id}
          className="absolute transition-all duration-300 ease-out"
          style={{
            left: position.x,
            top: position.y,
            transform: `scale(${zoom})`,
            transformOrigin: 'left top',
          }}
        >
          <TreeNode
            node={node}
            isExpanded={expandedNodes.has(node.id)}
            isHighlighted={isNodeHighlighted(node)}
            onToggle={toggleNode}
            onSelect={selectNode}
          />
        </div>,
      ];

      if (expandedNodes.has(node.id) && node.children) {
        node.children.forEach((child) => {
          nodes.push(...renderNodes(child));
        });
      }

      return nodes;
    },
    [nodePositions, expandedNodes, isNodeVisible, isNodeHighlighted, toggleNode, selectNode, zoom]
  );

  // Calculate SVG dimensions
  const svgDimensions = useMemo(() => {
    let maxX = 0;
    let maxY = 0;

    nodePositions.forEach((pos) => {
      maxX = Math.max(maxX, pos.x + pos.width);
      maxY = Math.max(maxY, pos.y + pos.height);
    });

    return {
      width: (maxX + 100) * zoom,
      height: (maxY + 100) * zoom,
    };
  }, [nodePositions, zoom]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-auto scrollbar-thin tree-grid-bg bg-tree-background"
    >
      <div
        className="relative min-w-full min-h-full"
        style={{
          width: svgDimensions.width,
          height: svgDimensions.height,
        }}
      >
        {/* SVG for connections */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width={svgDimensions.width}
          height={svgDimensions.height}
          style={{ transform: `scale(${zoom})`, transformOrigin: 'left top' }}
        >
          {connections.map(({ from, to }) => {
            const fromPos = nodePositions.get(from);
            const toPos = nodePositions.get(to);

            if (!fromPos || !toPos) return null;

            return (
              <TreeConnector
                key={`${from}-${to}`}
                startX={fromPos.x + fromPos.width}
                startY={fromPos.y + fromPos.height / 2}
                endX={toPos.x}
                endY={toPos.y + toPos.height / 2}
              />
            );
          })}
        </svg>

        {/* Render nodes */}
        {renderNodes(data)}
      </div>
    </div>
  );
}

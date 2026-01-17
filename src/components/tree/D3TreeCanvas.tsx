import { useMemo, useCallback, useState } from "react";
import Tree, { RawNodeDatum, CustomNodeElementProps } from "react-d3-tree";
import { HierarchyNode, NodeType } from "@/types/hierarchy";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface D3TreeCanvasProps {
  data: HierarchyNode;
  searchQuery: string;
  zoom: number;
}

// Colors matching the Figma design exactly
const nodeColors: Record<
  NodeType,
  { bg: string; text: string; border?: string }
> = {
  "equipment-type": { bg: "#E57373", text: "#FFFFFF" }, // Coral red for categories like "Main Engine & Propulsion"
  equipment: { bg: "#B3C5E6", text: "#3D5A80" }, // Light blue for equipment like "Engine", "Deck"
  "equipment-draft": { bg: "#B3C5E6", text: "#3D5A80", border: "#7B9ACC" }, // Light blue with dashed border
  assembly: { bg: "#9E9E9E", text: "#FFFFFF" }, // Gray for assemblies like "Air & Exhaust System"
  "assembly-draft": { bg: "#9E9E9E", text: "#FFFFFF", border: "#757575" }, // Gray with dashed border
  component: { bg: "#64B5F6", text: "#FFFFFF" }, // Bright blue for components
  "component-draft": { bg: "#64B5F6", text: "#FFFFFF", border: "#1976D2" }, // Blue with border
};

// Convert HierarchyNode to RawNodeDatum format for react-d3-tree
function convertToD3Format(
  node: HierarchyNode,
  searchQuery: string
): RawNodeDatum & {
  attributes: {
    type: NodeType;
    id: string;
    isHighlighted: boolean;
  };
} {
  const isHighlighted = searchQuery
    ? node.name.toLowerCase().includes(searchQuery.toLowerCase())
    : false;

  return {
    name: node.name,
    attributes: {
      type: node.type,
      id: node.id,
      isHighlighted,
    },
    children: node.children?.map((child) =>
      convertToD3Format(child, searchQuery)
    ),
  };
}

// Custom node rendering to match Figma design
function CustomNode({ nodeDatum, toggleNode }: CustomNodeElementProps) {
  const attrs = nodeDatum.attributes as
    | { type: NodeType; id: string; isHighlighted: boolean }
    | undefined;
  const nodeType = attrs?.type || "component";
  const isHighlighted = attrs?.isHighlighted || false;
  const hasChildren = nodeDatum.children && nodeDatum.children.length > 0;
  const colors = nodeColors[nodeType];
  const isCollapsed = nodeDatum.__rd3t?.collapsed;
  const isDraft = nodeType.includes("draft");

  // Calculate text width to size the node appropriately
  const textLength = nodeDatum.name.length;
  const nodeWidth = Math.max(120, Math.min(220, textLength * 9 + 50));

  return (
    <g>
      {/* Node pill shape */}
      <foreignObject
        width={nodeWidth + 30}
        height={36}
        x={-nodeWidth / 2}
        y={-18}
        style={{ overflow: "visible" }}
      >
        <div className="flex items-center">
          {/* Main node pill */}
          <div
            className={cn(
              "flex items-center justify-center px-4 py-2 cursor-pointer",
              "transition-all duration-150 ease-out",
              "hover:shadow-lg hover:scale-[1.02]",
              "text-sm font-medium whitespace-nowrap",
              isHighlighted && "ring-2 ring-offset-2 ring-yellow-400",
              isDraft ? "border-2 border-dashed" : "shadow-sm"
            )}
            style={{
              backgroundColor: colors.bg,
              color: colors.text,
              borderRadius: "20px",
              borderColor: isDraft ? colors.border : "transparent",
              minWidth: `${nodeWidth}px`,
            }}
          >
            <span className="truncate">{nodeDatum.name}</span>
          </div>

          {/* External expand/collapse button */}
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleNode?.();
              }}
              className={cn(
                "flex items-center justify-center w-6 h-6 rounded-full -ml-3",
                "bg-white border-2 shadow-sm",
                "hover:shadow-md hover:scale-110 transition-all duration-150",
                "z-10"
              )}
              style={{
                borderColor: colors.bg,
                color: colors.bg,
              }}
            >
              {isCollapsed ? (
                <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
              ) : (
                <Minus className="w-3.5 h-3.5" strokeWidth={2.5} />
              )}
            </button>
          )}
        </div>
      </foreignObject>
    </g>
  );
}

export function D3TreeCanvas({ data, searchQuery, zoom }: D3TreeCanvasProps) {
  const [, setSelectedNode] = useState<string | null>(null);

  // Convert data to D3 format
  const treeData = useMemo(() => {
    return convertToD3Format(data, searchQuery);
  }, [data, searchQuery]);

  // Orthogonal path function (step-like connections as shown in Figma)
  const stepPathFunc = useCallback(
    (linkDatum: {
      source: { x: number; y: number };
      target: { x: number; y: number };
    }) => {
      const { source, target } = linkDatum;
      const midY = source.y + 60; // Horizontal distance before turning
      return `M${source.y},${source.x} H${midY} V${target.x} H${target.y}`;
    },
    []
  );

  // Calculate translate to center tree
  const translate = useMemo(() => ({ x: 120, y: 300 }), []);

  return (
    <div className="w-full h-full tree-grid-bg bg-tree-background">
      <Tree
        data={treeData}
        orientation="horizontal"
        translate={translate}
        zoom={zoom}
        scaleExtent={{ min: 0.1, max: 2 }}
        nodeSize={{ x: 400, y: 180 }}
        separation={{ siblings: 1, nonSiblings: 1.2 }}
        // pathFunc={stepPathFunc}
        pathClassFunc={() => "tree-connection-path"}
        renderCustomNodeElement={(props) => <CustomNode {...props} />}
        enableLegacyTransitions
        transitionDuration={300}
        collapsible
        initialDepth={3}
        rootNodeClassName="tree-root-node"
        branchNodeClassName="tree-branch-node"
        leafNodeClassName="tree-leaf-node"
      />
    </div>
  );
}

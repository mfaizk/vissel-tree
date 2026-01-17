import { memo } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HierarchyNode, NodeType } from '@/types/hierarchy';

interface TreeNodeProps {
  node: HierarchyNode;
  isExpanded: boolean;
  isHighlighted: boolean;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
}

const nodeStyles: Record<NodeType, string> = {
  'equipment-type': 'bg-node-equipment-type text-node-equipment-type-foreground',
  'equipment': 'bg-node-equipment text-node-equipment-foreground',
  'equipment-draft': 'bg-node-equipment-draft text-node-equipment-draft-foreground',
  'assembly': 'bg-node-assembly text-node-assembly-foreground',
  'assembly-draft': 'bg-node-assembly-draft text-node-assembly-draft-foreground',
  'component': 'bg-node-component text-node-component-foreground',
  'component-draft': 'bg-node-component-draft text-node-component-draft-foreground',
};

export const TreeNode = memo(function TreeNode({
  node,
  isExpanded,
  isHighlighted,
  onToggle,
  onSelect,
}: TreeNodeProps) {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div
      className={cn(
        'relative flex items-center gap-1 px-3 py-1.5 rounded-md cursor-pointer',
        'transition-all duration-150 ease-out',
        'hover:shadow-md hover:scale-[1.02]',
        'text-sm font-medium whitespace-nowrap',
        'animate-scale-in',
        nodeStyles[node.type],
        isHighlighted && 'ring-2 ring-offset-2 ring-primary'
      )}
      onClick={() => onSelect(node.id)}
    >
      <span className="truncate max-w-[180px]">{node.name}</span>
      
      {hasChildren && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(node.id);
          }}
          className={cn(
            'ml-1 flex items-center justify-center w-5 h-5 rounded-full',
            'bg-white/20 hover:bg-white/30 transition-colors',
            'text-current'
          )}
        >
          {isExpanded ? (
            <Minus className="w-3 h-3" />
          ) : (
            <Plus className="w-3 h-3" />
          )}
        </button>
      )}
    </div>
  );
});

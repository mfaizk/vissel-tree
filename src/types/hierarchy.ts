export type NodeType = 
  | 'equipment-type' 
  | 'equipment' 
  | 'equipment-draft'
  | 'assembly' 
  | 'assembly-draft'
  | 'component'
  | 'component-draft';

export interface HierarchyNode {
  id: string;
  name: string;
  type: NodeType;
  children?: HierarchyNode[];
}

export interface TreeState {
  expandedNodes: Set<string>;
  selectedNode: string | null;
}

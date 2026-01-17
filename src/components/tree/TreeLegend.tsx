import { cn } from '@/lib/utils';

const legendItems = [
  { label: 'Equipment Type', color: 'bg-node-equipment-type' },
  { label: 'Equipment', color: 'bg-node-equipment' },
  { label: 'Equipment (Draft)', color: 'bg-node-equipment-draft' },
  { label: 'Assembly', color: 'bg-node-assembly' },
  { label: 'Assembly (Draft)', color: 'bg-node-assembly-draft' },
  { label: 'Component', color: 'bg-node-component' },
  { label: 'Component (Draft)', color: 'bg-node-component-draft' },
];

export function TreeLegend() {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      {legendItems.map((item) => (
        <div key={item.label} className="flex items-center gap-1.5">
          <div className={cn('w-3 h-3 rounded-sm', item.color)} />
          <span className="text-xs text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface TreeSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function TreeSearch({ value, onChange }: TreeSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 w-48 h-9 bg-card border-border"
      />
    </div>
  );
}

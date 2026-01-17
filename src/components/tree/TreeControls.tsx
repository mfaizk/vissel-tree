import { Plus, Minus, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TreeControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitToScreen: () => void;
}

export function TreeControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onFitToScreen,
}: TreeControlsProps) {
  return (
    <div className="flex items-center gap-1 bg-card border border-border rounded-md p-1">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onZoomIn}
        disabled={zoom >= 2}
      >
        <Plus className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onZoomOut}
        disabled={zoom <= 0.5}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onFitToScreen}
      >
        <Maximize2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

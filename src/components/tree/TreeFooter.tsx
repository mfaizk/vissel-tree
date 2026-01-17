import { ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { TreeBreadcrumb } from './TreeBreadcrumb';
import { TreeLegend } from './TreeLegend';
import { TreeControls } from './TreeControls';
import { cn } from '@/lib/utils';

interface TreeFooterProps {
  breadcrumbPath: string[];
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitToScreen: () => void;
}

export function TreeFooter({
  breadcrumbPath,
  zoom,
  onZoomIn,
  onZoomOut,
  onFitToScreen,
}: TreeFooterProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="border-t border-border bg-card">
      {/* Toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-center py-1 hover:bg-muted/50 transition-colors"
      >
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {/* Footer content */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isExpanded ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 pb-3 flex items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <TreeBreadcrumb path={breadcrumbPath} />
            <TreeLegend />
          </div>
          <TreeControls
            zoom={zoom}
            onZoomIn={onZoomIn}
            onZoomOut={onZoomOut}
            onFitToScreen={onFitToScreen}
          />
        </div>
      </div>
    </div>
  );
}

import { useState, useCallback } from 'react';
import { D3TreeCanvas } from './tree/D3TreeCanvas';
import { TreeSearch } from './tree/TreeSearch';
import { TreeFooter } from './tree/TreeFooter';
import { TreeBreadcrumb } from './tree/TreeBreadcrumb';
import { vesselHierarchyData } from '@/data/vesselHierarchy';

export function VesselHierarchyTree() {
  const [searchQuery, setSearchQuery] = useState('');
  const [zoom, setZoom] = useState(1);

  const breadcrumbPath = [
    'Fleet management',
    'Sagar Kanya',
    'Vessel Hierarchy Tree',
  ];

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.1, 2));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5));
  }, []);

  const handleFitToScreen = useCallback(() => {
    setZoom(1);
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <TreeBreadcrumb path={breadcrumbPath} />
      </div>

      {/* Search bar */}
      <div className="px-4 py-3 bg-card">
        <TreeSearch value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Tree canvas */}
      <div className="flex-1 overflow-hidden">
        <D3TreeCanvas
          data={vesselHierarchyData}
          searchQuery={searchQuery}
          zoom={zoom}
        />
      </div>

      {/* Footer */}
      <TreeFooter
        breadcrumbPath={[
          'Equipments',
          'Engine',
          'Main Engine & Propulsion',
          'Main Engine',
          'Air & Exhaust System',
          'ME Turbocharger',
        ]}
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onFitToScreen={handleFitToScreen}
      />

      {/* Copyright */}
      <div className="px-4 py-2 text-right border-t border-border bg-card">
        <span className="text-xs text-muted-foreground">
          <span className="text-primary">3S</span> Smart Ship Solutions © 2025
        </span>
      </div>
    </div>
  );
}

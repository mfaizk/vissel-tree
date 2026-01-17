import { AppSidebar } from '@/components/layout/AppSidebar';
import { VesselHierarchyTree } from '@/components/VesselHierarchyTree';

const Index = () => {
  return (
    <div className="flex h-screen w-full bg-background">
      <AppSidebar />
      <main className="flex-1 overflow-hidden">
        <VesselHierarchyTree />
      </main>
    </div>
  );
};

export default Index;

import { useState } from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  Clock,
  Droplet,
  BookOpen,
  Calendar,
  Users,
  FileText,
  Ship,
  Settings,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href?: string;
  hasSubmenu?: boolean;
  isActive?: boolean;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: ClipboardList, label: 'Planned Maintenance', hasSubmenu: true },
  { icon: Package, label: 'Spares Inventory', hasSubmenu: true },
  { icon: Clock, label: 'Machinery Running Hrs', hasSubmenu: true },
  { icon: Droplet, label: 'Lube Oil Summary', hasSubmenu: true },
  { icon: BookOpen, label: 'Library', hasSubmenu: true },
  { icon: Calendar, label: 'PMS Calender', href: '/pms-calendar' },
  { icon: Users, label: 'User Management Roles', hasSubmenu: true },
  { icon: FileText, label: 'Reports', hasSubmenu: true },
  { icon: Ship, label: 'Fleet Management', href: '/', isActive: true },
  { icon: Settings, label: 'Settings', hasSubmenu: true },
];

export function AppSidebar() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleItem = (label: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  return (
    <aside className="w-60 h-screen bg-sidebar flex flex-col border-r border-sidebar-border">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold">
            <span className="text-primary">3</span>
            <span className="text-node-equipment-type">S</span>
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-semibold text-foreground">SMART SHIP</span>
            <span className="text-xs font-semibold text-foreground">SOLUTIONS</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 scrollbar-thin">
        {navItems.map((item) => (
          <div key={item.label}>
            <button
              onClick={() => item.hasSubmenu && toggleItem(item.label)}
              className={cn(
                'w-full flex items-center justify-between px-4 py-2.5 text-sm',
                'transition-colors duration-150',
                item.isActive
                  ? 'text-sidebar-accent-foreground bg-sidebar-accent border-l-2 border-primary'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </div>
              {item.hasSubmenu && (
                <span className="text-muted-foreground">
                  {expandedItems.has(item.label) ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </span>
              )}
            </button>
          </div>
        ))}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">shadcn</p>
            <p className="text-xs text-muted-foreground">Super Admin</p>
          </div>
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      {/* Footer branding */}
      <div className="px-4 pb-4 border-t border-sidebar-border pt-3">
        <p className="text-lg font-bold text-primary">Stream.</p>
        <p className="text-[10px] text-muted-foreground">
          powered by <span className="text-primary">3S</span> Smart Ships Solutions
        </p>
        <p className="text-[10px] text-muted-foreground">version 0.0.1</p>
      </div>
    </aside>
  );
}

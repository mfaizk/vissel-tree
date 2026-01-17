import { ChevronRight } from 'lucide-react';

interface TreeBreadcrumbProps {
  path: string[];
}

export function TreeBreadcrumb({ path }: TreeBreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1 text-sm">
      {path.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          {index > 0 && (
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
          )}
          <span
            className={
              index === path.length - 1
                ? 'text-primary font-medium'
                : 'text-muted-foreground hover:text-foreground cursor-pointer'
            }
          >
            {item}
          </span>
        </div>
      ))}
    </nav>
  );
}

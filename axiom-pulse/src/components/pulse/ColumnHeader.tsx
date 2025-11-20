import { ColumnType } from '@/types';
import { Filter, Layers } from 'lucide-react';

export const ColumnHeader = ({ 
  title, 
  count, 
  activeFilter, 
  onFilterChange 
}: { 
  title: ColumnType; 
  count: number; 
  activeFilter: string;
  onFilterChange: (f: string) => void;
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-axiom-border bg-background/95 backdrop-blur sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-bold text-white">{title}</h2>
        <span className="text-xs text-axiom-muted bg-axiom-card px-1.5 py-0.5 rounded">{count}</span>
      </div>
      
      <div className="flex items-center gap-1">
        {['P1', 'P2', 'P3'].map((f) => (
            <button
                key={f}
                onClick={() => onFilterChange(f)}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                    activeFilter === f 
                    ? 'bg-axiom-primary/20 text-axiom-primary border border-axiom-primary/30' 
                    : 'text-axiom-muted hover:text-white'
                }`}
            >
                {f}
            </button>
        ))}
      </div>
    </div>
  );
};
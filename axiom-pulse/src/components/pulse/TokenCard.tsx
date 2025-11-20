import React, { memo, useEffect, useState, useRef } from 'react';
import { TokenType } from '@/types';
import { cn, formatCurrency, formatTimeAgo } from '@/lib/utils';
import { User, Globe, Link as LinkIcon, Zap, ShieldCheck, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Hook for flash effect
function usePriceHighlight(value: number) {
  const [color, setColor] = useState<'text-axiom-green' | 'text-axiom-red' | 'text-axiom-cyan'>('text-axiom-cyan');
  const prevValue = useRef(value);

  useEffect(() => {
    if (value > prevValue.current) {
      setColor('text-axiom-green');
      setTimeout(() => setColor('text-axiom-cyan'), 600);
    } else if (value < prevValue.current) {
      setColor('text-axiom-red');
      setTimeout(() => setColor('text-axiom-cyan'), 600);
    }
    prevValue.current = value;
  }, [value]);

  return color;
}

export const TokenCard = memo(({ token, onClick }: { token: TokenType; onClick: () => void }) => {
  const mcapColor = usePriceHighlight(token.mcap);

  return (
    <div 
      onClick={onClick}
      className="group relative flex items-start gap-3 p-3 bg-axiom-card hover:bg-axiom-cardHover border-b border-axiom-border cursor-pointer transition-all duration-200"
    >
      {/* Left: Image */}
      <div className="relative shrink-0">
        <img 
          src={token.image} 
          alt={token.name} 
          className="w-12 h-12 rounded-md object-cover border border-axiom-border group-hover:border-axiom-muted/50 transition-colors" 
        />
      </div>

      {/* Middle: Content */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        {/* Row 1: Name & Stats Header */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-sm text-white tracking-tight">{token.name}</span>
            <span className="text-[10px] text-axiom-muted truncate max-w-[100px]">{token.subtitle}</span>
          </div>
          
          <div className="text-right leading-tight">
            <div className={cn("font-bold text-sm transition-colors duration-500", mcapColor)}>
              <span className="text-[10px] mr-0.5 text-axiom-muted">$</span>
              {formatCurrency(token.mcap).replace('$', '')}
            </div>
            <div className="text-[10px] text-axiom-muted">V {formatCurrency(token.volume)}</div>
          </div>
        </div>

        {/* Row 2: Meta (Time, Icons, Tx) */}
        <div className="flex items-center justify-between text-[10px] text-axiom-muted mt-1">
          <div className="flex items-center gap-2">
            <span className="text-axiom-green font-medium">{formatTimeAgo((Date.now() - token.launchedAt) / 1000)}</span>
            
            {/* Icons */}
            <div className="flex items-center gap-1.5 text-axiom-muted/60">
              <User size={10} />
              <span className="text-axiom-muted">{token.holders}</span>
              <Globe size={10} />
              <LinkIcon size={10} />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-axiom-primary/80">F {token.topHolders.toFixed(2)}</span>
            <div className="flex flex-col items-end leading-none">
               <span>TX {token.transactions}</span>
               {/* Tiny progress bar mimic */}
               <div className="w-6 h-0.5 bg-axiom-border rounded-full mt-0.5 overflow-hidden">
                 <div className="h-full bg-axiom-cyan w-2/3"></div>
               </div>
            </div>
          </div>
        </div>

        {/* Row 3: Badges */}
        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
          <Badge variant={token.priceChange.m5 > 0 ? "green" : "red"}>
            {token.priceChange.m5 > 0 ? '+' : ''}{token.priceChange.m5.toFixed(0)}%
          </Badge>
          
          {token.priceChange.h1 > 0 && (
             <Badge variant="green" className="gap-1">
               <TrendingUp size={8} /> 10%
             </Badge>
          )}

          {token.badges.map(b => (
            <Badge key={b} variant="outline" className="text-[9px] px-1">{b}</Badge>
          ))}
        </div>
      </div>

      {/* Right: Action Button / Badge */}
      <div className="flex flex-col items-end justify-between h-full pl-1 border-l border-transparent md:border-axiom-border/30">
        {/* Quick Buy Button */}
        <button className="flex items-center justify-center bg-axiom-primary/20 hover:bg-axiom-primary/30 text-axiom-primary rounded-full p-1.5 md:rounded-md md:px-2 md:py-1 transition-colors">
            <Zap size={12} className="fill-current" />
            <span className="hidden md:inline ml-1 text-[10px] font-bold">0 SOL</span>
        </button>
      </div>
    </div>
  );
});

TokenCard.displayName = "TokenCard";
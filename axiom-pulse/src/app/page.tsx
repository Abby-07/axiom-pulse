"use client";

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setMobileTab } from '@/store/pulseSlice';
import { useTokens } from '@/hooks/useMockData';
import { useSocket } from '@/hooks/useSocket';
import { TokenCard } from '@/components/pulse/TokenCard';
import { ColumnHeader } from '@/components/pulse/ColumnHeader';
import { ColumnType, TokenType } from '@/types';
import { ChevronDown, Search, Bell, Settings, Wallet, Star, BarChart2, Activity } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

// --- Components Defined OUTSIDE to prevent re-render flickering ---

const TopNav = () => (
  <header className="h-14 border-b border-axiom-border bg-axiom-card flex items-center justify-between px-4 shrink-0">
    <div className="flex items-center gap-6">
       <div className="w-8 h-8 bg-gradient-to-br from-white to-gray-400 rounded-full" />
       <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-axiom-muted">
          <span className="hover:text-white cursor-pointer">Discover</span>
          <span className="text-axiom-primary border-b-2 border-axiom-primary h-14 flex items-center px-1">Pulse</span>
          <span className="hover:text-white cursor-pointer">Trackers</span>
          <span className="hover:text-white cursor-pointer">Perpetuals</span>
       </nav>
    </div>

    <div className="flex items-center gap-3">
       <button className="bg-axiom-card hover:bg-axiom-border border border-axiom-border rounded-full px-3 py-1.5 flex items-center gap-2 text-xs font-bold text-white transition-colors">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
          SOL
          <ChevronDown size={12} />
       </button>
       <button className="hidden md:block bg-gradient-to-r from-blue-600 to-axiom-primary hover:opacity-90 text-white text-xs font-bold px-4 py-1.5 rounded-full transition-opacity">
          Deposit
       </button>
       <div className="flex items-center gap-3 text-axiom-muted ml-2">
          <Star size={18} className="hover:text-white cursor-pointer"/>
          <Bell size={18} className="hover:text-white cursor-pointer"/>
          <Wallet size={18} className="hover:text-white cursor-pointer"/>
          <Settings size={18} className="hover:text-white cursor-pointer"/>
       </div>
    </div>
  </header>
);

const MobileBottomNav = () => {
  const active = "text-white";
  const inactive = "text-axiom-muted";
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-axiom-card border-t border-axiom-border flex items-center justify-around z-50 pb-2">
        <div className={`flex flex-col items-center gap-1 ${inactive}`}>
            <Activity size={20} />
            <span className="text-[10px]">Trending</span>
        </div>
        <div className={`flex flex-col items-center gap-1 ${inactive}`}>
            <Search size={20} />
            <span className="text-[10px]">Track</span>
        </div>
        <div className={`flex flex-col items-center gap-1 ${active}`}>
            <div className="relative">
                 <div className="absolute -top-1 -right-1 w-2 h-2 bg-axiom-primary rounded-full animate-pulse"/>
                 <Activity size={20} className="fill-current text-axiom-primary" />
            </div>
            <span className="text-[10px] font-bold text-axiom-primary">Pulse</span>
        </div>
         <div className={`flex flex-col items-center gap-1 ${inactive}`}>
            <BarChart2 size={20} />
            <span className="text-[10px]">Perps</span>
        </div>
         <div className={`flex flex-col items-center gap-1 ${inactive}`}>
            <UserIcon />
            <span className="text-[10px]">Account</span>
        </div>
    </div>
  );
};

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
)

// STABLE COMPONENT: Mobile Tabs
const MobileTabSwitcher = ({ activeTab, onTabChange }: { activeTab: ColumnType, onTabChange: (t: ColumnType) => void }) => (
  <div className="md:hidden px-4 py-3 bg-background border-b border-axiom-border sticky top-0 z-20">
    <div className="flex p-1 bg-axiom-card rounded-lg">
      {(["New Pairs", "Final Stretch", "Migrated"] as ColumnType[]).map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onTabChange(tab)}
          className={cn(
            "flex-1 py-1.5 text-xs font-medium rounded-md transition-all select-none touch-manipulation",
            activeTab === tab ? "bg-axiom-border text-white shadow-sm" : "text-axiom-muted hover:text-gray-300"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  </div>
);

// STABLE COMPONENT: Column
const TokenColumn = ({ 
    title, 
    data, 
    isVisibleOnMobile, 
    isLoading, 
    onTokenClick 
}: { 
    title: ColumnType, 
    data: TokenType[], 
    isVisibleOnMobile: boolean, 
    isLoading: boolean,
    onTokenClick: (t: TokenType) => void 
}) => {
    return (
      <div
        className={cn(
          "flex-1 flex-col min-w-0 border-r border-axiom-border last:border-r-0 h-full",
          isVisibleOnMobile ? "flex" : "hidden md:flex"
        )}
      >
        <ColumnHeader
          title={title}
          count={data.length}
          activeFilter="P1"
          onFilterChange={() => {}}
        />
        <div className="flex-1 overflow-y-auto custom-scrollbar pb-20 md:pb-0">
          {isLoading ? (
            <div className="p-4 space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 bg-axiom-card animate-pulse rounded-md relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                </div>
              ))}
            </div>
          ) : (
            data.map((token) => (
              <TokenCard key={token.id} token={token} onClick={() => onTokenClick(token)} />
            ))
          )}

          {!isLoading && data.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-axiom-muted">
              <Search size={32} className="mb-2 opacity-50" />
              <span className="text-sm">No pairs found</span>
            </div>
          )}
        </div>
      </div>
    );
};


// --- Main Page Component ---

export default function PulsePage() {
  const { data: tokens, isLoading } = useTokens();
  useSocket(); 

  const dispatch = useDispatch();
  const mobileTab = useSelector((state: RootState) => state.pulse.mobileActiveTab);
  const [selectedToken, setSelectedToken] = useState<TokenType | null>(null);

  // Filter buckets
  const newPairs = tokens?.filter(t => t.status === "New Pairs") || [];
  const finalStretch = tokens?.filter(t => t.status === "Final Stretch") || [];
  const migrated = tokens?.filter(t => t.status === "Migrated") || [];

  return (
    <main className="flex flex-col h-[100dvh] bg-background text-foreground">
      <TopNav />
      
      {/* Secondary Status Bar */}
      <div className="hidden md:flex items-center justify-between px-4 py-1 bg-[#050505] border-b border-axiom-border text-[10px] text-axiom-muted/70">
         <div className="flex items-center gap-4">
             <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-axiom-green" />
                <span>Connection is stable</span>
             </div>
             <span>GLOBAL</span>
         </div>
         <div className="flex items-center gap-4 uppercase tracking-wider">
            <span>Wallet</span>
            <span>Twitter</span>
            <span>PnL</span>
         </div>
      </div>

      <MobileTabSwitcher activeTab={mobileTab} onTabChange={(t) => dispatch(setMobileTab(t))} />

      {/* Columns Container */}
      <div className="flex-1 flex overflow-hidden relative">
         <TokenColumn 
            title="New Pairs" 
            data={newPairs} 
            isVisibleOnMobile={mobileTab === "New Pairs"} 
            isLoading={isLoading}
            onTokenClick={setSelectedToken}
         />
         <TokenColumn 
            title="Final Stretch" 
            data={finalStretch} 
            isVisibleOnMobile={mobileTab === "Final Stretch"} 
            isLoading={isLoading}
            onTokenClick={setSelectedToken}
         />
         <TokenColumn 
            title="Migrated" 
            data={migrated} 
            isVisibleOnMobile={mobileTab === "Migrated"} 
            isLoading={isLoading}
            onTokenClick={setSelectedToken}
         />
      </div>

      <MobileBottomNav />

      {/* Token Detail Modal */}
      {selectedToken && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center sm:justify-end bg-black/50 backdrop-blur-sm" onClick={() => setSelectedToken(null)}>
            <div className="w-full md:w-[400px] h-[80vh] md:h-screen bg-axiom-card border-l border-axiom-border p-6 overflow-y-auto animate-in slide-in-from-bottom-10 md:slide-in-from-right-10" onClick={e => e.stopPropagation()}>
                <div className="flex items-center gap-4 mb-6">
                    <img src={selectedToken.image} className="w-16 h-16 rounded-lg" />
                    <div>
                        <h1 className="text-2xl font-bold">{selectedToken.name}</h1>
                        <p className="text-axiom-muted">{selectedToken.symbol}</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="p-4 bg-background rounded border border-axiom-border">
                        <div className="text-xs text-axiom-muted mb-1">Market Cap</div>
                        <div className="text-xl font-bold text-axiom-cyan">{formatCurrency(selectedToken.mcap)}</div>
                    </div>
                     <div className="p-4 bg-background rounded border border-axiom-border">
                        <div className="text-xs text-axiom-muted mb-1">Volume</div>
                        <div className="text-xl font-bold text-white">{formatCurrency(selectedToken.volume)}</div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </main>
  );
}
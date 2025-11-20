import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { TokenType } from "@/types";

const MOCK_TOKENS: TokenType[] = Array.from({ length: 30 }).map((_, i) => ({
  id: `token-${i}`,
  name: i % 3 === 0 ? "SANDWICH" : i % 3 === 1 ? "PEPE" : "SOLANA",
  symbol: i % 3 === 0 ? "MEV" : "PEPE",
  subtitle: "Community Takeover",
  address: "8sR...pump",
  image: `https://api.dicebear.com/7.x/shapes/svg?seed=${i}`,
  mcap: Math.random() * 50000,
  volume: Math.random() * 10000,
  launchedAt: Date.now() - Math.random() * 1000000,
  holders: Math.floor(Math.random() * 200),
  transactions: Math.floor(Math.random() * 50),
  topHolders: Math.random(),
  badges: Math.random() > 0.5 ? ["DS 2mo"] : [],
  priceChange: {
    m5: (Math.random() * 20) - 10,
    h1: (Math.random() * 50) - 20,
  },
  security: {
    isSafe: Math.random() > 0.2,
    hasAudit: true,
  },
  status: i < 10 ? "New Pairs" : i < 20 ? "Final Stretch" : "Migrated",
}));

export const useTokens = () => {
  return useQuery({
    queryKey: ["tokens"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return MOCK_TOKENS;
    },
    staleTime: Infinity,
  });
};

export const usePriceUpdates = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.setQueryData(["tokens"], (old: TokenType[] | undefined) => {
        if (!old) return old;
        const newTokens = [...old];
        for (let k = 0; k < 3; k++) {
            const idx = Math.floor(Math.random() * newTokens.length);
            const token = { ...newTokens[idx] };
            const change = (Math.random() - 0.5) * 100;
            token.mcap += change;
            newTokens[idx] = token;
        }
        return newTokens;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [queryClient]);
};
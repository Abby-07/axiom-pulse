"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { TokenType } from "@/types";

export function useSocket() {
  const qc = useQueryClient();

  useEffect(() => {
    // Simulate fast socket updates locally (works on Vercel)
    const interval = setInterval(() => {
      qc.setQueryData<TokenType[] | undefined>(["tokens"], (old) => {
        if (!old) return old;
        
        // Clone array to trigger React update
        const newTokens = [...old];
        
        // Update 3 random tokens per tick (200ms)
        for (let i = 0; i < 3; i++) {
           const idx = Math.floor(Math.random() * newTokens.length);
           if (newTokens[idx]) {
              const token = { ...newTokens[idx] };
              const delta = (Math.random() - 0.5) * 500; // Random price jump
              token.mcap = Math.max(0, token.mcap + delta);
              newTokens[idx] = token;
           }
        }
        return newTokens;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [qc]);
}
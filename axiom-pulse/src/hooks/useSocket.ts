"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { TokenType } from "@/types";

export function useSocket(url = "ws://localhost:4000") {
  const qc = useQueryClient();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        if (msg?.type === "priceUpdate") {
          qc.setQueryData<TokenType[] | undefined>(["tokens"], (old) => {
            if (!old) return old;
            return old.map((t) =>
              t.id === msg.id 
                ? { ...t, mcap: Math.max(0, t.mcap + (msg.delta || 0)) } 
                : t
            );
          });
        }
      } catch {
        // ignore malformed
      }
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [qc, url]);
}
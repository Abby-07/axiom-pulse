// Node-only WebSocket mock server. Run with: node server\ws-server.js
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 4000 }, () =>
  console.log("WS mock server listening on ws://localhost:4000")
);

function makeUpdate(id) {
  return {
    type: "priceUpdate",
    id,
    delta: (Math.random() - 0.5) * 200,
  };
}

wss.on("connection", (ws) => {
  console.log("client connected");

  const interval = setInterval(() => {
    const id = `token-${Math.floor(Math.random() * 30)}`;
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(makeUpdate(id)));
    }
  }, 1500);

  ws.on("close", () => {
    clearInterval(interval);
    console.log("client disconnected");
  });

  ws.on("error", () => {
    clearInterval(interval);
    console.log("client error/closed");
  });
});


// Client hook to integrate WS updates into React Query
// import { useEffect, useRef } from "react";
// import { useQueryClient } from "@tanstack/react-query";
// import type { TokenType } from "@/types";

// export function useSocket(url = "ws://localhost:4000") {
//   const qc = useQueryClient();
//   const wsRef = useRef<WebSocket | null>(null);

//   useEffect(() => {
//     const ws = new WebSocket(url);
//     wsRef.current = ws;

//     ws.onopen = () => {
//       // console.log("ws open");
//     };

//     ws.onmessage = (ev) => {
//       try {
//         const msg = JSON.parse(ev.data);
//         if (msg?.type === "priceUpdate") {
//           qc.setQueryData<TokenType[] | undefined>(["tokens"], (old) => {
//             if (!old) return old;
//             return old.map((t) =>
//               t.id === msg.id ? { ...t, mcap: Math.max(0, t.mcap + (msg.delta || 0)) } : t
//             );
//           });
//         }
//       } catch {
//         // ignore
//       }
//     };

//     return () => {
//       ws.close();
//       wsRef.current = null;
//     };
//   }, [qc, url]);
// }

// // ...existing code...
// import { useSocket } from "@/hooks/useSocket";
// // ...existing code...
// // replace usePriceUpdates(); with:
// useSocket(); // connects to ws://localhost:4000 and updates query cache
// // ...existing code...
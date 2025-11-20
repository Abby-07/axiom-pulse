export type TokenType = {
  id: string;
  name: string;
  symbol: string; // e.g., "SANDWICH"
  subtitle: string; // e.g., "The MEV attack"
  address: string;
  image: string;
  mcap: number;
  volume: number;
  launchedAt: number; // Timestamp
  holders: number;
  transactions: number;
  topHolders: number; // F indicator
  badges: string[]; // 'DS 2mo', 'Renounced'
  priceChange: {
    m5: number; // 5 mins
    h1: number; // 1 hour
  };
  security: {
    isSafe: boolean;
    hasAudit: boolean;
  };
  status: "New Pairs" | "Final Stretch" | "Migrated";
};

export type ColumnType = "New Pairs" | "Final Stretch" | "Migrated";
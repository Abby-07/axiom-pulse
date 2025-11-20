import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColumnType } from "@/types";

interface PulseState {
  mobileActiveTab: ColumnType;
  filters: {
    p1: boolean;
    p2: boolean;
    p3: boolean;
  };
  sort: "time" | "mcap" | "volume";
}

const initialState: PulseState = {
  mobileActiveTab: "New Pairs",
  filters: { p1: true, p2: false, p3: false },
  sort: "time",
};

const pulseSlice = createSlice({
  name: "pulse",
  initialState,
  reducers: {
    setMobileTab: (state, action: PayloadAction<ColumnType>) => {
      state.mobileActiveTab = action.payload;
    },
    toggleFilter: (state, action: PayloadAction<"p1" | "p2" | "p3">) => {
      state.filters[action.payload] = !state.filters[action.payload];
    },
  },
});

export const { setMobileTab, toggleFilter } = pulseSlice.actions;
export default pulseSlice.reducer;
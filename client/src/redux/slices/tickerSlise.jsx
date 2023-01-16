import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  deletedItems: [],
  status: "loading",
};

export const tickerSlise = createSlice({
  name: "ticker",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload.filter(
        (item) => !state.deletedItems.includes(item.ticker)
      );
    },
    setDeletedItems: (state, action) => {
      state.deletedItems = action.payload;
    },
  },
});

export const { setItems, setDeletedItems } = tickerSlise.actions;

export default tickerSlise.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import openSocket from "socket.io-client";


export const getItems = createAsyncThunk("ticker/getItemsStatus", () => {
    const socket = openSocket("http://localhost:4000");
    socket.emit("start");
    socket.on("ticker", function (response) {
      const res = response.filter(
        (item) => !initialState.deletedItems.includes(item.ticker)
      );
      console.log(res);
      return res;
    });
  });

const initialState = {
  items: [],
  deletedItems: [],
  status: 'loading'
};

export const tickerSlise = createSlice({
  name: "ticker",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setDeletedItems: (state, action) => {
      state.deletedItems = action.payload;
    },
  },
  extraReducers: {
    [getItems.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [getItems.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [getItems.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});


export const { setItems, setDeletedItems } = tickerSlise.actions;

export default tickerSlise.reducer;

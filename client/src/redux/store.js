import { configureStore } from "@reduxjs/toolkit";
import tickerReducer from './slices/tickerSlise'

export const store = configureStore({
  reducer: {
    ticker : tickerReducer
  },
});

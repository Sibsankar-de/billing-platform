import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./features/productSlice";
import userReducer from "./features/userSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      product: productReducer,
      user: userReducer,
    },
  });
}

const store = makeStore();

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

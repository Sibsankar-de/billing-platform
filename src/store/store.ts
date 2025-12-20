import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./features/productSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      product: productReducer,
    },
  });
}

const store = makeStore();

export default store;

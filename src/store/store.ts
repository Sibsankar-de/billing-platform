import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./features/productSlice";
import userReducer from "./features/userSlice";
import storeReducer from "./features/storeSlice";
import currentStoreReducer from "./features/currentStoreSlice";
import invoiceReducer from "./features/invoiceSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      product: productReducer,
      user: userReducer,
      store: storeReducer,
      currentStore: currentStoreReducer,
      invoice: invoiceReducer,
    },
  });
}

const store = makeStore();

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

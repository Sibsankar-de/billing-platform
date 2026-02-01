import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type GlobalError = {
  status: number;
  message: string;
};

const initialState = {
  data: {} as GlobalError,
};

const globalErrorSlice = createSlice({
  name: "global-error",
  initialState,
  reducers: {
    setGlobalError: (state, action) => {
      state.data = action.payload;
    },
    clearGlobalError: () => {},
  },
});

export const { setGlobalError, clearGlobalError } = globalErrorSlice.actions;
export const selectGlobalErrorState = (state: RootState) => state.globalError;
export default globalErrorSlice.reducer;

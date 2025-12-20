import { createAsyncThunk, WritableDraft } from "@reduxjs/toolkit";

export const createApiThunk = (type: string, func: (payload?: any) => Promise<any>) => {
  return createAsyncThunk(type, async (payload, { rejectWithValue }) => {
    try {
      const response = await func(payload);
      console.log(response.data);
      
      return response.data;
    } catch (err) {
      const error = err as any;
      return rejectWithValue(error.response?.data || error.message);
    }
  });
};


export const setState = (
    state: WritableDraft<any>,
    action: { type: string, payload: any },
    key: string = "status"
): void => {
    if (action.type.endsWith("/pending")) {
        state[key] = "loading";
        state.error = null;
    } else if (action.type.endsWith("/fulfilled")) {
        state[key] = "success";
        state.data = action.payload;
        state.error = null;
    } else if (action.type.endsWith("/rejected")) {
        state[key] = "failed";
        state.error = action.payload;
    }
};
import { InvoiceDto } from "@/types/dto/invoiceDto";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createApiThunk, setState } from "../utils";
import api from "@/configs/axios-config";

const initialState = {
  data: {
    invoiceList: [] as InvoiceDto[],
  },
  status: "idle",
  createStatus: "idle",
  error: null,
};

export const createInvoiceThunk: any = createApiThunk(
  "/invoices/create",
  async (payload: any) =>
    await api.post(`/invoice/${payload.storeId}/create`, payload)
);

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createInvoiceThunk.pending, (state, action) =>
        setState(state, action, "createStatus")
      )
      .addCase(createInvoiceThunk.rejected, (state, action) =>
        setState(state, action, "createStatus")
      )
      .addCase(createInvoiceThunk.fulfilled, (state, action) => {
        state.createStatus = "success";
        state.data.invoiceList.push(action.payload);
        state.error = null;
      });
  },
});

export const selectInvoiceState = (state: RootState) => state.invoice;
export default invoiceSlice.reducer;

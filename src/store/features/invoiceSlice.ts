import { InvoiceDto } from "@/types/dto/invoiceDto";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  concatPaginatedData,
  createApiThunk,
  setState,
  transformPaginatedResponse,
} from "../utils";
import api from "@/configs/axios-config";
import { PaginatedPages } from "@/types/PageableType";

const initialState = {
  data: {
    invoiceListData: {
      pages: {} as PaginatedPages<InvoiceDto>,
      totalDocs: 0,
      totalPages: 0,
    },
  },
  status: "idle",
  createStatus: "idle",
  error: null,
};

export const fetchInvoiceListThunk: any = createApiThunk(
  "/invoices/list",
  async (payload: any) =>
    await api.get(
      `/invoices/${payload.storeId}/list?page=${payload.page}&limit=${payload.limit}`,
    ),
);

export const createInvoiceThunk: any = createApiThunk(
  "/invoices/create",
  async (payload: any) =>
    await api.post(`/invoices/${payload.storeId}/create`, payload),
);

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createInvoiceThunk.pending, (state, action) =>
        setState(state, action, "createStatus"),
      )
      .addCase(createInvoiceThunk.rejected, (state, action) =>
        setState(state, action, "createStatus"),
      )
      .addCase(createInvoiceThunk.fulfilled, (state, action) => {
        state.createStatus = "success";
        state.data.invoiceListData = concatPaginatedData(
          state.data.invoiceListData,
          action.payload,
        );
        state.error = null;
      })
      .addCase(fetchInvoiceListThunk.pending, setState)
      .addCase(fetchInvoiceListThunk.rejected, setState)
      .addCase(fetchInvoiceListThunk.fulfilled, (state, action) => {
        state.status = "success";
        const { docs, pageable } = transformPaginatedResponse(action.payload);
        state.data.invoiceListData = {
          pages: {
            ...state.data.invoiceListData.pages,
            [pageable.page]: {
              docs: docs as InvoiceDto[],
              pageable,
            },
          },
          totalDocs: pageable.totalDocs,
          totalPages: pageable.totalPages,
        };
        state.error = null;
      });
  },
});

export const selectInvoiceState = (state: RootState) => state.invoice;
export default invoiceSlice.reducer;

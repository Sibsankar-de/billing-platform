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
  updateStatus: "idle",
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

export const updateInvoiceDueThunk: any = createApiThunk(
  "/invoices/update-due",
  async (payload: any) =>
    await api.patch(
      `/invoices/${payload.storeId}/${payload.invoiceId}/update-due`,
      payload,
    ),
);

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    updateInvoiceDue: (state, action) => {
      const { page, invoiceId, newDueAmount } = action.payload;
      const pageData = state.data.invoiceListData.pages[page];
      if (pageData) {
        const invoiceIndex = pageData.docs.findIndex(
          (inv) => inv._id === invoiceId,
        );
        if (invoiceIndex !== -1) {
          pageData.docs[invoiceIndex].dueAmount = newDueAmount;
        }
      }
    },
  },
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
      })
      .addCase(updateInvoiceDueThunk.pending, (state, action) =>
        setState(state, action, "updateStatus"),
      )
      .addCase(updateInvoiceDueThunk.rejected, (state, action) =>
        setState(state, action, "updateStatus"),
      )
      .addCase(updateInvoiceDueThunk.fulfilled, (state, action) => {
        state.updateStatus = "success";
        state.error = null;
      });
  },
});

export const selectInvoiceState = (state: RootState) => state.invoice;
export const { updateInvoiceDue } = invoiceSlice.actions;
export default invoiceSlice.reducer;

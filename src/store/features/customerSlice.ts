import api from "@/configs/axios-config";
import { CustomerDto } from "@/types/dto/customerDto";
import { PaginatedPages } from "@/types/PageableType";
import { createApiThunk, setState, transformPaginatedResponse } from "../utils";
import { createSlice } from "@reduxjs/toolkit";

export const fetchCustomerListThunk: any = createApiThunk(
  "/customers/list",
  async (payload: any) =>
    await api.get(
      `/customers/${payload.storeId}/list?page=${payload.page}&limit=${payload.limit}`,
    ),
);

const initialState = {
  data: {
    customerListData: {
      pages: {} as PaginatedPages<CustomerDto>,
      totalDocs: 0,
      totalPages: 0,
    },
  },
  status: "idle",
  createStatus: "idle",
  error: null,
};

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCustomerListThunk.pending, setState)
      .addCase(fetchCustomerListThunk.rejected, setState)
      .addCase(fetchCustomerListThunk.fulfilled, (state, action) => {
        state.status = "success";
        const { docs, pageable } = transformPaginatedResponse(action.payload);
        state.data.customerListData = {
          pages: {
            ...state.data.customerListData.pages,
            [pageable.page]: {
              docs: docs as CustomerDto[],
              pageable,
            },
          },
          totalDocs: action.payload.totalDocs,
          totalPages: action.payload.totalPages,
        };
        state.error = null;
      });
  },
});

export const selectCustomerState = (state: any) => state.customers;
export default customerSlice.reducer;

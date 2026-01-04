import { StoreDto } from "@/types/dto/storeDto";
import { createSlice } from "@reduxjs/toolkit";
import { createApiThunk, setState } from "../utils";
import api from "@/configs/axios-config";
import { RootState } from "../store";
import { CustomerDto } from "@/types/dto/customerDto";

export const fetchStoreList: any = createApiThunk(
  "/stores/list",
  async () => await api.get("/stores/list")
);

export const fetchCurrentStore: any = createApiThunk(
  "/stores/current-store",
  async (storeId) => await api.get(`/stores/${storeId}`)
);

export const createNewStoreThunk: any = createApiThunk(
  "/stores/create",
  async (payload) => await api.post("/stores/create", payload)
);

export const fetchCustomerList: any = createApiThunk(
  "/stores/customers",
  async (storeId: string) => await api.get(`/stores/${storeId}/customer-list`)
);

const initialState = {
  data: {
    storeList: [] as StoreDto[],
    currentStore: {} as StoreDto,
    customerList: [] as CustomerDto[],
  },
  status: "idle",
  createStatus: "idle",
  customerStatus: "idle",
  error: null,
};

const storeSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    setCurrentStore: (state, action) => {
      state.data.currentStore = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchStoreList.pending, setState)
      .addCase(fetchStoreList.rejected, setState)
      .addCase(fetchStoreList.fulfilled, (state, action) => {
        state.status = "success";
        state.data.storeList = action.payload;
        state.error = null;
      })
      .addCase(fetchCurrentStore.pending, setState)
      .addCase(fetchCurrentStore.rejected, setState)
      .addCase(fetchCurrentStore.fulfilled, (state, action) => {
        state.status = "success";
        state.data.currentStore = action.payload;
        state.error = null;
      })
      .addCase(createNewStoreThunk.pending, (state, action) =>
        setState(state, action, "createStatus")
      )
      .addCase(createNewStoreThunk.rejected, (state, action) =>
        setState(state, action, "createStatus")
      )
      .addCase(createNewStoreThunk.fulfilled, (state, action) => {
        state.createStatus = "success";
        state.data.storeList.push(action.payload);
        state.error = null;
      })
      .addCase(fetchCustomerList.pending, (state, action) =>
        setState(state, action, "customerStatus")
      )
      .addCase(fetchCustomerList.rejected, (state, action) =>
        setState(state, action, "customerStatus")
      )
      .addCase(fetchCustomerList.fulfilled, (state, action) => {
        state.customerStatus = "success";
        state.data.customerList = action.payload;
        state.error = null;
      });
  },
});

export const selectStoreState = (state: RootState) => state.store;
export const { setCurrentStore } = storeSlice.actions;
export default storeSlice.reducer;

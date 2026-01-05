import { CustomerDto } from "@/types/dto/customerDto";
import { StoreDto } from "@/types/dto/storeDto";
import { createApiThunk, setState } from "../utils";
import api from "@/configs/axios-config";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const fetchCurrentStore: any = createApiThunk(
  "/current-store/store",
  async (storeId: string) => await api.get(`/stores/${storeId}`)
);

export const fetchCustomerList: any = createApiThunk(
  "/current-store/customers",
  async (storeId: string) => await api.get(`/stores/${storeId}/customer-list`)
);

export const updateStoreDetailsThunk: any = createApiThunk(
  "/current-store/update-store-details",
  async (data: { storeId: string; updateData: Partial<StoreDto> }) =>
    await api.post(`/stores/${data.storeId}/update`, data.updateData)
);

export const updateStoreSettingsThunk: any = createApiThunk(
  "/current-store/update-store-settings",
  async (data: { storeId: string; updateData: Partial<StoreDto> }) =>
    await api.post(`/stores/${data.storeId}/update-settings`, data.updateData)
);

const initialState = {
  data: {
    currentStore: {} as StoreDto,
    customerList: [] as CustomerDto[],
  },
  status: "idle",
  customerStatus: "idle",
  storeUpdateStatus: "idle",
  settingsUpdateStatus: "idle",
  error: null,
};

const currentStoreSlice = createSlice({
  name: "currentStore",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentStore.pending, setState)
      .addCase(fetchCurrentStore.rejected, setState)
      .addCase(fetchCurrentStore.fulfilled, (state, action) => {
        state.status = "success";
        state.data.currentStore = action.payload;
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
      })
      .addCase(updateStoreDetailsThunk.pending, (state, action) =>
        setState(state, action, "storeUpdateStatus")
      )
      .addCase(updateStoreDetailsThunk.rejected, (state, action) =>
        setState(state, action, "storeUpdateStatus")
      )
      .addCase(updateStoreDetailsThunk.fulfilled, (state, action) => {
        state.storeUpdateStatus = "success";
        state.data.currentStore = action.payload;
        state.error = null;
      })
      .addCase(updateStoreSettingsThunk.pending, (state, action) =>
        setState(state, action, "settingsUpdateStatus")
      )
      .addCase(updateStoreSettingsThunk.rejected, (state, action) =>
        setState(state, action, "settingsUpdateStatus")
      )
      .addCase(updateStoreSettingsThunk.fulfilled, (state, action) => {
        state.settingsUpdateStatus = "success";
        state.data.currentStore = action.payload;
        state.error = null;
      });
  },
});

export const selectCurrentStoreState = (state: RootState) => state.currentStore;
export default currentStoreSlice.reducer;

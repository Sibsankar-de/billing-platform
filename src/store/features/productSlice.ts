import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApiThunk, setState } from "../utils";
import api from "@/configs/axios-config";
import { ProductDto } from "@/types/dto/productDto";

export const fetchProducts: any = createApiThunk(
  "products/list",
  async (storeId) => await api.get(`/stores/${storeId}/product-list`)
);

const initialState = {
  data: [] as ProductDto[],
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, setState)
      .addCase(fetchProducts.rejected, setState)
      .addCase(fetchProducts.fulfilled, setState);
  },
});

export default productSlice.reducer;

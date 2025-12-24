import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApiThunk, setState } from "../utils";
import api from "@/configs/axios-config";
import { ProductDto } from "@/types/dto/productDto";
import { RootState } from "../store";

export const fetchProducts: any = createApiThunk(
  "products/list",
  async (storeId) => await api.get(`/stores/${storeId}/product-list`)
);

export const addNewProductThunk: any = createApiThunk(
  "/products/create",
  async (payload) => await api.post("/products/create", payload)
);

const initialState = {
  data: [] as ProductDto[],
  status: "idle",
  createStatus: "idle",
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
      .addCase(fetchProducts.fulfilled, setState)
      .addCase(addNewProductThunk.pending, (state, action) =>
        setState(state, action, "createStatus")
      )
      .addCase(addNewProductThunk.rejected, (state, action) =>
        setState(state, action, "createStatus")
      )
      .addCase(addNewProductThunk.fulfilled, (state, action) => {
        state.createStatus = "success";
        state.error = null;
        state.data.push(action.payload);
      });
  },
});

export const getProductById = (state: RootState, id: string) =>
  state.product.data.find((e) => e._id === id);

export const selectProductState = (state: RootState) => state.product;
export default productSlice.reducer;

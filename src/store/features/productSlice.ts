import { createSlice } from "@reduxjs/toolkit";
import { createApiThunk, setState } from "../utils";
import api from "@/configs/axios-config";
import { ProductDto } from "@/types/dto/productDto";
import { RootState } from "../store";
import { CategoryDto } from "@/types/dto/categoryDto";

export const fetchProducts: any = createApiThunk(
  "products/list",
  async (storeId) => await api.get(`/stores/${storeId}/product-list`)
);

export const addNewProductThunk: any = createApiThunk(
  "/products/create",
  async (payload) => await api.post("/products/create", payload)
);

export const updateProductThunk: any = createApiThunk(
  "/products/update",
  async (payload) =>
    await api.post(`/products/${payload.productId}/update`, payload)
);

export const deleteProductThunk: any = createApiThunk(
  "/products/delete",
  async (payload) => await api.delete(`/products/${payload.productId}/delete`)
);

export const fetchCategoriesThunk: any = createApiThunk(
  "categories/list",
  async (storeId) => await api.get(`/stores/${storeId}/category-list`)
);

export const createCategoryThunk: any = createApiThunk(
  "categories/create",
  async (payload) =>
    await api.post(`/stores/${payload.storeId}/add-category`, payload)
);

const initialState = {
  data: {
    productList: [] as ProductDto[],
    categoryList: [] as CategoryDto[],
  },
  status: "idle",
  createStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",
  categoryStatus: "idle",
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
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.error = null;
        state.data.productList = action.payload;
      })
      .addCase(addNewProductThunk.pending, (state, action) =>
        setState(state, action, "createStatus")
      )
      .addCase(addNewProductThunk.rejected, (state, action) =>
        setState(state, action, "createStatus")
      )
      .addCase(addNewProductThunk.fulfilled, (state, action) => {
        state.createStatus = "success";
        state.error = null;
        state.data.productList.push(action.payload);
      })
      .addCase(updateProductThunk.pending, (state, action) =>
        setState(state, action, "updateStatus")
      )
      .addCase(updateProductThunk.rejected, (state, action) =>
        setState(state, action, "updateStatus")
      )
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.updateStatus = "success";
        state.error = null;
        const updatedProduct = action.payload;
        const p_index = state.data.productList.findIndex(
          (p) => p._id === updatedProduct._id
        );
        if (p_index !== -1) {
          state.data.productList[p_index] = updatedProduct;
        }
      })

      .addCase(deleteProductThunk.pending, (state, action) =>
        setState(state, action, "deleteStatus")
      )
      .addCase(deleteProductThunk.rejected, (state, action) =>
        setState(state, action, "deleteStatus")
      )
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.deleteStatus = "success";
        state.error = null;
        state.data.productList = state.data.productList.filter(
          (e) => e._id !== action.payload?.productId
        );
      })
      .addCase(fetchCategoriesThunk.pending, (state, action) =>
        setState(state, action, "categoryStatus")
      )
      .addCase(fetchCategoriesThunk.rejected, (state, action) =>
        setState(state, action, "categoryStatus")
      )
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        state.categoryStatus = "success";
        state.error = null;
        state.data.categoryList = action.payload;
      })
      .addCase(createCategoryThunk.pending, (state, action) =>
        setState(state, action, "categoryStatus")
      )
      .addCase(createCategoryThunk.rejected, (state, action) =>
        setState(state, action, "categoryStatus")
      )
      .addCase(createCategoryThunk.fulfilled, (state, action) => {
        state.categoryStatus = "success";
        state.error = null;
        state.data.categoryList.push(action.payload);
      });
  },
});

export const selectProductState = (state: RootState) => state.product;
export default productSlice.reducer;

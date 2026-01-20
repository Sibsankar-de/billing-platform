import {
  defaultPage,
  PageableType,
  PaginatedListData,
} from "@/types/PageableType";
import { PaginateResponseType } from "@/types/PaginatedResponseType";
import { createAsyncThunk, WritableDraft } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const createApiThunk = (
  type: string,
  func: (payload?: any) => Promise<any>,
) => {
  return createAsyncThunk(type, async (payload: any, { rejectWithValue }) => {
    try {
      const response = await func(payload);
      return response.data.data;
    } catch (err) {
      const error = err as any;
      return rejectWithValue(error.response?.data || error.message);
    }
  });
};

export const setState = (
  state: WritableDraft<any>,
  action: { type: string; payload: any },
  key: string = "status",
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
    toast.error(action.payload?.message || "Something went wrong!");
  }
};

export function concatPaginatedData<T>(
  listData: PaginatedListData<T>,
  doc: T,
): PaginatedListData<T> {
  const pages = listData.pages;

  // ✅ If no pages exist, create page 1
  if (Object.keys(pages).length === 0) {
    return {
      ...listData,
      pages: {
        1: {
          docs: [doc],
          pageable: { ...defaultPage, page: 1 },
        },
      },
    };
  }

  // ✅ Find the last page
  const lastPage = Math.max(...Object.keys(pages).map(Number));

  return {
    ...listData,
    pages: {
      ...pages,
      [lastPage]: {
        ...pages[lastPage],
        docs: [...pages[lastPage].docs, doc], // ✅ add doc at last
      },
    },
  };
}

export function transformPaginatedResponse<T>(
  response: PaginateResponseType<T>,
): { docs: T[]; pageable: PageableType } {
  return {
    docs: response.docs || [],
    pageable: {
      page: response.page,
      limit: response.limit,
      totalPages: response.totalPages,
      totalDocs: response.totalDocs,
    },
  };
}

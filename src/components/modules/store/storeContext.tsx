"use client";

import {
  fetchCategoriesThunk,
  fetchProducts,
  selectProductState,
} from "@/store/features/productSlice";
import {
  fetchCustomerList,
  selectStoreState,
} from "@/store/features/storeSlice";
import { useParams } from "next/navigation";
import React, { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const storeContext = createContext<undefined>(undefined);

export const StoreContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const params = useParams();
  const storeId = params?.store_id;
  const dispatch = useDispatch();
  const { status: listStatus, categoryStatus } =
    useSelector(selectProductState);

  const { customerStatus } = useSelector(selectStoreState);

  useEffect(() => {
    if (storeId && (listStatus === "idle" || listStatus === "success")) {
      dispatch(fetchProducts(storeId));
    }
    if (categoryStatus === "idle") {
      dispatch(fetchCategoriesThunk(storeId));
    }
    if (customerStatus === "idle") {
      dispatch(fetchCustomerList(storeId));
    }
  }, [storeId, dispatch]);

  return (
    <storeContext.Provider value={undefined}>{children}</storeContext.Provider>
  );
};

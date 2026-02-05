"use client";

import { AccessDeniedComponent } from "@/components/layout/AccessDeniedComponent";
import { selectGlobalErrorState } from "@/store/features/globalErrorSlice";
import React, { createContext } from "react";
import { useSelector } from "react-redux";

const StoreContentContext = createContext<null>(null);

export const StoreContentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: globalError } = useSelector(selectGlobalErrorState);

  function getChildren() {
    switch (globalError?.status) {
      case 403:
        return <AccessDeniedComponent />;

      default:
        return children;
    }
  }
  return (
    <StoreContentContext.Provider value={null}>
      {getChildren()}
    </StoreContentContext.Provider>
  );
};

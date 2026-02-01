"use client";

import { AccessDeniedComponent } from "@/components/layout/AccessDeniedComponent";
import { selectGlobalErrorState } from "@/store/features/globalErrorSlice";
import React, { createContext } from "react";
import { useSelector } from "react-redux";

const MainContentContext = createContext<null>(null);

export const MainContentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: globalError } = useSelector(selectGlobalErrorState);

  console.log(globalError);
  

  function getChildren() {
    switch (globalError?.status) {
      case 403:
        return <AccessDeniedComponent />;

      default:
        return children;
    }
  }
  return (
    <MainContentContext.Provider value={null}>
      {getChildren()}
    </MainContentContext.Provider>
  );
};

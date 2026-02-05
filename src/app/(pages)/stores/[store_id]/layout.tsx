import { AccessDeniedComponent } from "@/components/layout/AccessDeniedComponent";
import { HeaderNavbar, Sidebar } from "@/components/layout/navbar";
import { StoreContentProvider } from "@/components/modules/store/StoreContentProvider";
import { StoreContextProvider } from "@/components/modules/store/storeContext";
import React from "react";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreContextProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <HeaderNavbar />
          <main className="flex-1 overflow-y-auto">
            <StoreContentProvider>{children}</StoreContentProvider>
          </main>
        </div>
      </div>
    </StoreContextProvider>
  );
}

"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const PreAuthPageLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { isAuthenticated, isAuthChecking } = useAuth();
  if (!isAuthChecking && !isAuthenticated) {
    return children;
  }

  useEffect(() => {
    router.push("/profile");
  }, [router]);

  return null;
};

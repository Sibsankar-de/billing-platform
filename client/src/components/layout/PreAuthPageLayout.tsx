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
    if (!isAuthChecking && isAuthenticated) {
      const searchParams = new URLSearchParams(window.location.search);
      const redirectParam = searchParams.get("redirect");
      const redirectTo = (redirectParam && redirectParam.startsWith('/')) ? redirectParam : "/profile";
      router.push(redirectTo);
    }
  }, [router, isAuthenticated, isAuthChecking]);

  return null;
};

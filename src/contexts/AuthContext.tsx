"use client";

import api from "@/configs/axios-config";
import { AppDispatch } from "@/store/store";
import { UserDto } from "@/types/dto/userDto";
import { requestHandler } from "@/utils/api-request";
import React, { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser, setCurrentUser } from "@/store/features/userSlice";

type AuthContextTypes = {
  isAuthenticated: boolean;
  isAuthChecking: boolean;
  registerUser: (payload: any) => void;
  loginUser: (payload: any) => void;
  logoutUser: () => void;
};

const AuthContext = createContext<AuthContextTypes | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [user, setUser] = useState<UserDto>({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(false);

  // fetch current user
  useEffect(() => {
    dispatch(fetchCurrentUser())
      .unwrap()
      .then(() => {
        setIsAuthenticated(true);
      });
  }, [dispatch]);

  const registerUser = requestHandler(async (payload) => {
    await api.post("/users/register", payload).then(async () => {
      await loginUser(payload);
    });
  });

  const loginUser = requestHandler(async (payload) => {
    await api.post("/users/login", payload).then(() => {
      window.location.href = `${window.location.origin}/profile`;
    });
  });

  const logoutUser = requestHandler(async () => {
    await api.get("/users/logout").then(() => {
      window.location.href = `${window.location.origin}/auth/login`;
    });
  });

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAuthChecking,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

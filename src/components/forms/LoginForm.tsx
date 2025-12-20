"use client";

import React, { useContext, useState } from "react";
import { Lock, Mail } from "lucide-react";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import AuthContext from "@/contexts/AuthContext";
import { toast } from "react-toastify";

export const LoginForm = () => {
  const { loginUser } = useContext(AuthContext)!;
  const [isLoading, setIsLoading] = useState(false);

  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleFormData(key: keyof typeof formdata, value: any) {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleLogin() {
    let isError = false;
    Object.keys(formdata).forEach((k) => {
      if (!formdata[k as keyof typeof formdata]) {
        isError = true;
        toast.error(`${k} is required`);
        return;
      }
    });

    if (isError) return;

    setIsLoading(true);
    await loginUser(formdata);
    setIsLoading(false);
  }
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="space-y-6"
      >
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              value={formdata.email}
              onChange={(e) => handleFormData("email", e)}
              placeholder="Enter your email"
              className="pl-10"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="password"
              type={"password"}
              value={formdata.password}
              onChange={(e) => handleFormData("password", e)}
              placeholder="Enter your password"
              className="pl-10"
              required
            />
          </div>
        </div>

        {/* Forgot Password */}
        <div className="flex items-center justify-end">
          <button className="text-sm text-indigo-600 hover:text-indigo-700">
            Forgot password?
          </button>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          className="w-full justify-center"
          disabled={isLoading}
        >
          Log In
        </Button>
      </form>
    </div>
  );
};

"use client";

import React, { useContext, useState } from "react";
import { Lock, Mail, User } from "lucide-react";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/Checkbox";
import Link from "next/link";
import { toast } from "react-toastify";
import AuthContext from "@/contexts/AuthContext";

export const SignupForm = () => {
  const { registerUser } = useContext(AuthContext)!;
  const [isLoading, setIsLoading] = useState(false);

  const [formdata, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    isAccepted: false,
  });

  function handleFormData(key: keyof typeof formdata, value: any) {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSignUp() {
    let isError = false;
    Object.keys(formdata).forEach((k) => {
      if (!formdata[k as keyof typeof formdata] && k != "isAccepted") {
        isError = true;
        toast.error(`${k} is required`);
        return;
      }
    });

    if (isError) return;
    if (formdata.password.length < 5) {
      toast.warn("Password should contain minimum of 5 characters.");
      return;
    }
    if (!formdata.isAccepted) {
      toast.warn("You need to accept terms and conditions to continue");
      return;
    }

    setIsLoading(true);
    await registerUser(formdata);
    setIsLoading(false);
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp();
        }}
        className="space-y-6"
      >
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="username">Full name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="username"
              type="text"
              value={formdata.userName}
              onChange={(e) => handleFormData("userName", e)}
              placeholder="Enter your name"
              className="pl-10"
            />
          </div>
        </div>
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

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={formdata.isAccepted}
              onChange={(checked) => handleFormData("isAccepted", checked)}
            />
            <label
              htmlFor="remember"
              className="text-sm text-gray-700 cursor-pointer"
            >
              Accept{" "}
              <Link href={"/"} className="text-primary">
                Terms & conditions.
              </Link>
            </label>
          </div>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          className="w-full justify-center"
          disabled={isLoading}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

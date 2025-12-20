"use client";

import React from 'react'
import { Lock, Mail } from "lucide-react";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";


export const LoginForm = () => {
    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <form className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            id="email"
                            type="email"
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
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
                            type={'password'}
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="pl-10"
                            required
                        />

                    </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-end">
                    <button
                        className="text-sm text-indigo-600 hover:text-indigo-700"
                    >
                        Forgot password?
                    </button>
                </div>

                {/* Login Button */}
                <Button
                    className="w-full justify-center"
                >
                    Sign In
                </Button>
            </form>
        </div>
    )
}

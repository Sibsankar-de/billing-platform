"use client";

import React from 'react'
import { Lock, Mail, User } from "lucide-react";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Checkbox } from '../ui/Checkbox';
import Link from 'next/link';


export const SignupForm = () => {
    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <form className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                    <Label htmlFor="username">Full name</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            id="username"
                            type="text"
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
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
                <div className="flex items-center">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                        // checked={rememberMe}
                        // onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                        />
                        <label
                            htmlFor="remember"
                            className="text-sm text-gray-700 cursor-pointer"
                        >
                            Accept <Link href={"/"} className='text-primary'>Terms & conditions.</Link>
                        </label>
                    </div>
                </div>

                {/* Login Button */}
                <Button
                    className="w-full justify-center"
                >
                    Sign Up
                </Button>
            </form>
        </div>
    )
}

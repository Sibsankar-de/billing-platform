"use client";

import { InputType } from '@/types/InputTypes'
import React from 'react'
import { cn } from '../utils'

export const Input = ({ className, id, value, onChange, placeholder, type, onKeyDown }: InputType) => {
    return (
        <input
            id={id}
            type={type || "text"}
            placeholder={placeholder || ""}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onKeyDown={e=>onKeyDown?.(e)}
            className={cn("w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200", className)}
        />
    )
}

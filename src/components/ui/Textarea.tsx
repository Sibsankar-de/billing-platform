"use client";

import { InputType } from '@/types/InputTypes'
import React from 'react'
import { cn } from '../utils'

export const Textarea = ({ className, id, value, onChange, placeholder, type }: InputType) => {
    return (
        <textarea
            id={id}
            placeholder={placeholder || ""}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className={cn("resize-y min-h-30 w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200", className)}
        />
    )
}

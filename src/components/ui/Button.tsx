"use client";

import { ButtonType } from '@/types/ButtonTypes'
import { ClassValue } from 'clsx';
import React from 'react'
import { cn } from '../utils';

export const Button = ({ children, className, id, onClick, variant = "primary", disabled = false }: ButtonType) => {
    const variants: Record<string, ClassValue> = {
        "nav": "",
        "primary": "bg-primary text-primary-foreground hover:bg-primary/90",
        "outline": "border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
        "secondary": "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        "dark": "bg-black text-white hover:bg-gray-800",
        "none": "hover:brightness-95"
    }
    return (
        <button
            className={cn(
                "flex items-center gap-2 px-4 py-2.5 border border-transparent rounded-lg cursor-pointer disabled:brightness-75 disabled:cursor-not-allowed select-none",
                "transition-all duration-150 active:translate-y-0.5 active:brightness-90",
                variants[variant],
                className
            )}
            id={id}
            onClick={(e) => onClick?.(e)}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

"use client";

import { ButtonType } from '@/types/ButtonTypes'
import { ClassValue } from 'clsx';
import React from 'react'
import { cn } from '../utils';

export const Button = ({ children, className, id, onClick, variant = "primary" }: ButtonType) => {
    const variants: Record<string, ClassValue> = {
        "nav": "",
        "primary": "bg-primary text-primary-foreground hover:bg-primary/90",
        "outline": "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
        "secondary": "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        "dark": "bg-black text-white hover:bg-gray-800",
        "none": ""
    }
    return (
        <button
            className={cn(variants[variant],
                "flex items-center gap-2 px-4 py-2.5 rounded-lg cursor-pointer",
                "transition-all duration-200 active:translate-y-0.5",
                className
            )}
            id={id}
            onClick={(e) => onClick?.(e)}
        >
            {children}
        </button>
    )
}

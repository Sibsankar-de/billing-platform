"use client";

import { SelectType } from "@/types/SelectType";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { cn } from "../utils";

export const Select = ({
    id,
    name,
    placeholder,
    value,
    options = [],
    onChange,
    required,
    disabled,
    placeholderClass,
    className,
}: SelectType) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string>(value ?? "");
    const [isFocused, setIsFocused] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);
    const placeholderRef = useRef<HTMLLabelElement | null>(null);

    const normalized = options.map((o) =>
        typeof o === "string" ? { label: o, value: o } : o
    );

    useEffect(() => {
        setSelected(value ?? "");
    }, [value]);

    useEffect(() => {
        const handleOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
                setIsFocused(false);
            };
        };
        window.addEventListener("mousedown", handleOutside);
        return () => window.removeEventListener("mousedown", handleOutside);
    }, []);

    const uid = id || Math.random().toString(36).substring(2, 15);

    function handleClick() {
        setIsFocused(p => !p);
        setOpen(p => !p);
    }

    function selectValue(val: string) {
        setSelected(val);
        onChange?.(val);
        setOpen(false);
        setIsFocused(false);
    }

    function onKeyDown(e: KeyboardEvent) {
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            setOpen((s) => !s);
        } else if (e.key === "Escape") {
            setOpen(false);
        }
    }

    return (
        <div className="relative cursor-pointer"
            ref={ref}
        >
            <div
                className={clsx('w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg h-fit flex items-center gap-2 relative transition-all duration-200', isFocused && "ring-primary ring-2", className)}
                onKeyDown={onKeyDown}
                onClick={handleClick}
            >
                <div
                    id={uid}
                    role="button"
                    tabIndex={disabled ? -1 : 0}
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    className={clsx(
                        'w-full resize-y outline-none border-none bg-transparent',
                        disabled && "opacity-50 cursor-not-allowed"
                    )}
                >
                    <span className="truncate">{!selected ? placeholder : normalized.find((o) => o.value === selected)?.label ?? selected}</span>
                </div>
                <div className={cn("transition-transform duration-200", isFocused ? "rotate-180" : "rotate-0")} >
                    <ChevronDown size={16} className="text-primary" />
                </div>
            </div>
            {/* dropdown */}
            {(open && !disabled) && (
                <ul
                    role="listbox"
                    aria-labelledby={uid}
                    className="absolute left-0 w-full mt-1 bg-white border border-primary rounded-md shadow-md z-50 max-h-56 overflow-auto"
                >
                    {normalized.map((opt) => (
                        <li
                            key={opt.value}
                            role="option"
                            aria-selected={selected === opt.value}
                            tabIndex={0}
                            className={clsx(
                                "px-4 py-2 hover:bg-accent hover:text-white cursor-pointer",
                                selected === opt.value && "font-semibold bg-secondary text-white"
                            )}
                            onClick={() => selectValue(opt.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    selectValue(opt.value);
                                }
                            }}
                        >
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
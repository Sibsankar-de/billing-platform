"use client"

import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'

type DropDownProps = {
    children?: React.ReactNode,
    openState: Boolean,
    className?: string,
    onClose?: () => void,
}

export const Dropdown = ({ children, openState, onClose, className }: DropDownProps) => {
    // handle dropdown open state
    const [isOpen, setIsOpen] = useState(false);
    const [isClose, setIsClose] = useState(false);
    useEffect(() => {
        if (openState) {
            setIsOpen(true);
        }
        else {
            setIsClose(true);
            setTimeout(() => {
                setIsOpen(false);
                setIsClose(false);
            }, 250); // match the animation duration
        }
    }, [openState]);

    // close dropdown on outside click
    const boxRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            // Small delay to ensure the button click is processed first
            setTimeout(() => {
                if (isOpen && boxRef.current && !boxRef.current?.contains(event.target as Node) && onClose) {
                    onClose();
                }
            }, 250);
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    if (!isOpen) return null;
    return (
        <div className={clsx(`bg-white rounded-lg p-1 text-sm w-[20em] absolute border border-secondary z-50 dropdown-open-anim`, className, isClose && "dropdown-close-anim")} ref={boxRef}>
            {children}
        </div>
    )
}
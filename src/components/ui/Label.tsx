import React from 'react'
import { cn } from '../utils'

export const Label = ({ children, className, htmlFor, required = false }: { children?: React.ReactNode, className?: string, htmlFor?: string, required?: boolean }) => {
    return (
        <label htmlFor={htmlFor || ""} className={cn('block text-gray-600 mb-1.5', className)}>{children} {required && <span className='text-red-400'>*</span>}</label>
    )
}

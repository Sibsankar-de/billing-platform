import React from 'react'
import { Input } from './Input'
import { Select } from './Select'
import { SelectOptionType } from '@/types/SelectType'
import { cn } from '../utils'

export const StockInput = ({ id, onStockChange, onUnitChange, value, className, unitDisabled }: { id?: string, onStockChange?: (e: string) => void, onUnitChange?: (e: string) => void, value?: Record<string, any>, className?: string, unitDisabled?: boolean }) => {
    const options: SelectOptionType[] = [
        { value: "pcs", label: "PCS" },
        { value: "kg", label: "KG" },
        { value: "lt", label: "Litre" },
    ]
    return (
        <div className='flex items-center'>
            <Select options={options} value={value?.unit || 'pcs'} className='rounded-r-none! bg-gray-200' onChange={onUnitChange} disabled={unitDisabled} />
            <Input type='number' id={id} placeholder='Enter quantity' value={value?.stock || ""} className={cn('border-l-0 rounded-l-none!', className)} onChange={onStockChange} />
        </div>
    )
}

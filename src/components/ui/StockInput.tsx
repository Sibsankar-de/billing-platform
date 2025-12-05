import React from 'react'
import { Input } from './Input'
import { Select } from './Select'
import { SelectOptionType } from '@/types/SelectType'

export const StockInput = ({ id, onStockChange, onUnitChange, value }: { id?: string, onStockChange?: (e: string) => void, onUnitChange?: (e: string) => void, value?: Record<string, any> }) => {
    const options: SelectOptionType[] = [
        { value: "pcs", label: "PCS" },
        { value: "kg", label: "KG" },
        { value: "gram", label: "Gram" },
    ]
    return (
        <div className='flex items-center'>
            <Select options={options} value={value?.unit || 'pcs'} className='rounded-r-none! bg-gray-200' onChange={onUnitChange} />
            <Input type='number' id={id} placeholder='Enter quantity' value={value?.stock || ""} className='border-l-0 rounded-l-none!' onChange={onStockChange} />
        </div>
    )
}

import React from 'react'
import { Input } from './Input'
import { Select } from './Select'
import { SelectOptionType } from '@/types/SelectType'

export const StockInput = () => {
    const options: SelectOptionType[] = [
        { label: "qty", value: "QTY" },
        { label: "kg", value: "KG" },
        { label: "gram", value: "Gram" },
    ]
    return (
        <div className='flex items-center'>
            <Select options={options} value='qty' className='rounded-r-none! bg-gray-200'/>
            <Input type='number' id='stock' placeholder='Enter stock' className='border-l-0 rounded-l-none!'/>
        </div>
    )
}

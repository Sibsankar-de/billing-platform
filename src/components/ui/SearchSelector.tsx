"use client"

import React, { useState } from 'react'
import { Input } from './Input'
import { Dropdown } from './Dropdown'

export const SearchSelector = () => {
    const [inputValue, setInputValue] = useState<string>("");
    return (
        <div className='relative flex-1'>
            <Input id='category' placeholder='Type a category' value={inputValue} onChange={e => setInputValue(e)} />
            <div>
                <Dropdown openState={inputValue.length > 0} className='w-full mt-1 p-3'>
                    <p className='text-center'>Category not found! Try to add it.</p>
                </Dropdown>
            </div>
        </div>
    )
}

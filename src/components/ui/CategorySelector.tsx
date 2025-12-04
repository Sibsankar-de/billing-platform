"use client";

import React, { useState } from 'react'
import { Input } from './Input';
import { Button } from './Button';
import { Plus, X } from 'lucide-react';
import { Dropdown } from './Dropdown';

export const CategorySelector = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>("");

    const handleAddCategory = () => {
        if (inputValue.trim() !== "" && !categories.includes(inputValue.trim())) {
            setCategories([...categories, inputValue.trim()]);
            setInputValue("");
        }
    }

    const handleRemoveCategory = (category: string) => {
        setCategories(categories.filter(cat => cat !== category));
    }

    return (
        <div>
            <div className='flex items-center gap-2'>
                <div className='relative flex-1'>
                    <Input placeholder='Type a category' value={inputValue} onChange={e => setInputValue(e)} />
                    <div>
                        <Dropdown openState={inputValue.length > 0} className='w-full mt-1 p-3'>
                            <p className='text-center'>Category not found! Try to add it.</p>
                        </Dropdown>
                    </div>
                </div>
                <Button className='py-2' onClick={handleAddCategory} disabled={inputValue.trim() === ""}>
                    <Plus />
                </Button>
            </div>
            <div className='mt-3'>
                <ul className='flex flex-wrap gap-2'>
                    {categories.map((category, index) => (
                        <li key={index} className='bg-blue-100 w-fit px-3 py-1 flex items-center gap-2 rounded-lg border border-blue-300'>
                            <span>{category}</span>
                            <X size={15} className='cursor-pointer' onClick={() => handleRemoveCategory(category)} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

import React from 'react'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'
import { Label } from '../ui/Label'
import { CategorySelector } from '../ui/CategorySelector'
import { StockInput } from '../ui/StockInput'

export const ProductForm = () => {
    return (
        <div className='space-y-4'>
            <div>
                <Label htmlFor="name" className='block text-gray-600 mb-1.5' required>Product name</Label>
                <Input placeholder='Enter product name' id='name' />
            </div>
            <div>
                <Label htmlFor="sku" className='block text-gray-600 mb-1.5' required>Product SKU</Label>
                <Input placeholder='Enter sku' id='sku' />
            </div>
            <div>
                <Label htmlFor="description" className='block text-gray-600 mb-1.5'>Product description</Label>
                <Textarea placeholder='Write product description' id='description' />
            </div>
            <div>
                <Label htmlFor="category" className='block text-gray-600 mb-1.5'>Select categories</Label>
                <CategorySelector />
            </div>
            <div className='flex items-center gap-3'>
                <div className='flex-1'>
                    <Label htmlFor="price" className='block text-gray-600 mb-1.5' required>Total price</Label>
                    <Input type='number' placeholder='Enter total price' id='price' />
                </div>
                <div className='flex-1'>
                    <Label htmlFor="stock" className='block text-gray-600 mb-1.5' required>Total Stock</Label>
                    <StockInput />
                </div>
            </div>
            <div>
                <Label htmlFor="price-breakdown" required>Add price per quantity</Label>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

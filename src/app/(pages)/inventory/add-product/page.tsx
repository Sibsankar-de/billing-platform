import { Button } from '@/components/ui/Button'
import { PageContainer } from '@/components/sections/PageContainer'
import { ProductForm } from '@/components/forms/ProductForm'
import React from 'react'

export default function AddProductPage() {
    return (
        <PageContainer>
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h1 className="text-gray-900 mb-2">Add new product</h1>
                        <p className="text-gray-600">Add new product in your inventory.</p>
                    </div>
                </div>
            </div>
            <ProductForm />
        </PageContainer>
    )
}

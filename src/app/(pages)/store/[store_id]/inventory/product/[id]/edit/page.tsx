import { ProductForm } from '@/components/forms/ProductForm'
import { PageContainer } from '@/components/sections/PageContainer'
import React from 'react'

export default function ProductEditPage() {
    return (
        <PageContainer>
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h1 className="text-gray-900 mb-2">Edit product</h1>
                    </div>
                </div>
            </div>
            <ProductForm />
        </PageContainer>
    )
}

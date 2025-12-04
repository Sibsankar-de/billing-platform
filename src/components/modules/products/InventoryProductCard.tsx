import { Button } from '@/components/ui/Button'
import { Edit2, Package, Trash2 } from 'lucide-react'
import React from 'react'

export const InventoryProductCard = ({ product }: { product: ProductType }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">SKU: {product.sku}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant='none' className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50">
                        <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant='none' className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                    <p className="text-xs text-gray-500 mb-1">Price</p>
                    <p className="text-gray-900">${product.price.toFixed(2)}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">Category</p>
                    <span className="inline-block px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded">
                        {product.category}
                    </span>
                </div>
            </div>
        </div>
    )
}

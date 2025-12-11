import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Search } from 'lucide-react'
import React from 'react'
import { InventoryProductCard } from './InventoryProductCard'
import { SelectOptionType } from '@/types/SelectType'
import { Pagination } from '@/components/ui/Pagination'

const mockProducts: ProductType[] = [
    { id: '1', name: 'Web Design Service', category: 'Services', price: 150.00, stock: 999, sku: 'WEB-001' },
    { id: '2', name: 'Mobile App Development', category: 'Services', price: 500.00, stock: 999, sku: 'MOB-001' },
    { id: '3', name: 'SEO Consultation', category: 'Services', price: 200.00, stock: 999, sku: 'SEO-001' },
    { id: '4', name: 'Brand Identity Package', category: 'Services', price: 300.00, stock: 999, sku: 'BRD-001' },
    { id: '5', name: 'Cloud Hosting (Monthly)', category: 'Subscription', price: 50.00, stock: 999, sku: 'HOST-001' },
    { id: '6', name: 'Premium Support', category: 'Services', price: 100.00, stock: 999, sku: 'SUP-001' },
    { id: '7', name: 'E-commerce Setup', category: 'Services', price: 800.00, stock: 999, sku: 'ECOM-001' },
    { id: '8', name: 'Content Writing', category: 'Services', price: 75.00, stock: 999, sku: 'CONT-001' },
];

const categories: SelectOptionType[] = [
    { label: 'All Categories', value: '' },
    { label: 'Services', value: 'Services' },
    { label: 'Subscription', value: 'Subscription' },
]

export const InventoryProductList = () => {
    return (
        <div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <div className="flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search products by name or SKU..."
                            // value={searchTerm}
                            // onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Select options={categories} placeholder='Select category' className='min-w-40' />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {mockProducts.map((product) => (
                    <InventoryProductCard key={product.id} product={product} />
                ))}
            </div>

            <Pagination currentPage={1} totalPage={11} />
        </div>
    )
}

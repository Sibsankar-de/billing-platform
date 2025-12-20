import { Button } from '@/components/ui/Button'
import { PageContainer } from '@/components/sections/PageContainer'
import { Plus } from 'lucide-react'
import { InventoryProductList } from '@/components/modules/products/InventoryProductList'
import Link from 'next/link'


export default async function ProductsPage({ params }: { params: Record<string, any> }) {
    const { store_id } = await params;
    return (
        <PageContainer>
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h1 className="text-gray-900 mb-2">My Inventory</h1>
                        <p className="text-gray-600">Manage your product catalog and pricing</p>
                    </div>
                    <Link href={`/store/${store_id}/inventory/add-product`}>
                        <Button
                            variant='primary'
                        >
                            <Plus className="w-4 h-4" />
                            Add Product
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Search and Filters */}
            <InventoryProductList />

        </PageContainer>
    )
}

import { BillingForm } from '@/components/forms/BillingForm'
import { PageContainer } from '@/components/sections/PageContainer'
import React from 'react'

export default function BillingPage() {
    return (
        <PageContainer>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-gray-900 mb-2">Create New Invoice</h1>
                    <p className="text-gray-600">Generate a professional invoice for your client</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-8">
                {/* Billing sector */}
                <BillingForm />
            </div>
        </PageContainer>
    )
}

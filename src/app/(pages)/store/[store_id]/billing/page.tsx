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
                {/* Invoice Header */}
                <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
                    <div>
                        <label className="block text-gray-700 mb-2">From</label>
                        <input
                            type="text"
                            placeholder="Your Company Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                        />
                        <textarea
                            placeholder="Address"
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Bill To</label>
                        <input
                            type="text"
                            placeholder="Client Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                        />
                        <textarea
                            placeholder="Address"
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                {/* Invoice Details */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                    <div>
                        <label className="block text-gray-700 mb-2">Invoice Number</label>
                        <input
                            type="text"
                            placeholder="INV-001"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Invoice Date</label>
                        <input
                            type="date"
                            defaultValue="2025-12-04"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Due Date</label>
                        <input
                            type="date"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                {/* Items Table */}
                <BillingForm />


            </div>
        </PageContainer>
    )
}

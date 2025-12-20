import { Receipt } from 'lucide-react'
import React, { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4">
                        <Receipt className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-gray-900 mb-2">Welcome to BillPro</h1>
                    <p className="text-gray-600">Sign in to manage your billing and invoices</p>
                </div>
                {children}
            </div>
        </div>
    )
}

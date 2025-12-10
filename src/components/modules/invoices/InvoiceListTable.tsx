"use client";

import React, { useState } from 'react'
import { Search, Filter, Download, Eye, Send, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Pagination } from '@/components/ui/Pagination';

interface Invoice {
    id: string;
    number: string;
    client: string;
    date: string;
    dueDate: string;
    amount: number;
    status: 'paid' | 'pending' | 'overdue';
}

const mockInvoices: Invoice[] = [
    { id: '1', number: 'INV-2024-001', client: 'Acme Corporation', date: '2024-11-15', dueDate: '2024-12-15', amount: 5250.00, status: 'paid' },
    { id: '2', number: 'INV-2024-002', client: 'Tech Innovations Ltd', date: '2024-11-20', dueDate: '2024-12-20', amount: 8900.00, status: 'pending' },
    { id: '3', number: 'INV-2024-003', client: 'Design Studio Pro', date: '2024-10-10', dueDate: '2024-11-10', amount: 3200.00, status: 'overdue' },
    { id: '4', number: 'INV-2024-004', client: 'Global Enterprises', date: '2024-11-25', dueDate: '2024-12-25', amount: 12500.00, status: 'pending' },
    { id: '5', number: 'INV-2024-005', client: 'StartUp Ventures', date: '2024-11-28', dueDate: '2024-12-28', amount: 4750.00, status: 'paid' },
    { id: '6', number: 'INV-2024-006', client: 'Creative Agency', date: '2024-11-30', dueDate: '2024-12-30', amount: 6800.00, status: 'pending' },
    { id: '7', number: 'INV-2024-007', client: 'E-commerce Solutions', date: '2024-10-05', dueDate: '2024-11-05', amount: 2900.00, status: 'overdue' },
    { id: '8', number: 'INV-2024-008', client: 'Marketing Hub', date: '2024-12-01', dueDate: '2025-01-01', amount: 7500.00, status: 'pending' },
];

export const InvoiceListTable = () => {
    const [invoices] = useState<Invoice[]>(mockInvoices);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid':
                return 'bg-green-100 text-green-700';
            case 'pending':
                return 'bg-amber-100 text-amber-700';
            case 'overdue':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const filteredInvoices = invoices.filter(invoice => {
        const matchesSearch =
            invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.client.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div>
            {/* Search and Filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search by invoice number or client name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Invoices Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left text-gray-700 px-6 py-4">Invoice Number</th>
                                <th className="text-left text-gray-700 px-6 py-4">Client</th>
                                <th className="text-left text-gray-700 px-6 py-4">Date</th>
                                <th className="text-right text-gray-700 px-6 py-4">Amount</th>
                                <th className="text-center text-gray-700 px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInvoices.map((invoice) => (
                                <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="text-indigo-600">{invoice.number}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-gray-900">{invoice.client}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-gray-700">{invoice.date}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-gray-900">${invoice.amount.toFixed(2)}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <Button variant='none' className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button variant='none' className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50">
                                                <Download className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* pagination  */}
            <Pagination totalPage={10} currentPage={1}/>
        </div>
    )
}

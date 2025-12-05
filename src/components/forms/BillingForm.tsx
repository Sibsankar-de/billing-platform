"use client"

import { CloudCheck, Plus, PrinterCheck, Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import { Button } from '../ui/Button';

interface BillItem {
    id: string;
    product: string;
    description: string;
    quantity: number;
    price: number;
}

export const BillingForm = () => {
    const [items, setItems] = useState<BillItem[]>([
        { id: '1', product: '', description: '', quantity: 1, price: 0 }
    ]);

    const addItem = () => {
        setItems([...items, {
            id: Date.now().toString(),
            product: '',
            description: '',
            quantity: 1,
            price: 0
        }]);
    };

    const removeItem = (id: string) => {
        if (items.length > 1) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    const updateItem = (id: string, field: keyof BillItem, value: string | number) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    return (
        <div>
            <div className='mb-8'>
                <div className="flex items-center justify-between mb-4">
                    <label className="text-gray-900">Items</label>
                    <button
                        onClick={addItem}
                        className="flex items-center gap-2 px-3 py-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Item
                    </button>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left text-gray-700 px-4 py-3">Product/Service</th>
                                <th className="text-left text-gray-700 px-4 py-3">Description</th>
                                <th className="text-center text-gray-700 px-4 py-3 w-24">Qty</th>
                                <th className="text-right text-gray-700 px-4 py-3 w-32">Price</th>
                                <th className="text-right text-gray-700 px-4 py-3 w-32">Total</th>
                                <th className="w-12"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id} className="border-t border-gray-200">
                                    <td className="px-4 py-3">
                                        <input
                                            type="text"
                                            value={item.product}
                                            onChange={(e) => updateItem(item.id, 'product', e.target.value)}
                                            placeholder="Product name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </td>
                                    <td className="px-4 py-3">
                                        <input
                                            type="text"
                                            value={item.description}
                                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                                            placeholder="Description"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </td>
                                    <td className="px-4 py-3">
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                                            min="1"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </td>
                                    <td className="px-4 py-3">
                                        <input
                                            type="number"
                                            value={item.price}
                                            onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                                            min="0"
                                            step="0.01"
                                            placeholder="0.00"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-900">
                                        ${(item.quantity * item.price).toFixed(2)}
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Totals */}
            <div className="flex justify-end">
                <div className="w-80">
                    <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="text-gray-900">$0</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Tax (10%)</span>
                            <span className="text-gray-900">$0</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-900">Total</span>
                        <span className="text-gray-900">$0</span>
                    </div>
                </div>
            </div>

            <div className='mt-12 flex gap-2'>
                <Button className='w-full justify-center flex-1'>
                    <PrinterCheck size={18} />
                    Save & print bill
                </Button>
                <Button variant="outline" className='text-green-700 bg-gray-100' >
                    <CloudCheck size={18} />
                    Save as Draft
                </Button>
            </div>
        </div>
    )
}

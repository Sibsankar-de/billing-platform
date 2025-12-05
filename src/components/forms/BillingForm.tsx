"use client"

import { CloudCheck, Plus, PrinterCheck, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { StockInput } from '../ui/StockInput';
import { Textarea } from '../ui/Textarea';
import { Label } from '../ui/Label';
import { ProductSearchInput } from '../ui/ProductSearchInput';
import { BillItemTypes } from '@/types/InvoiceTypes';

export const BillingForm = () => {
    const [items, setItems] = useState<BillItemTypes[]>([
        { _id: '1', product: { name: "", sku: "" }, quantity: 1, price: 0, unit: "pcs" }
    ]);

    const addItem = () => {
        setItems([...items, {
            _id: Date.now().toString(),
            product: {
                name: "",
                sku: ""
            },
            quantity: 1,
            price: 0,
            unit: "pcs"
        }]);
    };

    const removeItem = (id: string) => {
        if (items.length > 1) {
            setItems(items.filter(item => item._id !== id));
        }
    };

    const updateItem = (id: string, field: keyof BillItemTypes, value: string | number) => {
        setItems(items.map(item =>
            item._id === id ? { ...item, [field]: value } : item
        ));
    };

    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    return (
        <div>
            {/* Invoice Header */}
            <div className="mb-8 pb-8 border-b border-gray-200">
                <div className='space-y-2'>
                    <Label>Bill To</Label>
                    <Input
                        type="text"
                        placeholder="Client Name"
                    />
                    <Input
                        type="text"
                        placeholder="Phone number"
                    />
                    <Textarea
                        placeholder="Address"
                    />
                </div>
            </div>

            {/* Invoice Details */}
            <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                    <Label>Invoice Number</Label>
                    <Input
                        type="text"
                        placeholder="INV-001"
                    />
                </div>
                <div>
                    <Label>Invoice Date</Label>
                    <Input
                        type="date"
                    // value="2025-12-04"
                    />
                </div>
            </div>

            <div className='mb-8'>
                <div className="flex items-center justify-between mb-4">
                    <Label className="text-gray-900">Items</Label>
                    <Button
                        onClick={addItem}
                        variant='outline'
                        className="flex items-center gap-2 px-3 py-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Item
                    </Button>
                </div>

                <div className="border border-gray-200 rounded-lg">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left text-gray-700 px-2 py-3">Product name</th>
                                <th className="text-center text-gray-700 px-2 py-3 w-24">Qty</th>
                                <th className="text-center text-gray-700 px-2 py-3 w-32">Price</th>
                                <th className="text-right text-gray-700 px-2 py-3 w-32">Total</th>
                                <th className="w-12"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <BillingSectionRow
                                    key={item._id}
                                    item={item}
                                    onFieldUpdate={updateItem}
                                    onRemoveItem={removeItem}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Totals */}
            <div className="flex justify-between">
                <div>
                    <Label>Discounts</Label>
                    <div className='mb-2'>
                        <Input
                            type='number'
                            placeholder='Discount percent (%)'
                        />
                    </div>
                    <div>
                        <Input
                            type='number'
                            placeholder='Discount amount (₹)'
                        />
                    </div>
                </div>
                <div className="w-80">
                    <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="text-gray-900">&#8377;0</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Tax (10%)</span>
                            <span className="text-gray-900">&#8377;0</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-900">Total</span>
                        <span className="text-gray-900">&#8377;0</span>
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


function BillingSectionRow({ item, onFieldUpdate, onRemoveItem }: { item: BillItemTypes, onFieldUpdate: (id: string, field: keyof BillItemTypes, value: string | number) => void, onRemoveItem: (id: string) => void }) {

    const [selectedItem, setSelectedItem] = useState<Record<string, any> | null>(null);
    const [productFields, setProductFields] = useState<BillItemTypes>(item);

    useEffect(() => {
        if (selectedItem) {
            const newItem: BillItemTypes = {
                ...item,
                _id: selectedItem?._id,
                product: {
                    name: selectedItem?.name,
                    sku: selectedItem?.sku
                }
            }
            setProductFields(newItem);
        }
    }, [selectedItem]);

    return (
        <tr key={item._id} className="border-t border-gray-200">
            <td className="px-2 py-3">
                <ProductSearchInput
                    // type="text"
                    // value={item.product}
                    // onChange={(e) => updateItem(item.id, 'product', e)}
                    // placeholder="Product name"
                    onSelect={e => setSelectedItem(e)}
                />
            </td>
            <td className="px-2 py-3">
                <StockInput
                    value={{ stock: String(item.quantity), unit: productFields.unit }}
                    onStockChange={(e) => onFieldUpdate(item._id, 'quantity', parseInt(e) || 0)}
                    className='w-30'
                    unitDisabled
                />
            </td>
            <td className="px-2 py-3">
                <Input
                    type="number"
                    value={String(item.price)}
                    onChange={(e) => onFieldUpdate(item._id, 'price', parseFloat(e) || 0)}
                    placeholder="0.00"
                />
            </td>
            <td className="px-2 py-3 text-right text-gray-900">
                &#8377;{(item.quantity * item.price).toFixed(2)}
            </td>
            <td className="px-2 py-3">
                <button
                    onClick={() => onRemoveItem(item._id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </td>
        </tr>
    )
} 
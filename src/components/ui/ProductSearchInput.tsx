"use client"

import React, { KeyboardEvent, KeyboardEventHandler, useEffect, useRef, useState } from 'react'
import { Input } from './Input'
import { Dropdown } from './Dropdown'
import { cn } from '../utils'
import { createProductIndex, searchProducts } from '@/utils/ProductSearch'

const mockData = [
    { "_id": 1, "name": "Wireless Mouse", "sku": "WM-1001", "price": 899, "stock": 120 },
    { "_id": 2, "name": "Mechanical Keyboard", "sku": "MK-2042", "price": 3499, "stock": 75 },
    { "_id": 3, "name": "USB-C Charger 30W", "sku": "UC-3021", "price": 1299, "stock": 200 },
    { "_id": 4, "name": "Bluetooth Earbuds", "sku": "BE-5590", "price": 2499, "stock": 95 },
    { "_id": 5, "name": "Laptop Stand", "sku": "LS-8844", "price": 1499, "stock": 150 },
    { "_id": 6, "name": "Portable SSD 1TB", "sku": "SSD-1000", "price": 6999, "stock": 40 },
    { "_id": 7, "name": "Smartwatch Series S", "sku": "SW-7777", "price": 5999, "stock": 60 },
    { "_id": 8, "name": "HD Webcam 1080p", "sku": "WC-1080", "price": 1599, "stock": 110 },
    { "_id": 9, "name": "Gaming Chair", "sku": "GC-4501", "price": 12499, "stock": 20 },
    { "_id": 10, "name": "Portable Bluetooth Speaker", "sku": "BS-3300", "price": 1999, "stock": 85 },
    { "_id": 11, "name": "24-inch Monitor", "sku": "MN-2401", "price": 8999, "stock": 30 },
    { "_id": 12, "name": "Wireless Power Bank 10,000mAh", "sku": "PB-1000", "price": 1799, "stock": 140 },
    { "_id": 13, "name": "Action Camera 4K", "sku": "AC-4800", "price": 4999, "stock": 35 },
    { "_id": 14, "name": "Noise Cancelling Headphones", "sku": "NH-5500", "price": 3499, "stock": 50 },
    { "_id": 15, "name": "Smart LED Bulb", "sku": "LB-1122", "price": 499, "stock": 300 },
    { "_id": 16, "name": "Wireless Router Dual Band", "sku": "WR-6500", "price": 2299, "stock": 70 },
    { "_id": 17, "name": "Graphics Tablet", "sku": "GT-9001", "price": 2799, "stock": 45 },
    { "_id": 18, "name": "HDMI Cable 2m", "sku": "HM-0200", "price": 249, "stock": 500 },
    { "_id": 19, "name": "External Hard Drive 2TB", "sku": "EHD-2000", "price": 5499, "stock": 55 },
    { "_id": 20, "name": "Mini Drone X1", "sku": "DR-1100", "price": 7999, "stock": 25 }
]

export const ProductSearchInput = ({ onSelect }: { onSelect: (e: Record<string, any>) => void }) => {
    const [inputValue, setInputValue] = useState("");
    const [filteredList, setFilteredList] = useState<any[]>([]);
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [selectedElement, setSelectedElement] = useState<any>(null);
    const [openDropdown, setOpenDropdown] = useState(false);

    const listRef = useRef<HTMLUListElement>(null);


    const { indexed, sortedByName } = createProductIndex(mockData);

    // update search results
    useEffect(() => {
        if (!inputValue.trim()) {
            setFilteredList([]);
            return;
        }

        const results = searchProducts(indexed, sortedByName, inputValue);
        setFilteredList(results);
    }, [inputValue]);

    // auto scroll
    useEffect(() => {
        const list = listRef.current;
        if (!list) return;

        const item = list.children[focusedIndex] as HTMLElement;
        if (item) {
            item.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }, [focusedIndex]);

    function handleSelect(item: Record<string, any>) {
        setSelectedElement(item);
        onSelect(item);
        setInputValue(item.name);
        setOpenDropdown(false);
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case "ArrowUp":
                e.preventDefault();
                setFocusedIndex(prev => Math.max(prev - 1, 0));
                break;

            case "ArrowDown":
                e.preventDefault();
                setFocusedIndex(prev => Math.min(prev + 1, filteredList.length - 1));
                break;

            case "Enter":
                e.preventDefault();
                const selected = filteredList[focusedIndex];
                if (selected) {
                    handleSelect(selected);
                }
                break;
        }
    };

    const handleInputChange = (value: string) => {
        setInputValue(value);
        setOpenDropdown(value.trim().length > 0);
        setFocusedIndex(0);
    };

    return (
        <div className="relative flex-1">
            <Input
                id="product"
                placeholder="Search a product"
                value={inputValue}
                onChange={(e) => handleInputChange(e)}
                onKeyDown={handleKeyDown}
            />

            <Dropdown openState={openDropdown} className="w-full mt-1 p-1 max-h-60 overflow-y-auto">
                <ul ref={listRef}>
                    {filteredList.map((item, index) => (
                        <li
                            key={item._id}
                            className={cn(
                                "p-2 px-3 rounded cursor-pointer",
                                index === focusedIndex && "bg-accent",
                                selectedElement?._id === item._id && "bg-muted"
                            )}
                            onMouseEnter={() => setFocusedIndex(index)}
                            onClick={() => handleSelect(item)}
                        >
                            <p className="text-lg">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.sku}</p>
                        </li>
                    ))}
                </ul>
            </Dropdown>
        </div>
    );
};
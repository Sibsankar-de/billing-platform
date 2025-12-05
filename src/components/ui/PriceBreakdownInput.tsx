"use client";

import React, { useEffect, useState } from 'react'
import { Label } from './Label'
import { Input } from './Input'
import { StockInput } from './StockInput'
import { Button } from './Button'
import { Plus, Trash2 } from 'lucide-react'
import { toast } from 'react-toastify';

type BreakdownType = {
    id: number,
    price: string,
    stock: string,
    unit: string
}

export const PriceBreakdownInput = () => {
    const [priceBreakdowns, setPriceBreakdowns] = useState<BreakdownType[]>([{ id: 1, price: "", stock: "", unit: "pcs" }]);
    function handleAddNewBreakdown() {
        const lastBreakdown = priceBreakdowns[priceBreakdowns.length - 1];
        if (priceBreakdowns.length === 0 || (!lastBreakdown.price || !lastBreakdown.stock)) {
            toast.warn("Fill the current breakdown first.");
            return;
        }

        const newBreakdown: BreakdownType = {
            id: lastBreakdown.id + 1,
            price: "",
            stock: "",
            unit: lastBreakdown.unit
        }

        setPriceBreakdowns(prev => ([...prev, newBreakdown]));
    }

    function handleUpdateBreakdown(breakdown: BreakdownType) {
        const { id, price, stock, unit } = breakdown;

        let breakdownlist = priceBreakdowns;
        const editIndex = breakdownlist.findIndex(e => e.id === id);
        const editItem = breakdownlist[editIndex];
        breakdownlist[editIndex] = {
            ...editItem,
            price,
            stock,
            unit
        };

        console.log(breakdownlist);

        setPriceBreakdowns(breakdownlist);
    }

    return (
        <div>
            {priceBreakdowns.map((item, index) => (
                <div key={item.id} className='flex gap-3 items-center max-w-2xl mb-2'>
                    <BreakdownItem
                        item={item}
                        id={item.id}
                        onInputChange={handleUpdateBreakdown}
                        unitDisabled={priceBreakdowns.length > 1}
                    />
                    {(priceBreakdowns.length === 1 || index > 0) ?
                        <Button className='py-2' onClick={handleAddNewBreakdown}>
                            <Plus />
                        </Button>
                        :
                        <Button variant="none" className='py-2 bg-red-200/50 text-red-400' onClick={() => setPriceBreakdowns(priceBreakdowns.filter(bd => bd.id !== item.id))}>
                            <Trash2 />
                        </Button>
                    }
                </div>
            ))}
        </div>
    )
}

function BreakdownItem({ id, item, onInputChange, unitDisabled }: { id: number, onInputChange: (i: BreakdownType) => void, item: BreakdownType, unitDisabled: boolean }) {

    const [inputData, setInputData] = useState<BreakdownType>(item);

    useEffect(() => {
        setInputData(item);
    }, [item]);

    const handleInputChange = (key: keyof BreakdownType, input: any) => {
        setInputData({
            ...inputData,
            [key]: input
        });
        onInputChange({
            ...inputData,
            id: id,
            [key]: input
        })
    }

    return (
        <div className='flex items-center gap-3'>
            <Input
                type='number'
                placeholder='Enter price'
                id={'price-' + id}
                className='flex-1'
                onChange={e => handleInputChange("price", e)}
                value={inputData.price}
            />
            <p className='text-gray-500'>/</p>
            <StockInput
                id={'stock-' + id}
                onStockChange={e => handleInputChange("stock", e)}
                onUnitChange={e => handleInputChange("unit", e)}
                value={inputData}
                unitDisabled={unitDisabled}
            />
        </div>
    )
}

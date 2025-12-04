"use client";

import { NavMenuType } from "@/types/NavMenuTypes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileText, Package, Receipt } from 'lucide-react';
import { Button } from "./Button";


export const SideNavMenu = () => {
    const menuItems: NavMenuType[] = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'billing', label: 'Create Bill', icon: Receipt },
        { id: 'invoices', label: 'Invoices', icon: FileText },
        { id: 'inventory', label: 'Inventory', icon: Package },
    ];

    return (
        <ul className="space-y-1">
            {menuItems.map((item) => (
                <SideNavMenuItem key={item.id} item={item} />
            ))}
        </ul>
    )
}

const SideNavMenuItem = ({ item }: { item: NavMenuType }) => {

    const pathname = usePathname();
    const router = useRouter();

    const Icon = item.icon;
    const isActive = pathname.includes(item.id);

    const handleButtonClick = () => {
        if (!isActive)
            router.push(`/${item.id}`);
    }
    return (
        <li key={item.id}>
            <Button
                variant="nav"
                onClick={handleButtonClick}
                className={`w-full gap-3 ${isActive
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-200'
                    }`}
            >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
            </Button>
        </li>
    );
}
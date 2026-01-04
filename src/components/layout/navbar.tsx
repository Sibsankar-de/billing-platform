"use client";

import {
  Receipt,
  Settings,
  HelpCircle,
  Search,
  Bell,
  User,
} from "lucide-react";
import { NavMenuType } from "@/types/NavMenuTypes";
import { SideNavMenu, SideNavMenuItem } from "./SideNavMenu";
import { useSelector } from "react-redux";
import { selectUserSate } from "@/store/features/userSlice";
import { Avatar } from "../ui/Avatar";
import { ProfileDropdown } from "./ProfileDropdown";
import { useState } from "react";

const settingsItem: NavMenuType = {
  id: "settings",
  label: "Settings",
  icon: Settings,
};

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Receipt className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-gray-900">BillPro</h1>
            <p className="text-xs text-gray-500">Billing Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <SideNavMenu />
      </nav>

      <div className="p-4 border-t border-gray-200">
        <ul>
          <SideNavMenuItem item={settingsItem} />
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            <HelpCircle className="w-5 h-5" />
            <span>Help</span>
          </button>
        </ul>
      </div>
    </aside>
  );
}

export function HeaderNavbar() {
  const user = useSelector(selectUserSate).data;
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-2.5 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search invoices, products, customers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 ml-8">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="border-l border-gray-200 pl-1">
            <div
              className="flex items-center gap-3 pl-4 hover:bg-gray-100 rounded-xl py-1.5 px-2 cursor-pointer active:bg-gray-300 transition-all duration-200"
              onClick={() => setIsProfileOpen((p) => !p)}
            >
              <div className="text-right">
                <p className="text-gray-900">{user?.userName}</p>
                <p className="text-xs text-gray-500">Member</p>
              </div>
              <Avatar size={40} />
            </div>
            <ProfileDropdown
              openState={isProfileOpen}
              onClose={() => setIsProfileOpen(false)}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "../../utils";
import { Button } from "../../ui/Button";
import { SpreadText } from "../../ui/SpreadText";
import {
  BookOpen,
  Key,
  Terminal,
  Package,
  Receipt,
  Users,
  HelpCircle,
} from "lucide-react";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

const navigationGroups: SidebarGroup[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/docs/introduction",
        icon: BookOpen,
      },
    ],
  },
  {
    title: "User Guides",
    items: [
      {
        title: "Inventory Management",
        href: "/docs/inventory",
        icon: Package,
      },
      {
        title: "Billing & Invoices",
        href: "/docs/billing",
        icon: Receipt,
      },
      {
        title: "Customer Management",
        href: "/docs/customers",
        icon: Users,
      },
    ],
  },
  {
    title: "Developer Reference",
    items: [
      {
        title: "API Authentication",
        href: "/docs/authentication",
        icon: Key,
      },
      {
        title: "API Explorer",
        href: "/docs/api",
        icon: Terminal,
      },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="w-64 bg-white border-r border-border flex flex-col shrink-0 h-full">
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        {navigationGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1">
            <SpreadText as="h4" className="text-[10px] text-gray-400 px-3 mb-2">
              {group.title}
            </SpreadText>
            <ul className="space-y-1">
              {group.items.map((item, itemIdx) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <li key={itemIdx}>
                    <Button
                      variant="nav"
                      onClick={() => router.push(item.href)}
                      className={cn(
                        "w-full gap-3 text-left font-medium justify-start px-3 py-2",
                        isActive
                          ? "bg-indigo-100 text-primary"
                          : "text-gray-700 hover:bg-gray-200",
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-5 h-5 shrink-0",
                          isActive ? "text-primary" : "text-gray-500",
                        )}
                      />
                      <span>{item.title}</span>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom exit area matching settings block */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="nav"
          onClick={() => router.push("/")}
          className="w-full gap-3 text-left justify-start px-3 py-2 text-gray-700 hover:bg-gray-200"
        >
          <HelpCircle className="w-5 h-5 text-gray-500" />
          <span>Exit to Home</span>
        </Button>
      </div>
    </aside>
  );
}

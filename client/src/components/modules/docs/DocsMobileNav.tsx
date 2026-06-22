"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../utils";
import {
  Menu,
  X,
  BookOpen,
  Key,
  Terminal,
  Package,
  Receipt,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface MobileNavLink {
  title: string;
  href: string;
  icon: React.ComponentType<any>;
}

const mobileNavLinks: MobileNavLink[] = [
  { title: "Introduction", href: "/docs/introduction", icon: BookOpen },
  { title: "Inventory Management", href: "/docs/inventory", icon: Package },
  { title: "Billing & Invoices", href: "/docs/billing", icon: Receipt },
  { title: "Customer Management", href: "/docs/customers", icon: Users },
  { title: "API Authentication", href: "/docs/authentication", icon: Key },
  { title: "API Explorer", href: "/docs/api", icon: Terminal },
];

export function DocsMobileNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Floating Mobile Sidebar Trigger */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <Button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="justify-center h-12 w-12 rounded-full p-1"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 top-15 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-72 bg-white p-6 shadow-2xl flex flex-col gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <span className="font-bold text-gray-900">Documentation</span>
              <Button
                variant="outline"
                className="p-1 border-transparent"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <nav className="flex flex-col gap-2">
              {mobileNavLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-indigo-100 text-indigo-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5 shrink-0",
                        isActive ? "text-indigo-600" : "text-gray-500",
                      )}
                    />
                    {link.title}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

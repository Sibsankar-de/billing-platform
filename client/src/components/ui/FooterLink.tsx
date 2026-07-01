import Link from "next/link";
import React from "react";
import { cn } from "@/components/utils";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function FooterLink({ href, children, className }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm text-muted-foreground hover:text-primary hover:underline transition-colors duration-200",
        className
      )}
    >
      {children}
    </Link>
  );
}

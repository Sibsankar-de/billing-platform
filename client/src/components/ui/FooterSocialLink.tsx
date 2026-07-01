import Link from "next/link";
import React from "react";
import { cn } from "@/components/utils";
import { LucideIcon } from "lucide-react";

interface FooterSocialLinkProps {
  href: string;
  icon: LucideIcon;
  ariaLabel: string;
  className?: string;
}

export function FooterSocialLink({ href, icon: Icon, ariaLabel, className }: FooterSocialLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:scale-110 transition-all duration-300",
        className
      )}
      aria-label={ariaLabel}
    >
      <Icon className="w-4 h-4" />
    </Link>
  );
}

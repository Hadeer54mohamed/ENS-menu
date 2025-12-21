"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
  children?: React.ReactNode;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  (
    { className, activeClassName, pendingClassName, href, children, ...props },
    ref
  ) => {
    const pathname = usePathname();
    const isActive = pathname === href || pathname?.startsWith(href + "/");

    return (
      <Link
        href={href}
        {...props}
        ref={ref as any}
        className={cn(className, isActive && activeClassName)}
      >
        {children}
      </Link>
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };

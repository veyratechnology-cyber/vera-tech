"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo, Button } from "@/components/shared";
import { PUBLIC_NAV_ITEMS } from "@/lib/constants";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Public Website Navigation
 * VeyraTech Brand Design - Navy + Orange
 * Responsive header with mobile menu
 */
export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary border-b border-border backdrop-blur-sm bg-opacity-95">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo variant="full" theme="dark" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {PUBLIC_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-secondary",
                  isActive(item.href)
                    ? "text-secondary"
                    : "text-text-secondary"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link href="/book-consultation">
              <Button variant="primary" size="md">
                Book a Consultation
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-text-secondary hover:text-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-primary-dark">
          <div className="container-custom py-4 space-y-4">
            {PUBLIC_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block py-2 text-base font-medium transition-colors",
                  isActive(item.href)
                    ? "text-secondary"
                    : "text-text-secondary hover:text-secondary"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/book-consultation" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full">
                Book a Consultation
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;

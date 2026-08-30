"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

/**
 * Modal Component
 * VeyraTech Brand Design - Navy + Orange
 */
export function Modal({ isOpen, onClose, title, children, size = "md", className }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close modal"
      />
      <div className="relative z-10 w-full" style={{ maxWidth: "calc(100% - 2rem)" }}>
        <div
          className={cn(
            "relative bg-primary-dark rounded-xl shadow-xl w-full border border-border",
            sizes[size],
            className
          )}
        >
          {title && (
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-sora font-bold text-text-primary">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>
          )}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

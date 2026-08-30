import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  hover?: boolean;
  children: React.ReactNode;
}

/**
 * Reusable Card Component
 * VeyraTech Brand Design - Navy + Orange
 * Clean container with optional hover effect
 */
export function Card({ className, hover = false, children }: CardProps) {
  return (
    <div
      className={cn(
        "bg-primary-dark rounded-xl p-6 border border-border",
        hover && "transition-all duration-300 hover:border-secondary hover:-translate-y-1 cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export function CardHeader({ className, children }: CardHeaderProps) {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
}

export function CardTitle({ className, children }: CardTitleProps) {
  return (
    <h3 className={cn("text-xl font-sora font-bold text-text-primary", className)}>
      {children}
    </h3>
  );
}

interface CardDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

export function CardDescription({ className, children }: CardDescriptionProps) {
  return (
    <p className={cn("text-text-secondary mt-2", className)}>
      {children}
    </p>
  );
}

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export function CardContent({ className, children }: CardContentProps) {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export function CardFooter({ className, children }: CardFooterProps) {
  return (
    <div className={cn("mt-4 pt-4 border-t border-border", className)}>
      {children}
    </div>
  );
}

export default Card;

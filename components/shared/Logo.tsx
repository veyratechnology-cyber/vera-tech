import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "full" | "symbol" | "wordmark";
  theme?: "light" | "dark";
}

/**
 * VeyraTech Logo Component
 * Navy + Orange Brand System
 * Modern, geometric logo representing technology and transformation
 */
export function Logo({ className, variant = "full", theme = "light" }: LogoProps) {
  const symbolColor = theme === "light" ? "#FC8436" : "#FC8436";
  const textColor = theme === "light" ? "#FFFFFF" : "#FFFFFF";

  if (variant === "symbol") {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-10 h-10", className)}
        aria-label="VeyraTech"
      >
        {/* V and T geometric symbol representing connection and technology */}
        <path
          d="M8 8H12L18 28L24 8H28L18 40H14L8 8Z"
          fill={symbolColor}
        />
        <path
          d="M32 8H44V12H40V40H36V12H32V8Z"
          fill={symbolColor}
          opacity="0.8"
        />
        <circle cx="40" cy="16" r="2.5" fill={symbolColor} />
      </svg>
    );
  }

  if (variant === "wordmark") {
    return (
      <div className={cn("flex items-center", className)}>
        <span className="font-sora font-bold text-2xl" style={{ color: textColor }}>
          VEYRA<span style={{ color: symbolColor }}>TECH</span>
        </span>
      </div>
    );
  }

  // Full logo (symbol + wordmark)
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
        aria-label="VeyraTech Symbol"
      >
        <path
          d="M8 8H12L18 28L24 8H28L18 40H14L8 8Z"
          fill={symbolColor}
        />
        <path
          d="M32 8H44V12H40V40H36V12H32V8Z"
          fill={symbolColor}
          opacity="0.8"
        />
        <circle cx="40" cy="16" r="2.5" fill={symbolColor} />
      </svg>
      <div className="flex flex-col">
        <span className="font-sora font-bold text-xl leading-tight" style={{ color: textColor }}>
          VEYRA<span style={{ color: symbolColor }}>TECH</span>
        </span>
        <span className="text-xs font-inter" style={{ color: textColor, opacity: 0.7 }}>
          Technology & AI Consulting
        </span>
      </div>
    </div>
  );
}

export default Logo;

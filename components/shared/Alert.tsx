import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, Info, XCircle, X } from "lucide-react";

interface AlertProps {
  type?: "info" | "success" | "warning" | "error";
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

/**
 * Reusable Alert Component
 * Contextual feedback messages
 */
export function Alert({
  type = "info",
  title,
  message,
  dismissible = false,
  onDismiss,
  className,
}: AlertProps) {
  const types = {
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      icon: <Info className="h-5 w-5" />,
    },
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-800",
      icon: <CheckCircle className="h-5 w-5" />,
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-800",
      icon: <AlertCircle className="h-5 w-5" />,
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      icon: <XCircle className="h-5 w-5" />,
    },
  };

  const config = types[type];

  return (
    <div
      className={cn(
        "rounded-lg border p-4",
        config.bg,
        config.border,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className={config.text}>
          {config.icon}
        </div>
        <div className="flex-1">
          {title && (
            <h4 className={cn("font-semibold mb-1", config.text)}>
              {title}
            </h4>
          )}
          <p className={cn("text-sm", config.text)}>
            {message}
          </p>
        </div>
        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className={cn("hover:opacity-70 transition-opacity", config.text)}
            aria-label="Dismiss alert"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Alert;

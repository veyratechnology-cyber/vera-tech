import React from "react";
import { cn } from "@/lib/utils";

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable Table Component
 * VeyraTech Brand Design - Navy + Orange
 * Clean data table with responsive design
 */
export function Table({ children, className }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className={cn("w-full", className)}>
        {children}
      </table>
    </div>
  );
}

interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function TableHeader({ children, className }: TableHeaderProps) {
  return (
    <thead className={cn("bg-primary-dark border-b border-border", className)}>
      {children}
    </thead>
  );
}

interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function TableBody({ children, className }: TableBodyProps) {
  return (
    <tbody className={cn("divide-y divide-border", className)}>
      {children}
    </tbody>
  );
}

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function TableRow({ children, className, onClick }: TableRowProps) {
  return (
    <tr
      className={cn(
        "transition-colors",
        onClick && "cursor-pointer hover:bg-primary",
        className
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

interface TableHeadProps {
  children: React.ReactNode;
  className?: string;
}

export function TableHead({ children, className }: TableHeadProps) {
  return (
    <th
      className={cn(
        "px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider",
        className
      )}
    >
      {children}
    </th>
  );
}

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

export function TableCell({ children, className }: TableCellProps) {
  return (
    <td className={cn("px-6 py-4 text-sm text-text-primary", className)}>
      {children}
    </td>
  );
}

export default Table;

import React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * Pagination Component
 * VeyraTech Brand Design - Navy + Orange
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-border hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-text-secondary hover:text-text-primary"
        aria-label="Previous page"
      >
        <ChevronLeft size={20} />
      </button>

      {getPageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={cn(
              "min-w-[40px] h-10 rounded-lg border transition-colors",
              currentPage === page
                ? "bg-secondary text-text-primary border-secondary"
                : "border-border hover:bg-primary text-text-secondary hover:text-text-primary"
            )}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-2 text-text-muted">
            {page}
          </span>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-border hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-text-secondary hover:text-text-primary"
        aria-label="Next page"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

export default Pagination;

'use client';

import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { cn } from '@/utils/classNames';
import { Button } from './Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const FIRST_PAGES_COUNT = 4;
const LAST_PAGES_COUNT = 4;

type PaginationConfig = {
  pages: number[];
  showEllipsisBefore: boolean;
  showEllipsisAfter: boolean;
  lastPage: number;
};

const getPageNumbers = (currentPage: number, totalPages: number): PaginationConfig => {
  const lastPage = totalPages;

  if (totalPages <= FIRST_PAGES_COUNT) {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return { pages, showEllipsisBefore: false, showEllipsisAfter: false, lastPage };
  }

  if (currentPage <= FIRST_PAGES_COUNT) {
    const pages: number[] = [];
    for (let i = 1; i <= FIRST_PAGES_COUNT; i++) pages.push(i);
    return { pages, showEllipsisBefore: false, showEllipsisAfter: true, lastPage };
  }

  if (currentPage >= totalPages - LAST_PAGES_COUNT + 1) {
    const pages: number[] = [];
    const start = totalPages - LAST_PAGES_COUNT + 1;
    for (let i = start; i <= totalPages; i++) pages.push(i);
    return { pages, showEllipsisBefore: true, showEllipsisAfter: false, lastPage };
  }

  const pages = [currentPage - 1, currentPage, currentPage + 1];
  return { pages, showEllipsisBefore: true, showEllipsisAfter: true, lastPage };
};

function pageLinkClass(active: boolean) {
  return cn(
    'inline-flex h-[34px] min-h-[34px] min-w-[34px] shrink-0 items-center justify-center rounded-lg border border-gold-border bg-panel px-2 p-0! text-[13px] font-semibold shadow-none transition-[border-color,color] duration-200',
    active
      ? 'border-gold text-gold-bright hover:border-gold hover:text-gold-bright'
      : 'text-[#757575] hover:border-gold hover:text-gold',
  );
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  if (totalPages <= 0) return null;

  const { pages, showEllipsisBefore, showEllipsisAfter, lastPage } = getPageNumbers(
    currentPage,
    totalPages,
  );

  const renderPageButton = (page: number) => (
    <Button
      key={page}
      type="button"
      variant="transparent"
      onClick={() => onPageChange(page)}
      className={pageLinkClass(page === currentPage)}
      aria-label={`Trang ${page}`}
      aria-current={page === currentPage ? 'page' : undefined}
    >
      {page}
    </Button>
  );

  return (
    <div className={cn('pagin-box-pagination inline-flex items-center gap-1', className)}>
      <Button
        type="button"
        variant="transparent"
        disabled={!canGoPrev}
        onClick={() => onPageChange(currentPage - 1)}
        className={pageLinkClass(false)}
        aria-label="Trang trước"
      >
        <HiChevronLeft className="size-4" aria-hidden />
      </Button>

      <div className="flex items-center gap-1">
        {showEllipsisBefore && (
          <>
            {renderPageButton(1)}
            <span className="inline-flex h-[34px] min-w-[34px] items-center justify-center text-[13px] font-semibold text-[#757575]">
              ...
            </span>
          </>
        )}
        {pages.map((page) => renderPageButton(page))}
        {showEllipsisAfter && (
          <>
            <span className="inline-flex h-[34px] min-w-[34px] items-center justify-center text-[13px] font-semibold text-[#757575]">
              ...
            </span>
            {renderPageButton(lastPage)}
          </>
        )}
      </div>

      <Button
        type="button"
        variant="transparent"
        disabled={!canGoNext}
        onClick={() => onPageChange(currentPage + 1)}
        className={pageLinkClass(false)}
        aria-label="Trang sau"
      >
        <HiChevronRight className="size-4" aria-hidden />
      </Button>
    </div>
  );
};

Pagination.displayName = 'Pagination';

export { Pagination };

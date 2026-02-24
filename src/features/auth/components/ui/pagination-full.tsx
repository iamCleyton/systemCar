import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/features/auth/components/ui/pagination"

export function PaginationDemo({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: { 
  currentPage: number, 
  totalPages: number, 
  onPageChange: (page: number) => void 
}) {
  return (
    <Pagination>
      <PaginationContent className="cursor-pointer">
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => onPageChange(Math.max(0, currentPage - 1))}
            aria-disabled={currentPage === 0}
          />
        </PaginationItem>

        {/* Gerar números de página simples */}
        {Array.from({ length: totalPages }).map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink 
              onClick={() => onPageChange(i)} 
              isActive={currentPage === i}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext 
            onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
            aria-disabled={currentPage === totalPages - 1}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

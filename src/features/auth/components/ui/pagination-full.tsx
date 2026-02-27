import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/features/auth/components/ui/pagination"

import { useTranslations } from "next-intl";



interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: string;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: string) => void;
}

export function TablePagination({ 
  
  currentPage, 
  totalPages, 
  pageSize,
  onPageChange,
  onPageSizeChange
}: TablePaginationProps) {

  const t = useTranslations("Pagination")

  return (
    <div className="flex w-full items-center justify-between px-2 mt-4">
      
      {/* Seletor de Linhas por Página */}
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-muted-foreground">
          {t("size")}
        </p>
        <Select 
          value={pageSize} 
          onValueChange={(value) => {
            onPageSizeChange(value);
            onPageChange(0); // Reseta para a primeira página (0) ao mudar o tamanho
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectGroup>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Navegação de Páginas */}
      <Pagination className="mx-0 w-auto">
        <PaginationContent className="cursor-pointer">
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => onPageChange(Math.max(0, currentPage - 1))}
              aria-disabled={currentPage === 0}
              // Adiciona opacidade e desativa o clique se estiver na primeira página
              className={currentPage === 0 ? "pointer-events-none opacity-50" : ""}
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
              aria-disabled={currentPage >= totalPages - 1}
              // Adiciona opacidade e desativa o clique se estiver na última página
              className={currentPage >= totalPages - 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      
    </div>
  );
}
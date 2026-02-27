"use client";

import { useState } from "react";
import { TableActions } from "@/features/auth/components/ui/table-actions";
import { InputDemo } from "@/features/auth/components/ui/input-demo";
import { LogoutButton } from "@/features/auth/components/ui/logout-button";
import { CreateCarModal } from "@/features/auth/components/ui/createCarModal";
import { useCars } from "@/features/auth/hooks/use-cars";
// Importe o componente de paginação que criamos
import { TablePagination } from "@/features/auth/components/ui/pagination-full"; 

import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const [page, setPage] = useState(0);
  // 1. Novo estado para controlar as linhas por página
  const [pageSize, setPageSize] = useState("10"); 
  
  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    color: "",
    year: undefined as number | undefined,
  });

  const t = useTranslations("DashboardPage");

  // 2. Passando o pageSize (convertido para número) no lugar do 10 fixo
  const { data, isLoading } = useCars(
    page, 
    Number(pageSize), 
    filters.brand, 
    filters.model, 
    filters.color, 
    filters.year
  );

  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(0); // Volta para o início ao filtrar
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-background py-16 px-4 w-full">
      <div className="w-full max-w-[1400px] flex flex-col items-center gap-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-[90%] gap-6">
          <div>
            <h1 className="text-4xl font-bold text-blue-600 tracking-tight">
              {t("header.title")}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t("header.subtitle")}
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-4">
              <CreateCarModal />
              <LogoutButton />
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="w-full flex justify-center">
          <InputDemo onFilter={handleApplyFilters} />
        </div>

        {/* Tabela Section */}
        <div className="bg-card p-8 rounded-xl w-[90%] shadow-lg border-t-8 border-t-[#003cff]">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {t("tableSection.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("tableSection.subtitle")}
            </p>
          </div>
          
          <TableActions data={data?.content || []} isLoading={isLoading} />
          
          {/* 3. Componente de Paginação adicionado aqui */}
          {!isLoading && data?.totalPages > 0 && (
            <TablePagination 
              currentPage={page}
              totalPages={data.totalPages}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          )}
        </div>

      </div>
    </div>
  );
}
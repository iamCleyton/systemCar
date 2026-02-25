"use client";

import { useState } from "react";
import { TableActions } from "@/features/auth/components/ui/table-actions";
import { InputDemo } from "@/features/auth/components/ui/input-demo";
import { PaginationDemo } from "@/features/auth/components/ui/pagination-full";
import { LogoutButton } from "@/features/auth/components/ui/logout-button";
import { CreateCarModal } from "@/features/auth/components/ui/createCarModal";
import { useCars } from "@/features/auth/hooks/use-cars";
import { LanguageToggle } from "@/features/auth/components/language-toggle";
// 1. Importando o hook
import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    color: "",
    year: undefined as number | undefined,
  });

  // 2. Inicializando as traduções da página
  const t = useTranslations("DashboardPage");

  // Busca os dados baseados no estado 'page'
  const { data, isLoading } = useCars(
    page, 
    10, 
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
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-16 px-4 w-full">
      <div className="w-full max-w-[1400px] flex flex-col items-center gap-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-[90%] gap-6">
          <div>
            {/* 3. Traduzindo os títulos do header */}
            <h1 className="text-4xl font-bold text-blue-600 tracking-tight">
              {t("header.title")}
            </h1>
            <p className="text-gray-600 text-lg">
              {t("header.subtitle")}
            </p>
          </div>

          {/* 4. Ajuste de Layout: O toggle agora fica em uma coluna centralizada acima dos botões */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <LanguageToggle />
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

        {/* Tabela - Recebe os dados do hook useCars desta página */}
        <div className="bg-white p-8 rounded-xl w-[90%] shadow-lg border-t-8 border-t-[#003cff]">
          <div className="mb-8">
            {/* 5. Traduzindo os títulos da tabela */}
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {t("tableSection.title")}
            </h2>
            <p className="text-gray-500">
              {t("tableSection.subtitle")}
            </p>
          </div>
          <TableActions data={data?.content || []} isLoading={isLoading} />
        </div>

        {/* Paginação - Controla o estado 'page' do Dashboard */}
        <div className="w-full flex justify-center">
          <PaginationDemo 
            currentPage={page} 
            totalPages={data?.totalPages || 0} 
            onPageChange={(newPage) => setPage(newPage)} 
          />
        </div>

      </div>
    </div>
  );
}
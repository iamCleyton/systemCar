import { TableActions } from "@/features/auth/components/ui/table-actions";
import { InputDemo } from "@/features/auth/components/ui/input-demo";
import { PaginationDemo } from "@/features/auth/components/ui/pagination-full";
import { LogoutButton } from "@/features/auth/components/ui/logout-button";
import { CreateCarModal } from "@/features/auth/components/ui/createCarModal";

export default function DashboardPage() {
  return (
    // min-h-screen garante que o fundo cubra a tela toda
    // py-12 ou py-20 dá o "respiro" no topo e no fundo da página
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-16 px-4 w-full">
      
      {/* Container principal com gap-12 para separar as seções (Header, Filtro, Tabela) */}
      <div className="w-full max-w-[1400px] flex flex-col items-center gap-12">

        {/* 1. Header: Título e Botões */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-[90%] gap-6">
          <div>
            <h1 className="text-4xl font-bold text-blue-600 tracking-tight">Gerenciamento de Carros</h1>
            <p className="text-gray-600 text-lg">Administre sua frota com facilidade.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <CreateCarModal /> {/* Agora o botão abre o modal! */}
            <LogoutButton />
          </div>
        </div>

        {/* 2. Área de Filtros (InputDemo) */}
        <div className="w-full flex justify-center">
          <InputDemo />
        </div>

        {/* 3. Card da Tabela */}
        <div className="bg-white p-8 rounded-xl w-[90%] shadow-lg border-t-8 border-t-[#003cff]">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Veículos no Pátio</h2>
            <p className="text-gray-500">Visualize e edite os dados dos carros cadastrados.</p>
          </div>
          
          <TableActions />
        </div>

        {/* 4. Paginação: Ajustamos a margem para não ficar um buraco embaixo */}
        <div className="w-full flex justify-center">
          <PaginationDemo />
        </div>

      </div>
    </div>
  );
}
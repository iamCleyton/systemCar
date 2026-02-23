import { TableActions } from "@/features/auth/components/ui/table-actions";
import { InputDemo } from "@/features/auth/components/ui/input-demo";
import { PaginationDemo } from "@/features/auth/components/ui/pagination-full";

export default function DashboardPage() {
  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">


    <h1 className="text-3xl font-bold text-[#003cff] mt-20 mr-200">Gerenciamento de Carros</h1>
        <p className="text-[#000] text-lg mb-3 mr-233 ">
          Gerenciar carros do sistema.
        </p>


    <InputDemo className="flex mt-20" />

      <div className="bg-white p-8 rounded-lg  w-[90%] mt-15 shadow-[0_-10px_0_0_#003cff]">
        <h1 className="text-3xl font-bold text-blue-400 mb-2">Carros Cadastrados</h1>
        <p className="text-gray-700 text-lg mb-3">
          Painel de gerenciamento de carros.
        </p>
        <TableActions>
        </TableActions>
      </div>

      
        <PaginationDemo>
        </PaginationDemo>
    </div>

    
  </>
  );
}
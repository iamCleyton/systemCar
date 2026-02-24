"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Car, Calendar, Palette, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditCarModal } from "@/features/auth/components/ui/edit-car-modal";
import { useCar } from "@/features/auth/hooks/use-cars"; // Seu hook do TanStack Query

export default function CarDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: carro, isLoading } = useCar(id as string);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando detalhes...</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-16 px-4 w-full">
      <div className="w-full max-w-[1000px] flex flex-col gap-8">
        
        {/* HEADER DA PÁGINA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-6">
          <div className="flex items-center gap-4">
            {/* BOTÃO VOLTAR */}
            <Button 
              variant="ghost" 
              onClick={() => router.push("/dashboard")}
              className="hover:bg-white shadow-sm rounded-full p-2"
            >
              <ArrowLeft className="size-6 text-blue-600" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-blue-600 tracking-tight">
                {carro?.modelo}
              </h1>
              <p className="text-gray-600 text-lg">Detalhes técnicos do veículo</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* BOTÃO EDITAR (Reaproveitando seu modal) */}
            <EditCarModal carro={carro} />
          </div>
        </div>

        {/* CARD DE DETALHES (Mesmo estilo da tabela) */}
        <div className="bg-white p-10 rounded-xl shadow-lg border-t-8 border-t-[#003cff]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Informações em Lista */}
            <div className="space-y-8">
              <DetailItem icon={<Tag />} label="Marca" value={carro?.marca} />
              <DetailItem icon={<Car />} label="Modelo" value={carro?.modelo} />
              <DetailItem icon={<Palette />} label="Cor" value={carro?.cor} />
              <DetailItem icon={<Calendar />} label="Ano de Fabricação" value={carro?.ano} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Componente auxiliar para os itens de detalhe
function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
      <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{label}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
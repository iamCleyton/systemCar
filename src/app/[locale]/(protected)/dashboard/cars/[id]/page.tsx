"use client";

import { useParams } from "next/navigation";
import { useCar } from "@/features/auth/hooks/use-cars";
import { CarDetails } from "@/features/auth/components/ui/car-detalis";
import { Loader2 } from "lucide-react";


export default function CarDetailsPage() {
  const { id } = useParams();
  

  const { data: carro, isLoading } = useCar(id as string);

  if (isLoading) {
    return (
      
     <div className="flex justify-center items-center min-h-screen py-10 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin mr-2 text-blue-600" />
        Carregando Detalhes...
      </div>
    );
  }
  
  // Passa os dados para o componente de apresentação
  return <CarDetails carro={carro} />;
}
"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAxiosAuth } from "@/features/auth/hooks/useAxiosAuth";
// IMPORTANDO O SCHEMA E O TIPO DA PASTA SCHEMAS
import { carSchema, CarFormData } from "@/features/auth/schemas/carSchema"; 
import { toast } from "react-toastify";

export function CreateCarModal() {
  const [isOpen, setIsOpen] = useState(false);
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();

  // 1. Configurando o React Hook Form com o Zod
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CarFormData>({
    resolver: zodResolver(carSchema), // Usa o schema importado
  });

  // 2. Configurando o TanStack Query para enviar para o Back-end
  const createCarMutation = useMutation({
    mutationFn: async (newCar: CarFormData) => {
      // O Axios envia os dados já com o Token do NextAuth (graças ao nosso hook)
      const response = await axiosAuth.post("/car", newCar);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Carro cadastrado com sucesso!");
      setIsOpen(false);
      reset(); // Limpa os campos após o sucesso
      
      // Invalida a query "cars" para forçar a Tabela a buscar os dados novos no banco
      queryClient.invalidateQueries({ queryKey: ["cars"] }); 
    },
    onError: (error) => {
      toast.error("Ocorreu um erro ao salvar o carro.");
      alert("Ocorreu um erro ao salvar o carro.");
    },
  });

  // 3. Função que o formulário chama após passar pela validação do Zod
  const onSubmit = (data: CarFormData) => {
    createCarMutation.mutate(data);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 py-2 rounded font-medium">
        + Cadastrar Carro
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-[400px] shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Novo Carro</h2>
            
            {/* O handleSubmit intercepta e executa o carSchema antes de chamar o onSubmit */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              
              <div className="flex flex-col gap-1">
                <input {...register("brand")} placeholder="Marca (Ex: Porsche)" className="border border-gray-300 focus:border-blue-500 outline-none p-2 rounded w-full" />
                {errors.brand && <span className="text-red-500 text-sm font-medium">{errors.brand.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <input {...register("model")} placeholder="Modelo (Ex: 911 Carrera)" className="border border-gray-300 focus:border-blue-500 outline-none p-2 rounded w-full" />
                {errors.model && <span className="text-red-500 text-sm font-medium">{errors.model.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <input {...register("color")} placeholder="Cor (Ex: Branco)" className="border border-gray-300 focus:border-blue-500 outline-none p-2 rounded w-full" />
                {errors.color && <span className="text-red-500 text-sm font-medium">{errors.color.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <input {...register("year")} type="number" placeholder="Ano (Ex: 2024)" className="border border-gray-300 focus:border-blue-500 outline-none p-2 rounded w-full" />
                {errors.year && <span className="text-red-500 text-sm font-medium">{errors.year.message}</span>}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => { setIsOpen(false); reset(); }} 
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={createCarMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {createCarMutation.isPending ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
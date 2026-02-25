"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAxiosAuth } from "@/features/auth/hooks/useAxiosAuth";
import { carSchema, CarFormData } from "@/features/auth/schemas/carSchema"; 
import { toast } from "react-toastify";

export function CreateCarModal() {
  const [isOpen, setIsOpen] = useState(false);
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();

  //  Configurando o React Hook Form com o Zod
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CarFormData>({
    resolver: zodResolver(carSchema), 
  });

  //  Configurando o TanStack Query para enviar para o Back-end
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
    },
  });

  // Função que o formulário chama após passar pela validação do Zod
  const onSubmit = (data: CarFormData) => {
    createCarMutation.mutate(data);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="bg-[#003cff] hover:bg-blue-700 transition-colors text-white px-4 py-2 rounded-lg font-medium cursor-pointer">
        + Register Car
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-[400px] shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">New Car</h2>
            
            {/* O handleSubmit intercepta e executa o carSchema antes de chamar o onSubmit */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold">Brand</label>
                <input {...register("brand")} placeholder="Brand (Ex: Porsche)" className="border border-gray-300 focus:border-blue-500 outline-none p-2 rounded w-full" />
                {errors.brand && <span className="text-red-500 text-sm font-medium">{errors.brand.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold">Model</label>
                <input {...register("model")} placeholder="Model (Ex: 911 Carrera)" className="border border-gray-300 focus:border-blue-500 outline-none p-2 rounded w-full" />
                {errors.model && <span className="text-red-500 text-sm font-medium">{errors.model.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold">Color</label>
                <input {...register("color")} placeholder="Color (Ex: White)" className="border border-gray-300 focus:border-blue-500 outline-none p-2 rounded w-full" />
                {errors.color && <span className="text-red-500 text-sm font-medium">{errors.color.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold">Year</label>
                <input {...register("year")} type="number" placeholder="Year (Ex: 2024)" className="border border-gray-300 focus:border-blue-500 outline-none p-2 rounded w-full" />
                {errors.year && <span className="text-red-500 text-sm font-medium">{errors.year.message}</span>}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => { setIsOpen(false); reset(); }} 
                  className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={createCarMutation.isPending}
                  className="bg-[#003cff] hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed cursor-pointer"
                >
                  {createCarMutation.isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
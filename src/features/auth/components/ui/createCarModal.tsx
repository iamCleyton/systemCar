"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAxiosAuth } from "@/features/auth/hooks/useAxiosAuth";
import { CarFormData, getCarSchema } from "@/features/auth/schemas/carSchema"; 
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

export function CreateCarModal() {
  const [isOpen, setIsOpen] = useState(false);
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  
  // 1. Hook para os textos visuais do Modal
  const tModal = useTranslations("CreateCarModal");
  
  // 2. Hook EXCLUSIVO para as mensagens de erro do Zod
  const tValidations = useTranslations("Validations");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CarFormData>({
    // 3. Passando o tradutor correto para o schema
    resolver: zodResolver(getCarSchema(tValidations)), 
  });

  const createCarMutation = useMutation({
    mutationFn: async (newCar: CarFormData) => {
      const response = await axiosAuth.post("/car", newCar);
      return response.data;
    },
    onSuccess: () => {
      toast.success(tModal("messages.success"));
      setIsOpen(false);
      reset(); 
      queryClient.invalidateQueries({ queryKey: ["cars"] }); 
    },
    onError: (error) => {
      toast.error(tModal("messages.error"));
    },
  });

  const onSubmit = (data: CarFormData) => {
    createCarMutation.mutate(data);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="bg-[#003cff] hover:bg-blue-700 transition-colors text-white px-4 py-2 rounded-lg font-medium cursor-pointer"
      >
        {tModal("trigger")}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          {/* bg-card e text-card-foreground para o Dark Mode */}
          <div className="bg-card text-card-foreground p-8 rounded-xl w-[400px] shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">{tModal("title")}</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold">{tModal("labels.brand")}</label>
                <input 
                  {...register("brand")} 
                  placeholder={tModal("placeholders.brand")} 
                  // Adicionado bg-background e text-foreground no input para não ficar invisível no Dark Mode
                  className="bg-background text-foreground border border-border focus:border-blue-500 outline-none p-2 rounded w-full" 
                />
                {errors.brand && <span className="text-red-500 text-sm font-medium">{errors.brand.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold">{tModal("labels.model")}</label>
                <input 
                  {...register("model")} 
                  placeholder={tModal("placeholders.model")} 
                  className="bg-background text-foreground border border-border focus:border-blue-500 outline-none p-2 rounded w-full" 
                />
                {errors.model && <span className="text-red-500 text-sm font-medium">{errors.model.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold">{tModal("labels.color")}</label>
                <input 
                  {...register("color")} 
                  placeholder={tModal("placeholders.color")} 
                  className="bg-background text-foreground border border-border focus:border-blue-500 outline-none p-2 rounded w-full" 
                />
                {errors.color && <span className="text-red-500 text-sm font-medium">{errors.color.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold">{tModal("labels.year")}</label>
                <input 
                  {...register("year")} 
                  type="number" 
                  placeholder={tModal("placeholders.year")} 
                  className="bg-background text-foreground border border-border focus:border-blue-500 outline-none p-2 rounded w-full" 
                />
                {errors.year && <span className="text-red-500 text-sm font-medium">{errors.year.message}</span>}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => { setIsOpen(false); reset(); }} 
                  // text-muted-foreground e hover:bg-muted para respeitar o Dark Mode
                  className="px-4 py-2 text-muted-foreground hover:bg-muted rounded transition-colors cursor-pointer"
                >
                  {tModal("buttons.cancel")}
                </button>
                <button 
                  type="submit" 
                  disabled={createCarMutation.isPending}
                  className="bg-[#003cff] hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed cursor-pointer"
                >
                  {createCarMutation.isPending ? tModal("buttons.saving") : tModal("buttons.save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
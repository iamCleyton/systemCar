"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAxiosAuth } from "@/features/auth/hooks/useAxiosAuth";
import { carSchema, CarFormData } from "@/features/auth/schemas/carSchema"; 
import { toast } from "react-toastify";
// 1. Importando o hook
import { useTranslations } from "next-intl";

export function CreateCarModal() {
  const [isOpen, setIsOpen] = useState(false);
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  
  // 2. Inicializando as traduções para este componente
  const t = useTranslations("CreateCarModal");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CarFormData>({
    resolver: zodResolver(carSchema), 
  });

  const createCarMutation = useMutation({
    mutationFn: async (newCar: CarFormData) => {
      const response = await axiosAuth.post("/car", newCar);
      return response.data;
    },
    onSuccess: () => {
      // 3. Traduzindo a mensagem de sucesso
      toast.success(t("messages.success"));
      setIsOpen(false);
      reset(); 
      queryClient.invalidateQueries({ queryKey: ["cars"] }); 
    },
    onError: (error) => {
      // 4. Traduzindo a mensagem de erro
      toast.error(t("messages.error"));
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
        {t("trigger")}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-8 rounded-xl w-[400px] shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">{t("title")}</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold">{t("labels.brand")}</label>
                <input 
                  {...register("brand")} 
                  placeholder={t("placeholders.brand")} 
                  className="border border-gray-300 focus:border-blue-500 outline-none p-2 rounded w-full" 
                />
                {errors.brand && <span className="text-red-500 text-sm font-medium">{errors.brand.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold">{t("labels.model")}</label>
                <input 
                  {...register("model")} 
                  placeholder={t("placeholders.model")} 
                  className="border border-gray-300 focus:border-blue-500 outline-none p-2 rounded w-full" 
                />
                {errors.model && <span className="text-red-500 text-sm font-medium">{errors.model.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold">{t("labels.color")}</label>
                <input 
                  {...register("color")} 
                  placeholder={t("placeholders.color")} 
                  className="border border-gray-300 focus:border-blue-500 outline-none p-2 rounded w-full" 
                />
                {errors.color && <span className="text-red-500 text-sm font-medium">{errors.color.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold">{t("labels.year")}</label>
                <input 
                  {...register("year")} 
                  type="number" 
                  placeholder={t("placeholders.year")} 
                  className="border border-gray-300 focus:border-blue-500 outline-none p-2 rounded w-full" 
                />
                {errors.year && <span className="text-red-500 text-sm font-medium">{errors.year.message}</span>}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => { setIsOpen(false); reset(); }} 
                  className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                >
                  {t("buttons.cancel")}
                </button>
                <button 
                  type="submit" 
                  disabled={createCarMutation.isPending}
                  className="bg-[#003cff] hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed cursor-pointer"
                >
                  {createCarMutation.isPending ? t("buttons.saving") : t("buttons.save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
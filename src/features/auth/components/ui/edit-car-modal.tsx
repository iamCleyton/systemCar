"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

import { useUpdateCar } from "@/features/auth/hooks/use-cars";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

// 1. IMPORTANDO O SEU SCHEMA
import { CarFormData, getCarSchema } from "@/features/auth/schemas/carSchema"; 

export function EditCarModal({ carro }: { carro: any }) {
  const [open, setOpen] = useState(false);
  const updateMutation = useUpdateCar();
  
  const tEdit = useTranslations("EditCarModal");
  // 2. BUSCANDO AS TRADUÇÕES DE VALIDAÇÃO (Igual no Create)
  const tValidations = useTranslations("Validations");

  // 3. CONFIGURANDO O REACT HOOK FORM
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CarFormData>({
    resolver: zodResolver(getCarSchema(tValidations)),
  });

  // 4. PREENCHENDO OS CAMPOS COM OS DADOS DO CARRO A SER EDITADO
  useEffect(() => {
    if (open && carro) {
      reset({
        brand: carro.brand,
        model: carro.model,
        color: carro.color,
        year: carro.year,
      });
    }
  }, [open, carro, reset]);

  // 5. FUNÇÃO DE SUBMIT (Só roda se o Zod aprovar)
  const onSubmit = (data: CarFormData) => {
    // Junta o ID com os dados validados pelo Zod
    const payload = {
      id: carro.id,
      ...data,
    };

    updateMutation.mutate(payload, {
      onSuccess: () => {
        setOpen(false);
        toast.success(tEdit("messages.success")); 
        window.location.href = "/dashboard"; // Mantive seu redirecionamento
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="outline" onClick={() => setOpen(true)} className="bg-card border-blue-600 text-blue-600 hover:bg-blue-50 cursor-pointer">
        {tEdit("trigger")}
      </Button>

      <DialogContent className="bg-card">
        {/* TROCAMOS handleSave POR handleSubmit(onSubmit) */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-blue-600 text-2xl">{tEdit("title")}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-6">
            
            {/* MODELO */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">{tEdit("labels.model")}</label>
              {/* TROCAMOS name/defaultValue POR {...register("model")} */}
              <Input {...register("model")} />
              {/* EXIBINDO O ERRO DO ZOD AQUI 👇 */}
              {errors.model && <span className="text-red-500 text-sm font-medium">{errors.model.message}</span>}
            </div>

            {/* MARCA */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">{tEdit("labels.brand")}</label>
              <Input {...register("brand")} />
              {errors.brand && <span className="text-red-500 text-sm font-medium">{errors.brand.message}</span>}
            </div>

            {/* COR */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">{tEdit("labels.color")}</label>
              <Input {...register("color")} />
              {errors.color && <span className="text-red-500 text-sm font-medium">{errors.color.message}</span>}
            </div>

            {/* ANO */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">{tEdit("labels.year")}</label>
              {/* type="number" é essencial aqui */}
              <Input type="number" {...register("year")} />
              {errors.year && <span className="text-red-500 text-sm font-medium">{errors.year.message}</span>}
            </div>
            
          </div>

          <DialogFooter>
            <Button 
              type="submit" 
              className="bg-[#003cff] w-full py-6 text-lg cursor-pointer"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? tEdit("buttons.saving") : tEdit("buttons.confirm")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
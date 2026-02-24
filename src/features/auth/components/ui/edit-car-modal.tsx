"use client";

import { useUpdateCar } from "@/features/auth/hooks/use-cars";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";

export function EditCarModal({ carro }: { carro: any; mode?: string }) {
  const [open, setOpen] = useState(false);
  const updateMutation = useUpdateCar();

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Mapeia os dados para os nomes que o seu DTO Java espera
    const data = {
      id: carro.id,
      model: formData.get("model"),
      brand: formData.get("brand"),
      color: formData.get("color"),
      year: Number(formData.get("year")),
    };

    updateMutation.mutate(data, {
      onSuccess: () => {
        setOpen(false);
        window.location.href = "/dashboard";
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Se o botão vier de dentro de um dropdown, ele não precisa de DialogTrigger customizado */}
      <Button variant="outline" onClick={() => setOpen(true)} className="bg-white border-blue-600 text-blue-600 hover:bg-blue-50">
        Editar Veículo
      </Button>

      <DialogContent className="bg-white">
        <form onSubmit={handleSave}>
          <DialogHeader>
            <DialogTitle className="text-blue-600 text-2xl">Editar Carro</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Modelo</label>
              <Input name="model" defaultValue={carro?.model} required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Marca</label>
              <Input name="brand" defaultValue={carro?.brand} required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Cor</label>
              <Input name="color" defaultValue={carro?.color} required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Ano</label>
              <Input name="year" type="number" defaultValue={carro?.year} required />
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="submit" 
              className="bg-[#003cff] w-full py-6 text-lg"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Salvando..." : "Confirmar Alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
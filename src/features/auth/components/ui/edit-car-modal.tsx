"use client";
import { useUpdateCar } from "@/features/auth/hooks/use-cars";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";

export function EditCarModal({ carro }: { carro: any }) {
  const updateMutation = useUpdateCar();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    
    // Dispara a atualização automática
    updateMutation.mutate({ ...carro, ...data });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white border-blue-600 text-blue-600 hover:bg-blue-50">
          Editar Veículo
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white">
        <form onSubmit={handleSave}>
          <DialogHeader>
            <DialogTitle className="text-blue-600 text-2xl">Editar Carro</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Modelo</label>
              <Input name="modelo" defaultValue={carro?.modelo} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Marca</label>
              <Input name="marca" defaultValue={carro?.marca} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Cor</label>
              <Input name="marca" defaultValue={carro?.cor} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Ano</label>
              <Input name="marca" defaultValue={carro?.ano} />
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
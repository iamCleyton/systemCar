"use client";

import { Plus } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"; // Ajuste o caminho conforme seu projeto
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateCarModal() {
  return (
    <Dialog>
      {/* O Trigger é o botão que você já tinha no Dashboard */}
      <DialogTrigger asChild>
        <Button className="bg-[#003cff] hover:bg-blue-700 text-white flex items-center gap-2 px-6 py-6 rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer">
          <Plus className="size-5" />
          <span className="font-bold">Cadastrar Carro</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-600">Novo Veículo</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para adicionar um novo carro ao sistema.
          </DialogDescription>
        </DialogHeader>

        {/* Formulário de Cadastro */}
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="modelo" className="text-right">Modelo</Label>
            <Input id="modelo" placeholder="Ex: Civic" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="marca" className="text-right">Marca</Label>
            <Input id="marca" placeholder="Ex: Honda" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cor" className="text-right">Cor</Label>
            <Input id="cor" placeholder="Ex: Prata" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ano" className="text-right">Ano</Label>
            <Input id="ano" placeholder="Ex: 2024" className="col-span-3" />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" className="bg-[#003cff] w-full">Salvar Veículo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
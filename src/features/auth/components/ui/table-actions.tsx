"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

// IMPORTAMOS O SEU NOVO COMPONENTE AQUI
import { EditCarModal } from "@/features/auth/components/ui/edit-car-modal";

export function TableActions() {
  const router = useRouter();

  const carros = [
    { id: "1", modelo: "Wireless Mouse", marca: "Logitech", cor: "Preto", ano: "2024" },
    { id: "2", modelo: "Civic", marca: "Honda", cor: "Prata", ano: "2022" },
    { id: "3", modelo: "911 Carrera", marca: "Porsche", cor: "Branco", ano: "2024" },
    { id: "4", modelo: "911 Carrera", marca: "Porsche", cor: "Branco", ano: "2024" },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Modelo</TableHead>
          <TableHead>Marca</TableHead>
          <TableHead>Cor</TableHead>
          <TableHead>Ano</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {carros.map((carro) => (
          <TableRow key={carro.id}>
            <TableCell>{carro.modelo}</TableCell>
            <TableCell>{carro.marca}</TableCell>
            <TableCell>{carro.cor}</TableCell>
            <TableCell>{carro.ano}</TableCell>
            <TableCell className="text-center">
              
              {/* O AlertDialog ainda fica aqui para o Delete ser fácil */}
              <AlertDialog>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white shadow-md border">
                    
                    {/* VIEW - Redireciona para a página dinâmica */}
                    <DropdownMenuItem onClick={() => router.push(`/dashboard/cars/${carro.id}`)}>
                      <Eye className="mr-2 h-4 w-4" /> Visualizar
                    </DropdownMenuItem>
                    
                    {/* EDIT - Aqui chamamos o componente passando o carro da linha */}
                    <EditCarModal carro={carro} mode="dropdown" />

                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem className="text-red-600 cursor-pointer">
                        <Trash className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                  </DropdownMenuContent>
                </DropdownMenu>

                <AlertDialogContent className="bg-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Deseja mesmo excluir o {carro.modelo}?</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Não</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600">Sim, Excluir</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
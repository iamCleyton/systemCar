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
import { MoreHorizontal, Trash, Eye, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosAuth } from "@/features/auth/hooks/useAxiosAuth";
import { EditCarModal } from "@/features/auth/components/ui/edit-car-modal";
import { toast } from "react-toastify";
// 1. Importando os hooks de internacionalização
import { useTranslations, useLocale } from "next-intl";

interface TableActionsProps {
  data: any[];
  isLoading: boolean;
}

export function TableActions({ data, isLoading }: TableActionsProps) {
  const router = useRouter();
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  
  // 2. Inicializando os hooks (buscando as chaves do namespace "TableActions")
  const t = useTranslations("TableActions");
  const locale = useLocale(); // Retorna "pt-BR", "en-US", etc.

  const deleteCarMutation = useMutation({
    mutationFn: async (id: number) => {
      await axiosAuth.delete(`/car/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      // 3. Traduzindo os toasts
      toast.success(t("messages.deleteSuccess"));
    },
    onError: (error) => {
      console.error("Erro ao excluir:", error);
      toast.error(t("messages.deleteError"));
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10 text-gray-500">
        <Loader2 className="h-8 w-8 animate-spin mr-2 text-blue-600" />
        {t("loading")}
      </div>
    );
  }

  const carros = data || [];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {/* 4. Traduzindo os cabeçalhos da tabela */}
          <TableHead>{t("columns.model")}</TableHead>
          <TableHead>{t("columns.brand")}</TableHead>
          <TableHead>{t("columns.color")}</TableHead>
          <TableHead>{t("columns.year")}</TableHead>
          <TableHead>{t("columns.createdAt")}</TableHead>
          <TableHead className="text-center">{t("columns.actions")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {carros.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-10 text-gray-500">
              {t("emptyState")}
            </TableCell>
          </TableRow>
        ) : (
          carros.map((carro) => (
            <TableRow key={carro.id}>
              <TableCell className="font-medium text-gray-900">{carro.model}</TableCell>
              <TableCell>{carro.brand}</TableCell>
              <TableCell>{carro.color}</TableCell>
              <TableCell>{carro.year}</TableCell>
              {/* 5. Internacionalizando a data usando o locale dinâmico */}
              <TableCell>
                {carro.dateCreate 
                  ? new Date(carro.dateCreate).toLocaleDateString(locale) 
                  : "---"}
              </TableCell>
              <TableCell className="text-center">
                <AlertDialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white shadow-md border">
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={() => router.push(`/dashboard/cars/${carro.id}`)}
                      >
                        <Eye className="mr-2 h-4 w-4" /> {t("actions.view")}
                      </DropdownMenuItem>
                      <EditCarModal carro={carro} />
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem className="text-red-600 cursor-pointer">
                          <Trash className="mr-2 h-4 w-4" /> {t("actions.delete")}
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                      {/* Passando variáveis para a tradução */}
                      <AlertDialogTitle>
                        {t("deleteModal.title", { model: carro.model })}
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>{t("deleteModal.cancel")}</AlertDialogCancel>
                      <AlertDialogAction 
                        className="bg-red-600 hover:bg-red-700 transition-colors"
                        onClick={() => deleteCarMutation.mutate(carro.id)}
                        disabled={deleteCarMutation.isPending}
                      >
                        {deleteCarMutation.isPending 
                          ? t("deleteModal.deleting") 
                          : t("deleteModal.confirm")}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
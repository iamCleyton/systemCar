"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosAuth } from "@/features/auth/hooks/useAxiosAuth";
import { Page, Car } from "@/features/auth/types/car"; 

//  Hook para buscar a lista de carros (Paginação e Filtros)
export function useCars(page = 0, size = 10, brand?: string, model?: string, color?: string, year?: number) {
  const axiosAuth = useAxiosAuth();

  return useQuery({
    queryKey: ["cars", page, size, brand, model, color, year],
    queryFn: async (): Promise<Page<Car>> => {
      const response = await axiosAuth.get("/car", {
        params: { page, size, brand, model, color, year },
      });
      return response.data;
    },
    placeholderData: (previousData) => previousData,
  });
}

// Hook para buscar APENAS UM carro pelo ID (Usado na página de detalhes)
export function useCar(id: string) {
  const axiosAuth = useAxiosAuth();

  return useQuery({
    queryKey: ["car", id],
    queryFn: async (): Promise<Car> => {
      const response = await axiosAuth.get(`/car/${id}`);
      return response.data;
    },
    enabled: !!id, // Só faz a requisição se o ID existir
  });
}


export function useUpdateCar() {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (carro: any) => {
      // O id vem do objeto carro, o restante são os campos para atualizar
      const { id, ...data } = carro;
      const response = await axiosAuth.patch(`/car/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      // Atualiza a lista de carros automaticamente na tabela
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
    onError: (error) => {
      console.error("Erro ao atualizar carro:", error);
    }
  });
}


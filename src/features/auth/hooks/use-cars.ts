import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// 1. Busca os detalhes do carro (Simulado)
export function useCar(id: string) {
  return useQuery({
    queryKey: ["car", id],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 500)); // Simula delay
      return { id, modelo: "Civic", marca: "Honda", cor: "Prata", ano: "2024" };
    },
    enabled: !!id,
  });
}

// 2. Envia a edição e limpa o cache (Mutation)
export function useUpdateCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedCar: any) => {
      console.log("Enviando para o servidor...", updatedCar);
      await new Promise((r) => setTimeout(r, 800)); // Simula envio
      return updatedCar;
    },
    onSuccess: () => {
      // ESTA LINHA É O SEGREDO: Ela força a tabela e a página de detalhes a buscarem dados novos
      queryClient.invalidateQueries({ queryKey: ["car"] });
      queryClient.invalidateQueries({ queryKey: ["cars-list"] });
      alert("Carro atualizado com sucesso!");
    },
  });
}
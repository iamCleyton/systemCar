import { z } from "zod";

export const carSchema = z.object({
  brand: z.string().min(1, "A marca é obrigatória"),
  model: z.string().min(1, "O modelo é obrigatório"),
  color: z.string().min(1, "A cor é obrigatória"),
  // z.coerce.number() tenta converter o valor digitado (que no HTML é string) para número
  year: z.coerce
    .number({ invalid_type_error: "O ano deve ser um número válido" })
    .min(1886, "Ano inválido (o primeiro carro é de 1886)")
    .max(new Date().getFullYear() + 1, "O ano não pode ser no futuro distante"),
});

// Inferimos a tipagem diretamente do schema e já exportamos ela!
// Assim não precisamos criar uma interface 'CarCreateDto' separada para o formulário.
export type CarFormData = z.infer<typeof carSchema>;
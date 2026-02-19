import { z } from "zod";

const emailRegex = /^[a-z0-9.+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório") // Equivalente ao @NotBlank
    .regex(emailRegex, "Formato de e-mail inválido"), // validação customizada
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
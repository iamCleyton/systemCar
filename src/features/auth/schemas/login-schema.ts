import { z } from "zod";

const emailRegex = /^[a-z0-9.+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

// Transformamos o schema em uma função que recebe 't' (a função de tradução)
export const createLoginSchema = (t: any) => z.object({
  email: z
    .string()
    .min(1, t("required")) // "required" deve estar no seu JSON
    .regex(emailRegex, t("email")), // "invalidEmail" deve estar no seu JSON
  password: z
    .string()
    .min(6, t("passwordMin", { min: 6 })), // Passando o número 6 dinamicamente se desejar
});

// O tipo continua sendo gerado a partir do retorno da função
export type LoginSchema = z.infer<ReturnType<typeof createLoginSchema>>;
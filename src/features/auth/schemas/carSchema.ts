import { z } from "zod";

export const carSchema = z.object({
  brand: z.string().min(1, "The brand is mandatory."),
  model: z.string().min(1, "The model is mandatory."),
  color: z.string().min(1, "The color is mandatory."),
  // z.coerce.number() tenta converter o valor digitado (que no HTML é string) para número
  year: z.coerce
    .number({ invalid_type_error: "The year must be a valid number" })
    .min(1886, "Invalid year (the first car was from 1886)")
    .max(new Date().getFullYear() + 1, "The year cannot be in the distant future"),
});

// Assim não precisamos criar uma interface 'CarCreateDto' separada para o formulário.
export type CarFormData = z.infer<typeof carSchema>;
import { z } from "zod";

// 1. Transformamos o schema em uma função que recebe o tradutor 't'
export const getCarSchema = (t: any) => {
  return z.object({
    brand: z.string().min(1, t("brandRequired")),
    model: z.string().min(1, t("modelRequired")),
    color: z.string().min(1, t("colorRequired")),
    year: z.coerce
      .number({ invalid_type_error: t("yearInvalid") })
      .min(1886, t("yearMin"))
      .max(new Date().getFullYear() + 1, t("yearMax")),
  });
};

// 2. Inferimos o tipo pegando o "formato de retorno" da função, 
// assim você não precisa digitar os tipos duas vezes.
export type CarFormData = z.infer<ReturnType<typeof getCarSchema>>;
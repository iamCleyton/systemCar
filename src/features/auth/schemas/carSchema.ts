import { z } from "zod";

export const getCarSchema = (t: any) => {
  return z.object({
    brand: z.string()
      .min(1, t("brandRequired")) // Erro se o usuário não digitar nada (0 caracteres)
      .min(2, t("brandMinLength")), // Erro se o usuário digitar apenas 1 caractere

    model: z.string()
      .min(1, t("modelRequired"))
      .min(2, t("modelMinLength")),

    color: z.string()
      .min(1, t("colorRequired"))
      .min(2, t("colorMinLength")),

    year: z.coerce
      .number({ invalid_type_error: t("yearInvalid") })
      .min(1886, t("yearMin"))
      .max(new Date().getFullYear() + 1, t("yearMax")),
  });
};

export type CarFormData = z.infer<ReturnType<typeof getCarSchema>>;
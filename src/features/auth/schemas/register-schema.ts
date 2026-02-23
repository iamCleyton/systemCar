import { z } from "zod";

const emailRegex = /^[a-z0-9.+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

export const createRegisterSchema = (t: any) => z.object({
  name: z
    .string()
    .min(2, t("nameMin")),
  email: z
    .string()
    .min(1, t("required"))
    .regex(emailRegex, t("email")),
  password: z
    .string()
    .min(6, t("passwordMin", { min: 6 })),
  confirmPassword: z
    .string()
    .min(1, t("required")),
}).refine((data) => data.password === data.confirmPassword, {
  message: t("passwordMatch"),
  path: ["confirmPassword"],
});

export type RegisterSchema = z.infer<ReturnType<typeof createRegisterSchema>>;
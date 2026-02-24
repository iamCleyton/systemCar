"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { LanguageToggle } from "@/features/auth/components/language-toggle";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import Link from "next/link";

import { createRegisterSchema, RegisterSchema } from "../../schemas/register-schema";

import { useMutation } from "@tanstack/react-query";

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const t = useTranslations('Register');
  const tValidations = useTranslations("Validations");

  const registerSchema = createRegisterSchema(tValidations);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  // CONFIGURAÇÃO DO TANSTACK QUERY
  const mutation = useMutation({
    mutationFn: async (data: RegisterSchema) => {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro no registro");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success(t("success"));
      router.push("/login");
    },
    onError: (error: any) => {
    // Aqui fazemos o "de-para" da tradução
    if (error.message === "Email already exists") {
      toast.error(t("emailAlreadyExists"));
    } else {
      toast.error(error.message || t("error"));
    }},
  });

  const onSubmit = (data: RegisterSchema) => {
    mutation.mutate(data);
  };

  return (
    <div className={cn("flex flex-col gap-6 justify-center", className)} {...props}>
      <div className="flex justify-end items-center absolute gap-2 top-5 right-5">
        <LanguageToggle />
      </div>

      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">{t("title")}</h1>
                <p className="text-muted-foreground text-balance">
                  {t("subtitle")}
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="name">{t("nameLabel")}</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Cleyton"
                  {...register("name")}
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
              </Field>

              <Field>
                <FieldLabel htmlFor="email">{t("emailLabel")}</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="cleyton@example.com"
                  {...register("email")}
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              </Field>

              <Field>
                <FieldLabel htmlFor="password">{t('passwordLabel')}</FieldLabel>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="******" 
                  {...register("password")}
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
              </Field>

              <Field>
                <FieldLabel htmlFor="confirmPassword">{t('confirmPasswordLabel')}</FieldLabel>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  placeholder="******" 
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
              </Field>

              <Field>
                <Button type="submit" disabled={mutation.isPending} className="cursor-pointer">
                  {mutation.isPending ? t("loading") : t("button")}
                </Button>
              </Field>

              <FieldDescription className="text-center">
                {t("footer")} <Link href="/login" className="underline font-medium">{t("loginLink")}</Link>
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="bg-muted relative hidden md:block">
            <Image
              src="/login_car.png" 
              alt="Car Management"
              fill
              className="object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
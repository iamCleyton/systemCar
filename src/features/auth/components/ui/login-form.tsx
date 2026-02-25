"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { LanguageToggle } from "@/features/auth/components/language-toggle";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";

import { createLoginSchema, LoginSchema } from "../../schemas/login-schema";
import { ModeToggle } from "./mode-toggle";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [globalError, setGlobalError] = useState("");

  //  carregando as traduções
  const t = useTranslations('Login');
  const tValidations = useTranslations("Validations");

  //  Criação do schema com as traduções ANTES de usar no useForm
  const loginSchema = createLoginSchema(tValidations);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginSchema) {
    setGlobalError("");
    
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      // Usando a chave de erro do JSON
      toast.error(t("error"));
    } else {
      toast.success(t("success") || "Login ok!");
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 justify-center", className)} {...props}>
      <div className="flex justify-end items-center absolute gap-2 top-5 right-5 ">
        <ModeToggle />
        <LanguageToggle />
      </div>

      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold text-[#003cff]">{t("welcome")}</h1>
                <p className="text-muted-foreground text-balance">
                  {t("subtitle")}
                </p>
              </div>

              {globalError && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md text-center border border-red-200">
                  {globalError}
                </div>
              )}

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
                <Button type="submit" disabled={isSubmitting} className="cursor-pointer bg-[#003cff]">
                  {isSubmitting ? t("loading") : t("button")}
                </Button>
              </Field>

              <FieldDescription className="text-center">
                {t("footer")} <Link href="/register">{t("signup")}</Link>
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="bg-muted relative hidden md:block">
            <Image
              src="/login_car.png"
              alt="Car"
              fill
              className="object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
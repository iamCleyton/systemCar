"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/features/auth/components/ui/button";
import { Card, CardContent } from "@/features/auth/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/features/auth/components/ui/field";
import { Input } from "@/features/auth/components/ui/input";

// ATENÇÃO: Verifique se este caminho está correto para o seu projeto!
import { loginSchema, LoginSchema } from "../../schemas/login-schema"; 

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // 1. Instanciamos os hooks de navegação e estado
  const router = useRouter();
  const [globalError, setGlobalError] = useState("");

  // 2. Configuramos o React Hook Form com o Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  // 3. Função de envio que chama o NextAuth
  async function onSubmit(data: LoginSchema) {
    setGlobalError("");
    
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setGlobalError("Credenciais inválidas. Verifique e-mail e senha.");
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* 4. Adicionamos o onSubmit no <form> */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome</h1>
                <p className="text-muted-foreground text-balance">
                  Login in your system car
                </p>
              </div>

              {/* 5. Aviso de erro global (credenciais inválidas) */}
              {globalError && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md text-center border border-red-200">
                  {globalError}
                </div>
              )}

              {/* CAMPO DE E-MAIL */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="cleyton@example.com"
                  {...register("email")} // Conectado ao Form
                />
                {/* Mensagem de erro do Zod para o e-mail */}
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              </Field>

              {/* CAMPO DE SENHA */}
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="******" 
                  className="border-black"
                  {...register("password")} // Conectado ao Form
                />
                {/* Mensagem de erro do Zod para a senha */}
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
              </Field>

              {/* BOTÃO DE SUBMIT */}
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {/* Reativo: Troca o texto automaticamente */}
                  {isSubmitting ? "Entrando..." : "Login"}
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Don&apos;t have an account? <a href="#">Sign up</a>
              </FieldDescription>
            </FieldGroup>
          </form>

          {/* LADO DA IMAGEM */}
          <div className="bg-muted relative hidden md:block">
            {/* Usando o next/image corretamente com a prop 'fill' para preencher a div pai */}
            <Image
              src="/login_car.png"
              alt="Imagem de um carro de luxo"
              fill
              className="object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
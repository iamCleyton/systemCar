"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginSchema, LoginSchema } from "../schemas/login-schema"; 

export function LoginForm() {
  const router = useRouter();
  const [globalError, setGlobalError] = useState("");
  
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
      redirect: false, // Importante para não recarregar a página
    });

    if (result?.error) {
      setGlobalError("Credenciais inválidas. Verifique e-mail e senha.");
    } else {
      router.push("/dashboard"); // Ou a rota inicial do seu sistema de carros
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm">
      {globalError && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
          {globalError}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">E-mail</label>
        <input
          {...register("email")}
          type="email"
          className="w-full p-2 border rounded-md"
          placeholder="admin@carros.com"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Senha</label>
        <input
          {...register("password")}
          type="password"
          className="w-full p-2 border rounded-md"
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Entrando..." : "Acessar Sistema"}
      </button>
    </form>
  );
}
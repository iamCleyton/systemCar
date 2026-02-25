"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import axios from "axios";

// Cria a instância base do Axios apontando para o seu Spring Boot
export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

export const useAxiosAuth = () => {
  const { data: session } = useSession();

  useEffect(() => {
    // RAIO-X DA SESSÃO: Vamos ver toda a estrutura dela!
    console.log("SESSÃO INTEIRA DO NEXTAUTH:", session);
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        // Pegando o token automático de novo
        const token = (session as any)?.accessToken; 

        if (token && !config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Limpeza do interceptor
    return () => {
      api.interceptors.request.eject(requestIntercept);
    };
  }, [session]);

  return api; // Retorna o axios pronto e com o token na bagagem
};


//Guarda o TOKEN PARA AS REQUISIÇÕES.
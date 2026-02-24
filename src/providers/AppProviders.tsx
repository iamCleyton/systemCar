"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react"; // <-- Importamos o SessionProvider
import { useState } from "react";

export function AppProviders({ children }: { children: React.ReactNode }) {
  // Mantemos a sua configuração excelente de staleTime
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, 
      },
    },
  }));

  return (
    // Colocamos o SessionProvider por fora do QueryClientProvider
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}
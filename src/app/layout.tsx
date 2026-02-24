import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. Importe o Provider que acabamos de juntar (ajuste o caminho se necessário)
import { AppProviders } from "@/providers/AppProviders"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gerenciamento de Carros", // Aproveitei para mudar o título!
  description: "Administre sua frota com facilidade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 2. Envolva o children com o AppProviders */}
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
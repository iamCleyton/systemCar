import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

// Importações Globais e Provedores
import "@/app/globals.css";// Certifique-se de que o caminho do CSS está correto para a sua pasta
import { AppProviders, ThemeProvider } from "@/providers/AppProviders"; 

// Configuração das Fontes
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadados Globais do Site
export const metadata: Metadata = {
  title: "Gerenciamento de Carros", 
  description: "Administre sua frota com facilidade.",
  icons: {
    icon: "/car-icon.png", 
  },
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validação do Idioma
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Busca os textos do idioma atual
  const messages = await getMessages();

  return (
    // suppressHydrationWarning é vital aqui para o next-themes funcionar sem piscar
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        
        {/* Provedor de Tema (Dark/Light) envolvendo tudo */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Provedor de Idioma */}
          <NextIntlClientProvider messages={messages}>
            {/* Seus Provedores Customizados (React Query, Auth, etc) */}
            <AppProviders>
              {children}
            </AppProviders>
          </NextIntlClientProvider>
          
          {/* Toasts de Notificação */}
          <ToastContainer 
            position="bottom-right"
            autoClose={3000}
            theme="colored" 
          />
        </ThemeProvider>

      </body>
    </html>
  );
}
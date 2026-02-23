import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

// Importe o seu novo QueryProvider aqui
import { QueryProvider } from '@/providers/query-provider'; 

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {/* Envolva o children aqui para o TanStack Query funcionar em tudo */}
          <QueryProvider>
            {children}
          </QueryProvider>
        </NextIntlClientProvider>
        
        <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          theme="colored"
        />
      </body>
    </html>
  );
}
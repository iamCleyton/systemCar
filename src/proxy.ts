import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

// middleware de idiomas
const intlMiddleware = createIntlMiddleware(routing);

// 2. middleware de autenticação
const authMiddleware = withAuth(
  function middleware(req) {
    // Se o usuário chegar aqui, ele está autenticado.
    // requisição para o next-intl processar o idioma.
    return intlMiddleware(req);
  },
  {
    callbacks: {
      // Retorna true se houver um token (usuário logado)
      authorized: ({ token }) => !!token,
    },
    pages: {
      // Garanta que o caminho de login esteja correto
      signIn: "/login", 
    },
  }
);

export default function middleware(req: NextRequest) {
  const publicPages = ["/", "/login", "/register"];
  
  // Criar um regex para identificar se a rota atual é pública (mesmo com locale)
  // Ex: /pt/login ou /login
  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join("|")}))?(${publicPages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`,
    "i"
  );

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    // Se for página pública, apenas processa o idioma
    return intlMiddleware(req);
  } else {
    // Se for página protegida (como /dashboard), passa pelo authMiddleware
    return (authMiddleware as any)(req);
  }
}

export const config = {
  // O matcher deve capturar todas as rotas, exceto arquivos estáticos e API
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
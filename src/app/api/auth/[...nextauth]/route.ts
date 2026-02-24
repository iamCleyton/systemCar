import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const res = await fetch("http://localhost:8080/api/auth/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password,
                        }),
                    });

                    const data = await res.json();
                    
                    // LOG IMPORTANTE: Vamos ver o que o Java realmente devolveu
                    console.log("RESPOSTA DO LOGIN JAVA:", data);

                    if (res.ok) {
                        // Tenta buscar o token por diferentes nomes comuns
                        const tokenEncontrado = data.token || data.accessToken || data.jwt;

                        if (tokenEncontrado) {
                            return {
                                id: data.email || data.id || "1", 
                                name: data.name || "Usuário",
                                email: data.email || credentials?.email,
                                accessToken: tokenEncontrado, // Pega o token correto!
                            };
                        } else {
                            console.error("Login com sucesso, mas token não encontrado no JSON:", data);
                            return null;
                        }
                    }

                    console.error("Falha no login. Status:", res.status, data);
                    return null;

                } catch (error) {
                    console.error("Erro ao conectar com o backend no login:", error);
                    return null;
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = (user as any).accessToken;
            }
            return token;
        },

        async session({ session, token }) {
            (session as any).accessToken = token.accessToken;
            return session;
        },
    },

    pages: {
        signIn: "/login",
    },

    session: {
        strategy: "jwt",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
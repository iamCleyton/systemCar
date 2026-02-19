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
                // ... dentro da função authorize() no NextAuth ...
                const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: credentials?.email,
                    password: credentials?.password,
                }),
                });

                const data = await res.json();

                // Se a resposta for OK e o token existir no JSON
                if (res.ok && data.token) {
                return {
                    id: data.email,   // Usamos o email como ID único
                    name: data.name,  // Pega o nome REAL que o Spring acabou de enviar!
                    email: data.email,
                    accessToken: data.token, 
                };
                }

                return null; // Se falhar, recusa o login
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            
            if (user) {
              
                token.accessToken = user.accessToken;
            }
            return token;
        },

        async session({ session, token }) {
            
            session.user.accessToken = token.accessToken as string;
         
        
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
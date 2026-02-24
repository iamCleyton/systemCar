

//o que o spring devolve no login
export interface SpringLoginResponse {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

declare module "next-auth" {
    interface User{
        accessToken?: string;
    }

    interface Session {
        user: {
            id?: number;
            name?: string;
            email?: string;
            image?: string;
            accessToken?: string;
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
    }
}
import  { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface User {
    id: number;
    role: number;
    accessToken: string;
  }

  interface Session extends DefaultSession {
    accessToken?: string;
    user: {
      id: number;
      role: number;
      email: string;
      name: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: number;
    role?: number;
    accessToken?: string;
  }
}

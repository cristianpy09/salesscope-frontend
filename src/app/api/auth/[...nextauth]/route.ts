import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials")
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        if (!res.ok) {
          throw new Error("Invalid email or password")
        }

        const data = await res.json();
        return {
           id: Number(data.user.user_id),
          name: data.user.full_name,
          email: data.user.email,
          role: data.user.role_id,
          accessToken: data.access_token,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
         token.id = Number(user.id); 
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as number;
      session.user.role = token.role as number;
      session.accessToken = token.accessToken as string;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

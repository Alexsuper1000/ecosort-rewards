import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@ecosort.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email) return null
        
        // Simulated authentication for demo purposes
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        })
        
        if (user) {
          // Warning: No password check here for the demo seed users
          return user
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role
        token.companyId = user.companyId
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.companyId = token.companyId as string | undefined
      }
      return session
    }
  },
  session: { strategy: "jwt" }
})

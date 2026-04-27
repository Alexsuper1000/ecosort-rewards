import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    role?: string
    companyId?: string | null
  }
  interface Session {
    user: User & {
      role?: string
      companyId?: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
    companyId?: string | null
  }
}

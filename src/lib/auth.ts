import { createAuthClient } from "better-auth/react"
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { env } from "./env";
 
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
      provider: 'postgresql'
    }),
    emailAndPassword: {
        enabled: true,
    },
    trustedOrigins: [env.BETTER_AUTH_URL],
    plugins: [nextCookies()]
})

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? 'http://localhost:3000',
})
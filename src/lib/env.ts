import { z } from 'zod'

if (process.env.NODE_ENV !== 'production' && !process.env.DATABASE_URL) {
  await import ('dotenv/config')
}

const envSchema = z.object({
    DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
    BETTER_AUTH_SECRET: z.string().min(1, "BETTER_AUTH_SECRET is required"),
    BETTER_AUTH_URL: z.string().url("BETTER_AUTH_URL must be a valid URL")
})

export const _env = envSchema.safeParse(process.env)

if(!_env.success) {
    console.error('❌ Invalid environment variables', _env.error.format())
    console.error('Current env:', {
        DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'MISSING',
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET ? 'SET' : 'MISSING', 
        BETTER_AUTH_URL: process.env.BETTER_AUTH_URL ? 'SET' : 'MISSING'
    })
    throw new Error('Invalid environment variables')    
}

export const env = _env.data
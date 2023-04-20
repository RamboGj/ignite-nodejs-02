import { config } from 'dotenv'
import { z } from 'zod'

let envToRead

if (process.env.NODE_ENV === 'test') {
  envToRead = config({ path: '.env.test' })
} else {
  envToRead = config()
}

const envSchema = z.object({
  DATABASE_URL: z.string(),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
  PORT: z.coerce.number().default(3333), // Independents on field value received, coerse transforms this in a number after receiving
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
})

const _env = envSchema.safeParse(envToRead.parsed)

if (_env.success === false) {
  console.error('Invalid environment variables!', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data

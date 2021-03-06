import jwt from 'jsonwebtoken'

export const supabase = (token: string) => {
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.SUPABASE_JWT_SECRET) {
      throw new Error('`SUPABASE_JWT_SECRET` env var is not set.')
    }

    try {
      const secret = process.env.SUPABASE_JWT_SECRET as string
      return Promise.resolve(
        jwt.verify(token, secret) as Record<string, unknown>
      )
    } catch (error) {
      return Promise.reject(error)
    }
  } else {
    return Promise.resolve(jwt.decode(token))
  }
}

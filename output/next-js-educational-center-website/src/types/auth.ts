import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT'
    } & DefaultSession['user']
  }

  interface User {
    role: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT'
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT'
  }
}
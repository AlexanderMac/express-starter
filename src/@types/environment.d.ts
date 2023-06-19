declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string
      PORT: string
      DB_CONNECTION_URL: string
    }
  }
}

export {}

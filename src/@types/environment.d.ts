declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'test' | 'development' | 'staging' | 'production'
      PORT: string
      DB_CONNECTION_URL: string
    }
  }
}

export {}

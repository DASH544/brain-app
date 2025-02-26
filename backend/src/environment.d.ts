declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URL: string;
      JWT_SEC: string;
      NODE_ENV: 'development' | 'production';
      PORT?: string;
    }
  }}
  export {}
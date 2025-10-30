declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URI: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    FACEBOOK_CLIENT_ID: string;
    FACEBOOK_CLIENT_SECRET: string;
    EMAIL_SERVER: string;
    EMAIL_FROM: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
  }
}

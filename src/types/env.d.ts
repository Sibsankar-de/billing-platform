declare namespace NodeJS {
    interface ProcessEnv {
        PORT?: string;
        CORS_ORIGIN: string;
        MONGO_CONNECTION_URI: string;
        LOG_COOKIE_EXPIRY: number;
        ACCESS_TOKEN_SECRET: string;
        REFRESH_TOKEN_SECRET: string;
        ACCESS_TOKEN_EXPIRY: number;
        REFRESH_TOKEN_EXPIRY: number;
        LOGOUT_TOKEN_SECRET: string;
        LOGOUT_TOKEN_EXPIRY: number;
        PASSWORD_RESET_TOKEN_SECRET: string;
        CLOUDINARY_CLOUD_NAME: string;
        CLOUDINARY_API_SECRET: string;
        CLOUDINARY_API_KEY: string;
        CLOUDINARY_FOLDER: string;
        CLOUDINARY_USER_FOLDER: string;
        CLOUDINARY_AUDIO_FOLDER: string;
        OPENROUTER_API_KEY: string;
        OPENAI_API_KEY: string;
        OAUTH_CLIENT_URI: string;
        OAUTH_CALLBACK_URI: string;
        GITHUB_CLIENT_ID: string;
        GITHUB_CLIENT_SECRET: string;
        LINKEDIN_CLIENT_ID: string;
        LINKEDIN_CLIENT_SECRET: string;
        GOOGLE_CLIENT_ID: string;
        GOOGLE_CLIENT_SECRET: string;
    }
}
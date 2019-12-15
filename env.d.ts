declare namespace NodeJS {
    export interface ProcessEnv {
        SERVER_PORT: string;
        DATABASE_URL: string;
        REDIS_URL: string;
        DATA_ROOT: string;
        MONGO_DB_NAME: string;
        TOKEN_ISSUER: string;
        TOKEN_TTL: string;
    }
}
import dotenv  from 'dotenv';

dotenv.config();

const config = {
    end: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    dbHost: process.env.DB_HOST || 'localhost',
    dbUser: process.env.DB_USER || 'root',
    dbPassword: process.env.DB_PASSWORD || 'root',
    dbName: process.env.DB_NAME || 'test',
    dbPort: process.env.DB_PORT || 5432
}

export { config };
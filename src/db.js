import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const databaseConfig = {
    host: process.env.HOST_POSTGRES,
    port: process.env.PORT_POSTGRES,
    user: process.env.USER_POSTGRES,
    password: process.env.PASSWORD_POSTGRES,
    database: process.env.DATABASE_POSTGRES
};

const connection = new Pool(databaseConfig);

export default connection;
import { DataSource } from "typeorm";
import { config } from "../config/config";

const AppDataSource = new DataSource({
    type: 'postgres',
    host: config.dbHost,
    port: config.dbPort as number,
    username: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    synchronize: true,
    entities: ['src/db/entities/*.ts'],
    logging: false,
    ssl: true,
})

AppDataSource.initialize()
    .then(() => {
        console.log('Data source has been initialized!');
    })
    .catch((err) => {
        console.error('Error initializing dataSource:', err);
    })

export { AppDataSource };
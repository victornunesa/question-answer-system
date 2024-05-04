import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'system',
    synchronize: false,
    entities: ["dist/**/*.entity.js"],
    migrations: ["dist/db/migrations/*.js"]
};

const dataSource = new DataSource(dataSourceOptions); 
export default dataSource;
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  // entities: [Episode],
  //   autoLoadEntities: true,
  synchronize: true, // todo: not safe for production and we should use migrations instead
  // subscribers: [__dirname + '/domain/subscribers/*.subscriber{.ts,.js}'],
  migrations: ['./src/migrations/*{.ts,.js}'],
  entities: ['src/**/*.entity{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);
dataSource.initialize();

export default dataSource;


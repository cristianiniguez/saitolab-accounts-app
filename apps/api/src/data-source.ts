import { DataSource } from 'typeorm';
import { loadEnvironment } from './environments';

loadEnvironment();

export const dataSource = new DataSource({
  entities: ['src/**/*.entity.ts'],
  logging: false,
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
  synchronize: false,
  type: 'postgres',
  url: process.env.DATABASE_URL,
});

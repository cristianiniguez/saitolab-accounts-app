import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  databaseUrl: process.env.DATABASE_URL,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
}));

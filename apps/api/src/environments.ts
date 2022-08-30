import * as dotenv from 'dotenv';
import * as path from 'path';

export const environments: { [k: string]: string } = {
  dev: '.env',
  production: '.env.production',
  staging: '.env.staging',
  test: '.env.test',
};

export const getEnvFileName = (): string =>
  environments[process.env.NODE_ENV || 'dev'] || '.env';

// only used for typeorm migrations
export const loadEnvironment = () => {
  dotenv.config({
    path: path.resolve(process.cwd(), getEnvFileName()),
  });
};

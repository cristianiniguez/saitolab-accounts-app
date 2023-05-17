enum ENVIRONMENT {
  DEV = 'dev',
  PROD = 'production',
  STAGE = 'staging',
  TEST = 'test',
}

export const environments: { [k: string]: string } = {
  [ENVIRONMENT.DEV]: '.env',
  [ENVIRONMENT.PROD]: '.env.production',
  [ENVIRONMENT.STAGE]: '.env.staging',
  [ENVIRONMENT.TEST]: '.env.test',
};

export const getEnvFileName = (): string =>
  environments[process.env.NODE_ENV || ENVIRONMENT.DEV] || '.env';

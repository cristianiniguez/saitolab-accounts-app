export const API_URL = process.env.API_HOST || process.env.NEXT_PUBLIC_API_HOST;

export enum API_ROUTES {
  SIGN_IN = '/auth/sign-in',
  SIGN_UP = '/auth/sign-up',
}

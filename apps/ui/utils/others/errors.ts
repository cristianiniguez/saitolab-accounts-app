import { UNKNOWN_ERROR } from 'constants/';

export const getErrorMessage = (error: unknown) => {
  return error instanceof Error ? error.message : UNKNOWN_ERROR;
};

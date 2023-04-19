import { User } from '@prisma/client';

export const getDateStr = (date: Date) => date.toISOString().split('T')[0];

export const removePassword = (user: User) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userToReturn } = user;
  return userToReturn;
};

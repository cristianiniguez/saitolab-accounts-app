import { signIn } from 'next-auth/react';
import axios from 'axios';

import { SignUpPayload, SignUpApiResponse, SignInPayload } from 'types/api';
import { API_ROUTES, API_URL, UNKNOWN_ERROR } from 'constants/';

export const signUpRequest = async (payload: SignUpPayload) => {
  const { data } = await axios.post<SignUpApiResponse>(`${API_URL}${API_ROUTES.SIGN_UP}`, payload);
  return data;
};

export const signInRequest = async (payload: SignInPayload) => {
  const response = await signIn<'credentials'>('credentials', { ...payload, redirect: false });

  if (!response) throw new Error(UNKNOWN_ERROR);
  if (response.error) throw new Error(response.error);
};

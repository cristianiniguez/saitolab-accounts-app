import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

import { SignInApiResponse } from 'types/api';
import { API_ROUTES, API_URL, INVALID_CREDENTIALS_ERROR, ROUTES } from 'constants/';

const options: NextAuthOptions = {
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) token = { ...token, accessToken: user.accessToken };
      return token;
    },
    session: ({ session, token }) => {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: ROUTES.SIGN_IN,
  },
  providers: [
    CredentialsProvider({
      authorize: async credentials => {
        if (!credentials) return null;
        const { email, password } = credentials;

        try {
          const { data } = await axios.post<SignInApiResponse>(
            `${API_URL}${API_ROUTES.SIGN_IN}`,
            null,
            {
              auth: { password, username: email },
            },
          );
          const { access_token, user } = data;
          return {
            ...user,
            accessToken: access_token,
            name: `${user.firstName} ${user.lastName}`,
          };
        } catch (error) {
          console.error(error);
          throw new Error(INVALID_CREDENTIALS_ERROR);
        }
      },
      credentials: {
        email: { required: true, type: 'email' },
        password: { require: true, type: 'password' },
      },
    }),
  ],
};

export default NextAuth(options);

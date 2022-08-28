export type SignInPayload = {
  email: string;
  password: string;
};

export type SignInApiResponse = {
  access_token: string;
  user: {
    id: number;
    firstName: number;
    lastName: number;
    role: string;
  };
};

export type SignUpPayload = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type SignUpApiResponse = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

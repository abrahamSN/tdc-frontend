import { axiosNonAuth, axiosWithAuth } from "../config/axios.config";

export const signIn = async (email: string, password: string) => {
  const api = axiosNonAuth();
  
  const res = await api.post('/auth/sign_in', {
    email: email,
    password: password,
  });

  return res;
};

export const signUp = async (
  name: string,
  email: string,
  password: string,
  password_confirmation: string
) => {
  const api = axiosNonAuth();

  const res = await api.post('/auth/sign_up', {
    name: name,
    email: email,
    password: password,
    password_confirmation: password_confirmation,
  });

  return res;
};

export const signOut = async (token: string) => {
  const api = axiosWithAuth(token);

  const res = await api.post('/auth/sign_out');

  return res;
};

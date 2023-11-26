import { axiosWithAuth } from "../config/axios.config";

import appConfig from "../config/app.config";
import { User } from "../config/types.config";

const { version } = appConfig.api;

export const getUsers = async (token: string) => {
  const api = axiosWithAuth(token);
  const res = await api.get(`/${version}/users`);

  return res;
};

export const getUserById = async (token: string, userId: string) => {
  const api = axiosWithAuth(token);

  const res = await api.get(`/${version}/users/${userId}`);

  return res;
};

export const createUser = async (token: string, data: Partial<User>) => {
  const api = axiosWithAuth(token);
  const res = await api.post(`/${version}/users`, {
    name: data.name,
    email: data.email,
    password: data.pass,
    password_confirmation: data.confirmPass,
  });

  return res;
};

export const updateUser = async (token: string, id: string, data: Partial<User>) => {
  const api = axiosWithAuth(token);
  const res = await api.patch(`/${version}/users/${id}`, {
    name: data.name,
  });
  
  return res;
};

export const deleteUser = async (token:string, id: string) => {
  const api = axiosWithAuth(token);
  const res = await api.delete(`/${version}/users/${id}`);

  return res;
};

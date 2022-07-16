import { AxiosPromise } from 'axios';
import { api } from './api';

const newData = new Date();

export const getUsersForId = (id: number): AxiosPromise =>
  api.get(`/users/${id}`);

export const login = (email: string, password: string): AxiosPromise =>
  api.get(`/users?email=${email}&password=${password}`);

export const registerUser = (
  name: string,
  email: string,
  password: string,
): AxiosPromise => {
  const user = {
    name,
    email,
    password,
    role: 'user',
    token: 'hdkajsduasd4d65as7',
    last_access: newData,
  };
  return api.post('/users', user);
};

import { AxiosPromise } from 'axios';
import { api } from './api';

export const getItems = (filters?: string): AxiosPromise => {
  if (filters) {
    return api.get(`/items?q=${filters}`);
  }
  return api.get('/items');
};

export const getItemForId = (id: number): AxiosPromise =>
  api.get(`/items/${id}`);

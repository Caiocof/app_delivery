import { AxiosPromise } from 'axios';
import { IAddress } from '../interfaces/address';
import { api } from './api';

export const getAddress = (userId: number): AxiosPromise =>
  api.get(`/address?user_id=${userId}`);

export const getAddressForId = (id: number): AxiosPromise =>
  api.get(`/address/${id}`);

export const registerAddress = (address: IAddress): AxiosPromise =>
  api.post('/address', address);

export const deleteAddress = (id: number): AxiosPromise =>
  api.delete(`/address/${id}`);

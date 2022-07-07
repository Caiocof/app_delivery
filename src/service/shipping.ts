import { AxiosPromise } from 'axios';
import { api } from './api';

export const getShippingForDistrict = (district: string): AxiosPromise =>
  api.get(`/shipping?district=${district}`);

export default getShippingForDistrict;

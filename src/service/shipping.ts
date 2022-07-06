import { AxiosPromise } from 'axios'
import { api } from './api'


export const getShippingForDistrict = (district: string) => {
  return api.get(`/shipping?district=${district}`)
}
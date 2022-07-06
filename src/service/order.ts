import { AxiosPromise } from 'axios'
import { IOrder } from '../interfaces/order'
import { api } from './api'


export const registerOrder = (order: IOrder): AxiosPromise => {
  return api.post('/orders',order)
}
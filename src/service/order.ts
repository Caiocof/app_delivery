import { AxiosPromise } from 'axios'
import { IOrder } from '../interfaces/order'
import { api } from './api'


export const registerOrder = (order: IOrder): AxiosPromise => {
  if (order.order_status == "preparing") {
    return api.post('/orders', order)
  }
  throw new Error('error in order status')
}

export const listOrders = (user_id: number): AxiosPromise => {
  return api.get(`/orders?user_id=${user_id}`)
}
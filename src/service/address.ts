import { AxiosPromise } from 'axios'
import { IAddress } from '../interfaces/address'
import { api } from './api'

export const getAddress = (user_id: number): AxiosPromise => {
  return api.get(`/address?user_id=${user_id}`)
}

export const getAddressForId = (id: number): AxiosPromise => {
  return api.get(`/address/${id}`)
}

export const registerAddress = (address: IAddress): AxiosPromise => {
  return api.post('/address', address)
}

export const deleteAddress = (id: number): AxiosPromise => {
  return api.delete(`/address/${id}`)
}
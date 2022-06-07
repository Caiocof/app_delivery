import { AxiosPromise } from 'axios'
import { api } from './api'

export const getItems = (filters?: string): AxiosPromise => {
    if (filters) {
        return api.get(`/items?q=${filters}`)
    }
    return api.get('/items')
}

export const getItem = (id: number): AxiosPromise => {
    return api.get(`/items/${id}`)
}
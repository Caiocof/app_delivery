import { AxiosPromise } from 'axios'
import { api } from './api'

export const getPromotions = (filters?: string): AxiosPromise => {
    if (filters) {
        return api.get(`/promotions?q=${filters}`)
    }
    return api.get('/promotions')
}
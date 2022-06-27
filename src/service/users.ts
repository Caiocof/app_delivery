import { AxiosPromise } from 'axios'
import { api } from './api'

const newData = new Date()

const getRandomToken = (secret: string, maxCharacter: number) => {
	secret += Math.floor((Math.random() * maxCharacter))
	return secret.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
}

export const getUsersForId = (id: number): AxiosPromise => {
	return api.get(`/users/${id}`)
}

export const login = (email: string, password: string): AxiosPromise => {
	return api.get(`/users?email=${email}&password=${password}`)
}

export const registerUser = (name: string, email: string, password: string): AxiosPromise => {
	const token = getRandomToken('hdkajsduasd4d65as7', 50)

	const user = {
		name: name,
		email: email,
		password: password,
		role: "user",
		token: token,
		last_access: newData
	}
	return api.post('/users', user)
}
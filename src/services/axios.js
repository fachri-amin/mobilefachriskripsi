import axios from 'axios'
import CONFIG from '../config'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BASE_URL = CONFIG.API_URL
let instance = null

function makeInstance() {
	if (instance) {
		return instance
	}

	instance = axios.create({
		baseURL: BASE_URL,
		timeout: 60000,
	})

	return instance
}

const axiosInstance = makeInstance()

axiosInstance.interceptors.request.use(
	async (config) => {
		let user = await AsyncStorage.getItem('user')
		if (user) {
			user = JSON.parse(user)
			config.headers.Authorization = 'Bearer ' + user.token
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	},
)

export const setAuthHeader = (accessToken) => {
	axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
}

export const resetAuthHeader = () => {
	delete axiosInstance.defaults.headers.common.Authorization
}

export default axiosInstance

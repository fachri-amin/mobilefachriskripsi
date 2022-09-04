import { action } from 'easy-peasy'
import AsyncStorage from '@react-native-async-storage/async-storage'

const auth = {
	user: null,
	setUser: action((state, payload) => {
		state.user = payload
	}),
	logout: action(async (state, payload) => {
		await AsyncStorage.removeItem('user')
		state.user = null
	}),
}

export default auth

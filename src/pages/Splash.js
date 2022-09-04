import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { bgColor } from '../constants'

const Splash = ({ navigation }) => {
	React.useEffect(() => {
		async function authCheck() {
			let user = await AsyncStorage.getItem('user')

			if (user) {
				setTimeout(() => {
					navigation.navigate('MainApp')
				}, 3000)
			} else {
				setTimeout(() => {
					navigation.navigate('Login')
				})
			}
		}

		authCheck()
	}, [])

	return (
		<View style={styles.pages}>
			<View style={styles.textBorder}>
				<Text style={styles.logo}>Dzakir Motor</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	pages: {
		backgroundColor: bgColor.secondary,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textBorder: {
		borderWidth: 2,
		padding: 4,
		borderRadius: 14,
		borderColor: bgColor.primary,
	},
	logo: {
		fontSize: 42,
		fontWeight: '800',
		color: bgColor.grey2,
		backgroundColor: bgColor.primary,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 8,
	},
	subTitle: {
		marginTop: 5,
		fontWeight: '600',
		color: bgColor.grey2,
	},
})

export default Splash

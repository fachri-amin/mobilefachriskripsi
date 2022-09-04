import React from 'react'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import { faMotorcycle } from '@fortawesome/free-solid-svg-icons/faMotorcycle'
import { faDollar } from '@fortawesome/free-solid-svg-icons/faDollar'
import { faSignOut } from '@fortawesome/free-solid-svg-icons/faSignOut'
import { bgColor } from '../constants'

const CustomDrawer = (props) => {
	return (
		<DrawerContentScrollView {...props} style={styles.container}>
			<View style={styles.logoContainer}>
				<Text style={styles.textLogo}>Dzakir Motor</Text>
			</View>
			<TouchableOpacity
				style={props.state.index === 0 ? styles.itemActive : styles.item}
				onPress={() => props.navigation.navigate('Home')}
			>
				<FontAwesomeIcon icon={faHome} color={bgColor.grey2} />
				<Text style={{ marginLeft: 5 }}>Home</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={props.state.index === 1 ? styles.itemActive : styles.item}
				onPress={() => props.navigation.navigate('Sales')}
			>
				<FontAwesomeIcon icon={faDollar} color={bgColor.grey2} />
				<Text style={{ marginLeft: 5 }}>Sales</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={props.state.index === 2 ? styles.itemActive : styles.item}
				onPress={() => props.navigation.navigate('Motorcycle')}
			>
				<FontAwesomeIcon icon={faMotorcycle} color={bgColor.grey2} />
				<Text style={{ marginLeft: 5 }}>Sepeda Motor</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate('Login')}>
				<FontAwesomeIcon icon={faSignOut} color={bgColor.grey2} />
				<Text style={{ marginLeft: 5 }}>Logout</Text>
			</TouchableOpacity>
		</DrawerContentScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: bgColor.secondary,
	},
	logoContainer: {
		paddingLeft: 20,
		paddingTop: 10,
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderColor: bgColor.grey2,
		marginBottom: 5,
	},
	textLogo: {
		fontSize: 36,
		fontWeight: '700',
		color: bgColor.grey2,
	},
	item: {
		color: bgColor.grey2,
		padding: 20,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	itemActive: {
		backgroundColor: bgColor.primary,
		padding: 20,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
})

export default CustomDrawer

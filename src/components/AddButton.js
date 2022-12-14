import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { bgColor } from '../constants'

const AddButton = ({ onPress, text, type, loading = false, disabled = false }) => {
	return (
		<TouchableOpacity
			onPress={!disabled ? onPress : () => {}}
			style={type === 'secondary' ? styles.secondaryContainer : styles.primaryContainer}
		>
			{loading && <ActivityIndicator size="small" color={bgColor.grey2} />}
			{!loading && <Text style={styles.title}>{text}</Text>}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	primaryContainer: {
		padding: 8,
		borderRadius: 4,
		backgroundColor: bgColor.primary,
	},
	secondaryContainer: {
		padding: 8,
		borderRadius: 4,
		backgroundColor: bgColor.secondary,
	},
	title: {
		color: bgColor.grey2,
		textAlign: 'center',
		fontSize: 16,
		fontWeight: '600',
	},
})

export default AddButton

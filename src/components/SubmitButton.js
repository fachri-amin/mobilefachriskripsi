import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { bgColor } from '../constants'

const SubmitButton = ({ onPress, text, type, small, loading = false, disabled = false }) => {
	const padding = small ? 8 : 16

	return (
		<TouchableOpacity
			onPress={!disabled ? onPress : () => {}}
			style={
				type === 'secondary'
					? { ...styles.secondaryContainer, paddingVertical: padding }
					: { ...styles.primaryContainer, paddingVertical: padding }
			}
		>
			{loading && <ActivityIndicator size="small" color={bgColor.grey2} />}
			{!loading && <Text style={styles.title}>{text}</Text>}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	primaryContainer: {
		minWidth: '100%',
		padding: 16,
		borderRadius: 4,
		backgroundColor: bgColor.primary,
	},
	secondaryContainer: {
		minWidth: '100%',
		padding: 16,
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

export default SubmitButton

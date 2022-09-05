import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

const TextError = ({ text }) => {
	return <Text style={styles.content}>{text}</Text>
}

export default TextError

const styles = StyleSheet.create({
	content: {
		fontSize: 10,
		color: '#a70000',
		marginTop: -8,
		marginLeft: 8,
	},
})

import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import { bgColor } from '../../constants'

const DashboardLayout = ({ children, title }) => {
	return (
		<ScrollView>
			<View style={styles.pages}>
				<View style={styles.contentContainer}>
					<Text style={styles.title}>{title}</Text>
					{children}
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	pages: {
		backgroundColor: bgColor.grey2,
		flex: 1,
		padding: 10,
	},
	contentContainer: {
		backgroundColor: 'white',
		flex: 1,
		borderRadius: 8,
		padding: 8,
	},
	title: {
		fontSize: 14,
		fontWeight: '700',
		marginBottom: 8,
		borderBottomWidth: 1,
		borderColor: bgColor.grey2,
		paddingBottom: 8,
	},
})

export default DashboardLayout

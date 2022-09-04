import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { bgColor } from '../constants'

const Select = ({ label = 'Label', data = [], placeholder = 'Select item', onSelect = () => {} }) => {
	const [value, setValue] = useState(null)
	const [isFocus, setIsFocus] = useState(false)

	const renderLabel = () => {
		if (value || isFocus) {
			return <Text style={[styles.label, isFocus && { color: bgColor.primary }]}>{label}</Text>
		}
		return null
	}

	const renderItem = (item) => {
		return (
			<View style={styles.item}>
				<Text style={styles.textItem}>{item.label}</Text>
			</View>
		)
	}

	useEffect(() => {
		onSelect(value)
	}, [value])

	return (
		<View style={styles.container}>
			{renderLabel()}
			<Dropdown
				style={[styles.dropdown, isFocus && { borderColor: bgColor.primary }]}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				inputSearchStyle={styles.inputSearchStyle}
				iconStyle={styles.iconStyle}
				data={data}
				maxHeight={300}
				labelField={label}
				valueField="value"
				placeholder={!isFocus ? placeholder : '...'}
				searchPlaceholder="Search..."
				value={value}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				onChange={(item) => {
					setValue(item.value)
					setIsFocus(false)
				}}
				renderItem={renderItem}
			/>
		</View>
	)
}

export default Select

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		// padding: 16,
		marginVertical: 10,
	},
	dropdown: {
		height: 60,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 4,
		paddingHorizontal: 12,
		backgroundColor: '#F5F5F5',
	},
	icon: {
		marginRight: 5,
	},
	label: {
		position: 'absolute',
		backgroundColor: 'white',
		left: 10,
		top: -10,
		zIndex: 999,
		paddingHorizontal: 2,
		fontSize: 12,
		color: 'gray',
	},
	placeholderStyle: {
		fontSize: 16,
		color: 'grey',
	},
	selectedTextStyle: {
		fontSize: 16,
		color: 'black',
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
	item: {
		padding: 17,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	textItem: {
		flex: 1,
		fontSize: 16,
		color: 'black',
	},
})

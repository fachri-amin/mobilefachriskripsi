import React from 'react'
import { TextInput } from 'react-native-paper'
import { bgColor } from '../constants'

const Input = ({ onChange, label, isPassword, value, error, onBlur }) => {
	return (
		<TextInput
			activeOutlineColor={bgColor.primary}
			label={label}
			mode="outlined"
			onChangeText={(value) => onChange(value)}
			onBlur={onBlur}
			value={value}
			error={error}
			style={{
				marginVertical: 8,
				color: 'red',
			}}
		/>
	)
}

export default Input

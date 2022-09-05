import React from 'react'
import { TextInput } from 'react-native-paper'
import { bgColor } from '../constants'
import TextError from './TextError'

const Input = ({ onChange, label, isPassword, value, error, onBlur, textError, isNumber }) => {
	return (
		<>
			<TextInput
				keyboardType={isNumber ? 'number-pad' : ''}
				secureTextEntry={isPassword}
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
			{error && <TextError text={textError} />}
		</>
	)
}

export default Input

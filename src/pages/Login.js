import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Card, TextInput } from 'react-native-paper'
import { Formik } from 'formik'
import { bgColor } from '../constants'
import SubmitButton from '../components/SubmitButton'
import Input from '../components/Input'
import Gap from '../components/Gap'
import { useLogin } from '../hooks'
import { setAuthHeader } from '../services/axios'
import { useStoreActions } from 'easy-peasy'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Yup from 'yup'

const LoginSchemaValidation = Yup.object().shape({
	username: Yup.string().required('Username Wajib diisi'),
	password: Yup.string().required('Kata sandi wajib di isi'),
})

const Login = ({ navigation }) => {
	const setUser = useStoreActions((actions) => actions.setUser)
	const { mutate, isLoading } = useLogin()
	const formikRef = React.useRef(null)
	const [error, setError] = React.useState(null)

	const handleFormSubmit = (formValue) => {
		setError(null)
		mutate(formValue, {
			onSuccess: async (res) => {
				const { token, user } = res?.data

				setUser({ ...user, token })
				setAuthHeader(token)
				await AsyncStorage.setItem('user', JSON.stringify({ ...user, token }))
				navigation.navigate('MainApp')
			},
			onError: (err) => {
				setError(err.response.data.message)
			},
		})
	}

	return (
		<View style={styles.pages}>
			<Card style={styles.card}>
				<Text style={styles.title}>Login</Text>
				<Formik
					validationSchema={LoginSchemaValidation}
					initialValues={{ username: '', password: '' }}
					onSubmit={handleFormSubmit}
				>
					{({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
						<View>
							<Input
								label="Username"
								value={values.username}
								onChange={(value) => setFieldValue('username', value)}
								onBlur={handleBlur}
							/>
							<Input
								label="Password"
								value={values.password}
								onChange={(value) => setFieldValue('password', value)}
								onBlur={handleBlur}
							/>
							<Gap size={16} />
							<SubmitButton text="Masuk" loading={false} onPress={handleSubmit} />
						</View>
					)}
				</Formik>
			</Card>
		</View>
	)
}

const styles = StyleSheet.create({
	pages: {
		backgroundColor: bgColor.secondary,
		flex: 1,
		justifyContent: 'center',
		padding: 32,
	},
	card: {
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: '800',
		color: bgColor.secondary,
		marginBottom: 20,
		textAlign: 'center',
	},
})

export default Login

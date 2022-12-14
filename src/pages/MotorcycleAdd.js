import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useStoreActions } from 'easy-peasy'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useAddMotorcycle } from '../hooks'
import { bgColor, transmisiOptions, merkOptions, jenisOptions } from '../constants'
import DashboardLayout from '../components/Layout/DashboardLayout'
import Select from '../components/Select'
import SubmitButton from '../components/SubmitButton'
import Input from '../components/Input'
import Gap from '../components/Gap'

const SchemaValidation = Yup.object().shape({
	nama: Yup.string().required('Nama wajib diisi'),
	merk: Yup.string().required('Merk wajib di isi'),
	volume_silinder: Yup.string().required('Volume silinder Wajib diisi'),
	jumlah_silinder: Yup.string().required('Jumlah silinder wajib di isi'),
	transmisi: Yup.string().required('Transmisi wajib di isi'),
	jenis: Yup.string().required('Jenis wajib di isi'),
})

const FormInitialValue = {
	nama: '',
	volume_silinder: '',
	jumlah_silinder: '',
	merk: '',
	transmisi: '',
	jenis: '',
}

const MotorcycleAdd = ({ navigation }) => {
	const { mutate, isLoading } = useAddMotorcycle()
	const setSuccessToast = useStoreActions((actions) => actions.setSuccessToast)
	const setErrorToast = useStoreActions((actions) => actions.setErrorToast)

	const handleFormSubmit = (formValue) => {
		mutate(formValue, {
			onSuccess: (res) => {
				setSuccessToast(res.message)
				navigation.navigate('Motorcycle')
			},
			onError: (err) => {
				console.log(err?.response?.data?.message)
				setErrorToast(err?.response?.data?.message)
			},
		})
	}

	return (
		<DashboardLayout title={'Tambah sepeda motor'}>
			<Formik initialValues={FormInitialValue} validationSchema={SchemaValidation} onSubmit={handleFormSubmit}>
				{({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue, touched, setFieldTouched }) => (
					<>
						<Input
							label="Nama"
							value={values.nama}
							onChange={(value) => {
								setFieldValue('nama', value)
								setFieldTouched('nama', true)
							}}
							onBlur={handleBlur}
							error={touched.nama && errors.nama}
							textError={errors.nama}
						/>
						<Input
							label="Volume Silinder"
							value={values.volume_silinder}
							onChange={(value) => {
								setFieldValue('volume_silinder', value)
								setFieldTouched('volume_silinder', true)
							}}
							onBlur={handleBlur}
							isNumber={true}
							error={touched.volume_silinder && errors.volume_silinder}
							textError={errors.volume_silinder}
						/>
						<Input
							label="Jumlah Silinder"
							value={values.jumlah_silinder}
							onChange={(value) => {
								setFieldValue('jumlah_silinder', value)
								setFieldTouched('jumlah_silinder', true)
							}}
							onBlur={handleBlur}
							isNumber={true}
							error={touched.jumlah_silinder && errors.jumlah_silinder}
							textError={errors.jumlah_silinder}
						/>
						<Select
							data={merkOptions}
							label="Merk"
							placeholder="Pilih merk"
							onSelect={(value) => {
								setFieldValue('merk', value)
								setFieldTouched('merk', true)
							}}
						/>
						<Select
							data={transmisiOptions}
							label="Transmisi"
							placeholder="Pilih transmisi"
							onSelect={(value) => setFieldValue('transmisi', value)}
						/>
						<Select
							data={jenisOptions}
							label="Jenis"
							placeholder="Pilih jenis"
							onSelect={(value) => setFieldValue('jenis', value)}
						/>
						<Gap size={8} />
						<SubmitButton text="Tambah" disabled={isLoading} loading={isLoading} onPress={handleSubmit} />
					</>
				)}
			</Formik>
		</DashboardLayout>
	)
}

const styles = StyleSheet.create({
	pages: {
		backgroundColor: bgColor.grey2,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default MotorcycleAdd

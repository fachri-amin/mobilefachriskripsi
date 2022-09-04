import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { bgColor } from '../constants'
import DashboardLayout from '../components/Layout/DashboardLayout'
import SelectMotorcycle from '../components/SelectMotorcycle'
import SubmitButton from '../components/SubmitButton'
import Input from '../components/Input'
import Gap from '../components/Gap'
import { useMotorcycleOptions, useAddSale } from '../hooks'

const SchemaValidation = Yup.object().shape({
	motor_detail: Yup.number().required('Sepeda motor wajib diisi'),
	tahun: Yup.string().required('Tahun wajib diisi'),
	harga_baru: Yup.string().required('Harga baru Wajib diisi'),
	harga_bekas: Yup.string().required('Harga bekas Wajib diisi'),
})

const FormInitialValue = {
	motor_detail: '',
	tahun: '',
	harga_baru: '',
	harga_bekas: '',
}

const SalesAdd = ({ navigation }) => {
	const { mutate, isLoading } = useAddSale()
	const { data, filter, filterMotorcycles } = useMotorcycleOptions()

	const handleFormSubmit = (formValue) => {
		mutate(formValue, {
			onSuccess: (res) => {
				// setSuccessToast(res.message)
				navigation.navigate('Sales')
			},
			onError: (err) => {
				console.log(err?.response?.data?.message)
				setErrorToast(err?.response?.data?.message)
			},
		})
	}

	return (
		<DashboardLayout title={'Tambah penjualan'}>
			<Formik initialValues={FormInitialValue} validationSchema={SchemaValidation} onSubmit={handleFormSubmit}>
				{({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
					<>
						<SelectMotorcycle
							data={data}
							label="Motor"
							placeholder="Pilih motor"
							onSelect={(value) => setFieldValue('motor_detail', value)}
						/>
						<Input
							label="Tahun"
							value={values.tahun}
							onChange={(value) => setFieldValue('tahun', value)}
							onBlur={handleBlur}
						/>
						<Input
							label="Harga Baru"
							value={values.harga_baru}
							onChange={(value) => setFieldValue('harga_baru', value)}
							onBlur={handleBlur}
						/>
						<Input
							label="Harga Bekas"
							value={values.harga_bekas}
							onChange={(value) => setFieldValue('harga_bekas', value)}
							onBlur={handleBlur}
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

export default SalesAdd

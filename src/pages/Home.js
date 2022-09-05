import React from 'react'
import { StyleSheet, Alert, Modal, View, Pressable } from 'react-native'
import { Text } from 'react-native-paper'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { bgColor, transmisiOptions, merkOptions, jenisOptions } from '../constants'
import DashboardLayout from '../components/Layout/DashboardLayout'
import Select from '../components/Select'
import SubmitButton from '../components/SubmitButton'
import Input from '../components/Input'
import Gap from '../components/Gap'
import Dialog from '../components/Dialog'
import { usePrediction } from '../hooks'

const SchemaValidation = Yup.object().shape({
	volume_silinder: Yup.number().integer().required('Volume silinder wajib diisi'),
	jumlah_silinder: Yup.string().required('Jumlah silinder di isi'),
	tahun: Yup.string().required('Tahun wajib di isi'),
	harga_baru: Yup.string().required('Harga baru wajib di isi'),
	merk: Yup.string().required('Merk wajib di isi'),
	transmisi: Yup.string().required('transmisi wajib di isi'),
	jenis: Yup.string().required('Jenis wajib di isi'),
})

const FormInitialValue = {
	volume_silinder: '',
	jumlah_silinder: '',
	tahun: '',
	harga_baru: '',
	merk: '',
	transmisi: '',
	jenis: '',
}

const Home = ({ navigation }) => {
	const [visible, setVisible] = React.useState(false)
	const { mutate, isLoading } = usePrediction()
	const [pricePrediction, setPricePrediction] = React.useState('')

	const showDialog = () => setVisible(true)

	const hideDialog = () => setVisible(false)

	const handleFormSubmit = (formValue) => {
		mutate(formValue, {
			onSuccess: (res) => {
				const { price } = res?.data

				setPricePrediction(price)
				showDialog()
			},
		})
	}

	return (
		<DashboardLayout title={'Prediksi harga'}>
			<Formik validationSchema={SchemaValidation} initialValues={FormInitialValue} onSubmit={handleFormSubmit}>
				{({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue, touched, setFieldTouched }) => (
					<>
						<Input
							label="Volume Silinder"
							value={values.volume_silinder}
							onChange={(value) => {
								setFieldValue('volume_silinder', value)
								setFieldTouched('volume_silinder', true)
							}}
							onBlur={handleBlur}
							error={touched.volume_silinder && errors.volume_silinder}
							textError={errors.volume_silinder}
							isNumber={true}
						/>
						<Input
							label="Jumlah Silinder"
							value={values.jumlah_silinder}
							onChange={(value) => setFieldValue('jumlah_silinder', value)}
							onBlur={handleBlur}
							isNumber={true}
							error={touched.jumlah_silinder && errors.jumlah_silinder}
							textError={errors.jumlah_silinder}
						/>
						<Input
							label="Tahun"
							value={values.tahun}
							onChange={(value) => setFieldValue('tahun', value)}
							onBlur={handleBlur}
							isNumber={true}
							error={touched.tahun && errors.tahun}
							textError={errors.tahun}
						/>
						<Input
							label="Harga Baru"
							value={values.harga_baru}
							onChange={(value) => setFieldValue('harga_baru', value)}
							onBlur={handleBlur}
							isNumber={true}
							error={touched.harga_baru && errors.harga_baru}
							textError={errors.harga_baru}
						/>
						<Select
							data={merkOptions}
							label="Merk"
							placeholder="Pilih merk"
							onSelect={(value) => setFieldValue('merk', value)}
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
						<SubmitButton text="Prediksi" disabled={isLoading} loading={isLoading} onPress={handleSubmit} />
					</>
				)}
			</Formik>

			<Dialog visible={visible} hideDialog={hideDialog} title={'Hasil Prediksi'} body={pricePrediction} />
		</DashboardLayout>
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
})

export default Home

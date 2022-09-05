import React from 'react'
import { View, StyleSheet } from 'react-native'
import * as Yup from 'yup'
import { useStoreActions } from 'easy-peasy'
import { bgColor } from '../constants'
import DashboardLayout from '../components/Layout/DashboardLayout'
import SubmitButton from '../components/SubmitButton'
import Input from '../components/Input'
import Gap from '../components/Gap'
import { useMotorcycleOptions, useEditSale, useDetailSale } from '../hooks'
import SelectMotorcycle from '../components/SelectMotorcycle'
import { Formik } from 'formik'

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

const SalesEdit = ({ navigation, route }) => {
	const { mutate, isLoading } = useEditSale(route.params.id)
	const { data, filter, filterMotorcycles } = useMotorcycleOptions()
	const { data: detail, isLoading: isLoadingDetail } = useDetailSale(route.params.id)
	const formikRef = React.useRef(null)
	const setSuccessToast = useStoreActions((actions) => actions.setSuccessToast)
	const setErrorToast = useStoreActions((actions) => actions.setErrorToast)

	const handleFormSubmit = (formValue) => {
		mutate(formValue, {
			onSuccess: (res) => {
				setSuccessToast(res.message)
				navigation.navigate('Sales')
			},
			onError: (err) => {
				console.log(err?.response?.data?.message)
				setErrorToast(err?.response?.data?.message)
			},
		})
	}

	React.useEffect(() => {
		if (detail?.success) {
			Object.keys(FormInitialValue).forEach((key) => {
				formikRef.current?.setFieldValue(key, `${detail?.data?.[key]}`)
				if (key === 'motor_detail') {
					formikRef.current?.setFieldValue(key, `${detail?.data?.[key].id}`)
				}
			})
		}
	}, [detail])

	return (
		<DashboardLayout title={'Ubah penjualan'}>
			<Formik
				innerRef={formikRef}
				initialValues={FormInitialValue}
				validationSchema={SchemaValidation}
				onSubmit={handleFormSubmit}
			>
				{({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue, touched, setFieldTouched }) => (
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
							onChange={(value) => {
								setFieldValue('tahun', value)
								setFieldTouched('tahun', true)
							}}
							onBlur={handleBlur}
							isNumber={true}
							error={touched.tahun && errors.tahun}
							textError={errors.tahun}
						/>
						<Input
							label="Harga Baru"
							value={values.harga_baru}
							onChange={(value) => {
								setFieldValue('harga_baru', value)
								setFieldTouched('harga_baru', true)
							}}
							onBlur={handleBlur}
							isNumber={true}
							error={touched.harga_baru && errors.harga_baru}
							textError={errors.harga_baru}
						/>
						<Input
							label="Harga Bekas"
							value={values.harga_bekas}
							onChange={(value) => {
								setFieldValue('harga_bekas', value)
								setFieldTouched('harga_bekas', true)
							}}
							onBlur={handleBlur}
							isNumber={true}
							error={touched.harga_bekas && errors.harga_bekas}
							textError={errors.harga_bekas}
						/>
						<Gap size={8} />
						<SubmitButton text="Ubah" disabled={isLoading} loading={isLoading} onPress={handleSubmit} />
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

export default SalesEdit

import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useStoreActions } from 'easy-peasy'
import { useMotorcycle, useDeleteMotorcycle } from '../hooks/Motorcycle'
import { bgColor } from '../constants'
import DashboardLayout from '../components/Layout/DashboardLayout'
import Table from '../components/Table'
import DialogConfirmation from '../components/DialogConfirmation'

const columns = [
	{
		header: 'No',
		accessor: 'idSerial',
	},
	{
		header: 'Nama',
		accessor: 'nama',
	},
	{
		header: 'Volume Silinder',
		accessor: 'volume_silinder',
	},
	{
		header: 'Jumlah Silinder',
		accessor: 'jumlah_silinder',
	},
	{
		header: 'Transmisi',
		accessor: 'transmisi',
	},
	{
		header: 'Jenis',
		accessor: 'jenis',
	},
	{
		header: 'Stok',
		accessor: 'stok',
	},
	{
		header: 'Aksi',
		accessor: 'id',
	},
]

const Motorcycle = ({ navigation }) => {
	const { data, isLoading, filter, filterMotorcycles } = useMotorcycle()
	const { mutate: deleteMotorcycle, isLoading: loadingDelete } = useDeleteMotorcycle()
	const [visibleDeleteDialog, setVisibleDeleteDialog] = React.useState(false)
	const [deleteId, setDeleteId] = React.useState(null)
	const setSuccessToast = useStoreActions((actions) => actions.setSuccessToast)
	const setErrorToast = useStoreActions((actions) => actions.setErrorToast)

	const openDeleteDialog = (id) => {
		setDeleteId(id)
		setVisibleDeleteDialog(true)
	}

	const closeDeleteDialog = () => {
		setDeleteId(null)
		setVisibleDeleteDialog(false)
	}

	const handleDelete = () => {
		deleteMotorcycle(deleteId, {
			onSuccess: (res) => {
				setDeleteId(null)
				setVisibleDeleteDialog(false)
				setSuccessToast(res.message)
			},
			onError: (res) => {
				console.log(res.message)
				setDeleteId(null)
				setVisibleDeleteDialog(false)
				setErrorToast(err?.response?.data?.message)
			},
		})
	}

	const dataWithIDSerial =
		data?.data?.results?.map((item, index) => ({
			...item,
			idSerial: (filter?.page - 1) * 10 + index + 1,
		})) || []

	return (
		<DashboardLayout title={'List sepeda motor'}>
			<DialogConfirmation
				isLoading={loadingDelete}
				visible={visibleDeleteDialog}
				onAccept={handleDelete}
				onReject={closeDeleteDialog}
				title={'Konfirmasi'}
				body={'Yakin ingin menghapus data ini?'}
			/>
			<Table
				data={dataWithIDSerial}
				columns={columns}
				onAddButton={() => navigation.navigate('MotorcycleAdd')}
				textAddButton={'Tambah Sepeda Motor'}
				onUpdate={(id) => navigation.navigate('MotorcycleEdit', { id })}
				onDelete={(id) => openDeleteDialog(id)}
				width={1200}
				disabledNext={!data?.data?.next}
				disabledPrev={!data?.data?.previous}
				onNextClick={() => {
					filterMotorcycles({
						...filter,
						page: filter?.page + 1,
					})
				}}
				onPrevClick={() => {
					filterMotorcycles({
						...filter,
						page: filter?.page - 1,
					})
				}}
			/>
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
	addContainer: {
		flexDirection: 'row',
	},
})

export default Motorcycle

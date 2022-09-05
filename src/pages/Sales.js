import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useStoreActions } from 'easy-peasy'
import { bgColor } from '../constants'
import DashboardLayout from '../components/Layout/DashboardLayout'
import Table from '../components/Table'
import { useSale, useDeleteSale } from '../hooks/Sales'
import DialogConfirmation from '../components/DialogConfirmation'

const columns = [
	{
		header: 'No',
		accessor: 'idSerial',
	},
	{
		header: 'Nama',
		accessor: 'motor_detail',
	},
	{
		header: 'Tahun',
		accessor: 'tahun',
	},
	{
		header: 'Harga Baru',
		accessor: 'harga_baru',
	},
	{
		header: 'Harga Bekas',
		accessor: 'harga_bekas',
	},
	{
		header: 'Tanggal Jual',
		accessor: 'created_at',
	},
	{
		header: 'Aksi',
		accessor: 'id',
	},
]

const Sales = ({ navigation }) => {
	const { data, isLoading, filter, filterSales } = useSale()
	const { mutate: deleteSale, isLoading: loadingDelete } = useDeleteSale()
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
		deleteSale(deleteId, {
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
		<DashboardLayout title={'List penjualan'} isLoading={isLoading}>
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
				onAddButton={() => navigation.navigate('SalesAdd')}
				textAddButton={'Tambah Penjualan'}
				onUpdate={(id) => navigation.navigate('SalesEdit', { id })}
				onDelete={(id) => openDeleteDialog(id)}
				width={1000}
				disabledNext={!data?.data?.next}
				disabledPrev={!data?.data?.previous}
				onNextClick={() => {
					filterSales({
						...filter,
						page: filter?.page + 1,
					})
				}}
				onPrevClick={() => {
					filterSales({
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
})

export default Sales

import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { bgColor } from '../constants'
import DashboardLayout from '../components/Layout/DashboardLayout'
import Table from '../components/Table'
import { useSale, useDeleteSale } from '../hooks/Sales'

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

	const dataWithIDSerial =
		data?.data?.results?.map((item, index) => ({
			...item,
			idSerial: (filter?.page - 1) * 10 + index + 1,
		})) || []

	return (
		<DashboardLayout title={'List penjualan'}>
			<Table
				data={dataWithIDSerial}
				columns={columns}
				onAddButton={() => navigation.navigate('SalesAdd')}
				textAddButton={'Tambah Penjualan'}
				onUpdate={(id) => navigation.navigate('SalesEdit', { id })}
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

import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import {
	useMotorcycle,
	useDeleteMotorcycle,
	useIncreaseStokMotorcycle,
	useDecreaseStokMotorcycle,
} from '../hooks/Motorcycle'
import { bgColor } from '../constants'
import DashboardLayout from '../components/Layout/DashboardLayout'
import Table from '../components/Table'

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

	const dataWithIDSerial =
		data?.data?.results?.map((item, index) => ({
			...item,
			idSerial: (filter?.page - 1) * 10 + index + 1,
		})) || []

	return (
		<DashboardLayout title={'List sepeda motor'}>
			<Table
				data={dataWithIDSerial}
				columns={columns}
				onAddButton={() => navigation.navigate('MotorcycleAdd')}
				textAddButton={'Tambah Sepeda Motor'}
				onUpdate={(id) => navigation.navigate('MotorcycleEdit', { id })}
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

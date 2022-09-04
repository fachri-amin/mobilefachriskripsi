import React from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { DataTable, Text } from 'react-native-paper'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons/faArrowCircleLeft'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons/faArrowCircleRight'
import { faPencil } from '@fortawesome/free-solid-svg-icons/faPencil'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons/faMinusCircle'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle'
import Gap from './Gap'
import AddButton from './AddButton'
import { bgColor } from '../constants'
import {
	useMotorcycle,
	useDeleteMotorcycle,
	useIncreaseStokMotorcycle,
	useDecreaseStokMotorcycle,
} from '../hooks/Motorcycle'

const notDefault = ['motor_detail', 'stok']

function Table({
	columns = [],
	data = [],
	onNextClick,
	onPrevClick,
	disabledPrev,
	disabledNext,
	textAddButton,
	width = 500,
	identifier = 'id',
	onDelete = () => {},
	onUpdate = () => {},
	onAddButton = () => {},
}) {
	const { mutate: increaseStokMotorcycle } = useIncreaseStokMotorcycle()
	const { mutate: decreaseStokMotorcycle } = useDecreaseStokMotorcycle()

	return (
		<ScrollView horizontal={true}>
			<DataTable style={{ width: width, backgroundColor: 'white' }}>
				<DataTable.Header>
					{columns.map((column, index) => (
						<DataTable.Title style={column.accessor === 'idSerial' ? { maxWidth: 50 } : {}} key={index}>
							{column.header}
						</DataTable.Title>
					))}
				</DataTable.Header>
				{data.map((item, index) => (
					<DataTable.Row key={index}>
						{columns
							.filter((item) => item.header !== 'Aksi')
							.map((column, index) => (
								<DataTable.Cell style={column.accessor === 'idSerial' ? { maxWidth: 50 } : {}} key={index}>
									{column.accessor === 'motor_detail' && <Text>{item.motor_detail.nama}</Text>}
									{column.accessor === 'stok' && (
										<View style={{ flexDirection: 'row' }}>
											<Text>{item.stok}</Text>
											<Gap size={20} />
											<View style={{ flexDirection: 'row' }}>
												<TouchableOpacity onPress={() => increaseStokMotorcycle(item.id)}>
													<FontAwesomeIcon icon={faPlusCircle} />
												</TouchableOpacity>
												<Gap size={5} />
												{item.stok > 0 && (
													<TouchableOpacity onPress={() => decreaseStokMotorcycle(item.id)}>
														<FontAwesomeIcon icon={faMinusCircle} />
													</TouchableOpacity>
												)}
											</View>
										</View>
									)}
									{!notDefault.includes(column.accessor) && (
										<Text>
											{column.accessor === 'created_at' ? item[column.accessor].split('T')[0] : item[column.accessor]}
										</Text>
									)}
								</DataTable.Cell>
							))}
						<DataTable.Cell key={index}>
							<View style={styles.paginationContainer}>
								<TouchableOpacity onPress={() => onUpdate(item[identifier])}>
									<FontAwesomeIcon icon={faPencil} />
								</TouchableOpacity>
								<Gap size={20} />
								<TouchableOpacity onPress={() => onDelete(item[identifier])}>
									<FontAwesomeIcon icon={faTrash} />
								</TouchableOpacity>
							</View>
						</DataTable.Cell>
					</DataTable.Row>
				))}
				<View style={styles.footContainer}>
					{textAddButton && <AddButton text={textAddButton} onPress={onAddButton} />}
					{!textAddButton && <View />}
					<View style={styles.paginationContainer}>
						{!disabledPrev && (
							<TouchableOpacity onPress={onPrevClick}>
								<FontAwesomeIcon icon={faArrowCircleLeft} color={bgColor.secondary} size={24} />
							</TouchableOpacity>
						)}
						{disabledPrev && <FontAwesomeIcon icon={faArrowCircleLeft} color={bgColor.grey1} size={24} />}
						<Gap size={20} />
						{!disabledNext && (
							<TouchableOpacity onPress={onNextClick}>
								<FontAwesomeIcon color={bgColor.secondary} icon={faArrowCircleRight} size={24} />
							</TouchableOpacity>
						)}
						{disabledNext && <FontAwesomeIcon color={bgColor.grey1} icon={faArrowCircleRight} size={24} />}
					</View>
				</View>
			</DataTable>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	footContainer: {
		flexDirection: 'row',
		marginTop: 20,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	paginationContainer: {
		flexDirection: 'row',
	},
})

export default Table

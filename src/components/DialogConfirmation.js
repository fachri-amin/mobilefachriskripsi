import React from 'react'
import { StyleSheet, Alert, Modal, View, Pressable } from 'react-native'
import { Text } from 'react-native-paper'
import SubmitButton from './SubmitButton'
import Gap from './Gap'
import { bgColor } from '../constants'

const DialogConfirmation = ({ visible, onAccept, onReject, title, body, isLoading }) => {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={() => {
				onReject()
			}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Text style={styles.modalTitle}>{title}</Text>
					<Gap size={20} />
					<Text style={styles.modalText}>{body}</Text>
					<Gap size={40} />
					<View style={styles.buttonContainer}>
						<View style={{ width: 100 }}>
							<SubmitButton small={true} text="Ya" loading={isLoading} onPress={onAccept} />
						</View>
						<Gap size={10} />
						<View style={{ width: 100 }}>
							<SubmitButton small={true} text="Tidak" type={'secondary'} loading={false} onPress={onReject} />
						</View>
					</View>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
		backgroundColor: 'rgba(52, 52, 52, 0.6)',
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 16,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: '800',
		borderBottomWidth: 1,
		borderBottomColor: bgColor.grey2,
		paddingHorizontal: 100,
	},
	modalText: {
		fontSize: 18,
	},
	buttonContainer: {
		flexDirection: 'row',
	},
})

export default DialogConfirmation

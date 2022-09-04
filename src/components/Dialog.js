import React from 'react'
import { StyleSheet, Alert, Modal, View, Pressable } from 'react-native'
import { Text } from 'react-native-paper'
import SubmitButton from './SubmitButton'
import Gap from './Gap'

const Dialog = ({ visible, hideDialog, title, body }) => {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={() => {
				Alert.alert('Modal has been closed.')
				hideDialog()
			}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Text style={styles.modalTitle}>{title}</Text>
					<Gap size={20} />
					<Text style={styles.modalText}>{body}</Text>
					<Gap size={40} />
					<SubmitButton text="Tutup" loading={false} onPress={hideDialog} />
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
		fontWeight: '600',
	},
	modalText: {
		fontSize: 36,
		fontWeight: '800',
	},
})

export default Dialog

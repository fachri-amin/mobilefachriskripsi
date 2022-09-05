import React from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { Text, Snackbar } from 'react-native-paper'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { bgColor } from '../../constants'

const DashboardLayout = ({ children, title, isLoading }) => {
	const successToast = useStoreState((state) => state.successToast)
	const setSuccessToast = useStoreActions((actions) => actions.setSuccessToast)
	const errorToast = useStoreState((state) => state.errorToast)
	const setErrorToast = useStoreActions((actions) => actions.setErrorToast)
	const [openSuccessToast, setOpenSuccessToast] = React.useState(false)
	const [openErrorToast, setOpenErrorToast] = React.useState(false)

	React.useEffect(() => {
		if (successToast) {
			setOpenSuccessToast(true)

			setTimeout(() => {
				setOpenSuccessToast(false)
				setSuccessToast(null)
			}, 3000)
		}
	}, [successToast])

	React.useEffect(() => {
		if (errorToast) {
			setOpenErrorToast(true)

			setTimeout(() => {
				setOpenErrorToast(false)
				setErrorToast(null)
			}, 3000)
		}
	}, [errorToast])

	return (
		<ScrollView style={{ flex: 1 }}>
			<View style={styles.pages}>
				<Snackbar
					style={{
						zIndex: 999,
						width: '100%',
						position: 'absolute',
						bottom: 0,
						backgroundColor: errorToast ? 'red' : 'black',
					}}
					visible={openErrorToast || openSuccessToast}
					onDismiss={() => {
						setOpenErrorToast(false)
						setErrorToast(null)
					}}
					action={{
						label: 'x',
						onPress: () => {
							setOpenErrorToast(false)
							setErrorToast(null)
						},
					}}
				>
					{errorToast ? errorToast : successToast}
				</Snackbar>
				<View style={styles.contentContainer}>
					<Text style={styles.title}>{title}</Text>
					{isLoading && (
						<View style={{ flex: 1 }}>
							<ActivityIndicator size="large" color={bgColor.secondary} />
						</View>
					)}
					{!isLoading && children}
				</View>
			</View>
		</ScrollView>
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
	title: {
		fontSize: 14,
		fontWeight: '700',
		marginBottom: 8,
		borderBottomWidth: 1,
		borderColor: bgColor.grey2,
		paddingBottom: 8,
	},
})

export default DashboardLayout

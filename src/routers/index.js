import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Home, Splash, Login, Motorcycle, MotorcycleAdd, MotorcycleEdit, Sales, SalesAdd, SalesEdit } from '../pages'
import CustomDrawer from '../components/CustomDrawer'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

const MainApp = () => {
	return (
		<Drawer.Navigator
			useLegacyImplementation
			initialRouteName="Home"
			drawerContent={(props) => <CustomDrawer {...props} />}
		>
			<Drawer.Screen name="Home" component={Home} />
			<Drawer.Screen name="Sales" component={Sales} />
			<Drawer.Screen name="Motorcycle" component={Motorcycle} />
			<Drawer.Screen name="SalesAdd" component={SalesAdd} />
			<Drawer.Screen name="SalesEdit" component={SalesEdit} />
			<Drawer.Screen name="MotorcycleAdd" component={MotorcycleAdd} />
			<Drawer.Screen name="MotorcycleEdit" component={MotorcycleEdit} />
		</Drawer.Navigator>
	)
}

const Route = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
			<Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
			<Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
		</Stack.Navigator>
	)
}

export default Route

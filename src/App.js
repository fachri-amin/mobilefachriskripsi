import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StoreProvider } from 'easy-peasy'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'react-native-gesture-handler'
import { store } from './store'

import Router from './routers'

const App = () => {
	const [queryClient] = React.useState(() => new QueryClient())
	return (
		<StoreProvider store={store}>
			<QueryClientProvider client={queryClient}>
				<NavigationContainer>
					<Router />
				</NavigationContainer>
			</QueryClientProvider>
		</StoreProvider>
	)
}

export default App

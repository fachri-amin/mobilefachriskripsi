import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StoreProvider} from 'easy-peasy';
import store from './store';

import Router from './routers';

const App = () => {
  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </StoreProvider>
  );
};

export default App;

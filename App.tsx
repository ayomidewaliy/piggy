import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';

import {navigationRef} from '@navigation/utils';
import Routes from '@navigation/index';
import {store} from '@src/store';

enableScreens();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <Provider store={store}>
          <Routes />
        </Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigator from './src/Navigator';
import {Provider} from 'react-redux';
import store from './src/features';
export default () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigator />
      </SafeAreaProvider>
    </Provider>
  );
};

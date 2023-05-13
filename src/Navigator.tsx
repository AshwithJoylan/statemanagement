import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Page from './screens/Page';
import PageDetails from './screens/PageDetails';

const Stack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          freezeOnBlur: true,
        }}>
        <Stack.Screen name="Page" component={Page} />
        <Stack.Screen name="MyPage" component={Page} />
        <Stack.Screen name="PageDetails" component={PageDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

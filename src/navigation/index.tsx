import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackParamList} from './types';
import * as screens from '../screens';
import {defaultScreenOptions} from './utils';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={defaultScreenOptions}
      initialRouteName="Onboarding">
      <RootStack.Screen name="Onboarding" component={screens.Onboarding} />
      <RootStack.Screen name="Home" component={screens.Home} />
      <RootStack.Screen name="FoodDetail" component={screens.FoodDetail} />
    </RootStack.Navigator>
  );
}

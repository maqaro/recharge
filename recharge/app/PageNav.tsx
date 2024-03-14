import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homepage from './Homepage';
import Trackers from './Trackers';

const Stack = createNativeStackNavigator();

export default function PageNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Homepage}/>
        <Stack.Screen name="Trackers" component={Trackers} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
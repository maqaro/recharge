import React from 'react';
import { View, Text } from 'react-native';
import NavBar from './NavBar';

const Settings = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Settings</Text>
    <NavBar/>
  </View>
);

export default Settings;
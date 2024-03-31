import React from 'react';
import { View, Text } from 'react-native';
import NavBar from './NavBar';

const Chats = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Chats</Text>
    <NavBar/>
  </View>
);

export default Chats;
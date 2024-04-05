import React from 'react';
import { View, Text } from 'react-native';
import NavBar from './NavBar';

const LeaderBoard = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Leaderboard</Text>
    <NavBar/>
  </View>
);

export default LeaderBoard;
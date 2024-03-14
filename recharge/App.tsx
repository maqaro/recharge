import { StyleSheet, Text, View } from 'react-native';
import Opening from './app/Opening';
import Login from './app/LogIn';
import SignUp from './app/SignUp';
import HomePage from './app/Homepage';
import StackNavigator from './app/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import Trackers from './app/Trackers';


export default function App() {
  return (
    <Opening/>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
import { StyleSheet, Text, View } from 'react-native';
import EmailForm from './components/EmailForm';
import Opening from './components/Opening';
import Login from './components/LogIn';
import SignUp from './components/SignUp';
import HomePage from './components/Homepage';
import StackNavigator from './components/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import Trackers from './components/Trackers';


export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>

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
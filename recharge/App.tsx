import { StyleSheet, Text, View } from 'react-native';
<<<<<<< HEAD
import EmailForm from './components/EmailForm';
import Opening from './components/Opening';
import Login from './components/LogIn';
import SignUp from './components/SignUp';
import HomePage from './components/Homepage';
import StackNavigator from './components/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import Trackers from './components/Trackers';

=======
import EmailForm from './app';
>>>>>>> 02362c107041c389fabea28ec5d8824791aa3d57

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
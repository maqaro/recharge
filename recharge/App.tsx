import { StyleSheet, Text, View } from 'react-native';
import EmailForm from './components/EmailForm';
import Opening from './components/Opening';
import Login from './components/LogIn';
import SignUp from './components/SignUp';

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
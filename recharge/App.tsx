import { StyleSheet, Text, View } from 'react-native';
import EmailForm from './components/EmailForm';

export default function App() {
  return (
    <EmailForm />
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
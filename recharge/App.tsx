import { StyleSheet, Text, View } from 'react-native';
import EmailForm from './app';

export default function App() {
  return (
    <EmailForm />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

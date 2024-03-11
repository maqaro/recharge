// SignUp.tsx
import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';

const SignUp = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('./Logo.jpg')} style={styles.logo} />
      </View>
      <Text style={styles.title}>RECHARGE</Text>
      <View style={styles.textContainer}>
        <Text style={styles.createText}>Create</Text>
        <Text style={styles.accountText}>Account</Text>
      </View>
      <View style={styles.formContainer}>

      <Input
          placeholder="Username"
          leftIcon={{ type: 'font-awesome', name: 'user', color: 'white' }}
          inputStyle={styles.inputText}
          inputContainerStyle={styles.inputContainer}
          placeholderTextColor="white"
        />
        <Input
          placeholder="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope', color: 'white' }}
          inputStyle={styles.inputText}
          inputContainerStyle={styles.inputContainer}
          placeholderTextColor="white"
        />
        <Input
          placeholder="Password"
          secureTextEntry
          leftIcon={{ type: 'font-awesome', name: 'lock', color: 'white' }}
          inputStyle={styles.inputText}
          inputContainerStyle={styles.inputContainer}
          placeholderTextColor="white"
        />
        <Button
          title="Sign Up"
          buttonStyle={[styles.button1, { backgroundColor: 'white' }]}
          titleStyle={{ color: '#b7410e' }}
        />
        
        <Text style={styles.oldaccount}>Already have an account?</Text>
        
        <Button
          title="Login"
          buttonStyle={[styles.button, { backgroundColor: 'white' }]}
          titleStyle={{ color: '#b7410e' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#007373',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginTop: 10,
  },
  createText: {
    fontSize: 24,
    color: 'white',
  },
  accountText: {
    fontSize: 24,
    marginLeft: 10,
    color: 'white',
  },
  formContainer: {
    marginTop: 30,
  },
  inputText: {
    color: 'white',
  },
  inputContainer: {
    marginBottom: 20,
    borderBottomColor: 'white',
  },
  button1: {
    width: '100%',
    borderRadius: 20,
  },
  button: {
    width: '100%',
    borderRadius: 20,
  },

  oldaccount: {
    marginTop: 30,
    color: 'white',
  }
});

export default SignUp;

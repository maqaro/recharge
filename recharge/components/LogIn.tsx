import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';

const Login = () => {
  return (
    <View style={styles.container}>

        <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.backText}>Back!</Text>
        </View>
      <View style={styles.formContainer}>
        <Input
          placeholder="Username"
          leftIcon={{ type: 'font-awesome', name: 'user', color: 'white' }}
          inputContainerStyle={styles.inputContainer}
          placeholderTextColor='white'
        />
        <Input
          placeholder="Password"
          secureTextEntry
          leftIcon={{ type: 'font-awesome', name: 'lock', color:'#b7410e' }}
          inputContainerStyle={styles.inputContainer}
          placeholderTextColor='white'
        />
        <Text style={styles.forgot}>Forgot Password?</Text>
        <Button 
          title="Login" 
          buttonStyle={styles.button} 
          titleStyle={{color: '#b7410e'}}
          />
        <Text style={styles.or}> ------------------------------------- OR -----------------------------------</Text>
        <Button 
          title="Sign up" 
          buttonStyle={styles.button}
          titleStyle={{color: '#b7410e'}}
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
    height: 200,
    resizeMode: 'contain',
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginTop: 40,
    marginBottom: 80,
  },
  welcomeText: {
    fontSize: 50,
    textAlign: 'left',
    color: 'white',
  },
  backText: {
    fontSize: 50,
    textAlign: 'left',
    marginLeft: 50,
    color: 'white',
  },
  formContainer: {
    marginTop: 80,
    color:'white',
  },

  inputContainer: {

    borderBottomColor: 'white',
  },
  forgot: {
    textAlign: 'right',
    color:'#b7410e',
    marginTop: 20,
  },
  or: {
    color:'white',
    marginTop: 10,
  },
  button: {
    width: '100%',
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: 'white',
  },
});

export default Login;


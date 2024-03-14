import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
import { LinearGradient } from 'expo-linear-gradient';

const Login = () => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1a7373', '#e37b60']} style={{height:'100%'}}>

        <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.backText}>Back!</Text>
        </View>
      <View style={styles.formContainer}>
        <Input
          placeholder="Username"
          leftIcon={{ type: 'font-awesome', name: 'user', color: 'white' }}
          inputContainerStyle={styles.username}
          placeholderTextColor='white'
        />
        <Input
          placeholder="Password"
          secureTextEntry
          leftIcon={{ type: 'font-awesome', name: 'lock', color:'white' }}
          inputContainerStyle={styles.inputContainer}
          placeholderTextColor='white'
        />
        <Text style={styles.forgot}>Forgot Password?</Text>
        <Button 
          title="Login" 
          buttonStyle={styles.button} 
          titleStyle={{color: '#b7410e'}}
          />
        <Text style={styles.or}> ------------------------------- OR ------------------------------</Text>
        <Button 
          title="Sign up" 
          buttonStyle={styles.button}
          titleStyle={{color: '#b7410e'}}
           />


           
      </View>
    </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 40,
    marginLeft: 10,
    marginBottom: 80,
  },
  welcomeText: {
    fontSize: 50,
    textAlign: 'center',
    color: 'white',
    marginTop: 30,
  },
  backText: {
    fontSize: 50,
    textAlign: 'center',
    color: 'white',
  },
  formContainer: {
    marginTop: 35,
    color:'white',
  },
  username:{
    borderBottomColor: 'white',
    marginBottom: 40,
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


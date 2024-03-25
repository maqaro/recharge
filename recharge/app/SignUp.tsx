// SignUp.tsx
import React, { useState } from 'react';
import { Alert,View, StyleSheet, Image, Text, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { supabase } from '../lib/supabase';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function signUpWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!data.session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }
  return (
 
      <LinearGradient colors={['#1A7373', '#E37B60']} style={{height:'100%'}}>
    <View style={styles.container}>
    
      <View style={styles.logoContainer}>
        <Image source={require('./images/Logo.jpg')} style={styles.logo} />
      </View>
      <Text style={styles.title}>RECHARGE</Text>
    
      <Text style={styles.createAccountText}>Create Account</Text>
      
      <View style={styles.formContainer}>

        <Input
            // label='Username'
            // labelStyle={styles.labelStyle}
            placeholder="   Username"
            leftIcon={{ type: 'font-awesome', name: 'user', color: 'white' }}
            inputStyle={styles.inputText}
            inputContainerStyle={styles.inputContainer}
            placeholderTextColor="white"
            
          />
          <Input
            // label='Email'
            // labelStyle={styles.labelStyle}
            placeholder="  email@address.com"
            leftIcon={{ type: 'font-awesome', name: 'envelope', color: 'white'}}
            onChangeText={setEmail}
            value={email}
            inputStyle={styles.inputText}
            inputContainerStyle={styles.inputContainer}
            placeholderTextColor="white"
            autoCapitalize='none'
          />
          <Input
            // label="Password"
            // labelStyle={styles.labelStyle}
            placeholder="   Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            leftIcon={{ type: 'font-awesome', name: 'lock', color: 'white'}}
            inputStyle={styles.inputText}
            inputContainerStyle={styles.inputContainer}
            placeholderTextColor="white"
            autoCapitalize='none'
          />
          <Button
            title="Sign Up"
            loading={loading}
            onPress={signUpWithEmail}
            buttonStyle={[styles.button1, { backgroundColor: 'white' }]}
            titleStyle={{ color: '#b7410e', marginTop: 5, marginBottom: 5}}
          />

          <Text style={styles.oldaccount}>Already have an account?</Text>
          
          <Button
            title="Login"
            onPress={() => router.navigate('/LogIn')}
            buttonStyle={[styles.button, { backgroundColor: 'white' }]}
            titleStyle={{ color: '#b7410e', marginTop: 5, marginBottom: 5} }
          />
      </View>
      
    </View>
    </LinearGradient>

  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  title: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
 
  createAccountText: {
    fontSize: 18,
    color: '#303030',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 40,
    marginLeft: 10,
  },

  formContainer: {
    marginTop: 55,
  },

  labelStyle: {
    color: 'black',
  },

  inputText: {
    color: 'white',
  },
  inputContainer: {
    marginBottom: 20,
    borderBottomColor: 'white',
   
  },
  button1: {
    width: '90%',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 15,
  },
  button: {
    width: '90%',
    borderRadius: 20,
    alignSelf: 'center',
    
  },

  oldaccount: {
    marginTop: 15,
    color: '#303030',
    fontWeight: 'bold',
    marginBottom: 15,
    alignSelf: 'center',
  }



});

export default SignUp;

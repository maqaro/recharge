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
    <ScrollView contentContainerStyle={styles.scrollView}>
      <LinearGradient colors={['#1A7373', '#E37B60']} style={{height:'100%'}}>
    <View style={styles.container}>
    
      <View style={styles.logoContainer}>
        <Image source={require('./images/Logo.jpg')} style={styles.logo} />
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
            label='Email'
            placeholder="email@address.com"
            leftIcon={{ type: 'font-awesome', name: 'envelope', color: 'white' }}
            onChangeText={setEmail}
            value={email}
            inputStyle={styles.inputText}
            inputContainerStyle={styles.inputContainer}
            placeholderTextColor="white"
            autoCapitalize='none'
          />
          <Input
            label="Password"
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            leftIcon={{ type: 'font-awesome', name: 'lock', color: 'white' }}
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
            titleStyle={{ color: '#b7410e' }}
          />

          <Text style={styles.oldaccount}>Already have an account?</Text>
          
          <Button
            title="Login"
            onPress={() => router.navigate('/LogIn')}
            buttonStyle={[styles.button, { backgroundColor: 'white' }]}
            titleStyle={{ color: '#b7410e' }}
          />
      </View>
      
    </View>
    </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
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

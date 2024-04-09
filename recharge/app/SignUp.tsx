import React, { useState } from 'react';
import { Alert, View, StyleSheet, Image, Text, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';

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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient colors={['#6a11cb', '#2575fc']} style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={require('./images/Logo.png')} style={styles.logo} />
          </View>
          <Text style={styles.title}>RECHARGE</Text>
          <Text style={styles.createAccountText}>Create Account</Text>
          <View style={styles.formContainer}>
            <Input
              placeholder="Username"
              leftIcon={{ type: 'font-awesome', name: 'user', color: 'white' }}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
              placeholderTextColor="white"
            />
            <Input
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
              buttonStyle={styles.button1}
              titleStyle={styles.buttonTitleStyle}
            />
            <Text style={styles.oldaccount}>Already have an account?</Text>
            <Button
              title="Login"
              onPress={() => router.navigate('/LogIn')}
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitleStyle}
            />
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 30,
  },
  createAccountText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 30,
  },
  formContainer: {
    marginTop: 20,
  },
  inputText: {
    color: 'white',
    marginLeft: 10, // Added for better alignment
  },
  inputContainer: {
    marginBottom: 20,
    borderBottomColor: 'white',
  },
  button1: {
    backgroundColor: '#2575fc', // Updated button color for better contrast
    width: '90%',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 10,
    paddingVertical: 10, // Adjusted for better touch area
  },
  button: {
    backgroundColor: '#12c2e9', // Secondary button color
    width: '90%',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 10,
    paddingVertical: 10,
  },
  buttonTitleStyle: {
    color: 'white', // Text color updated for better readability
    fontWeight: 'bold', // Make text bold
  },
  oldaccount: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  }
});

export default SignUp;

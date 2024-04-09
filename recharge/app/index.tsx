import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, View, StyleSheet, Image, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';

export default function EmailForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      Alert.alert(error.message);
    } else {
      router.navigate('/Homepage');
    }
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) Alert.alert(error.message);
    if (!data.session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={['#2F80ED', '#007991']} style={styles.gradient}>

        <View style={styles.logoContainer}>
          <Image source={require('./images/fdm.png')} style={styles.logo1} />
          <Image source={require('./images/Logo.png')} style={styles.logo} />
        </View>

        <Text style={styles.rechargeText}>RECHARGE</Text>
        <Text style={styles.subtitle}>Recharging Your Well-Being</Text>

        <View style={styles.buttonContainer}>
          <Button
            title="Sign in"
            buttonStyle={styles.signInButton}
            titleStyle={styles.buttonText}
            onPress={() => router.navigate('/LogIn')}
          />
          <Button
            title="Sign up"
            buttonStyle={styles.signUpButton}
            titleStyle={styles.buttonText}
            onPress={() => router.navigate('/SignUp')}
          />
        </View>

      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-around', // Improved spacing and layout
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    marginTop: 30,
  },
  logo1: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  rechargeText: {
    fontSize: 45, // Slightly larger font size
    fontWeight: 'bold', // More emphasis
    color: '#fff',
  },
  subtitle: {
    fontSize: 18, // Adjusted for readability
    color: '#e6e6e6', // Lighter tone for contrast
    marginTop: 10,
    marginBottom: 50, // Reduced to tighten layout
    paddingHorizontal: 20, // Added to control width
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%', // Full width for better control
  },
  signInButton: {
    backgroundColor: '#004385', // Vibrant color for distinction
    paddingVertical: 15,
    marginBottom: 10, // Space between buttons
  },
  signUpButton: {
    backgroundColor: '#031a6b', // Another vibrant color for distinction
    paddingVertical: 15,
  },
  buttonText: {
    color: '#fff', // White color for contrast
  },
});

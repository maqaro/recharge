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
      router.navigate('/Mentor/MentorHomepage');
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
      <LinearGradient colors={['#1a7373', '#e37b60']} style={styles.gradient}>

        <View style={styles.logoContainer}>
          {/* <Image source={require('./images/fdm.png')} style={styles.logo1} /> */}
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
    // marginTop: 30,
    alignItems: 'center',
  },
  // logo1: {
  //   width: 200,
  //   height: 100,
  //   resizeMode: 'contain',
  //   borderRadius: 20,
  // },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 0,
    borderRadius: 20,
  },
  rechargeText: {
    fontSize: 45, // Slightly larger font size
    // fontWeight: 'bold', // More emphasis
    color: '#fff',
    textAlign: 'center',
    marginTop: -80,
  },
  subtitle: {
    fontSize: 20, // Adjusted for readability
    color: '#e6e6e6', // Lighter tone for contrast
    marginTop: -30,
    marginBottom: 50, // Reduced to tighten layout
    // paddingHorizontal: 20, // Added to control width
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%', // Full width for better control
    alignContent: 'center',
    marginTop: -50, 
  },
  signInButton: {
    backgroundColor: '#ffffff', // Vibrant color for distinction
    paddingVertical: 15,
    marginBottom: 45, // Space between buttons
    borderRadius: 25, 
  },
  signUpButton: {
    backgroundColor: '#ffffff', // Another vibrant color for distinction
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: '#e37b60', // White color for contrast
    fontWeight: 'bold',
  },
});

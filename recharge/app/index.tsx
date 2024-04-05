import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Alert, View, StyleSheet, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
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
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      router.navigate('/Homepage');
    }
    setLoading(false);
  }

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
      <LinearGradient colors={['#1a7373', '#e37b60']} style={{ flex: 1 }}>

        <View style={styles.logoContainer}>
          <Image source={require('./images/Logo.png')} style={styles.logo} />
        </View>

        <View>
          <Text style={styles.rechargeText}>RECHARGE</Text>
          <Text style={styles.subtitle}>Recharging Your Well-Being</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Sign in"
            buttonStyle={styles.button}
            containerStyle={styles.buttonWrapper}
            titleStyle={styles.buttonText}
            onPress={() => router.navigate('/LogIn')}
          />
          <Button
            title="Sign up"
            buttonStyle={styles.button}
            containerStyle={styles.buttonWrapper}
            titleStyle={styles.buttonText}
            onPress={() => router.navigate('/SignUp')}
          />

        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 90,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  rechargeText: {
    fontSize: 40,
    fontWeight: 'normal',
    marginTop: 10,
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 80,
    marginBottom: 120,
    color: 'white',
  },
  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
    alignContent: 'center',
  },
  buttonWrapper: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  button: {
    borderRadius: 20,
    backgroundColor: 'white',
    color: 'blue',
    marginBottom: 30,
  },
  buttonText: {
    color: '#b7410e',
    marginTop: 5,
    marginBottom: 5,
  },
});




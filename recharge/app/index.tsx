
import React, { useState } from 'react';
import { Alert, StyleSheet, View, Image, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { supabase } from '../lib/supabase';
import { useRouter } from 'expo-router';

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
      router.navigate('/Home')
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
    <View style={styles.container}>

      <View style={styles.imageContainer}>
              <Image source={require('./Logo.jpg')} style={styles.logo} />
              <Text style={styles.rechargeText}>RECHARGE</Text>
      </View>

      <View style={styles.background}>

        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={setEmail}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
         
        style={styles.input}/>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          
        style={styles.input}/>
        <Button title="Sign in" loading={loading} onPress={signInWithEmail} buttonStyle={styles.button} containerStyle={styles.buttonContainer}/>
        <Button title="Sign up" loading={loading} onPress={signUpWithEmail} buttonStyle={styles.button} containerStyle={styles.buttonContainer} />
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    width: '80%',
  },
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  imageContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  input: {
    width: '100%',
  },
  button: {
    width: '50%',
    marginBottom: 20,
    alignItems: 'center', 
  },
  buttonContainer:{
    alignItems: 'center',
  },
  rechargeText:{
    fontSize: 24,
    textAlign: 'center',
    fontStyle: 'italic',
  }
});

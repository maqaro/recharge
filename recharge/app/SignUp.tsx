// SignUp.tsx
import React, { useState } from 'react';
import { Alert,View, StyleSheet, Image, Text, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { supabase } from '../lib/supabase';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function signUpWithEmail() {
    setLoading(true);

    // Check if the email format is valid
    if (!email || !email.includes('@') || !email.includes('.')) {
      Alert.alert('Invalid email format. Please enter a valid email address.');
      setLoading(false);
      return;
    }

    const { data: existingUser, error: existingUserError } = await supabase
    .from('employee')
    .select('username')
    .eq('username', username)
    .single();

    if (existingUser) {
      Alert.alert('Username already exists. Please choose a different username.');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      addUsername();
      setLoading(false);
      Alert.alert('Account Created. Please log in')
      router.navigate('/LogIn');

    }
    // if (!data.session) Alert.alert('Please check your inbox for email verification!');
    

  }

  async function addUsername(){
    const { data: { user }, error } = await supabase.auth.getUser();
    const uid = user?.id;

    const { data: employeeData, error: employeeError } = await supabase
    .from('employee')
    .insert([{ employee_id: uid, username: username, points: 0 }]);
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient colors={['#1A7373', '#E37B60']} style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={require('./images/Logo.png')} style={styles.logo} />
          </View>
          <Text style={styles.title}>RECHARGE</Text>
          <Text style={styles.createAccountText}>Create Account</Text>
          <View style={styles.formContainer}>
            <Input
              placeholder="   Username"
              leftIcon={{ type: 'font-awesome', name: 'user', color: 'white' }}
              onChangeText={setUsername}
              value={username}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
              placeholderTextColor="white"
            />
            <Input
              placeholder="  email@address.com"
              leftIcon={{ type: 'font-awesome', name: 'envelope', color: 'white' }}
              onChangeText={setEmail}
              value={email}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
              placeholderTextColor="white"
              autoCapitalize='none'
            />
            <Input
              placeholder="   Password"
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
              titleStyle={{ color: '#b7410e', marginTop: 5, marginBottom: 5 }}
            />
            <Text style={styles.oldaccount}>Already have an account?</Text>
            <Button
              title="Login"
              onPress={() => router.navigate('/LogIn')}
              buttonStyle={[styles.button, { backgroundColor: 'white' }]}
              titleStyle={{ color: '#b7410e', marginTop: 5, marginBottom: 5 }}
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
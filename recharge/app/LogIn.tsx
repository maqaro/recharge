import React, { useState } from 'react';
import { View, StyleSheet, Image, Text,Alert, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';


const Login = () => {

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
      const { data: admins, error: adminError } = await supabase
        .from('admins')
        .select()
        .eq('email', email);
  
      if (adminError) {
        Alert.alert(adminError.message);
        setLoading(false);
      }
  
      if (admins && admins.length > 0) {
        router.navigate('/AdminHomepage');
      } else {
        router.navigate('/Homepage');
      }
    }
    setLoading(false);
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <LinearGradient colors={['#1A7373', '#E37B60']} style={{ flex: 1 }}>
          <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.backText}>Back!</Text>
          </View>
          <View style={styles.formContainer}>
            <Input
              placeholder="   Email"
              leftIcon={{ type: 'font-awesome', name: 'envelope', color: 'white' }}
              onChangeText={setEmail}
              value={email}
              inputContainerStyle={styles.email}
              placeholderTextColor='white'
            />

            <Input
              placeholder="    Password"
              secureTextEntry
              leftIcon={{ type: 'font-awesome', name: 'lock', color: 'white' }}
              onChangeText={setPassword}
              value={password}
              inputContainerStyle={styles.password}
              placeholderTextColor='white'
              autoCapitalize='none'
            />

            <Text style={styles.forgot}>Forgot Password?</Text>
            <Button
              title="Login"
              buttonStyle={styles.LoginButton}
              titleStyle={{ color: '#b7410e', marginTop: 5, marginBottom: 5 }}
              onPress={signInWithEmail}
            />

            <Text style={styles.or}> or </Text>

            <Button
              title="Sign up"
              onPress={() => router.navigate('/SignUp')}
              buttonStyle={styles.SignupButton}
              titleStyle={{ color: '#b7410e', marginTop: 5, marginBottom: 5 }}
            />
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 80,
  },
  welcomeText: {
    fontSize: 50,
    textAlign: 'center',
    color: 'white',
    marginTop: 40,
  },
  backText: {
    fontSize: 50,
    textAlign: 'center',
    color: 'white',
  },
  formContainer: {
    marginTop: 25,
    color: 'white',
  },
  email: {
    borderBottomColor: 'white',
    marginBottom: 20,
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  password: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  forgot: {
    textAlign: 'right',
    marginRight: 28,
    color: '#303030',
    fontWeight: 'bold',
    marginTop: 1,
    fontSize: 15,
    marginBottom: 20,
  },
  or: {
    color: 'white',
    marginTop: 10,
    alignSelf: 'center',
    fontSize: 15,
  },
  LoginButton: {
    width: '82%',
    marginTop: 80,
    borderRadius: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  SignupButton: {
    width: '82%',
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
});

export default Login;
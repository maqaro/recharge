import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, Alert, ScrollView, ActivityIndicator } from 'react-native';
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
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      Alert.alert(error.message);
    } else {
      router.navigate('/Homepage');
    }
    setLoading(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        start={{x: 0, y: 0}} // Start at the top left
        end={{x: 1, y: 1}} // End at the bottom right
        colors={['#13547a', '#80d0c7']}
        style={styles.gradient}
      >
        <Text style={styles.welcomeText}>Welcome Back!</Text>

        <View style={styles.formContainer}>
          <Input
            placeholder="Email"
            leftIcon={{ type: 'font-awesome', name: 'envelope', color: 'white' }}
            onChangeText={setEmail}
            value={email}
            inputContainerStyle={styles.input}
            inputStyle={styles.inputStyle}
            placeholderTextColor='white'
            autoCapitalize='none'
          />

          <Input
            placeholder="Password"
            secureTextEntry
            leftIcon={{ type: 'font-awesome', name: 'lock', color: 'white' }}
            onChangeText={setPassword}
            value={password}
            inputContainerStyle={styles.input}
            inputStyle={styles.inputStyle}
            placeholderTextColor='white'
            autoCapitalize='none'
            autoCompleteType="password"
          />

          <Text style={styles.forgot}>Forgot Password?</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#2575fc" />
          ) : (
            <>
              <Button
                title="Login"
                buttonStyle={styles.LoginButton}
                titleStyle={styles.buttonText}
                onPress={signInWithEmail}
              />

              <Text style={styles.or}>or</Text>

              <Button
                title="Sign up"
                onPress={() => router.navigate('/SignUp')}
                buttonStyle={styles.SignupButton}
                titleStyle={styles.buttonText}
              />
            </>
          )}
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  input: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
  inputStyle: {
    color: 'white',
    paddingLeft: 10,
  },
  forgot: {
    textAlign: 'right',
    marginRight: 28,
    color: '#e6e6e6',
    marginTop: 15,
    fontSize: 15,
  },
  or: {
    color: 'white',
    marginTop: 20,
    fontSize: 18,
    alignSelf: 'center',
  },
  LoginButton: {
    backgroundColor: '#004385',
    marginTop: 30,
    borderRadius: 15,
    width: '85%',
    alignSelf: 'center',
    paddingVertical: 15,
  },
  SignupButton: {
    backgroundColor: '#086788',
    marginTop: 10,
    borderRadius: 15,
    width: '85%',
    alignSelf: 'center',
    paddingVertical: 15,
  },
  buttonText: {
    color: '#fff',
  },
});

export default Login;

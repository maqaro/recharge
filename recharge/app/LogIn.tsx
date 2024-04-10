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
      const { data: mentors, error: mentorError } = await supabase
        .from('mentors')
        .select()
        .eq('email', email);
  
      if (mentorError) {
        Alert.alert(mentorError.message);
        setLoading(false);
      }
  
      if (mentors && mentors.length > 0) {
        router.navigate('/Mentor/MentorHomepage');
      } else {
        router.navigate('/Homepage');
      }
    }
    }
    setLoading(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }} // Start at the top left
        end={{ x: 1, y: 1 }} // End at the bottom right
        colors={['#1a7373', '#e37b60']} // Updated gradient colors for a vibrant look
        style={styles.gradient}
      >
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Image source={require('./images/Logo.png')} style={styles.logo} />

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
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: -70,
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginTop: -50,
    marginBottom: 0,
  },
  input: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },
  inputStyle: {
    color: 'white',
    paddingLeft: 10,
  },
  forgot: {
    textAlign: 'right',
    marginRight: 19,
    color: '#303030',
    marginTop: -1,
    fontSize: 15,
    marginBottom: 60,
    fontWeight: 'bold',
  },
  or: {
    color: 'white',
    marginTop: 10,
    fontSize: 18,
    alignSelf: 'center',
  },
  LoginButton: {
    backgroundColor: '#fff', // Harmonized button color for consistency
    marginTop: 0,
    borderRadius: 25, // Rounded for a modern look
    width: '100%',
    alignSelf: 'center',
    paddingVertical: 15,
  },
  SignupButton: {
    backgroundColor: '#fff', // A complementary, distinct button color
    marginTop: 10,
    borderRadius: 25, // Consistent rounded look
    width: '100%',
    alignSelf: 'center',
    paddingVertical: 15,
  },
  buttonText: {
    color: '#e37b60',
    fontWeight: 'bold', // Make text bold

  },
});

export default Login;

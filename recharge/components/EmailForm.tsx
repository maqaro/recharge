
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { supabase } from '../lib/supabase';

export default function EmailForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
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
      <Input
        label="Email"
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        onChangeText={setEmail}
        value={email}
        placeholder="email@address.com"
        autoCapitalize="none"
      />
      <Input
        label="Password"
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        placeholder="Password"
        autoCapitalize="none"
      />
      <Button title="Sign in" loading={loading} onPress={signInWithEmail} />
      <Button title="Sign up" loading={loading} onPress={signUpWithEmail} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});

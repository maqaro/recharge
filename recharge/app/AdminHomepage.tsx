import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';

const Admin_Homepage: React.FC = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error.message);
      } else {
        console.log('User signed out successfully');
        router.navigate('/LogIn');
      }
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => router.navigate('/AdminAddAdmin')}>
        <Text style={styles.buttonText}>Add Admin</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.navigate('/AdminAddMentor')}>
        <Text style={styles.buttonText}>Add Mentor</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.navigate('/AdminAddResources')}>
        <Text style={styles.buttonText}>Add Resources</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.navigate('/AdminResourceTypes')}>
        <Text style={styles.buttonText}>View Resources</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.navigate('/AdminViewFeedback')}>
        <Text style={styles.buttonText}>View Feedback</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={async () => await handleSignOut()} style={styles.button}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  
});

export default Admin_Homepage;

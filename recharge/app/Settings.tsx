import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { supabase } from '../lib/supabase';
import { useRouter } from 'expo-router';
import FeatureRequestModal from './NewFeature'; // Importing FeatureRequestModal
import NavBar from './NavBar';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

const Settings: React.FC = () => {
  const router = useRouter();
  const [isFeatureRequestModalVisible, setFeatureRequestModalVisible] = useState(false);

  const openFeatureRequestModal = () => {
    setFeatureRequestModalVisible(true);
  };

  const closeFeatureRequestModal = () => {
    setFeatureRequestModalVisible(false);
  };

  const handleButtonPress = async (buttonText: string) => {
    switch (buttonText) {
      case 'Log Out':
        await handleSignOut();
        break;
      case 'Feedback':
        // Navigate to the Feedback route
        router.navigate('/Feedback');
        break;
      case 'Report Bug':
        // Navigate to the ReportBug route
        router.navigate('/ReportBug');
        break;
      case 'Request New Feature':
        // Open the feature request modal directly
        openFeatureRequestModal();
        break;
      case 'About Us':
        router.navigate('/AboutUs');
        break;
      default:
        console.log(`Pressed ${buttonText}`);
        break;
    }
  };

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
    <LinearGradient colors={['#fff9ed', '#eccbaa']} style={{height:'100%', width:'100%'}} >
      <Text style={{fontWeight:'bold', fontSize:28, alignSelf:'center', marginTop:20}}> Settings</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.buttonContainer}>

        <TouchableOpacity onPress={() => handleButtonPress('Log Out')} style={styles.button}>
          <Text style={{padding:5,backgroundColor:'lightblue', borderRadius:20}}>
            <Icon name="log-out" type="feather" color="#007AFF"/>
          </Text>
          <Text style={styles.text}>Log Out</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleButtonPress('Feedback')} style={styles.button}>
          <Text style={{padding:5,backgroundColor:'lightblue', borderRadius:20}}>
            <Icon name="message-square" type="feather" color="#007AFF" />
          </Text>
          <Text style={styles.text}>Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleButtonPress('Report Bug')} style={styles.button}>
          <Text style={{padding:5,backgroundColor:'lightblue', borderRadius:20}}>
            <Icon name="alert-circle" type="feather" color="#007AFF" />
          </Text>
          <Text style={styles.text}>Report Bug</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleButtonPress('Request New Feature')} style={styles.button}>
          <Text style={{padding:5,backgroundColor:'lightblue', borderRadius:20}}>
            <Icon name="plus-circle" type="feather" color="#007AFF" />
          </Text>
          <Text style={styles.text}>Request New Feature</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleButtonPress('Notifications')} style={styles.button}>
          <Text style={{padding:5,backgroundColor:'lightblue', borderRadius:20}}>
            <Icon name="bell" type="feather" color="#007AFF" />
          </Text>
          <Text style={styles.text}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleButtonPress('About Us')} style={styles.button}>
          <Text style={{padding:5,backgroundColor:'lightblue', borderRadius:20}}>
            <Icon name="info" type="feather" color="#007AFF" />
          </Text>
          <Text style={styles.text}>About Us</Text>
        </TouchableOpacity>

        </View>
      </ScrollView>
      <FeatureRequestModal isVisible={isFeatureRequestModalVisible} onClose={closeFeatureRequestModal} />
      <NavBar/>
      </LinearGradient>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingLeft:2,
    elevation: 5,
    marginTop:20,
    marginHorizontal:5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    marginHorizontal:20,
  },
  text: {
    fontSize:18,
    fontWeight:'bold',
    marginLeft: 20,
  }
});

export default Settings;

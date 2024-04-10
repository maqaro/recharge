import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { supabase } from '../lib/supabase';
import { useRouter } from 'expo-router';
import FeatureRequestModal from './NewFeature'; // Importing FeatureRequestModal
import NavBar from './NavBar';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

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
    <LinearGradient colors={['#F5F5f5', '#f5f5f5']} style={{height:'100%', width:'100%'}} >
      <Text style={{fontWeight:'bold', fontSize:28, alignSelf:'center', marginTop:20, marginBottom: 30}}> Settings</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.buttonContainer}>


        <TouchableOpacity onPress={() => handleButtonPress('Feedback')} style={styles.button}>
          <Text style={{padding: 0, backgroundColor:'#f5f5f5', top: 3, borderRadius:20}}>
            <Icon name="message-square" type="feather" color="black" />
          </Text>
          
          <Text style={styles.text}>Feedback</Text>

          <Text style={{padding: 0, backgroundColor:'#f5f5f5', top: -1, left: 170, borderRadius:20}}>
            <Ionicons name="chevron-forward-outline" size={26} color="black" />
          </Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => handleButtonPress('Report Bug')} style={styles.button}>
          <Text style={{padding: 0, backgroundColor:'#f5f5f5', top: 3, borderRadius:20}}>
            <Icon name="alert-circle" type="feather" color="black" />
          </Text>

          <Text style={styles.text}>Report Bug</Text>
          
          <Text style={{padding: 0, backgroundColor:'#f5f5f5', top: -1, left: 157, borderRadius:20}}>
            <Ionicons name="chevron-forward-outline" size={26} color="black" />
          </Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => handleButtonPress('Request New Feature')} style={styles.button}>
          <Text style={{padding: 0, backgroundColor:'#f5f5f5', top: 3, borderRadius:20}}>
            <Icon name="plus-circle" type="feather" color="black" />
          </Text>
          <Text style={styles.text}>Request New Feature</Text>
          
          <Text style={{padding: 0, backgroundColor:'#f5f5f5', top: -1, left: 70, borderRadius:20}}>
            <Ionicons name="chevron-forward-outline" size={26} color="black" />
          </Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => handleButtonPress('Notifications')} style={styles.button}>
          <Text style={{padding: 0, backgroundColor:'#f5f5f5', top: 3, borderRadius:20}}>
            <Icon name="bell" type="feather" color="black" />
          </Text>
          <Text style={styles.text}>Notifications</Text>
          
          <Text style={{padding: 0, backgroundColor:'#f5f5f5', top: -1, left: 143, borderRadius:20}}>
            <Ionicons name="chevron-forward-outline" size={26} color="black" />
          </Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => handleButtonPress('About Us')} style={styles.button}>
          <Text style={{padding: 0, backgroundColor:'#f5f5f5', top: 3, borderRadius:20}}>
            <Icon name="info" type="feather" color="black" />
          </Text>
          <Text style={styles.text}>About Us</Text>
          
          <Text style={{padding: 0, backgroundColor:'#f5f5f5', top: -1, left: 173, borderRadius:20}}>
            <Ionicons name="chevron-forward-outline" size={26} color="black" />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleButtonPress('Log Out')} style={styles.button}>
          <Text style={{padding: 0, backgroundColor:'#f5f5f5', top: 3, borderRadius:20}}>
            <Icon name="log-out" type="feather" color="red"/>
          </Text>
          <Text style={styles.logouttext}>Log Out</Text>
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
    backgroundColor: '#f5f5f5',
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
    color: 'black',
  },

  logouttext: {
    fontSize:18,
    fontWeight:'bold',
    marginLeft: 20,
    color: 'red',
  }

});

export default Settings;

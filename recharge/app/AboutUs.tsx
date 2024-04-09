import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const AboutUs: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.navigate('/Settings'); // Assuming '/Settings' is the route for the Settings page
  };

  return (
    <LinearGradient colors={['#f5f5f5', '#f5f5f5']} style={{height:'100%', width:'100%'}} >
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.paragraph}>
        Welcome to Recharge, the ultimate wellbeing app brought to you by FDM and developed by a dedicated team of university students. Our goal is simple: to provide FDM's staff with a comprehensive tool for nurturing their physical, mental, and emotional health — all for free.
      </Text>
      <Text style={styles.paragraph}>
        At Recharge, we understand that wellbeing goes beyond just exercise and nutrition. That's why we've integrated a unique feature that allows you to connect with qualified mental health ambassadors. These ambassadors are here to listen, support, and guide you through any challenges you may be facing.
      </Text>
      <Text style={styles.paragraph}>
        Crafted with care and expertise, Recharge offers a range of user-friendly tools and resources to help you live your best life. From personalized workout plans to guided meditation sessions and nutritional advice, our app is your go-to destination for holistic wellness.
      </Text>
      <Text style={styles.paragraph}>
        But Recharge is more than just a collection of features – it's a supportive ecosystem built on the foundation of community and collaboration. Join us on this journey toward better health and happiness. Let Recharge be your trusted companion as you navigate life's ups and downs. Together, we'll empower each other to prioritize self-care and lead fulfilling lives, because at Recharge, your wellbeing is our top priority.
      </Text>

      <Text style={styles.credits}>
        Created By: Jeenat Hussain, Davina Naran, Taylor Dodd, Isa Aslam, Gabrielle Gadjakaeva, Rahul Ray, Basil Nasr
      </Text>


    </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 25,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
    color: '#183E4C',
  },
  credits: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
    marginTop: 30,
  },
  backButton: {
    position: 'absolute',
    top: 45,
    left: 20,
    zIndex: 1,
  },
});

export default AboutUs;

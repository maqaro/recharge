import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';

const Opening = () => {
  return (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image source={require('./Logo.jpg')} style={styles.logo} />
        </View>
        <View>
            <Text style={styles.rechargeText}>RECHARGE</Text>
            <Text style={styles.subtitle}>Your overall guide to physical and mental well-being</Text>
        </View>
      
        <View style={styles.buttonContainer}>
            <Button
            title="Sign in"
            buttonStyle={styles.button}
            containerStyle={styles.buttonWrapper}
            titleStyle={styles.buttonText} 
            />
            <Button
            title="Sign up"
            buttonStyle={styles.button}
            containerStyle={styles.buttonWrapper}
            titleStyle={styles.buttonText} 
            />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#007373',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
  rechargeText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: 'white',
  },
  buttonContainer: {
    width: '100%',
  },
  buttonWrapper: {
    marginBottom: 20,
    borderRadius: 20, 
    overflow: 'hidden', 
  },
  button: {
    borderRadius: 20, 
    backgroundColor: 'white',
    color: 'blue',
  },
  buttonText:{
    color:'#b7410e',
  },
});

export default Opening;

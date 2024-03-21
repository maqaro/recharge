import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { useRouter } from 'expo-router';

const Opening = () => {
  const router = useRouter();
  return (
    <View>
    <LinearGradient colors={['#1a7373', '#e37b60']} style={{height:'100%'}}>

        <View style={styles.logoContainer}>
            <Image source={require('./images/Logo.jpg')} style={styles.logo}/>
        </View>

        <View>
            <Text style={styles.rechargeText}>RECHARGE</Text>
            <Text style={styles.subtitle}>Recharging your well-being</Text>
        </View>


      
        <View style={styles.buttonContainer}>
          <Button
            title="Sign in"
            buttonStyle={styles.button}
            containerStyle={styles.buttonWrapper}
            titleStyle={styles.buttonText} 
            onPress={() => router.navigate('/LogIn')}
          />
          <Button
            title="Sign up"
            buttonStyle={styles.button}
            containerStyle={styles.buttonWrapper}
            titleStyle={styles.buttonText} 
            onPress={() => router.navigate('/SignUp')}   
          />
          
        </View>
    </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 50,
    resizeMode: 'contain',
  },
  rechargeText: {
    fontSize: 40,
    fontWeight: 'normal',
    fontStyle: 'italic',
    marginTop: 10,
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 65,
    marginBottom: 80,
    color: 'white',
  },
  buttonContainer: {
    width: '90%',
    marginLeft: 15,
    alignContent: 'center',
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
    marginBottom: 30,
  },
  buttonText:{
    color:'#b7410e',
    marginTop: 5,
    marginBottom: 5,
  },
});

export default Opening;

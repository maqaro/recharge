import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Image, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import NavBar from './NavBar';




const Trackers = () => {
  const router = useRouter();
  return(
  
    <View style={styles.container}>
      
      <LinearGradient colors={['#ffffff', '#ffffff']} style={{height:'95%', width:'100%'}} >

        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={true}>
        <Text style={styles.title}>Trackers</Text>


          <TouchableOpacity style={[styles.Step1]} onPress={() => router.navigate('/StepTracker')}>
            <Text style={styles.text}>Step Tracker</Text>
            <Image source={require('./images/Stairs.png')} style={styles.StepPic}/>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.Exercise1]} onPress={() => router.navigate('/ExerciseTracker')}>
            <Text style={styles.text}>Exercise Tracker</Text>
            <Image source={require('./images/Weights.png')} style={styles.ExerciseTPic}/>
          </TouchableOpacity>
          

          <TouchableOpacity style={[styles.Water1]} onPress={() => router.navigate('/WaterTracker')}>
            <Text style={styles.text}>Water Tracker</Text>
            <Image source={require('./images/Bottle.png')} style={styles.WaterPic}/>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.Sleep1]} onPress={() => router.navigate('/SleepTracker')}>
            <Text style={styles.text}>Sleep Tracker</Text>
            <Image source={require('./images/Moon.png')} style={styles.SleepPic}/>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.Emotion1]} onPress={() => router.navigate('/EmotionTracker')}>
            <Text style={styles.text}>Emotion Tracker</Text>
            <Image source={require('./images/Faces.png')} style={styles.EmotionPic}/>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.Diet1]} onPress={() => router.navigate('/DietTracker')}>
            <Text style={styles.text}>Diet Tracker</Text>
            <Image source={require('./images/Plate.png')} style={styles.DietPic}/>
          </TouchableOpacity>
          

        </ScrollView>
      </LinearGradient>
      <NavBar/>

     
    </View>
  )
  
};

const styles = StyleSheet.create({
  scrollView: {
    height: '110%',
    flexGrow: 1,
    justifyContent: 'space-around',
    marginLeft: '2.5%',
    marginRight: '2.5%',
    paddingBottom: '10%',
  },
  title: {
    fontSize: 26, // Larger font size for the main title
    fontWeight: 'bold',
    color: '#444', // Slightly lighter than black for a softer look
    margin: 16, // Margin around the title for spacing
  },
  container: {
    flex: 1,
  },

  imagebackground: {
    borderRadius:20,
  },

// Changes tracker button containers
  Step1:{
    backgroundColor: '#F26A8A',
    padding: 5,
    borderRadius: 20,
    shadowColor: "#F26A8A",
    shadowOffset: {
      width: 1,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.6,
    // paddingBottom: '3%',
  },
  Exercise1:{
    backgroundColor: '#f78c6b',
    padding: 5,
    borderRadius: 20,
    shadowColor: "#f78c6b",
    shadowOffset: {
      width: 1,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.6,
    // paddingBottom: '17%',
  },
  Water1:{
    backgroundColor: '#2DBEEB',
    padding: 5,
    borderRadius: 20,
    shadowColor: "#2DBEEB",
    shadowOffset: {
      width: 1,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.6,
    // paddingBottom: '17%',
  },
  Sleep1:{
    backgroundColor: '#232E6F',
    padding: 5,
    borderRadius: 20,
    shadowColor: "#232E6F",
    shadowOffset: {
      width: 1,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.6,
    // paddingBottom: '17%',
  },
  Emotion1:{
    backgroundColor: '#F7C144',
    borderRadius: 20,
    padding: 5,
    shadowColor: "#F7C144",
    shadowOffset: {
      width: 1,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.6,
    // paddingBottom: '17%',
  },
  Diet1:{
    backgroundColor: '#0F8F48',
    borderRadius: 20,
    padding: 5,
    shadowColor: "#0F8F48",
    shadowOffset: {
      width: 1,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.6,
    // paddingBottom: '17%',
  },


  Step: {
    marginTop: '25%',
    width: '45%',
    aspectRatio: 1,
    margin: '2.5%', 
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  StepPic: {
    width: 100,
    height: 90,
    marginTop: -20,
    marginLeft: 280,
    marginBottom: 5,
    resizeMode: 'contain',
    // backgroundColor: 'black',
    // opacity: 0.75,
    borderRadius: 20,
  },

  Exercise: {
    width: '45%',
    aspectRatio: 1, 
    margin: '2.5%',
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  ExerciseTPic: {
    width: 100,
    height: 100,
    marginTop: -25,
    left: 280,
    // marginBottom: 0,
    resizeMode: 'contain',
    // backgroundColor: 'black',
    // opacity: 0.75,
    borderRadius: 20,
  },

  Water: {
    width: '45%',
    aspectRatio: 1, 
    margin: '2.5%', 
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  WaterPic: {
    width: 100,
    height: 100,
    marginTop: -25,
    // marginBottom: 0,
    left: 280,
    resizeMode: 'contain',
    // backgroundColor: 'black',
    // opacity: 0.75,
    borderRadius: 20,
  },

  Sleep: {
    width: '45%',
    aspectRatio: 1, 
    margin: '2.5%', 
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '52%',
    marginTop: '-48%',
  },

  SleepPic: {
    width: 100,
    height: 100,
    marginTop: -25,
    // marginBottom: 0,
    left: 280,
    top: 3,
    resizeMode: 'contain',
    // backgroundColor: 'black',
    // opacity: 0.75,
    borderRadius: 20,
  },

  Emotion: {
    width: '45%',
    aspectRatio: 1, 
    margin: '2.5%', 
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  EmotionPic: {
    width: 100,
    height: 100,
    marginTop: -25,
    // marginBottom: 0,
    left: 280,
    resizeMode: 'contain',
    // backgroundColor: 'black',
    // opacity: 0.75,
    borderRadius: 20,
  },

  Diet: {
    width: '45%',
    aspectRatio: 1,
    margin: '2.5%', 
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '52%',
    marginTop: '-48%',
  },

  DietPic: {
    width: 100,
    height: 100,
    marginTop: -25,
    // marginBottom: 0,
    left: 280,
    resizeMode: 'contain',
    // backgroundColor: 'black',
    // opacity: 0.75,
    borderRadius: 20,
  },

  text: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
    fontSize: 20,
    top: 40,
    marginLeft: 40,
  },

});

export default Trackers;
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
      <LinearGradient colors={['#FFFFFF, #FFFFFF']} style={{height:'100%', width:'100%'}} >
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={true}>
        
        
        {/* <ScrollView contentContainerStyle={styles.scrollContainer}> */}

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
        <Text></Text>
        <NavBar/>
      </LinearGradient>
     
    </View>
  )
  
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 2
    
  },

  container: {
    flex: 0,
    height: '100%',
    justifyContent:'center',
    alignItems:'center'
  },

  imagebackground: {
    borderRadius:20,
  },

// Changes tracker button containers
  Step1:{
    backgroundColor: '#F26A8A',
    borderRadius: 20,
    marginTop: '10%',
    marginLeft: '2.5%',
    marginRight:'2.5%',
    // paddingBottom: '3%',
  },
  Exercise1:{
    backgroundColor: '#f78c6b',
    borderRadius: 20,
    marginTop: '5%',
    marginLeft: '2.5%',
    marginRight:'2.5%',
    // paddingBottom: '17%',
  },
  Water1:{
    backgroundColor: '#2DBEEB',
    borderRadius: 20,
    marginTop: '5%',
    marginLeft: '2.5%',
    marginRight:'2.5%',
    // paddingBottom: '17%',
  },
  Sleep1:{
    backgroundColor: '#232E6F',
    borderRadius: 20,
    marginTop: '5%',
    marginLeft: '2.5%',
    marginRight:'2.5%',
    // paddingBottom: '17%',
  },
  Emotion1:{
    backgroundColor: '#F7C144',
    borderRadius: 20,
    marginTop: '5%',
    marginLeft: '2.5%',
    marginRight:'2.5%',
    // paddingBottom: '17%',
  },
  Diet1:{
    backgroundColor: '#74CA91',
    borderRadius: 20,
    marginTop: '5%',
    marginLeft: '2.5%',
    marginRight:'2.5%',
    marginBottom:'0%',
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
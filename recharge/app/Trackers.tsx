import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Image, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';



const Trackers = () => {
  const router = useRouter();
  return(
  
    <LinearGradient colors={['#eccbaa', '#65AAB3']} style={{height:'100%', width:'100%'}} >
      <ScrollView contentContainerStyle={styles.scrollView}>
      
      <View style={styles.container}>
      
      
      {/* <ScrollView contentContainerStyle={styles.scrollContainer}> */}

        <TouchableOpacity style={[styles.Step1]} onPress={() => console.log('Rectangle 1 clicked')}>
        <ImageBackground style={[styles.imagebackground]} source={require('./images/sleep.jpg')}>
          <Text style={styles.text}>Step Tracker</Text>
          <Image source={require('./images/Step.png')} style={styles.StepPic}/>
        </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.Exercise1]} onPress={() => console.log('Rectangle 2 clicked')}>
          <Text style={styles.text}>Exercise Tracker</Text>
          <Image source={require('./images/ExerciseTracker.png')} style={styles.ExerciseTPic}/>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.Water1]} onPress={() => console.log('Rectangle 3 clicked')}>
          <Text style={styles.text}>Water Tracker</Text>
          <Image source={require('./images/Water.png')} style={styles.WaterPic}/>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.Sleep1]} onPress={() => console.log('Rectangle 4 clicked')}>
          <Text style={styles.text}>Sleep Tracker</Text>
          <Image source={require('./images/Sleep.png')} style={styles.SleepPic}/>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.Emotion1]} onPress={() => router.navigate('/EmotionTracker')}>
          <Text style={styles.text}>Emotion Tracker</Text>
          <Image source={require('./images/Emotion.jpg')} style={styles.EmotionPic}/>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.Diet1]} onPress={() => console.log('Rectangle 6 clicked')}>
          <Text style={styles.text}>Diet Tracker</Text>
          <Image source={require('./images/Diet.png')} style={styles.DietPic}/>
        </TouchableOpacity>
      {/* </ScrollView> */}
      
      </View>
    
      </ScrollView>
    </LinearGradient>
  )
  
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
  
  },

  imagebackground: {
    borderRadius:20,
  },

  Step1:{
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: '10%',
    marginLeft: '2.5%',
    marginRight:'2.5%'
  },
  Exercise1:{
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: '10%',
    marginLeft: '2.5%',
    marginRight:'2.5%'
  },
  Water1:{
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: '10%',
    marginLeft: '2.5%',
    marginRight:'2.5%'
  },
  Sleep1:{
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: '10%',
    marginLeft: '2.5%',
    marginRight:'2.5%'
  },
  Emotion1:{
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: '10%',
    marginLeft: '2.5%',
    marginRight:'2.5%'
  },
  Diet1:{
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: '10%',
    marginLeft: '2.5%',
    marginRight:'2.5%'
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
    width: 200,
    height: 80,
    marginTop: 20,
    resizeMode: 'contain',
  },

  Exercise: {
    width: '45%',
    aspectRatio: 1, // Square aspect ratio
    margin: '2.5%', // Adjust as needed
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '52%',
    marginTop: '-48%',
  },

  ExerciseTPic: {
    width: 160,
    height: 90,
    marginTop: 5,
    resizeMode: 'contain',
  },

  Water: {
    width: '45%',
    aspectRatio: 1, // Square aspect ratio
    margin: '2.5%', // Adjust as needed
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  WaterPic: {
    width: 200,
    height: 70,
    marginTop: 20,
    resizeMode: 'contain',
  },

  Sleep: {
    width: '45%',
    aspectRatio: 1, // Square aspect ratio
    margin: '2.5%', // Adjust as needed
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '52%',
    marginTop: '-48%',
  },

  SleepPic: {
    width: 200,
    height: 70,
    marginTop: 17,
    resizeMode: 'contain',
  },

  Emotion: {
    width: '45%',
    aspectRatio: 1, // Square aspect ratio
    margin: '2.5%', // Adjust as needed
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  EmotionPic: {
    width: 200,
    height: 90,
    marginTop: 15,
    resizeMode: 'contain',
  },

  Diet: {
    width: '45%',
    aspectRatio: 1, // Square aspect ratio
    margin: '2.5%', // Adjust as needed
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '52%',
    marginTop: '-48%',
  },

  DietPic: {
    width: 200,
    height: 100,
    marginTop: 0,
    resizeMode: 'contain',
  },

  text: {
    fontWeight: 'bold',
    color: '#e37b60',
  },

});

export default Trackers;

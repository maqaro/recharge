import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Image, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';



const Trackers = () => {
  const router = useRouter();
  return(
  
    <View style={styles.container}>
      <LinearGradient colors={['#eccbaa', '#65AAB3']} style={{height:'100%', width:'100%'}} >
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={true}>
        
        
        
        
        {/* <ScrollView contentContainerStyle={styles.scrollContainer}> */}

          <TouchableOpacity style={[styles.Step1]} onPress={() => router.navigate('/StepTracker')}>
          {/* <ImageBackground imageStyle={{borderRadius: 20}} source={require('./images/StepCounter.png')}> */}
            <Text style={styles.text}>Step Tracker</Text>
            <Image source={require('./images/StepWhite.png')} style={styles.StepPic}/>
          {/* </ImageBackground> */}
          </TouchableOpacity>

          <TouchableOpacity style={[styles.Exercise1]} onPress={() => router.navigate('/ExerciseTracker')}>
          {/* <ImageBackground imageStyle={{borderRadius: 20}} source={require('./images/exercise_bg.jpg')}> */}
            <Text style={styles.text}>Exercise Tracker</Text>
            <Image source={require('./images/ExerciseTrackerWhite.png')} style={styles.ExerciseTPic}/>
            {/* </ImageBackground> */}
          </TouchableOpacity>

          <TouchableOpacity style={[styles.Water1]} onPress={() => router.navigate('/WaterTracker')}>
          <ImageBackground imageStyle={{borderRadius: 20}} source={require('./images/water_bg1.jpg')}>
            <Text style={styles.text}>Water Tracker</Text>
            <Image source={require('./images/WaterWhite.png')} style={styles.WaterPic}/>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.Sleep1]} onPress={() => router.navigate('/SleepTracker')}>
          <ImageBackground imageStyle={{borderRadius: 20, }} source={require('./images/sleep_bg.jpg')}>
            <Text style={styles.text}>Sleep Tracker</Text>
            <Image source={require('./images/SleepWhite.png')} style={styles.SleepPic}/>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.Emotion1]} onPress={() => router.navigate('/EmotionTracker')}>
          {/* <ImageBackground imageStyle={{borderRadius: 20, }} source={require('./images/emotion_bg_copy.jpg')}> */}
            <Text style={styles.text}>Emotion Tracker</Text>
            <Image source={require('./images/EmotionWhite.png')} style={styles.EmotionPic}/>
            {/* </ImageBackground> */}
          </TouchableOpacity>

          <TouchableOpacity style={[styles.Diet1]} onPress={() => router.navigate('/DietTracker')}>
          {/* <ImageBackground imageStyle={{borderRadius: 20}} source={require('./images/meal_bg.jpg')}> */}
            <Text style={styles.text}>Diet Tracker</Text>
            <Image source={require('./images/DietWhite.png')} style={styles.DietPic}/>
            {/* </ImageBackground> */}
          </TouchableOpacity>

        {/* </ScrollView> */}
        
        
      
        </ScrollView>
        <Text></Text>
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
    width: 100,
    height: 100,
    marginTop: -25,
    marginLeft: 0,
    marginBottom: 0,
    resizeMode: 'contain',
    backgroundColor: 'black',
    opacity: 0.75,
    borderRadius: 20,
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
    width: 100,
    height: 100,
    marginTop: -25,
    marginBottom: 0,
    resizeMode: 'contain',
    backgroundColor: 'black',
    opacity: 0.75,
    borderRadius: 20,
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
    width: 100,
    height: 100,
    marginTop: -25,
    marginBottom: 0,
    resizeMode: 'contain',
    backgroundColor: 'black',
    opacity: 0.75,
    borderRadius: 20,
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
    width: 100,
    height: 100,
    marginTop: -25,
    marginBottom: 0,
    resizeMode: 'contain',
    backgroundColor: 'black',
    opacity: 0.75,
    borderRadius: 20,
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
    width: 100,
    height: 100,
    marginTop: -25,
    marginBottom: 0,
    resizeMode: 'contain',
    backgroundColor: 'black',
    opacity: 0.75,
    borderRadius: 20,
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
    width: 100,
    height: 100,
    marginTop: -25,
    marginBottom: 0,
    resizeMode: 'contain',
    backgroundColor: 'black',
    opacity: 0.75,
    borderRadius: 20,
  },

  text: {
    fontWeight: 'bold',
    // color: '#e37b60',
    color: 'black',
    textAlign: 'right',
    marginRight: 20,
  
    fontSize: 20,
    top: 40,
  },

});

export default Trackers;
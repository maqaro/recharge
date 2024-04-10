import React, { useState } from 'react';
import { Button, Modal, ScrollView, StyleSheet, Text, TextInput, View , Alert, TouchableOpacity} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';



const Feedback: React.FC = () => {
    const [ratings, setRatings] = useState<{ [key: string]: number }>({
        experienceWithReact: 0,
        easeOfUse: 0,
        hasDesiredFeatures: 0,
        speedAndResponsiveness: 0,
        reliability: 0,
      });

  const [additionalInfo, setAdditionalInfo] = useState('');
  const router = useRouter();

  const handleRatingChange = (section: string, rating: number) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [section]: rating,
    }));
  };

  const handleAdditionalInfoChange = (text: string) => {
    setAdditionalInfo(text);
  };

  const handleSubmitFeedback = async () => {
    try {
    const feedbackData = {
        Overall: ratings.experienceWithReact,
        Easiness: ratings.easeOfUse,
        Responsiveness: ratings.speedAndResponsiveness,
        Reliability: ratings.reliability,
        CurrentFeatures: ratings.hasDesiredFeatures,
        Comments: additionalInfo, 
      };
      const { data, error } = await supabase.from('feedback').insert([feedbackData]);

      if (error) {
        throw error;
      }
  
      console.log('Feedback submitted successfully:', data);
      Alert.alert('Thank you for your feedback!');
      router.navigate('/Settings');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Alert.alert('Failed to submit feedback. Please try again later.');
    }
};


  const StarRating: React.FC<{ value: number; onValueChange: (rating: number) => void }> = ({
    value,
    onValueChange,
  }) => {
    const renderStars = () => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        stars.push(
          <Text
            key={i}
            style={i <= value ? styles.starIconFilled : styles.starIconOutline}
            onPress={() => onValueChange(i)}>
            ★
          </Text>
        );
      }
      return stars;
    };

    return <View style={styles.starRatingContainer}>{renderStars()}</View>;
  };

  const renderRatingSection = (sectionTitle: string, stateKey: string) => (
    <View style={styles.ratingSection}>
      <Text style={styles.modalSectionTitle}>{sectionTitle}</Text>
      <StarRating
        value={ratings[stateKey]}
        onValueChange={(rating) => handleRatingChange(stateKey, rating)}
      />
    </View>
  );

  const goback =() => {
    router.navigate('/Settings');

    };

  return (
    <LinearGradient colors={['#F5F5f5', '#f5f5f5']} style={{height:'100%', width:'100%'}} >
      <Text style={styles.modalTitle}>Feedback Form</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Text style={styles.gap}></Text>
        {renderRatingSection('Experience With React', 'experienceWithReact')}
        {renderRatingSection('Ease Of Use', 'easeOfUse')}
        {renderRatingSection('Has Features You Want', 'hasDesiredFeatures')}
        {renderRatingSection('Fast and Responsive', 'speedAndResponsiveness')}
        {renderRatingSection('Is Reliable', 'reliability')}
        <Text style={styles.additionalInfoLabel}>Additional Information:</Text>
        <TextInput
          style={styles.additionalInfoInput}
          multiline
          placeholder="Enter any additional information..."
          value={additionalInfo}
          onChangeText={handleAdditionalInfoChange}
        />
      <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={goback} style={styles.button}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmitFeedback} style={[styles.button, styles.submitButton]}>
          <Text style={styles.buttonText}>Submit Feedback</Text>
        </TouchableOpacity>
        
      </View>
    </ScrollView>
    </LinearGradient>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    marginHorizontal:10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 25,
  },
  gap:{
    marginBottom: 30,
  },

  modalSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 9,
  },
  ratingSection: {
    marginBottom: 25,
  },
  additionalInfoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 9,
  },
  additionalInfoInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginLeft: 9,
    marginRight: 11,
    marginBottom: 20,
    paddingBottom: 50,
    backgroundColor:'white',
  },
  starRatingContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    marginLeft: 230,
    top: -45,

  },
  starIconFilled: {
    fontSize: 50,
    color: '#FFD700', // Gold color for filled stars
  },
  starIconOutline: {
    fontSize: 30,
    color: 'gray', 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    borderRadius: 50, // Make oval buttons
    backgroundColor: '#F53649',
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    top: 10,
  },
  submitButton: {
    backgroundColor: '#44BA67',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

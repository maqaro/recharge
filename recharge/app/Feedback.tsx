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
    <LinearGradient colors={['#fff9ed', '#eccbaa']} style={{height:'100%', width:'100%'}} >
      <Text style={styles.modalTitle}>Feedback Form</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {renderRatingSection('Experience with React', 'experienceWithReact')}
        {renderRatingSection('Ease of Use', 'easeOfUse')}
        {renderRatingSection('Has the features you want', 'hasDesiredFeatures')}
        {renderRatingSection('Feels fast and responsive', 'speedAndResponsiveness')}
        {renderRatingSection('Is reliable', 'reliability')}
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
    marginBottom: 30,
    marginTop: 25,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingSection: {
    marginBottom: 20,
  },
  additionalInfoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  additionalInfoInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    paddingBottom:40,
    backgroundColor:'white',
  },
  starRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  starIconFilled: {
    fontSize: 50,
    color: '#FFD700', // Gold color for filled stars
  },
  starIconOutline: {
    fontSize: 50,
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
    backgroundColor: 'red',
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  submitButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

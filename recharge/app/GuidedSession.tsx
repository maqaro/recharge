import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import { supabase } from '../lib/supabase'; // Import supabase
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import NavBar from './NavBar';
interface Resource {
  id: number;
  title: string;
  link: string;
  recommendedBy: string;
  image: string;
}

const GuidedSession: React.FC = () => {
    const [resources, setResources] = useState<Resource[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>('yoga');
    const router = useRouter();
  
    useEffect(() => {
      // Fetch initial resources when the component mounts
      fetchResources('yoga');
    }, []);
  
    const fetchResources = async (category: string) => {
      try {
        let tableName = '';
        switch (category) {
          case 'yoga':
            tableName = 'yoga';
            break;
          case 'breathingExercises':
            tableName = 'breathingExercises';
            break;
          case 'meditation':
            tableName = 'meditation';
            break;
          default:
            tableName = 'resources';
            break;
        }
        const { data: resourcesData, error } = await supabase.from(tableName).select('*');
        if (error) {
          throw error;
        }
        setResources(resourcesData || []);
        setActiveCategory(category);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };
  
    const handleResourceClick = (link: string) => {
      Linking.openURL(link);
    };
  
    const BackButton = () => (
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.navigate('/Homepage')}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    );
  
    return (
      <LinearGradient colors={['#FFC371', '#FFC371']} style={{ height: '100%', width: '100%' }} >
        <BackButton />
        <ScrollView contentContainerStyle={styles.container}>
          
          <View style={styles.header}>
            <Text style={styles.headerText}>Guided Sessions</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.topicButton, activeCategory === 'yoga' && styles.activeButton]}
              onPress={() => fetchResources('yoga')}>
              <Text>Yoga</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.topicButton, activeCategory === 'breathingExercises' && styles.activeButton]}
              onPress={() => fetchResources('breathingExercises')}>
              <Text>Breathing Exercises</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.topicButton, activeCategory === 'meditation' && styles.activeButton]}
              onPress={() => fetchResources('meditation')}>
              <Text>Meditation</Text>
            </TouchableOpacity>
          </View>
  
          {resources.map((resource) => (
            <TouchableOpacity
            key={resource.id}
            onPress={() => handleResourceClick(resource.link)}
            style={styles.resourceContainer}>
            <View style={styles.articleContainer}>
              <Text style={styles.title}>{resource.title}</Text>
              <Text style={styles.recommendedBy}>Recommended by: {resource.recommendedBy}</Text>
              {resource.image && (
                <Image
                  source={{ uri: resource.image }}
                  style={styles.image}
                />
              )}
            </View>
          </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>
    );
  };

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 10,
        paddingTop: 20,
      },
      header: {
        flexDirection: 'row',
        marginBottom: 20,
      },
      headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 105,
        textAlign: 'center',
      },
      buttonContainer: {
        flexDirection: 'row',
        alignSelf:'center',
        flex: 1,
        marginBottom:10,
      },

      backButton: {
        position: 'absolute',
        top: 22, 
        left: 20,
        zIndex: 10,
      },

      topicButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 37,
        marginRight: 5,
      },
      activeButton: {
        backgroundColor: '#FF5F6D',
      },
      resourceContainer: {
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 5, // slight elevation
      },
      articleContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 20,
      },
      image: {
        width: '100%',
        height: 200,
        borderRadius: 5,
        marginBottom: 10,
      },
      textContent: {
        flex: 1,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'blue',
      },
      dateContainer: {
        marginBottom: 10,
      },
      date: {
        fontSize: 14,
        color: '#666',
      },
      description: {
        fontSize: 16,
        color: '#333',
      },
      recommendedBy: {
        fontStyle: 'italic',
        color: '#555',
        marginBottom: 5,
      },
});

export default GuidedSession;
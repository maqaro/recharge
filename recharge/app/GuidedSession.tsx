import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import { supabase } from '../lib/supabase'; // Import supabase
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import WebView from 'react-native-webview';
// import ReactPlayer from 'react-player/youtube'
import NavBar from './NavBar';
interface Resource {
  id: number;
  title: string;
  link: string;
  recommendedBy: string;
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
        const { data: resourcesData, error } = await supabase.from(tableName).select('id, title, link, recommendedBy');
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
  
    const handleBackPress = () => {
      router.navigate('/Homepage');
    };
  
    return (
      <LinearGradient colors={['#eccbaa', '#65AAB3']} style={{ height: '100%', width: '100%' }} >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBackPress}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
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
              <WebView
                style={styles.video}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowsInlineMediaPlayback={true}
                source={{ uri: `https://www.youtube.com/embed/${resource.link}?Playsinline=1` }}
              />
              {/* <ReactPlayer url={`https://www.youtube.com/embed/${resource.link}`} /> METHOD DOESNT WORK*/}
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
        marginLeft:85,
      },
      buttonContainer: {
        flexDirection: 'row',
        alignSelf:'center',
        flex: 1,
        marginBottom:10,
      },
      topicButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 40,
        marginRight: 5,
      },
      activeButton: {
        backgroundColor: 'orange',
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
      video: {
        width: '100%',
        aspectRatio: 16 / 9,
      }
});

export default GuidedSession;
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, Image, Alert } from 'react-native';
import { supabase } from '../../lib/supabase'; // Import supabase
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface GuidedSessionProps {
  category: string;
  onClose: () => void;
}

interface Resource {
  id: number;
  title: string;
  link: string;
  recommendedBy: string;
  image: string;
}

const GuidedSession: React.FC<GuidedSessionProps> = ({  onClose,category }) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(category);

  useEffect(() => {
    // Fetch initial resources when the component mounts
    fetchResources(category);
  }, [category]);

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

  const handleDeleteResource = async (id: number) => {
    try {
      const { error } = await supabase.from(activeCategory).delete().eq('id', id);
      if (error) {
        throw error;
      }
      setResources(resources.filter(resource => resource.id !== id));
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };


  const confirmDelete = (id: number) => {
    Alert.alert(
      'Delete Resource',
      'Are you sure you want to delete this resource?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: () => handleDeleteResource(id) },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        {resources.map((resource) => (
          <View key={resource.id} style={styles.resourceContainer}>
            <TouchableOpacity onPress={() => handleResourceClick(resource.link)}>
              <View style={styles.articleContainer}>
                {resource.image && (
                    <Image
                      source={{ uri: resource.image }}
                      style={styles.image}
                    />
                  )}
                <Text style={styles.title}>{resource.title}</Text>
                <Text style={styles.recommendedBy}>Recommended by: {resource.recommendedBy}</Text>
                <TouchableOpacity onPress={() => confirmDelete(resource.id)} style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            
          </View>
        ))}
      </ScrollView>
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
    marginLeft: 85,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    flex: 1,
    marginBottom: 10,
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  articleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf:'center'
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
  recommendedBy: {
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default GuidedSession;

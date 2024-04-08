import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import { supabase } from '../lib/supabase'; // Import supabase
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Resource {
  id: number;
  title: string;
  description: string;
  date: string | null;
  link: string;
  topic: string; 
  image_url: string | null;
}

const Resources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const { data: resourcesData, error } = await supabase.from('resources').select('*');
      if (error) {
        throw error;
      }
      setResources(resourcesData || []);
      setFilteredResources(resourcesData || []);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const handleResourceClick = (link: string) => {
    Linking.openURL(link);
  };

  const handleFilterByTopic = (topic: string) => {
    if (topic === activeTopic) {
      setActiveTopic(null); // Toggle off the filter if the same topic is clicked again
      setFilteredResources(resources);
    } else {
      setActiveTopic(topic);
      const filtered = resources.filter((resource) => resource.topic.toLowerCase() === topic.toLowerCase());
      setFilteredResources(filtered);
    }
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
    <ScrollView contentContainerStyle={styles.container}>
      <BackButton />
      <View style={styles.header}>
        
        <Text style={styles.headerText}>Want to discover more?</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.topicButton, activeTopic === 'Mental Health' && styles.activeButton]}
            onPress={() => handleFilterByTopic('Mental Health')}>
            <Text>Mental Health</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.topicButton, activeTopic === 'Exercise' && styles.activeButton]}
            onPress={() => handleFilterByTopic('Exercise')}>
            <Text>Exercise</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.topicButton, activeTopic === 'Food' && styles.activeButton]}
            onPress={() => handleFilterByTopic('Food')}>
            <Text>Food</Text>
          </TouchableOpacity>
        </View>
      
      {filteredResources.map((resource) => (
        <TouchableOpacity
          key={resource.id}
          onPress={() => handleResourceClick(resource.link)}
          style={styles.resourceContainer}>
          <View style={styles.articleContainer}>
            {resource.image_url && (
              <Image source={{ uri: resource.image_url }} style={styles.image} />
            )}
            <View style={styles.textContent}>
              <Text style={styles.title}>{resource.title}</Text>
              {resource.date && (
                <View style={styles.dateContainer}>
                  <Text style={styles.date}>{resource.date}</Text>
                </View>
              )}
              <Text style={styles.description}>{resource.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: '#c4c4ea'
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 68,
  },

  backButton: {
    position: 'absolute',
    top: 22, 
    left: 20,
    zIndex: 10,
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
    height: 37,
    marginRight: 5,
    
  },
  activeButton: {
    backgroundColor: '#f6deda',
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
});

export default Resources;
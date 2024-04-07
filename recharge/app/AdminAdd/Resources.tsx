import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, Image, Alert } from 'react-native';
import { supabase } from '../../lib/supabase'; // Import supabase
import { Ionicons } from '@expo/vector-icons';

interface Resource {
  id: number;
  title: string;
  description: string;
  date: string | null;
  link: string;
  topic: string; 
  image_url: string | null;
}

interface ResourcesProps {
  activeTopic: string;
}

const Resources: React.FC<ResourcesProps> = ({ activeTopic}) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(()=> {
    handleFilterByTopic(activeTopic); 

  },[resources]);

  const fetchResources = async () => {
    try {
      const { data: resourcesData, error } = await supabase.from('resources').select('*');
      if (error) {
        throw error;
      }
      setResources(resourcesData || []);
      
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const handleFilterByTopic = (topic: string) => {
    const filtered = resources.filter((resource) => resource.topic.toLowerCase() === topic.toLowerCase());
    setFilteredResources(filtered);
  };

  const handleResourceClick = (link: string) => {
    Linking.openURL(link);
  };

  const handleDeleteResource = async (id: number) => {
    try {
      const { error } = await supabase.from('resources').delete().eq('id', id);
      if (error) {
        throw error;
      }
      // Update the resources state after deletion
      setResources(resources.filter(resource => resource.id !== id));
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };

  const confirmDeleteResource = (id: number) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this resource?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => handleDeleteResource(id) },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Render resource list */}
      {filteredResources.map((resource) => (
        <TouchableOpacity
          key={resource.id}
          onPress={() => handleResourceClick(resource.link)}
          style={styles.resourceContainer}>
          <View style={styles.articleContainer}>
            {/* Render resource details */}
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
            {/* Delete button */}
            <TouchableOpacity onPress={() => confirmDeleteResource(resource.id)}>
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
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


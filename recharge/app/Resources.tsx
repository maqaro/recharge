import React, { useState, useEffect } from 'react';
import { View, Text, Image, Linking, ScrollView, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';
import TrackerNav from './TrackerNav';
import NavBar from './NavBar';

type Resource = {
  id: string;
  title: string;
  description: string;
  date: string;
  topic: string;
  link: string;
  image_url: string;
};

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('resources')
          .select('*');

        if (error) {
          console.error('Error fetching resources:', error);
          return;
        }

        setResources(data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{height:'97%'}}>
    <ScrollView>
      <Text style={styles.header}>Resources</Text>
      {resources.map((resource: Resource) => (
        <View style={styles.resourceBox} key={resource.id}>
          <Text style={styles.title}>{resource.title}</Text>
          <Text>{resource.description}</Text>
          <Text>Date: {resource.date}</Text>
          <Text>Topic: {resource.topic}</Text>
          <Text style={styles.link} onPress={() => Linking.openURL(resource.link)}>Link</Text>
          <Image source={{uri: resource.image_url}} style={styles.image} />
        </View>
      ))}
    </ScrollView>
    <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
  },
  resourceBox: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
  link: {
    color: 'blue',
  },
});

export default Resources;
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, Image, Button, Alert } from 'react-native';
import { supabase } from '../../lib/supabase'; // Import supabase
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MentorNavBar from './MentorNavBar';

interface Resource {
  id: number;
  title: string;
  description: string;
  date: string | null;
  link: string;
  topic: string; 
  image_url: string | null;
}

const MentorResources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [isEmployee, setIsEmployee] = useState<boolean>(false);
  const [recommendedBy, setRecommendedBy] = useState<any>();
  const [username, setUsername] =  useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchUser();
    fetchResources();
  }, []);

  const fetchUser = async () => {
    try {
      const { data: user, error } = await supabase.auth.getUser();
  
      if (error) {
        throw error;
      }
  
      if (user) {
        const { data: employeeData, error: employeeError } = await supabase
          .from('employee')
          .select('employee_id')
          .eq('employee_id', user.user.id);
  
        if (employeeError) {
          throw employeeError;
        }
  
        const isEmployeeUser = employeeData && employeeData.length > 0;
        setIsEmployee(isEmployeeUser);
      }
    } catch (error) {
      console.error('Error fetching user or employee data:', (error as Error).message);
    }
  };

  const fetchResources = async () => {
    try {
      const { data: resourcesData, error } = await supabase.from('resources').select('*');
      if (error) {
        throw error;
      }
      setResources(resourcesData || []);
      setFilteredResources(resourcesData || []);
    } catch (error) {
      console.error('Error fetching resources:', (error as Error).message);
    }
  };

  const handleResourceClick = (link: string) => {
    Linking.openURL(link);
  };

  const handleFilterByTopic = (topic: string) => {
    if (topic === activeTopic) {
      setActiveTopic(null);
      setFilteredResources(resources);
    } else {
      setActiveTopic(topic);
      const filtered = resources.filter((resource) => resource.topic.toLowerCase() === topic.toLowerCase());
      setFilteredResources(filtered);
    }
  };

  const handleBackPress = () => {
    router.navigate('/Mentor/MentorHomepage');
  };

  const handleSuggestResource = () => {
    router.navigate('/SuggestResource');
  };

  const recommedResource = async (title: string) => {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('Error fetching user:', userError);
        return;
      }
      let userId = (userData?.user?.id ?? null);

    const{data: usernameData, error: errorData} = await supabase
    .from('mentors')
    .select('name')
    .eq('id', userId);

    if (usernameData){
      setUsername(Object.values(usernameData[0])[0])
    }
    else{
      console.log(errorData)
    }

    const { data: resourcesData, error } = await supabase
    .from('resources')
    .update({ 'recommendedBy': username})
    .eq('title', title);

    Alert.alert("Resource Recommended");
  }
  catch{
    console.log("Error recommending resource");
  }
}

  return (
    <View>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Want to discover more?</Text>
        {!isEmployee && (
          <TouchableOpacity style={styles.suggest}onPress={handleSuggestResource}>
            <Ionicons name="add-circle" size={24} color="black" />
          </TouchableOpacity>
        )}
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
              {/* <Button title="Recommend Resource" onPress={() => {recommedResource(resource.title)}}></Button> */}
              
              <TouchableOpacity onPress={() => {recommedResource(resource.title)}}>
                  <Text style={styles.recommend}>Recommend Resource</Text>
              </TouchableOpacity>


            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
    <MentorNavBar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: '#65AAB3'
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 40,
    marginRight: 60,
  },
  suggest:{
    marginLeft: -18,
    marginTop: 1,
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
    height: 37,
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
  recommend:{
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
  },
});

export default MentorResources;
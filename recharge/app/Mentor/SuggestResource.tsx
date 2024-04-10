import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { router, useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SuggestResource: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [link, setLink] = useState('');
    const [topic, setTopic] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async () => {
        const { error } = await supabase.from('resources').insert([
          {
            title,
            description,
            date,
            link,
            topic,
            image_url: imageUrl,
          },
        ]);
      
        if (error) {
          console.error('Error submitting resource:', error);
        } else {
          setTitle('');
          setDescription('');
          setDate('');
          setLink('');
          setTopic('');
          setImageUrl('');
        }
      };
      
    const handleBackPress = () => {
        router.navigate('/MentorResources');
      };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Suggest a Resource</Text>
            </View>
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.input} value={title} onChangeText={setTitle} />

            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.input} value={description} onChangeText={setDescription} />

            <Text style={styles.label}>Date</Text>
            <TextInput style={styles.input} value={date} onChangeText={setDate} />

            <Text style={styles.label}>Link</Text>
            <TextInput style={styles.input} value={link} onChangeText={setLink} />

            <Text style={styles.label}>Topic</Text>
            <TextInput style={styles.input} value={topic} onChangeText={setTopic} />

            <Text style={styles.label}>Image URL</Text>
            <TextInput style={styles.input} value={imageUrl} onChangeText={setImageUrl} />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 10,
        paddingTop: 20,
        backgroundColor: '#65AAB3',
    },
    header: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 50,
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 37,
        marginRight: 5,
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
      },
});

export default SuggestResource;
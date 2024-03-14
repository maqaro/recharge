import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';

const Trackers = () => (
  <ScrollView contentContainerStyle={styles.scrollContainer}>
    <TouchableOpacity style={[styles.rectangle, styles.rectangle1]} onPress={() => console.log('Rectangle 1 clicked')}>
      <Text style={styles.text}>Rectangle 1</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.rectangle, styles.rectangle2]} onPress={() => console.log('Rectangle 2 clicked')}>
      <Text style={styles.text}>Rectangle 2</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.rectangle, styles.rectangle3]} onPress={() => console.log('Rectangle 3 clicked')}>
      <Text style={styles.text}>Rectangle 3</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.rectangle, styles.rectangle4]} onPress={() => console.log('Rectangle 4 clicked')}>
      <Text style={styles.text}>Rectangle 4</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.rectangle, styles.rectangle5]} onPress={() => console.log('Rectangle 5 clicked')}>
      <Text style={styles.text}>Rectangle 5</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.rectangle, styles.rectangle6]} onPress={() => console.log('Rectangle 6 clicked')}>
      <Text style={styles.text}>Rectangle 6</Text>
    </TouchableOpacity>
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 
    paddingVertical: 8,
    width:'100%',
    height: '100%',
  },
  rectangle: {
    width: '100%',
    height: '20%',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  rectangle1: {
    backgroundColor: 'gray',
  },
  rectangle2: {
    backgroundColor: 'gray',
  },
  rectangle3: {
    backgroundColor: 'gray',
  },
  rectangle4: {
    backgroundColor: 'gray',
  },
  rectangle5: {
    backgroundColor: 'gray',
  },
  rectangle6: {
    backgroundColor: 'gray',
  },
});

export default Trackers;

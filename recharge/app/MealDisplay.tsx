import React, {useState, useEffect, useCallback } from 'react';
import { View,ScrollView, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import SearchBar from './SearchBar';
import MealSearchResults from './MealSearchResults';




const MealDisplay = ({description, brandName, ingredients, foodNutrients}: any) => {
    //const meal = new Meal(description, brandName, ingredients, foodNutrients)
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LinearGradient colors={['#1a7373', '#e37b60']} style={{height:'100%', width:'100%'}}>
            <View>
                <Text>Name: {description}</Text>
                <Text>Brand: {brandName}</Text>
                <Text>Ingredients: {ingredients}</Text>
                <Text>NutritionalInfo: {foodNutrients}</Text>
            </View>
        </LinearGradient>
          </ScrollView>
      )
}


export default MealDisplay;

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
    list__container: {
      margin: 10,
      height: "85%",
      width: "100%",
    },
    item: {
      margin: 30,
      borderBottomWidth: 2,
      borderBottomColor: "lightgrey",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 5,
      fontStyle: "italic",
    },
  
    details: {
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 5,
      fontStyle: "italic",
    },
  });
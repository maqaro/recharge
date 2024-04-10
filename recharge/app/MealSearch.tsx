// Homepage.tsx

import React, {useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SearchBar from './SearchBar';
import MealSearchResults from './MealSearchResults';
import { useReducedMotion } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { updateValues } from './MealView';
import { Ionicons } from '@expo/vector-icons';


const MealSearch = () => {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [data, setData] = useState();
    const router = useRouter();

  const fetchMoreData = useCallback(async () => {
    try {
      const apiResponse = await fetch("https://api.nal.usda.gov/fdc/v1/foods/search?searchPage=20&api_key=pcjK27uzQuXYDjDQQFgQn2sNbQaNmFnjo7DVYCCM&query="+searchPhrase);
      let data = await apiResponse.json();
      data = data.foods;
      setData(data);
    } catch{
      console.log("Error")
    }
  }, [setData, data]);

  
  useEffect (() => {
    fetchMoreData();
  }, [fetchMoreData]);

  const setPhrase = (value: any) =>{
    setSearchPhrase(value);
    fetchMoreData();
  }

  const setInformation = (description: any, brandName: any, ingredients: any, foodNutrients: any) => {
    updateValues(description, brandName, ingredients, foodNutrients);
    router.navigate('./MealView');
  }

  const Item = ({description, brandName, ingredients, foodNutrients}: any) => (
  
    <TouchableOpacity onPress={() => setInformation(description, brandName, ingredients, foodNutrients)}>
    <View style={styles.item}>
      <Text style={styles.title}>{description}</Text>
      <Text style={styles.details}>{brandName}</Text>
    </View>
    </TouchableOpacity>
  );



  const renderItem : any = ({ item }:any) => {
    // when no input, show all
    if (searchPhrase === "") {
      return <Item description={item.description} brandName={item.brandName} ingredients={item.ingredients} foodNutrients={item.foodNutrients}/>;
    }
    // filter of the description
    else if ((item.description as string).toUpperCase().includes((searchPhrase as string).toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item description={item.description} brandName={item.brandName} ingredients={item.ingredients} foodNutrients={item.foodNutrients}/>;
    }
    // filter of the brand name
    else if (item.brandName !== undefined){
        if ((item.brandName as string).toUpperCase().includes((searchPhrase as string).toUpperCase().trim().replace(/\s/g, ""))) {
          return <Item description={item.description} brandName={item.brandName} ingredients={item.ingredients} foodNutrients={item.foodNutrients}/>;
      }
    }
  };

  const BackButton = () => (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => router.navigate('/DietTracker')}
    >
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );
  

    return (
      <LinearGradient colors={['#74CA91', '#74CA91']} style={{height:'100%', width:'100%'}}>
        <View style={styles.container}>
        <BackButton />
          <Text style={styles.foodtitle}>Food Search</Text>
             {!clicked && <Text style={styles.title}></Text>}
            
            <SearchBar clicked={clicked} searchPhrase={searchPhrase} setPhrase={setSearchPhrase} setClicked={setClicked} />
            <SafeAreaView style={styles.list__container}>
      <View
          onStartShouldSetResponder={() => {
          setClicked(false);
          return false;
        }}
      >
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
      </SafeAreaView>
           
        </View>
        <Text style={styles.gap}></Text>
      </LinearGradient>
      );
};

export default MealSearch;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
    },

    foodtitle:{
      fontSize: 30,
      fontWeight: "bold",
      marginBottom: 10,
      color: 'black',
      marginTop: 20,
    },

    list__container: {
      margin: 10,
      height: "85%",
      width: "100%",
    },
    item: {
      margin: 30,
      borderBottomWidth: 2,
      borderBottomColor: "white",
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
    },
  
    details: {
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 5,

    },

    searchBar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 200,
    },

    gap:{
      marginBottom: 90,
    },

    backButton: {
      position: 'absolute',
      top: 22, 
      
      left: 20,
      zIndex: 10,
    },

  });



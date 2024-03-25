// Homepage.tsx

import React, {useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SearchBar from './SearchBar';
import MealSearchResults from './MealSearchResults';

const MealSearch = () => {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [data, setData] = useState();


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

  const setInformation = (value: any[]) => {

  }
  

    return (
        <SafeAreaView style={styles.container}>
             {!clicked && <Text style={styles.title}>Food Search</Text>}
            <LinearGradient colors={['#1a7373', '#e37b60']} style={{height:'100%', width:'100%'}}>
            <SearchBar clicked={clicked} searchPhrase={searchPhrase} setPhrase={setSearchPhrase} setClicked={setClicked} />
           { !data ? (<ActivityIndicator size="large" />) : (
                <MealSearchResults searchPhrase={searchPhrase} setInformation={setInformation} data={data} setClicked={setClicked} />
            )}
            

            </LinearGradient>
        </SafeAreaView>
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
      backgroundColor: '#fff',
    },

    title: {
        width: "100%",
        marginTop: 20,
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: "10%",
      },

    searchBar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 200,

    },

    searchResults: {

    }


  });



//Client ID: 2a7bccc316f144bf8df41a6b7e1efdf2 
//Client Secret: 1bb4b38c4164453b82a1e6c1acf87d9d


import React, { ReactElement } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ListRenderItem,
  TouchableOpacity, 
  Alert,
} from "react-native";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import MealDisplay from "./MealDisplay";

const router = useRouter();
  //const router=useRouter()
// definition of the Item, which will be rendered in the FlatList
const Item = ({description, brandName, ingredients, foodNutrients}: any) => (
  
  <TouchableOpacity onPress={() => router.navigate('/')}>
  <View style={styles.item}>
    <Text style={styles.title}>{description}</Text>
    <Text style={styles.details}>{brandName}</Text>
  </View>
  </TouchableOpacity>
);




// the filter
const List = ({ searchPhrase, setClicked, data, setInformation } : any) => {
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
  

  return (

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
  );
};

export default List;

const styles = StyleSheet.create({
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
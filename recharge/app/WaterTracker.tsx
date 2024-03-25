import React, { useEffect, useState, useRef }  from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import { AddRemoveButton } from "./AddRemoveButton";
import { supabase } from '../lib/supabase';

const amounts = [250, 500, 1000, 1500];

const WaterTracker = () => {
    const [userid, setUserid] = useState<string | undefined>();

    const [fillingPercentage, setFillingPercentage] = useState(0);
    const [waterGoal, setWaterGoal] = useState(3000);
    const [waterDrank, setWaterDrank] = useState(0);
    const [isdataStored, setisDataStored] = useState(false);


const handlePressSubmit = async () => {
  try {
    const { data: {user}, error } = await supabase.auth.getUser(); // Get the authenticated user

    if (error) {
      console.error('Error fetching user data:', error.message);
      return;
    }
    let today = new Date().toISOString().split('T')[0]; 

    const { data, error: insertError } = await supabase.from('watertracker').upsert([
      { water_intake_ml: waterDrank, water_intake_goal: waterGoal, user_id: user?.id, date: today },
    ], { onConflict: 'date' });
    setisDataStored(true)

    if (insertError) {
      console.error('Error inserting water data:', insertError.message);
    } 
  } catch (error) {
    console.error('Error inserting water data:', error);
  }
};


      // Progress Bar Animation
  const barHeight = useRef(new Animated.Value(0)).current;
  const progressPercent = barHeight.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", `100%`],
  });

  useEffect(() => {
    Animated.timing(barHeight, {
      duration: 1000,
      toValue: fillingPercentage / 3,
      useNativeDriver: false,
    }).start();
  }, [fillingPercentage]);

  // End of Progress Bar Animation

  useEffect(() => {
    handlePressSubmit();
  }, [waterGoal, waterDrank]);

  useEffect(() => {
    // percentage = waterDrank * 100 / waterGoal
    let percentage = (waterDrank * 100) / waterGoal;
    let fillingP = (percentage * 300) / 100;
    setFillingPercentage(fillingP > 300 ? 300 : fillingP);
  }, [waterGoal, setFillingPercentage, waterDrank]);

  return (
    <SafeAreaView style={styles.container}>
        <LinearGradient colors={['#1a7373', '#e37b60']} style={{height:'100%', width:'100%'}}>
      {/* Water Goal */}
      <View style={styles.waterGoalContainer}>
        <Text style={[styles.blueText, { fontSize: 22 }]}>Your Goal</Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.grayText, { fontSize: 26 }]}>
            {waterGoal} mL{" "}
          </Text>
          {/* Add Goal */}
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => setWaterGoal(waterGoal + 250)}
          >
            <Ionicons name="add-circle" size={26} color="#2389da" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => setWaterGoal(waterGoal - 250)}
          >
            <Ionicons name="remove-circle" size={26} color="#2389da" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ProgressView */}

      <View
        style={{
          flexDirection: "row",
          width: "90%",
          justifyContent: "space-around",
        }}
      >
        {/* Water You've Drunk Label */}
        <View style={{ justifyContent: "center" }}>
          <Text style={[styles.grayText, { fontSize: 28 }]}>You've drunk</Text>
          <Text style={[styles.blueText, { fontSize: 42 }]}>
            {waterDrank} mL
          </Text>
          <Text style={[styles.grayText, { fontSize: 28 }]}>of water.</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={{
              height: progressPercent,
              backgroundColor: "#5abcd8",
              borderRadius: 40,
            }}
          />
        </View>
      </View>

      {/* Add Water */}
      <View style={styles.waterButtonsContainer}>
        {amounts.map((amount: any) => {
          return (
            <AddRemoveButton
              key={"add" + amount}
              amount={amount}
              value={waterDrank}
              setValue={setWaterDrank}
              operation="add"
            />
          );
        })}
      </View>

      {/* Remove Water */}
      <View style={styles.waterButtonsContainer}>
        {amounts.map((amount: any) => {
          return (
            <AddRemoveButton
              key={"remove" + amount}
              amount={amount}
              value={waterDrank}
              setValue={setWaterDrank}
              operation="remove"
            />
          );
        })}
      </View>
      </LinearGradient>
    </SafeAreaView>
  );
};
    

  export default WaterTracker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  progressBarContainer: {
    borderRadius: 40,
    borderWidth: 1,
    width: 40,
    height: 300,
    justifyContent: "flex-end",
  },
  waterButtonsContainer: {
    flexDirection: "row",
    paddingVertical: 30,
    width: "100%",
    justifyContent: "space-around",
  },
  waterGoalContainer: {
    padding: 50,
    alignItems: "center",
  },
  blueText: {
    color: "#1ca3ec",
    fontWeight: "600",
  },
  grayText: { color: "#323033", fontWeight: "600" },
});
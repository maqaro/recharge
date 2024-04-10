import React, { useEffect, useState, useRef }  from 'react';
import { Pressable, StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Animated, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import { AddRemoveButton } from "./Water/AddRemoveButton";
import { supabase } from '../lib/supabase';
import WaterHistory from './Water/WaterHistory';
import Back from 'react-native-vector-icons/Ionicons';

const amounts = [250, 500, 1000, 1500];

const WaterTracker = () => {
    const [userid, setUserid] = useState<string | undefined>();
    const [fillingPercentage, setFillingPercentage] = useState(0);
    const [waterGoal, setWaterGoal] = useState<number | undefined>(undefined);
    const [waterDrank, setWaterDrank] = useState<number | undefined>(undefined);
    const [isdataStored, setisDataStored] = useState(false);
    const [fetchComplete, setFetchComplete] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const updatePoints = async () => {
        let pointNo = 0;
        try {
          const { data: { user } } = await supabase.auth.getUser();
          let usersid = user?.id;
          const { data: points, error: pointsError } = await supabase
          .from('employee')
          .select('points')
          .eq('employee_id', usersid)

          if (points){
            console.log(Object.values(points[0])[0])
            pointNo = Object.values(points[0])[0]
          }

          const { data: points2, error: updateError } = await supabase
          .from('employee')
          .update({'points': pointNo+10})
          .eq('employee_id', usersid)

        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      updatePoints();
    }, []);

const fetchCurrentData = async () => {
    try {
        const { data: {user}, error } = await supabase.auth.getUser();
        if (error) {
            console.error('Error fetching user data:', error.message);
            return;
        }

        let today = new Date().toISOString().split('T')[0]; 
        setUserid(user?.id);
        // Fetch data for today's date
        const { data: waterData, error: fetchError } = await supabase
            .from('watertracker')
            .select('*')
            .eq('date', today)
            .eq('user_id', user?.id)
            .single();
      
        if (fetchError) {
            console.error('Error fetching water data:', fetchError.message);
            setWaterGoal(3000);
            setWaterDrank(0);
            setisDataStored(false);
             return;
        }
        // If data for today exists, set waterDrank and waterGoal to the fetched values
        if (waterData) {
            setWaterDrank(waterData.water_intake_ml);
            setWaterGoal(waterData.water_intake_goal);
            setisDataStored(true);
            
          } 


    } catch (error) {
        console.error('Error fetching water data:', error);
    }
};

useEffect(() => {
    fetchCurrentData();
}, []);



const handlePressSubmit = async () => {
  try {

    const { data: { user }, error: userError } = await supabase.auth.getUser(); // Get the authenticated user

    if (userError) {
      console.error('Error fetching user data:', userError.message);
      return;
    }

    let today = new Date().toISOString().split('T')[0];

    // Check if there is already a row for the current date
    const { data: existingData, error: fetchError } = await supabase
      .from('watertracker')
      .select('*')
      .eq('user_id', user?.id)
      .eq('date', today);

    if (fetchError) {
      console.error('Error fetching existing data:', fetchError.message);
      return;
    }


    if (existingData && existingData.length > 0) {
      // Row exists for the current date, update it
      const { error: updateError } = await supabase
        .from('watertracker')
        .update({
          water_intake_ml: waterDrank,
          water_intake_goal: waterGoal,
        })
        .eq('user_id', user?.id)
        .eq('date', today);

      if (updateError) {
        console.error('Error updating water data:', updateError.message);
        return;
      }
    } else {
      // No row exists for the current date, insert a new row
      const { error: insertError } = await supabase.from('watertracker').insert([
        { water_intake_ml: waterDrank, water_intake_goal: waterGoal, user_id: user?.id, date: today },
      ]);

      if (insertError) {
        console.error('Error inserting water data:', insertError.message);
        return;
      }
    }

    setisDataStored(true);
  } catch (error) {
    console.error('Error handling submit:', error);
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
  }, [fillingPercentage,barHeight]);

  // End of Progress Bar Animation

  useEffect(() => {
    handlePressSubmit();
  }, [waterGoal, waterDrank]);

  useEffect(() => {
    if (typeof waterDrank === 'number' && typeof waterGoal === 'number') {
    // percentage = waterDrank * 100 / waterGoal
    let percentage = (waterDrank * 100) / waterGoal;
    let fillingP = (percentage * 300) / 100;
    setFillingPercentage(fillingP > 300 ? 300 : fillingP);
    }
  }, [waterGoal, setFillingPercentage, waterDrank]);


  const handleViewHistory = () => {
    setShowModal(true);
  }

  const BackButton = () => (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => router.navigate('/Trackers')}
    >
      <Ionicons name="chevron-back-circle-outline" size={35} color="black" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
        <View style={{backgroundColor:'#89CFF0', height:'100%', width:'100%'}}>
      {/* Water Goal */}
      <BackButton />
      <View style={styles.waterGoalContainer}>
        <Text style={[styles.blueText, { fontSize: 22 }]}>Your Goal</Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>

          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => {if (typeof waterGoal === 'number') {
              setWaterGoal(waterGoal - 250);
          }}}
          >
            <Ionicons name="remove-circle" size={26} color="#2389da" />
          </TouchableOpacity>

          <Text style={[styles.grayText, { fontSize: 26 }]}>
            {waterGoal} mL{" "}
          </Text>

          {/* Add Goal */}
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => {if (typeof waterGoal === 'number') {
              setWaterGoal(waterGoal + 250);
          }}}
          >
            <Ionicons name="add-circle" size={26} color="#2389da" />
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
        <View style={{ justifyContent: "center", backgroundColor:'white', marginVertical:'20%', borderRadius:20, padding:10 }}>
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

       {/* Button to view history */}
       <TouchableOpacity style={styles.viewHistoryButton} onPress={handleViewHistory}>
            <Text style={styles.viewHistoryButtonText}>View History</Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal visible={showModal} transparent={false} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                {/* Your UI components for modal content */}
                    <TouchableOpacity style={styles.closeModalButton} onPress={() => setShowModal(false)}>
                        <Ionicons name="chevron-back-circle-outline" size={35} color="black" />
                    </TouchableOpacity>
                    <WaterHistory/>
                </View>
            </View>
        </Modal>

      </View>
    </SafeAreaView>
  );
};
    

  export default WaterTracker;

const styles = StyleSheet.create({
    viewHistoryButton: {
        position: 'absolute',
        marginTop: 19,
        right: 0,
        marginRight: 6,
        backgroundColor: '#fff',
        padding: 10,
    },
    
    backButton: {
      position: 'absolute', // Position over your chat content or at the top of your screen
      top: 14, // Adjust based on your status bar height or header
      left: 20,
      zIndex: 10, // Ensure it's above other content
    },

    viewHistoryButtonText: {
        color: '#1a7373',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#89CFF0',
        paddingTop: 15,
    },
    modalContent: {
        padding: 20,
        borderRadius: 10,
        width: '100%',
        height:'100%',
     
    },
    closeModalButton: {
        position: 'absolute',
        top: 49,
        left: 10,
        zIndex: 10,
    },
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
    backgroundColor:'white',
    marginTop: 40,
    
  },
  waterButtonsContainer: {
    flexDirection: "row",
    paddingVertical: 25,
    width: "95%",
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 20,
    justifyContent: "space-around",
    backgroundColor:'white',
  },
  waterGoalContainer: {
    alignItems: "center",
    backgroundColor:'white',
    marginHorizontal: '20%',
    borderRadius: 20,
    marginTop: 90

  },
  blueText: {
    color: "#1ca3ec",
    fontWeight: "600",
    textAlign: "center",
  },
  grayText: { 
    color: "#323033", 
    fontWeight: "600",
    textAlign: "center",
  },
});

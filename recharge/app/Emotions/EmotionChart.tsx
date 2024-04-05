import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { supabase } from '../../lib/supabase'; 
import Svg, { Circle, G, Text as SvgText } from "react-native-svg";

const EmotionChart = () => {
  const [userid, setUserid] = useState<string | undefined>();
  const [emotionsData, setEmotionsData] = useState<{
    name: string;
    count: number;
    color: string;
    legendFontColor: string;
    legendFontSize: number;
  }[]>([]);
  type EmotionCount = { [key: string]: number };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const id = user?.id;
        setUserid(id);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchEmotionsData = async () => {
      if (userid) {
        try {
          const { data: emotionData, error: emotionError } = await supabase
            .from('emotiontracker')
            .select('emotion')
            .eq('user_id', userid);

          if (emotionError) {
            console.error('Error fetching emotion data:', emotionError.message);
            return;
          }
          const emotionsCount: EmotionCount = emotionData.reduce((acc: EmotionCount, curr: { emotion: string }) => {
            acc[curr.emotion] = (acc[curr.emotion] || 0) + 1;
            return acc;
          }, {});
          const totalCount = Object.values(emotionsCount).reduce((acc, count) => acc + count, 0);
          const chartData = Object.keys(emotionsCount).map((emotion) => ({
            name: emotion,
            count: emotionsCount[emotion],
            color: getEmotionColor(emotion),
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
            percentage: ((emotionsCount[emotion] / totalCount) * 100).toFixed(2) + '%', // Calculate percentage
          }));
          setEmotionsData(chartData);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };
    fetchEmotionsData();
  }, [userid]);

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case 'Happy':
        return '#cfb108';
      case 'Sad':
        return '#4682BF';
      case 'Angry':
        return '#7d1204';
      case 'Anxious':
        return '#c4830a';
      case 'Worried':
        return '#FFA500';
      case 'Love':
        return '#ab445c';
      case 'Calm':
        return '#769476';
      case 'Great':
        return '#800080';
      case 'Disgust':
        return '#65781c';
      case 'Sick':
        return '#98FB98';
      case 'Sleepy':
        return '#E6E6FA';
      case 'Bored':
        return '#592963';
      case 'Excited':
        return '#b8533e';
      case 'Embarassed':
        return '#5e5959';
      case 'Fustrated':
        return '#7b5887';
      default:
        return '#000000'; // Default color
    }
  };

  const radius = 70;
  const innerRadius = 60;
  const circleCircumference = 2 * Math.PI * radius;
  const totalCount = emotionsData.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <View style={{backgroundColor:'white', margin:15, borderRadius:20, elevation:10}}>
      <Text style={{marginLeft:20, marginTop:10, fontWeight:'bold', fontSize:16}}>Mood Chart</Text>
      {emotionsData.length > 0 ? (
        <View style={{alignItems:'center', marginTop:20}}>
          <Svg height="180" width="180" viewBox="0 0 180 180">
            <G rotation={0} originX="90" originY="90">
              {emotionsData.map((emotion, index) => {
                const percentage = (emotion.count / emotionsData.reduce((acc, curr) => acc + curr.count, 0)) * 100;
                const strokeDashoffset = circleCircumference - (circleCircumference * percentage) / 100;
                const angle = (emotion.count / emotionsData.reduce((acc, curr) => acc + curr.count, 0)) * 360;
                const previousAngles = emotionsData.slice(0, index).reduce((acc, curr) => acc + (curr.count / emotionsData.reduce((acc, curr) => acc + curr.count, 0)) * 360, 0);

                return (
                  <Circle
                    key={index}
                    cx="50%"
                    cy="50%"
                    r={radius}
                    stroke={emotion.color}
                    fill="transparent"
                    strokeWidth="40"
                    strokeDasharray={circleCircumference}
                    strokeDashoffset={strokeDashoffset}
                    rotation={previousAngles}
                    originX="90"
                    originY="90"
                    strokeLinecap="butt"
                  />
                );
              })}
              <Circle
              cx="50%"
              cy="50%"
              r={innerRadius} // Set the inner radius for the donut hole
              fill="transparent"  // Fill color for the inner circle
            />
              <SvgText
                x="50%"
                y="50%"
                textAnchor='middle'
                fontSize="16"
                fontWeight="bold"
              >
                Total Entries:
              </SvgText>

              <SvgText
                x="50%"
                y="60%"
                textAnchor='middle'
                fontSize="16"
                fontWeight="bold"
              >
                {totalCount}
              </SvgText>
            </G>
          </Svg>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, flexWrap:'wrap', marginBottom:50 }}>
            {emotionsData.map((emotion, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                <View style={{ width: 15, height: 15, backgroundColor: emotion.color, marginRight: 5, marginBottom:5 }} />
                <Text>{emotion.name}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default EmotionChart;


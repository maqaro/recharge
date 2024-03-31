import React, {useState} from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import { supabase } from '../lib/supabase';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MentorResults, { updateSpecialty } from './MentorResults';

const MatchWithMentorForm = () => {
  const { control, handleSubmit } = useForm();
  
  type DropdownItem = {
    label: string;
    value: string;
};
  
  const router = useRouter();
  const [openTopic, setOpenTopic] = useState(false);
  const [openSeverity, setOpenSeverity] = useState(false);
  const [valueTopic, setTopicValue] = useState("General");
  const [valueSeverity, setSeverityValue] = useState("0");
  const [text, setText] = useState("");
  const [userid, setUserid] = useState<string | undefined>();
  const [mentorData, setMentorData] = useState<any[]>([]);
  const [items, setItems] = useState([
  {label:'Depression', value:'1'},
  {label:'Anxiety', value:'2'},
  {label:'Trauma', value:'3'},
  {label:'Eating Disorder', value:'4'},
  {label:'Stress', value:'5'},
  {label:'Addiction', value:'6'}, 
  {label:'Grief', value:'7'},
  {label:'Self-Harm', value:'8'},
  {label:'Insomnia', value:'9'},
  {label:'General', value:'10'}]);
  const [severity, setSeverity] = useState([
    {label:'Extreme', value:'1'},
    {label:'Severe', value:'2'},
    {label:'Moderate', value:'3'},
    {label:'Mild', value:'4'},
    {label:'Inconventient', value:'5'},]);

  const onSubmit =  async (data: any) => {
    updateSpecialty(valueTopic)
    router.navigate('./MentorResults');
    
  };

  const filterMentors = async (field: string) =>{
    try {
      const { data: { user }, } = await supabase.auth.getUser();
       setUserid(user?.id);

       let { data: mentor, error } = await supabase
           .from('mentors')
           .select('*')
           .eq('specialty_id', parseInt(field));
       if (error) {
           console.error('Error fetching mentor data inner:', error);
       } else {
           if (mentor) {
               setMentorData(mentor); // Update state with the fetched sleep data
               await AsyncStorage.setItem("1", JSON.stringify(mentor));
               const userData = await AsyncStorage.getItem("1");
              }
       }
   } catch (error) {
       console.error('Error fetching mentor data:', error);
   }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forms</Text>
      <Text style={styles.input}>Select the topic you wish to discuss:</Text>
      <DropDownPicker
      dropDownDirection='TOP'
      open={openTopic}
      value={valueTopic}
      items={items}
      setOpen={setOpenTopic}
      setValue={setTopicValue}
      setItems={setItems}
    />
      <Text style={styles.input}>Select the severity of your issues:</Text>
      <DropDownPicker
      open={openSeverity}
      value={valueSeverity}
      items={severity}
      setOpen={setOpenSeverity}
      setValue={setSeverityValue}
      setItems={setSeverity}
    />
      <TextInput
        style={styles.textbox}
        placeholder="Enter a brief explanation of what you wish to discuss"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 30,
  },
  input: {
    padding: 10,
    marginBottom: 10,
    marginTop: 30,
    width: '70%',
  },
  textbox: {
    marginTop: 50,
    height:100,
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default MatchWithMentorForm;
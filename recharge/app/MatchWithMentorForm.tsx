import React, {useState} from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import { supabase } from '../lib/supabase';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MentorResults, { updateSpecialty } from './MentorResults';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

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
               setMentorData(mentor); // Update state with the fetched data
               await AsyncStorage.setItem("1", JSON.stringify(mentor));
               const userData = await AsyncStorage.getItem("1");
              }
       }
   } catch (error) {
       console.error('Error fetching mentor data:', error);
   }
};

const BackButton = () => (
  <TouchableOpacity
    style={styles.backButton}
    onPress={() => router.navigate('/MatchWithMentor')}
  >
    <Ionicons name="arrow-back" size={24} color="black" />
  </TouchableOpacity>
);

  return (
    <LinearGradient colors={['#85D4D5', '#85D4D5']} style={{height:'100%', width:'100%'}} >
      <BackButton />
    <View style={styles.container}>
    <View style={styles.header}>
        <Text style={styles.title}>Matching Form</Text>
      </View>
      <Text style={styles.subtitle}>Welcome to our mentor matching program! </Text>
      <Text style={{color:'black', alignSelf:'center', marginTop:30, fontSize:14}}>To ensure we find the perfect mentor for you, please take a moment to fill out this form. 
        Your responses will guide us in matching you with a mentor who can provide tailored support for your wellbeing journey. Let's take this step 
        toward a healthier, happier you together.</Text>
        {/* Your privacy is our priority, and all information shared will be treated with utmost confidentiality */}
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

      {/* <Button title="Submit" onPress={handleSubmit(onSubmit)} /> */}

      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={[styles.submit, !text || valueTopic === 'General' || valueSeverity === '0' ? styles.submitDisabled : null]} 
      disabled={!text || valueTopic === 'General' || valueSeverity === '0'}>
      <Text style={styles.buttonText}>Submit</Text>
    </TouchableOpacity>


    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 20,
    paddingRight: 20,
    paddingLeft: 20,
    // paddingTop:10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items to the start of the row
    width: '100%', // Ensure the header takes up the full width
    paddingHorizontal: 20, // Add some padding to the sides
    marginBottom: 5,
  },
  backButton: {
    position: 'absolute',
    top: 22, 
    left: 20,
    zIndex: 10,
  },
  backIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'black',
    alignSelf:'center',
    marginBottom: 10,
    marginTop: -79,
    marginLeft: 84,

  },
  input: {
    marginBottom: 10,
    marginTop: 40,
    width: '100%',
    color:'white',
    fontWeight:'bold',
  },
  textbox: {
    marginTop: 40,
    height:100,
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    textAlignVertical:'top',
    backgroundColor:'white',
    marginBottom:30,
    padding:10
  },
  subtitle:{
    color:'black',
    alignSelf:'center',
    textAlign:'center',
    fontSize: 20,
    paddingBottom: 30,
  },

  submit:{
    backgroundColor: '#2BC0E4',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },

  submitDisabled: {
    backgroundColor: 'grey',
  },

  buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
   },


});

export default MatchWithMentorForm;
import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatRoom = () => {
  const { chatID } = useLocalSearchParams();
  const [userID, setUserID] = useState<string | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [path, setPath] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('Error fetching user:', userError);
        return;
      }
      setUserID(userData?.user?.id ?? null);
      console.log(userID);
    };

    fetchUser();
  }, []);

  useEffect(()=> {
    const getPath = async () =>{

      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('Error fetching user:', userError);
        return;
      }
      let userId = (userData?.user?.id ?? null);

      const { data: mentors, error: mentorError } = await supabase
        .from('mentors')
        .select('id')
        .eq('id', userId);
  
      if (mentorError) {
        Alert.alert(mentorError.message);
      }

      if (mentors){
        console.log(mentors);
      }
  
      if (mentors && mentors.length > 0) {
        setPath('/Mentor/MentorViewChatrooms');
      } else {
        setPath('/ViewMentors');
      }
    };
    getPath();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!chatID) return;

      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('id, message, created_at, sender_id')
        .eq('chat_id', chatID)
        .order('created_at', { ascending: false });

      if (messagesError) {
        console.error('Error fetching messages:', messagesError);
        return;
      }

      const formattedMessages = messagesData.map((msg): IMessage => ({
        _id: msg.id,
        text: msg.message,
        createdAt: new Date(msg.created_at),
        user: {
          _id: msg.sender_id,
        },
      }));

      setMessages(formattedMessages);
    };

    fetchMessages();
  }, [chatID, userID]);

  // Real-time subscription to new messages
  useEffect(() => {
    if (!chatID || !userID) return;

    const messageSubscription = supabase
      .channel(`public-messages-${chatID}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `chat_id=eq.${chatID}` },
        (payload) => {
          // Check if the new message belongs to the current chat and is not by the current user
          if (payload.new && payload.new.chat_id === chatID && payload.new.sender_id !== userID) {
            const newMessage: IMessage = {
              _id: payload.new.id,
              text: payload.new.message,
              createdAt: new Date(payload.new.created_at),
              user: {
                _id: payload.new.sender_id,
              },
            };
            setMessages(previousMessages => GiftedChat.append(previousMessages, [newMessage]));
          }
        }
      )
      .subscribe();

    return () => {
      messageSubscription.unsubscribe();
    };
  }, [chatID, userID]);

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    if (!userID || !chatID) return;

		setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));

    const inserts = newMessages.map((message) => ({
      chat_id: chatID,
      sender_id: userID,
      message: message.text,
      // Supabase automatically converts JS Date to Postgres Timestamp
      created_at: new Date(),
    }));

    const sendMessages = async () => {
      const { error } = await supabase.from('messages').insert(inserts);
      if (error) {
        console.error('Error sending message:', error);
      } else {
        // Messages will be appended via the real-time subscription
      }
    };

    sendMessages();
  }, [userID, chatID, setMessages]);


  const BackButton = () => (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => router.navigate(path)}
    >
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor:'#F5F5F5'}}>
      <BackButton />
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{ _id: userID || '' }}
      />  
    </View>  
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute', // Position over your chat content or at the top of your screen
    top: 40, // Adjust based on your status bar height or header
    left: 20,
    zIndex: 10, // Ensure it's above other content
  },
});

export default ChatRoom;
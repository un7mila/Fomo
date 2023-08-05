import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import EventSource from 'react-native-sse';
import tw from 'twrnc';
const ChatList = () => {
  useEffect(() => {
    const es = new EventSource('http://10.0.2.2:3000/chats/chatlist');
    es.addEventListener('open', event => {
      console.log('Open SSE connection.');
    });

    es.addEventListener('message', event => {
      console.log('New message event!!!!!!!!!!!', event);
    });
  }, []);

  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <ScrollView style={tw`border-t border-t-2 border-t-solid`}>
        <View style={tw`flex flex-gap-3 flex-col flex-grow p-4`}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatList;

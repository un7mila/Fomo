import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, SafeAreaView, ScrollView, View} from 'react-native';
import EventSource from 'react-native-sse';
import tw from 'twrnc';
import {Box, Text} from 'native-base';
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
        <View style={tw`gap-5 py-4`}>
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const ChatItem = () => (
  <View style={tw`flex-row gap-3 border-b-2 border-b-solid p-2`}>
    <View style={tw`flex-shrink-0 h-10 w-10 rounded-full overflow-hidden`}>
      <Image
        style={tw`w-full h-full`}
        source={{
          uri: 'https://i.namu.wiki/i/jJF3CAK27xqwiZqEThUBzzHRzDBoQlMGEuwKXRxdePm9lKkPNcFckJqydCHYeCrRk66NkL3xgrP4iIKI8S5KYA.webp',
        }}
      />
    </View>
    <Box>
      <Text>뿡빵이</Text>
    </Box>
    <View>
      <Text style={tw`text-sm`}>Chatting Chatting</Text>
      <Text style={tw`text-sm`}>Chatting Chatting</Text>
    </View>
  </View>
);

export default ChatList;

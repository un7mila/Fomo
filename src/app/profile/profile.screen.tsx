import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import tw from 'twrnc';
const Chats = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <ScrollView style={tw`border-t border-t-2 border-t-solid`}>
        <View style={tw`flex flex-gap-3 flex-col flex-grow p-4`}>
          <ChatBubble />
          <ChatBubble />
          <ChatBubble />
          <MyChatBubble />
          <ChatBubble />
          <MyChatBubble />
          <MyChatBubble />
          <MyChatBubble />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const ChatBubble = () => (
  <View style={tw`flex mt-2`}>
    <View style={tw`flex-row flex-gap-2 max-w-xs`}>
      <View style={tw`flex-shrink-0 h-10 w-10 rounded-full overflow-hidden`}>
        <Image
          style={tw`w-full h-full`}
          source={{
            uri: 'https://i.namu.wiki/i/jJF3CAK27xqwiZqEThUBzzHRzDBoQlMGEuwKXRxdePm9lKkPNcFckJqydCHYeCrRk66NkL3xgrP4iIKI8S5KYA.webp',
          }}
        />
      </View>
      <View>
        <View
          style={tw`p-3 rounded-r-lg rounded-bl-lg border border-solid border-2`}>
          <Text style={tw`text-sm`}>
            Chatting Chatting Chatting Chatting Chatting Chatting
          </Text>
        </View>
        <Text style={tw`text-xs`}>2 min ago</Text>
      </View>
    </View>
  </View>
);

const MyChatBubble = () => (
  <View style={tw`flex flex-row w-full ml-auto max-w-xs justify-end`}>
    <View>
      <View
        style={tw`bg-black p-3 rounded-l-lg rounded-br-lg border border-solid border-2`}>
        <Text style={tw`text-sm text-white`}>
          Chatting Chatting Chatting Chatting Chatting Chatting Chatting
          Chatting Chatting Chatting Chatting Chatting Chatting Chatting
          Chatting
        </Text>
      </View>
      <Text style={tw`text-xs text-right`}>2 min ago</Text>
    </View>
  </View>
);

export default Chats;

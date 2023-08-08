import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Keyboard,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import tw from 'twrnc';
import FormInput from '../../components/FormInput';
import {FormProvider, useForm} from 'react-hook-form';
import {io} from 'socket.io-client';
import useChat from './hooks/useChat';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
});

const ChatUser = () => {
  const {sendMessage} = useChat();
  const navigation = useNavigation();
  const control = useForm<{message: string}>();
  const {
    handleSubmit,
    setFocus,
    formState: {errors},
  } = control;

  const onSubmit = data => {
    Keyboard.dismiss(); // Hide the keyboard after submission
    console.log('Form data:', data);
    sendMessage(data.message);
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={90}
      behavior={'padding'}
      style={tw`flex-1`}>
      <ScrollView style={tw`border-t border-t-2 border-t-solid`}>
        <View style={tw`flex flex-gap-3 flex-col p-4`}>
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
      <View style={tw`py-2 px-3 border-t border-t-2 border-t-solid bg-white`}>
        <FormProvider {...control}>
          <FormInput
            name="message"
            placeholder="message"
            rules={{required: 'message is required'}}
            style={tw`bg-black text-white rounded-6 py-3 px-5`}
            onSubmitEditing={handleSubmit(onSubmit)}
          />
        </FormProvider>
      </View>
    </KeyboardAvoidingView>
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

export default ChatUser;

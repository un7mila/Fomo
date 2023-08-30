import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  SafeAreaView,
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import tw from 'twrnc';
import FormInput from '../../components/FormInput';
import {FormProvider, useForm} from 'react-hook-form';
import {io} from 'socket.io-client';
import useChat from './hooks/useChat';
import {Box, Column, Row, Image, Text, ScrollView} from 'native-base';

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
      style={tw`h-full`}>
      <ScrollView borderTopWidth={1}>
        <Column space={3} p={3}>
          <ChatBubble />
          <ChatBubble />
          <ChatBubble />
          <MyChatBubble />
          <ChatBubble />
          <MyChatBubble />
          <MyChatBubble />
          <MyChatBubble />
        </Column>
      </ScrollView>
      <Box p={3} borderTopWidth={1}>
        <FormProvider {...control}>
          <FormInput
            name="message"
            placeholder="message"
            rules={{required: 'message is required'}}
            style={tw`bg-black text-white rounded-6 py-3 px-5`}
            onSubmitEditing={handleSubmit(onSubmit)}
          />
        </FormProvider>
      </Box>
    </KeyboardAvoidingView>
  );
};

const ChatBubble = () => (
  <Row w="full" space={3}>
    <Image
      rounded="full"
      size="xs"
      source={{
        uri: 'https://i.namu.wiki/i/jJF3CAK27xqwiZqEThUBzzHRzDBoQlMGEuwKXRxdePm9lKkPNcFckJqydCHYeCrRk66NkL3xgrP4iIKI8S5KYA.webp',
      }}
    />
    <Column flex={1}>
      <Box borderRightRadius="lg" borderBottomRadius="lg" p={3} bg="indigo.400">
        <Text style={tw`text-sm`}>
          Chatting Chatting Chatting Chatting Chatting Chatting
        </Text>
      </Box>
      <Text style={tw`text-xs`}>2 min ago</Text>
    </Column>
  </Row>
);

const MyChatBubble = () => (
  <Box alignItems="flex-end">
    <Column maxWidth={80}>
      <Box borderLeftRadius="lg" borderBottomRadius="lg" p={3} bg="red.500">
        <Text style={tw`text-sm text-white`}>
          Chatting Chatting Chatting Chatting Chatting Chatting Chatting
          Chatting Chatting Chatting Chatting Chatting Chatting Chatting
          Chatting
        </Text>
      </Box>
      <Text style={tw`text-xs text-right`}>2 min ago</Text>
    </Column>
  </Box>
);

export default ChatUser;

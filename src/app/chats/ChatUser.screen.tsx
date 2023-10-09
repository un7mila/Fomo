import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Keyboard, KeyboardAvoidingView, StyleSheet} from 'react-native';
import tw from 'twrnc';
import FormInput from '../../components/FormInput';
import {FormProvider, useForm} from 'react-hook-form';
import useChatUser from './hooks/useChatUser';
import {Box, Column, Image, Row, ScrollView, Text} from 'native-base';
import {useUserStore} from 'store/user.store';
import {Message} from 'types/chat';

type MessageForm = {message: string};

const ChatUser = () => {
  const {params: {data} = {}} = useRoute();
  const {profile} = useUserStore();
  const {matchId} = data;
  const {sendMessage, opponentProfile, chatMessages} = useChatUser(matchId);
  const control = useForm<MessageForm>();
  const {
    handleSubmit,
    setFocus,
    formState: {errors},
  } = control;
  const scrollViewRef = React.useRef();

  React.useEffect(() => {
    scrollToBottom();
  }, [scrollViewRef]);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current?.scrollToEnd({animated: true});
    }
  };

  const onSubmit = (data: MessageForm) => {
    Keyboard.dismiss();
    sendMessage(data.message);
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={90}
      behavior={'padding'}
      style={tw`h-full`}>
      <ScrollView
        borderTopWidth={1}
        ref={scrollViewRef}
        onContentSizeChange={scrollToBottom}>
        <Column space={3} p={3}>
          {chatMessages?.map(message => (
            <Box key={message.id}>
              {message.userId === profile.id ? (
                <MyChatBubble message={message} />
              ) : (
                <ChatBubble image={opponentProfile?.image} message={message} />
              )}
            </Box>
          ))}
        </Column>
      </ScrollView>
      <Box p={3} borderTopWidth={1}>
        <FormProvider {...control}>
          <FormInput
            name="message"
            placeholder="message"
            onSubmitEditing={handleSubmit(onSubmit)}
          />
        </FormProvider>
      </Box>
    </KeyboardAvoidingView>
  );
};

interface ChatBubbleInterface {
  image?: string;
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleInterface> = ({image, message}) => (
  <Row w="full" space={3}>
    <Image
      alt="opponentImage"
      rounded="full"
      size="xs"
      source={{
        uri: image,
      }}
    />
    <Column flex={1}>
      <Box borderRightRadius="lg" borderBottomRadius="lg" p={3} bg="indigo.400">
        <Text style={tw`text-sm`}>{message.content}</Text>
      </Box>
      <Text style={tw`text-xs`}>2 min ago</Text>
    </Column>
  </Row>
);

const MyChatBubble: React.FC<ChatBubbleInterface> = ({message}) => (
  <Box alignItems="flex-end">
    <Column maxWidth={80}>
      <Box borderLeftRadius="lg" borderBottomRadius="lg" p={3} bg="red.500">
        <Text style={tw`text-sm text-white`}>{message.content}</Text>
      </Box>
      <Text style={tw`text-xs text-right`}>2 min ago</Text>
    </Column>
  </Box>
);

export default ChatUser;

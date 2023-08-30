import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SafeAreaView, View} from 'react-native';
import EventSource from 'react-native-sse';
import tw from 'twrnc';
import {Box, ScrollView, Text, Image, Row, Heading, Column} from 'native-base';
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
    <Box>
      <Heading pl={3}>Partners</Heading>
      <MatchList />
      <Heading pl={3}>Recent</Heading>
      <Box minHeight={1000}>
        <ScrollView>
          <Column space={3} mt={3}>
            {[1, 2, 3, 4, 5, 6, 7].map(i => (
              <ChatItem key={i} />
            ))}
          </Column>
        </ScrollView>
      </Box>
    </Box>
  );
};

const MatchList = () => (
  <Box>
    <ScrollView horizontal={true}>
      <Row p={3} space={3}>
        {[1, 2, 3, 4, 5, 6].map(i => (
          <Image
            key={i}
            size="sm"
            rounded="full"
            source={{
              uri: 'https://i.namu.wiki/i/jJF3CAK27xqwiZqEThUBzzHRzDBoQlMGEuwKXRxdePm9lKkPNcFckJqydCHYeCrRk66NkL3xgrP4iIKI8S5KYA.webp',
            }}></Image>
        ))}
      </Row>
    </ScrollView>
  </Box>
);

const ChatItem = () => (
  <Row p={3} space={3}>
    <Image
      rounded="full"
      size="xs"
      source={{
        uri: 'https://i.namu.wiki/i/jJF3CAK27xqwiZqEThUBzzHRzDBoQlMGEuwKXRxdePm9lKkPNcFckJqydCHYeCrRk66NkL3xgrP4iIKI8S5KYA.webp',
      }}
    />
    <Box>
      <Text fontWeight={600}>뿡빵이</Text>
      <Text fontSize="xs">Chatting Chatting</Text>
    </Box>
  </Row>
);

export default ChatList;

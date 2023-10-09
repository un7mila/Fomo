import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Badge,
  Box,
  Column,
  Heading,
  Image,
  Pressable,
  Row,
  ScrollView,
  Text,
} from 'native-base';
import useChatList from 'app/chats/hooks/useChatList';

const ChatList = () => {
  const {matches, chatRooms} = useChatList();
  const {navigate} = useNavigation();

  const onItemSelect = (matchId: number) => () => {
    navigate('ChatUser', {
      data: {
        matchId,
      },
    });
  };

  return (
    <Box height="full">
      <Heading pl={3}>Partners</Heading>
      {matches && <MatchList matches={matches} onItemSelect={onItemSelect} />}
      <Heading pl={3}>Recent</Heading>
      <Box flex={1}>
        <ScrollView>
          <Column space={3}>
            {chatRooms?.map((room, i) => (
              <ChatItem
                key={i}
                onItemSelect={onItemSelect(room.matchId)}
                name={room.opponent?.userProfile.name}
                lastMessage={room.lastMessage}
                hasBadge={room.hasNewLastMessage}
                image={room.opponent?.userProfile.image}
              />
            ))}
          </Column>
        </ScrollView>
      </Box>
    </Box>
  );
};

const MatchList = ({matches, onItemSelect}) => {
  return (
    <Box>
      <ScrollView horizontal={true}>
        <Row p={3} space={3}>
          {matches.map((matchUser, i) => (
            <Pressable
              key={i}
              onPress={onItemSelect(matchUser.matchId, matchUser.userId)}>
              <Image
                size="sm"
                rounded="full"
                alt="image"
                source={{
                  uri: matchUser?.userProfile?.image ?? '',
                }}></Image>
            </Pressable>
          ))}
        </Row>
      </ScrollView>
    </Box>
  );
};

const ChatItem = ({name, onItemSelect, image, lastMessage, hasBadge}) => (
  <Pressable onPress={onItemSelect}>
    <Row p={3} space={3}>
      <Image
        rounded="full"
        size="xs"
        source={{
          uri: image,
        }}
        alt="image"
      />
      <Box flex={1}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize="xs">{lastMessage}</Text>
        {hasBadge && (
          <Badge
            colorScheme="danger"
            position="absolute"
            rounded="full"
            right={6}
            top={2}
            variant="solid"
            alignSelf="flex-end"
            _text={{
              fontSize: 12,
            }}>
            new
          </Badge>
        )}
      </Box>
    </Row>
  </Pressable>
);

export default ChatList;

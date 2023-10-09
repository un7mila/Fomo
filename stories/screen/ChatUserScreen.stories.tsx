import React from 'react';
import {Text, Box, Image, Input, ScrollView, Column, Row} from 'native-base';

const chatMessages = [
  '안녕',
  '나는 하니야',
  '안녕 하니야',
  '뭐하고 있니? 뭐하고 있니? 뭐하고 있니? 뭐하고 있니?',
];

export const Screen = () => (
  <Box p={3} maxWidth={350}>
    <ScrollView borderTopWidth={1}>
      <Column space={3} p={3}>
        {chatMessages?.map((message, i) => (
          <Box key={i}>
            {[1, 3, 5].includes(i) ? (
              <MyChatBubble message={message} />
            ) : (
              <ChatBubble
                image="https://sports.hankooki.com/news/photo/202302/6821035_1010516_262.jpg"
                message={message}
              />
            )}
          </Box>
        ))}
      </Column>
    </ScrollView>
    <Box p={3} borderTopWidth={1}>
      <Input />
    </Box>
  </Box>
);

const ChatBubble = ({image, message}) => (
  <Row w="full" space={3}>
    <Image
      alt="opponentImage"
      rounded="full"
      size="xs"
      source={{
        uri: image,
      }}
    />
    <Column>
      <Box variant="chatBubbleOpponent">
        <Text size="sm">{message}</Text>
      </Box>
    </Column>
  </Row>
);

const MyChatBubble = ({message}) => (
  <Box alignItems="flex-end">
    <Column>
      <Box variant="chatBubbleUser">
        <Text size="sm" color="white">
          {message}
        </Text>
      </Box>
    </Column>
  </Box>
);

export default {
  title: 'screen/ChatUser',
  component: Screen,
};

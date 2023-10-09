import React from 'react';
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import tw from 'twrnc';
import {
  Image,
  AspectRatio,
  Box,
  Center,
  Heading,
  HStack,
  Stack,
  Text,
} from 'native-base';
import {useGetApi} from 'hooks/axios';
import {Users} from 'types/user.type';
import axios from 'axios';
import {useQueryClient} from 'react-query';

const Swipes = () => {
  const queryClient = useQueryClient();
  const {data} = useGetApi<Users[]>('/matches');
  const swipe = (type: 'ACCEPT' | 'REJECT') => async (index: number) => {
    const opponentId = data?.[index]?.id;
    const result = await axios.post('/matches/swipe', {opponentId, type});
    if (result.data) {
      Alert.alert('매칭되었습니다^^');
      queryClient.invalidateQueries('/chats/matches');
    }
  };
  return (
    <Box flex={1}>
      <Swiper
        stackSeparation={0}
        showSecondCard={false}
        verticalSwipe={false}
        cards={data?.length ? data : []}
        renderCard={(card, i) => {
          return <Card key={i} {...card} />;
        }}
        onSwipedRight={cardIndex => {
          swipe('ACCEPT')(cardIndex);
        }}
        onSwipedLeft={cardIndex => {
          swipe('REJECT')(cardIndex);
        }}
        onSwipedAll={() => {
          console.log('onSwipedAll');
        }}
        cardIndex={0}
        backgroundColor="transparent"
        containerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        stackSize={10}
      />
    </Box>
  );
};

const Card: React.FC<Users> = ({age, name, image, description}) => (
  <Box h="90%" rounded="2xl" overflow="hidden">
    <ScrollView>
      <TouchableWithoutFeedback>
        <Box minHeight="full">
          <ImageBackground
            source={{
              uri: image,
            }}
            style={{height: 500, justifyContent: 'flex-end'}}>
            <Box
              position="absolute"
              h="full"
              w="full"
              bg="rgba(0, 0, 0, 0.2)"></Box>
            <Box bottom={10} left={10} colorScheme="indigo">
              <Text fontSize="lg" color="white">
                {name}
              </Text>
              <Text fontSize="sm" color="white">
                나이 {age}
              </Text>
            </Box>
          </ImageBackground>
          <Box my={5} px={4}>
            <Heading size="lg" mb={3}>
              {name}님의 자기소개
            </Heading>
            <Text>{description}</Text>
          </Box>
        </Box>
      </TouchableWithoutFeedback>
    </ScrollView>
  </Box>
);

const Example = () => {
  return (
    <Box alignItems="center">
      <Box
        maxW="80"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1">
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
              }}
              alt="image"
            />
          </AspectRatio>
          <Center
            bg="violet.500"
            _dark={{
              bg: 'violet.400',
            }}
            _text={{
              color: 'warmGray.50',
              fontWeight: '700',
              fontSize: 'xs',
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5">
            PHOTOS
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              The Garden City
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: 'violet.500',
              }}
              _dark={{
                color: 'violet.400',
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1">
              The Silicon Valley of India.
            </Text>
          </Stack>
          <Text fontWeight="400">
            Bengaluru (also called Bangalore) is the center of India's high-tech
            industry. The city is also known for its parks and nightlife.
          </Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}
                fontWeight="400">
                6 mins ago
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 50,
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
});

export default Swipes;

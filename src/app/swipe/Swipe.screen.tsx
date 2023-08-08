import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import tw from 'twrnc';
import {
  AspectRatio,
  Box,
  Center,
  Heading,
  HStack,
  Stack,
  Text,
} from 'native-base';

const Swipes = () => {
  // const list = useGetApi('/swipe');
  const [choices, setChoices] = React.useState([
    'DO',
    'MORE',
    'OF',
    'WHAT',
    'MAKES',
    'YOU',
    'HAPPY',
  ]);
  return (
    <Box>
      <Swiper
        containerStyle={tw`bg-black`}
        stackSeparation={0}
        showSecondCard={false}
        verticalSwipe={false}
        cards={[12, 3, 4, 5, 6, 7]}
        renderCard={card => {
          return <Card />;
        }}
        onSwiped={cardIndex => {
          console.log(cardIndex);
        }}
        onSwipedAll={() => {
          console.log('onSwipedAll');
        }}
        cardIndex={0}
        backgroundColor={'#fff'}
        stackSize={10}
      />
    </Box>
  );
};

const Card = () => (
  <Box
    style={{
      ...tw`bg-white h-70% border-2 border-solid overflow-hidden`,
      ...styles.card,
    }}>
    <ScrollView style={tw` flex flex-1 h-full`}>
      <TouchableWithoutFeedback>
        {/*<View>*/}
        {/*  <Image*/}
        {/*    style={tw`w-full h-auto h-100`}*/}
        {/*    source={{*/}
        {/*      uri: 'https://i.namu.wiki/i/jJF3CAK27xqwiZqEThUBzzHRzDBoQlMGEuwKXRxdePm9lKkPNcFckJqydCHYeCrRk66NkL3xgrP4iIKI8S5KYA.webp',*/}
        {/*    }}*/}
        {/*  />*/}
        {/*  <View style={tw`p-6`}>*/}
        {/*    <Text style={tw`font-medium text-gray-400 mb-1`}>이도현</Text>*/}
        {/*    <Text style={tw`font-medium text-gray-900 mb-3`}>나이 28</Text>*/}
        {/*    <Text style={tw`leading-relaxed mb-3`}>*/}
        {/*      같이 놀 친구 구합니다^^ 여자만^^ 남자,게이 사절 같이 놀 친구*/}
        {/*      구합니다^^ 여자만^^ 남자,게이 사절 같이 놀 친구 구합니다^^*/}
        {/*      여자만^^ 남자,게이 사절 같이 놀 친구 구합니다^^ 여자만^^ 남자,게이*/}
        {/*      사절 같이 놀 친구 구합니다^^ 여자만^^ 남자,게이 사절*/}
        {/*    </Text>*/}
        {/*    <View style={tw``}></View>*/}
        {/*  </View>*/}
        {/*</View>*/}
        <Example />
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

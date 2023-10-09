import React from 'react';
import {Keyboard} from 'react-native';
import {
  Box,
  Button,
  Center,
  Image,
  Heading,
  HStack,
  Icon,
  Input,
  Link,
  Text,
  VStack,
  Row,
} from 'native-base';
import useSign from 'hooks/useSign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

const SignInScreen = () => {
  const navigation = useNavigation();
  const {signInGoogle} = useSign();
  const signIn = () => async () => {
    const res = await signInGoogle();
    if (res) {
      // TODO hook
      //navigation.navigate('Main');
    }
  };
  return (
    <Box w="100%" h="100%" bg="pink" px={10} pt={10}>
      <Center bg="red">
        <Heading
          size="4xl"
          fontWeight="600"
          color="coolGray.800"
          py={10}
          fontFamily="Rubik Mono One">
          FOMO
        </Heading>
        <Image
          size="2xl"
          source={require('/assets/images/fine.jpeg')}
          alt="image"
        />
        <Button colorScheme="indigo" mt={5} onPress={signIn()}>
          <Row space={2}>
            <Icon name="google" size="md" color="white" as={FontAwesome5Icon} />
            <Text color="white">구글 계정으로 로그인</Text>
          </Row>
        </Button>
        <Text w="40%" fontSize="xs" mt={2}>
          소셜 로그인 시, 귀하의 이미지등 개인정보 사용에 동의하게 됩니다.
        </Text>
      </Center>
    </Box>
  );
};

export default SignInScreen;

import React from 'react';
import {Keyboard} from 'react-native';
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  VStack,
} from 'native-base';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const SignInScreen: React.FC = () => {
  const handleSignIn = (data: any) => {
    console.log(data); // Replace with your own sign-in logic
  };
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const signWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo, 'info!!');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
    try {
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}>
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs">
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <Button mt="2" colorScheme="indigo" onPress={signWithGoogle}>
            Sign in with Google
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}>
              I'm a new user.{' '}
            </Text>
            <Link
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              href="#">
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default SignInScreen;

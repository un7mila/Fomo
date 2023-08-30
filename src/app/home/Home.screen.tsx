import React from 'react';
import {
  AspectRatio,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
} from 'native-base';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
export default class HomeScreen extends React.Component {
  render() {
    return (
      <Container>
        <Box>
          <Text>FOMO</Text>
          <Button onPress={() => console.log('hello world')}>
            <Icon name="google" size="md" as={FontAwesome5Icon} /> 구글 계정으로
            로그인
          </Button>
        </Box>
      </Container>
    );
  }
}

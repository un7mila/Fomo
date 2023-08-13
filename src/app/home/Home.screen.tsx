import React from 'react';
import {
  AspectRatio,
  Box,
  Container,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from 'native-base';
export default class HomeScreen extends React.Component {
  render() {
    return (
      <Container>
        <Box
          shadow="2"
          rounded="lg"
          w={{base: '64', md: '80', lg: 'md'}}
          _light={{bg: 'coolGray.50'}}
          _dark={{bg: 'gray.700'}}>
          <AspectRatio w="100%">
            <Image
              source={{
                uri: 'https://examples.nativebase.io/images/dawki-river.png',
              }}
              alt="image base"
            />
          </AspectRatio>
          <Text bold position="absolute" color="coolGray.50" top="0" m="4">
            NEWS
          </Text>
          <Stack space="2" p="4">
            <Text color="gray.400">August 13, 2023</Text>
            <Heading size={['md', 'lg', 'md']} fontWeight="medium">
              The Garden City
            </Heading>
            <Text isTruncated>
              Bengaluru (also called Bangalore) is the center of India's
              high-tech industry. It is located in southern India on the Deccan
              Plateau.The city is also known for its parks and nightlife.
              Bangalore is the major center of India's IT industry, popularly
              known as the Silicon Valley of India.
            </Text>
          </Stack>
          <HStack space="3" px="4" pb="4">
            <Text
              _light={{color: 'emerald.800'}}
              _dark={{color: 'emerald.300'}}>
              Find out more
            </Text>
          </HStack>
        </Box>
      </Container>
    );
  }
}

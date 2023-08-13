import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Box,
  Button,
  Center,
  Checkbox,
  CheckIcon,
  Column,
  Container,
  Heading,
  Icon,
  Progress,
  Radio,
  Row,
  Select,
  Slider,
  Stack,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import Swiper from 'react-native-swiper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
const SetProfileScreen = () => {
  const navigation = useNavigation();

  const slideProps = {
    loop: false,
    showButtons: false,
  };

  return (
    <Box h="full" w="full">
      <Column p={5} space={3}>
        <Progress w="100%" colorScheme="secondary" value={45} />
        <StepButtons />
        <Row space={2} alignItems="center">
          <Icon name="search" size="md" as={FontAwesome5Icon} />
          <Heading size="md">당신의 성별은 무엇인가요?</Heading>
        </Row>
      </Column>

      <Box w="full" h="full">
        <Swiper {...slideProps}>
          <Box p={3}>
            <Type2 />
          </Box>
          <Box p={3}>
            <Type3 />
          </Box>
          <Box p={3}>
            <Type4 />
          </Box>
          <Box p={3}>
            <Type5 />
          </Box>
          <Box p={3}>
            <Type6 />
          </Box>
        </Swiper>
      </Box>
    </Box>
  );
};

const StepButtons = () => (
  <Row justifyContent="space-between">
    <Button
      leftIcon={<Icon name="arrow-left" as={FontAwesome5Icon} color="white" />}
      size="sm"
      w={100}
      rounded="3xl"
      colorScheme="secondary">
      Before
    </Button>
    <Button
      rightIcon={
        <Icon name="arrow-right" as={FontAwesome5Icon} color="white" />
      }
      size="sm"
      w={100}
      rounded="3xl"
      colorScheme="secondary">
      Next
    </Button>
  </Row>
);

const Type2 = () => (
  <Checkbox.Group onChange={() => {}} accessibilityLabel="choose numbers">
    <Checkbox value="one" my={2}>
      UX Research
    </Checkbox>
    <Checkbox value="two">Software Development</Checkbox>
  </Checkbox.Group>
);

const Type3 = () => (
  <Radio.Group
    name="myRadioGroup"
    accessibilityLabel="favorite number"
    onChange={e => {
      console.log(e);
    }}>
    <Radio value="one" my={1}>
      One
    </Radio>
    <Radio value="two" my={1}>
      Two
    </Radio>
  </Radio.Group>
);

const Type4 = () => (
  <Center>
    <Box maxW="300">
      <Select
        minWidth="200"
        accessibilityLabel="Choose Service"
        placeholder="Choose Service"
        _selectedItem={{
          bg: 'teal.600',
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}>
        <Select.Item label="UX Research" value="ux" />
        <Select.Item label="Web Development" value="web" />
        <Select.Item label="Cross Platform Development" value="cross" />
        <Select.Item label="UI Designing" value="ui" />
        <Select.Item label="Backend Development" value="backend" />
      </Select>
    </Box>
  </Center>
);

const Type5 = () => (
  <Box alignItems="center" w="100%">
    <Slider
      w="3/4"
      maxW="300"
      defaultValue={70}
      minValue={0}
      maxValue={100}
      accessibilityLabel="hello world"
      step={10}>
      <Slider.Track>
        <Slider.FilledTrack />
      </Slider.Track>
      <Slider.Thumb />
    </Slider>
  </Box>
);

const Type6 = () => (
  <Box alignItems="center" w="100%">
    <TextArea
      autoCompleteType=""
      h={20}
      placeholder="Text Area Placeholder"
      w="75%"
      maxW="300"
    />
  </Box>
);

export default SetProfileScreen;

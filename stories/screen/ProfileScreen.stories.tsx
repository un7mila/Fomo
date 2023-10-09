import React from 'react';
import {Text, Box, Button, Pressable, Image, Input} from 'native-base';

export const Screen = ({text, onPress, colorScheme, size}) => (
  <Box p={3} maxWidth={300}>
    <Box alignItems="center" mb={3}>
      <Button mb={3}>로그아웃</Button>
      <Pressable>
        <Image
          rounded="full"
          source={{
            uri: 'https://sports.hankooki.com/news/photo/202302/6821035_1010516_262.jpg',
          }}
          alt="myImage"
          width={100}
          height={100}></Image>
        <Text my={3}>프로필 사진 수정</Text>
      </Pressable>
    </Box>
    <ProfileItem label="이름" name="name" value="" />
    <ProfileItem label="자기소개" name="description" value="" />
    <ProfileItem label="생일" name="birth" value="" />
    <Button mt={3}>프로필 저장</Button>
  </Box>
);

const ProfileItem = ({label, name, value, onPress}) => (
  <Box mb={3}>
    <Text fontSize="lg" fontWeight={800} mb={2}>
      {label}
    </Text>
    <Input />
  </Box>
);

export default {
  title: 'screen/profile',
  component: Screen,
};

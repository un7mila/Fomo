import React, {PropsWithChildren} from 'react';
import {Box, Heading, Icon, IconButton, Row, Text} from 'native-base';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const Header = () => {
  return (
    <Row p={5} alignItems="center" space={3}>
      <IconButton
        rounded="3xl"
        icon={<Icon name="arrow-left" as={FontAwesome5Icon} />}
      />
      <Heading fontFamily="Rubik Mono One">HOMO</Heading>
    </Row>
  );
};

export default Header;

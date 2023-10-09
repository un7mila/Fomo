import React from 'react';
import {Text, Box, Button, NativeBaseProvider} from 'native-base';
import theme from 'assets/theme';

export const ButtonStory = ({text, onPress, colorScheme, size}) => (
  <Box>
    <Box>
      <Text variant="label">Default</Text>
      <Button variant="lg">Button</Button>
    </Box>
    <Box>
      <Text variant="label">Small</Text>
      <Button variant="sm">Button</Button>
    </Box>
    <Box>
      <Text variant="label">Default</Text>
      <Button variant="md">Button</Button>
    </Box>
    <Box>
      <Text>Default</Text>
      <Button variant="lg">Button</Button>
    </Box>
  </Box>
);

export default {
  title: 'components/Button',
  component: ButtonStory,
  argTypes: {
    onPress: {
      action: 'clicked',
      description: 'The function to call when the button is pressed',
    },
    colorScheme: {
      control: {
        type: 'inline-radio',
        options: [
          'primary',
          'secondary',
          'success',
          'danger',
          'warning',
          'info',
          'light',
          'dark',
        ],
      },
    },
    size: {
      control: {
        type: 'inline-radio',
        options: ['sm', 'md', 'lg'],
      },
    },
  },
};

export const Basic = {
  args: {
    text: 'Hello World',
    colorScheme: 'primary',
    size: 'md',
  },
};

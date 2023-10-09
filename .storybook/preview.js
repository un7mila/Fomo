import {Button, NativeBaseProvider} from 'native-base';
import theme from '../src/assets/theme';

const preview = {
  parameters: {
    actions: {argTypesRegex: '^on[A-Z].*'},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const decorators = [
  Story => (
    <NativeBaseProvider theme={theme}>
      <Story />
    </NativeBaseProvider>
  ),
];

export default preview;

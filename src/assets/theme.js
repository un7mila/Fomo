import {NativeBaseProvider, extendTheme} from 'native-base';

const theme = extendTheme({
  fontConfig: {
    Rubik: {
      100: {
        normal: 'Rubik Mono One',
      },
      200: {
        normal: 'Rubik Mono One',
      },
      300: {
        normal: 'Rubik Mono One',
      },
      400: {
        normal: 'Rubik Mono One',
      },
      500: {
        normal: 'Rubik Mono One',
      },
      600: {
        normal: 'Rubik Mono One',
      },
      // Add more variants
      //   700: {
      //     normal: 'Roboto-Bold',
      //   },
      //   800: {
      //     normal: 'Roboto-Bold',
      //     italic: 'Roboto-BoldItalic',
      //   },
      //   900: {
      //     normal: 'Roboto-Bold',
      //     italic: 'Roboto-BoldItalic',
      //   },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: 'Rubik Mono One',
    body: 'Roboto',
    mono: 'Roboto',
  },
});

export default theme;

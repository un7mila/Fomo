import {NativeBaseProvider, extendTheme} from 'native-base';

const components = {
  Text: {
    baseStyle: {
      fontFamily: 'Nunito Sans, Rubik Mono One',
      color: '#191919',
    },
    defaultProps: {
      size: 'md',
    },
    sizes: {
      xs: {
        //fontSize: '15px',
      },
      sm: {
        //fontSize: '30px',
      },
      md: {
        fontSize: '18px',
      },
      lg: {
        fontSize: '28px',
      },
      xl: {
        fontSize: '32px',
      },
      '2xl': {
        fontSize: '20px',
      },
    },
    variants: {
      title1: {
        fontSize: '40px',
        color: 'hotpink',
      },
      title2: {},
      title3: {},
      body1: {},
      body2: {},
      body3: {},
      label: {
        fontWeight: 600,
      },
    },
  },
  Button: {
    defaultProps: {
      bgColor: 'black',
      _text: {
        color: 'white',
      },
    },
    variants: {
      lg: data => ({
        rounded: 'full',
        bgColor: 'rose.400',
        _text: {
          ...components.Text.variants.title1,
        },
      }),
    },
  },
  Input: {
    defaultProps: {
      size: 'lg',
      rounded: 'md',
      borderColor: 'gray.300',
      borderWidth: '1',
    },
    baseStyle: data => ({}),
  },
  Box: {
    variants: {
      chatBubbleOpponent: {
        bgColor: 'hotpink',
        borderRightRadius: 'lg',
        borderBottomRadius: 'lg',
        bg: 'gray.200',
        p: 3,
      },
      chatBubbleUser: {
        borderLeftRadius: 'lg',
        borderBottomRadius: 'lg',
        bg: 'gray.500',
        p: 3,
      },
    },
  },
  Badge: {
    variants: {
      profile: data => ({
        padding: 3,
        height: 8,
        rounded: '2xl',
        bgColor: 'rose.200',
        fontSize: '30px',
        _text: {
          fontSize: 'md',
          fontWeight: 400,
        },
      }),
    },
  },
};

const theme = extendTheme({
  components,
  colors: {
    primary: {
      50: '#d4b8e1',
      100: '#caaad9',
      200: '#c09ecf',
      300: '#b592c5',
      400: '#ab83be',
      500: '#a47eb6',
      600: '#9d7aae',
      700: '#9675a5',
      800: '#8f719c',
      900: '#876e93',
    },
  },
  fontConfig: {
    Rubik: {
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
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: 'Rubik',
    body: 'Rubik',
    mono: 'Rubik',
  },
});

export default theme;

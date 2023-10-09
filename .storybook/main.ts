import type {StorybookConfig} from '@storybook/react-webpack5';
import * as path from 'path';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-react-native-web',
      options: {
        modulesToTranspile: [
          'react-native-reanimated',
          'react-native-vector-icons',
        ],
        babelPlugins: ['react-native-reanimated/plugin'],
      },
    },
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: config => {
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, '../'),
      path.resolve(__dirname, 'src/component'),
    ];
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
      '@storybook/react-native': '@storybook/react-webpack5',
      'normalize-css-color': '@react-native/normalize-color',
    };

    config.resolve.extensions = ['.web.js', '.tsx', '.ts', '.js'];

    return {
      ...config,
      module: {
        ...config.module,
        rules: [...config.module.rules],
      },
    };
  },
};
export default config;

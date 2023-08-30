/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {QueryClient, QueryClientProvider} from 'react-query';
import axios from 'axios';
import Navigations from './src/Navigations';
import {NativeBaseProvider} from 'native-base';
import useInitializeApp from './src/hooks/useInitializeApp';
import {NativeModules} from 'react-native';
import theme from 'assets/theme';
const queryClient = new QueryClient();

const getDevServerAddress = () => {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  const address = scriptURL.split('://')[1].split('/')[0];
  const hostname = address.split(':')[0];
  console.log(hostname, '??????????');
  return hostname;
};

axios.defaults.baseURL = `http://${getDevServerAddress()}:3000`;

//use axios as you normally would, but specify httpsAgent in the config

function App(): JSX.Element {
  useInitializeApp();
  return (
    <NativeBaseProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Navigations />
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}

export default App;

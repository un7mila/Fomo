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
const queryClient = new QueryClient();

axios.defaults.baseURL = 'http://10.0.2.2:3000';

//use axios as you normally would, but specify httpsAgent in the config

function App(): JSX.Element {
  return (
    <NativeBaseProvider>
      <QueryClientProvider client={queryClient}>
        <Navigations />
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {QueryClient, QueryClientProvider} from 'react-query';
import Navigations from './src/Navigations';
import {NativeBaseProvider} from 'native-base';
import theme from 'assets/theme';
import {NavigationContainer} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const queryClient = new QueryClient();
GoogleSignin.configure();

function App(): JSX.Element {
  return (
    <NativeBaseProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Navigations />
        </NavigationContainer>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}
export default App;

import React, {PropsWithChildren} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import tw from 'twrnc';

const Container: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <ScrollView style={tw`border-t border-t-2 border-t-solid`}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Container;

import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import tw from 'twrnc';
import FormInput from '../../components/form/FormInput';
import useSignIn from '../hooks/useSignIn';
import {FormProvider} from 'react-hook-form';
const SignIn: React.FC = () => {
  const handleSignIn = (data: any) => {
    console.log(data); // Replace with your own sign-in logic
  };
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const {submit, control, isLoading} = useSignIn(handleSignIn);
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={tw`flex-1 justify-center items-center`}>
        {isLoading && <ActivityIndicator size="small" color="red" />}
        <Text style={tw`text-3xl mb-6 font-bold`}>Sign In</Text>
        <FormProvider {...control}>
          <View style={tw`w-4/5`}>
            <FormInput
              name="email"
              placeholder="Email"
              rules={{required: 'Email is required'}}
              editable={!isLoading}
            />
            <FormInput
              secureTextEntry
              name="password"
              placeholder="Password"
              rules={{required: 'password is required'}}
              editable={!isLoading}
            />
            <TouchableOpacity
              style={tw`bg-blue-500 py-3 rounded-lg`}
              onPress={submit}
              disabled={isLoading}>
              <Text style={tw`text-white text-center font-bold`}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </FormProvider>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;

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
import useSignUp from '../hooks/useSIgnUp';
import {FormProvider} from 'react-hook-form';
import FormInput from '../../components/form/FormInput';
const SignUp: React.FC = () => {
  const onSuccessSignUp = (data: any) => {
    console.log(data, ' 성공이당'); // Replace with your own sign-in logic
  };
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const {submit, control, isLoading} = useSignUp(onSuccessSignUp);
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={tw`flex-1 justify-center items-center`}>
        {isLoading && <ActivityIndicator size="small" color="red" />}
        <Text style={tw`text-3xl mb-6 font-bold`}>Sign Up</Text>
        <View style={tw`w-4/5`}>
          <FormProvider {...control}>
            <FormInput
              name="name"
              placeholder="Name"
              rules={{required: 'Name is required'}}
              editable={!isLoading}
            />
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
              <Text style={tw`text-white text-center font-bold`}>Sign Up</Text>
            </TouchableOpacity>
          </FormProvider>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;

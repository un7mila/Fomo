import React from 'react';
import {TextInput, Text, View, TextInputProps} from 'react-native';
import {useFormContext, Controller, FieldError} from 'react-hook-form';
import tw from 'twrnc';

type FormInputProps = {
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
  rules?: any;
} & TextInputProps;

const FormInput: React.FC<FormInputProps> = ({
  name,
  placeholder,
  secureTextEntry = false,
  rules,
  ...rest
}) => {
  const {
    control,
    formState: {errors},
    register,
  } = useFormContext();

  return (
    <View>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={tw`border-2 rounded-lg mb-4 p-3`}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            ref={register(name).ref}
            {...rest}
          />
        )}
        name={name}
        rules={rules}
        defaultValue=""
      />
      {errors[name] && (
        <Text style={tw`text-red-500 mb-2`}>
          {(errors[name] as FieldError).message}
        </Text>
      )}
    </View>
  );
};

export default FormInput;

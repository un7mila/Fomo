import axios from 'axios';
import React from 'react';
import {useForm, FormProvider, UseFormReturn} from 'react-hook-form';
import {useMutation} from 'react-query';
import useAuthStore from '../store/useAuthStore';

type SignInFormData = {
  email: string;
  password: string;
};

type SignInHookResult = {
  submit: () => void;
  isLoading: boolean;
  control: UseFormReturn<SignInFormData, any, undefined>;
};

const useSignIn = (
  onSignIn: (data: SignInFormData) => void,
): SignInHookResult => {
  const setTokens = useAuthStore(state => state.setTokens);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const signInMutation = useMutation(data => {
    console.log(axios.defaults.baseURL);
    try {
      return axios
        .post('/api/auth/signin', data)
        .catch(e => console.log(e, '씨이리바라'));
    } catch (e) {
      console.log(e);
    }
  });
  const control = useForm<SignInFormData>();
  const {
    handleSubmit,
    setFocus,
    formState: {errors},
  } = control;

  const handleSignIn = async (data: SignInFormData) => {
    setIsLoading(true);
    const res = await signInMutation.mutateAsync();
    console.log(res.data, 'res!!!');
    setTokens(res.data);
    //전역 isAuthorized, tokens 업데이트
    setIsLoading(false);
    onSignIn(data);
  };

  const onError = () => {
    const firstError = Object.keys(errors).reduce((field, a) => {
      return !!errors[field] ? field : a;
    }, null) as keyof SignInFormData;
    if (firstError) {
      setFocus(firstError);
    }
  };

  const submit = () => {
    if (errors) {
      onError();
    }
    handleSubmit(handleSignIn)();
  };

  return {
    submit,
    control,
    isLoading,
  };
};

export default useSignIn;

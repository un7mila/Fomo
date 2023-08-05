import {UseFormReturn, useForm} from 'react-hook-form';
import {useMutation} from 'react-query';

type SignUpFormData = {
  email: string;
  password: string;
};

type SignUpHookResult = {
  submit: () => void;
  isLoading: boolean;
  control: UseFormReturn<SignUpFormData, any>;
};

const useSignUp = (
  onSuccess: (data: SignUpFormData) => void,
): SignUpHookResult => {
  const control = useForm<SignUpFormData>();
  //const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {handleSubmit} = control;
  const signUpMutation = useMutation((formData: SignUpFormData) =>
    fetch('https://api.example.com/signup', {
      method: 'POST',
      body: JSON.stringify(formData),
    }),
  );

  const submit = handleSubmit(async formData => {
    try {
      const response = await signUpMutation.mutateAsync(formData);
    } catch (error) {}
    onSuccess(formData);
  });

  const onError = () => {
    // const firstError = Object.keys(errors).reduce((field, a) => {
    //   return !!errors[field] ? field : a;
    // }, null) as keyof SignUpFormData;
    // if (firstError) {
    //   setFocus(firstError);
    // }
  };

  return {
    submit,
    isLoading: signUpMutation.isLoading,
    control,
  };
};

export default useSignUp;

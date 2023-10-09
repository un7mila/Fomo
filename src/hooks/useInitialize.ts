import {useEffect, useState} from 'react';
import useStorage from 'hooks/useStorage';
import {useUserStore} from 'store/user.store';
import {getApi} from 'hooks/axios';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const useInitialize = () => {
  const {getValue} = useStorage();
  const {signInWithToken, isSignIn} = useUserStore();
  const {navigate} = useNavigation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    (async () => {
      // initialize 로직들 async로 실행 한 뒤 끝나면 initialized true

      // sign in
      await initializeSignIn();

      initializeAxiosInterceptor();

      setInitialized(true);
    })();
  }, []);

  const initializeSignIn = async () => {
    const token = await getValue('token');
    if (token) {
      // TODO token 유효한지 서버 확인
      return getApi('/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        return signInWithToken(token);
      });
    }
  };

  const initializeAxiosInterceptor = () => {
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          // Navigate to the sign-in screen when a 401 error is received
          navigate('SignIn');
        }
        return Promise.reject(error);
      },
    );
  };
  return {initialized, isSignIn};
};

export default useInitialize;

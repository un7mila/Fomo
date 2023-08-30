import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Users} from 'types/user.type';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useUserStore} from 'store/user.store';
import {Alert} from 'react-native';
import useStoreChange from 'hooks/useStoreChange';

const useSign = () => {
  const navigation = useNavigation();
  const {waitValue} = useStoreChange(useUserStore);
  const setToken = useUserStore(state => state.setToken);

  return {
    signInGoogle: async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        const res = await axios.post<Users>(
          '/users/google',
          {
            email: userInfo?.user?.email,
          },
          {timeout: 5000},
        );
        switch (res.status) {
          case 200: {
            //1. 유저 정보 잇음 - userId로 user profile요청 한뒤 home으로 리다이렉트
            navigation.navigate('Home');
            const token = res.data.accessToken;
            setToken(token);
            const profile = await axios.get<Users>('/users/profile');
            useUserStore.setState({profile: profile.data});
            return true;
          }
          case 204: {
            //2. 유저 정보 없음 - 회원가입 모달 띄움
            Alert.alert('회원가입 할꺼임');
            const res = await axios.post<Users>('/users/google/new', {
              email: userInfo?.user?.email,
              name: userInfo?.user?.name,
            });
            return true;
          }
          default: {
            return false;
          }
        }
      } catch (error) {
        googleSignErrorHandle(error);
      }
    },
  };
};

const googleSignErrorHandle = (error: any) => {
  if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    // user cancelled the login flow
  } else if (error.code === statusCodes.IN_PROGRESS) {
    // operation (e.g. sign in) is in progress already
  } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    // play services not available or outdated
  } else {
    // some other error happened
  }
};

export default useSign;

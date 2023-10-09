import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Users} from 'types/user.type';
import {useUserStore} from 'store/user.store';
import {Alert} from 'react-native';
import {postApi} from 'hooks/axios';
import {Tokens} from 'types/user';

const useSign = () => {
  const {signInWithToken, ...res} = useUserStore();
  return {
    async isAuthorized() {
      const authorized = res.token && res.profile;
      return authorized;
    },
    async signInGoogle() {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        const googleEmail = userInfo?.user?.email;
        const googleName = userInfo?.user?.name;
        const {token, statusCode} = await postApi<Tokens>(
          '/users/signin/google',
          {
            email: googleEmail,
          },
          {timeout: 3000},
        );
        switch (statusCode) {
          case 200: {
            //1. 유저 정보 있음
            return signInWithToken(token);
          }
          case 204: {
            //2. 유저 정보 없음 - 회원가입 모달 띄움
            Alert.alert('회원가입 합니다.');
            const {token} = await postApi<Users>('/users/google/new', {
              email: googleEmail,
              name: googleName,
            });
            return signInWithToken(token);
          }
          default: {
            return false;
          }
        }
      } catch (error) {
        console.log(error, 'sign in error');
        googleSignErrorHandle(error);
        return false;
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

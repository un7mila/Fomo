import {create} from 'zustand';
import axios from 'axios';
import {Users} from 'types/user.type';
import {getApi} from 'hooks/axios';
import useStorage from 'hooks/useStorage';

interface UserStore {
  token: string | undefined;
  profile: Users | undefined;
  setToken: (string: string) => void;
  getProfileFromApi: () => void;
  signInWithToken: (token: string) => Promise<boolean>;
  signOutWithToken: () => void;
  isSignIn: boolean;
}

export const useUserStore = create<UserStore>((set, get) => {
  const {setValue} = useStorage();
  return {
    token: '',
    profile: undefined,
    isSignIn: false,
    setToken: (token: string) => {
      axios.interceptors.request.clear();
      setValue('token', token);
      updateHeader(token);
      set({token});
    },
    getProfileFromApi: async () => {
      const profile = await getApi<Users>('/users/profile');
      set({profile});
      return true;
    },
    signInWithToken: async (token: string) => {
      get().setToken(token);
      get().getProfileFromApi();
      set({isSignIn: true});
      return true;
    },
    signOutWithToken: async () => {
      axios.interceptors.request.clear();
      set({profile: undefined, token: undefined});
      setValue('token', '');
      set({isSignIn: false});
      return;
    },
  };
});

const updateHeader = (token: string) => {
  axios.interceptors.request.use(
    config => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      } else {
        delete config.headers['test'];
      }
      return config;
    },
    error => Promise.reject(error),
  );
};

import {create} from 'zustand';
import axios from 'axios';

// Create a store using Zustand
export const useUserStore = create(set => ({
  token: '',
  profile: null,
  setToken: (token: string) => {
    set({token});
    updateHeader(token);
  },
}));

const updateHeader = (token: string) => {
  axios.interceptors.request.use(
    config => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      } else {
        delete config.headers['Authorization'];
      }
      return config;
    },
    error => Promise.reject(error),
  );
};

import create from 'zustand';

// Create a store using Zustand
export const useUserStore = create(set => ({
  token: '',
  setToken: (token: string) => set(state => ({token})),
  getToken: () => set(state => ({count: state.count - 1})),
}));

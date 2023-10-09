import AsyncStorage from '@react-native-async-storage/async-storage';

const useStorage = () => {
  return {
    getValue(key: string): Promise<string | null> {
      return AsyncStorage.getItem(key);
    },
    async setValue(key: string, value: string) {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (e) {
        // saving error
      }
    },
  };
};

export default useStorage;

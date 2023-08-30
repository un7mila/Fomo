import {StoreApi, UseBoundStore} from 'zustand';

const useStoreChange = (store: UseBoundStore<StoreApi<unknown>>) => {
  return {
    waitValue(func: (value: any) => boolean) {
      return new Promise(resolve => {
        const unsubscribe = store.subscribe(currentValue => {
          if (func(currentValue)) {
            resolve(currentValue);
            unsubscribe(); // Unsubscribe to stop listening once the desired value is reached
          }
        });
      });
    },
  };
};

export default useStoreChange;

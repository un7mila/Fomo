import axios, {AxiosRequestConfig} from 'axios';
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from 'react-query';

interface useApiOptions {
  key?: string;
  callback?: (data: any) => any;
  params?: {[key: string]: any};
}

// interface useApiInterface<T> {
//   (url: string, options: useApiOptions): UseQueryResult<T>;
// }

// function useGetApi<T = unknown>(
//   url: string,
//   options: useApiOptions,
// ): UseQueryResult<T>;

export const useGetApi = <T>(
  url: string,
  options?: useApiOptions,
): UseQueryResult<T, unknown> => {
  const {key, callback, params} = options ?? {};
  const res = useQuery<T>(key ?? url, async () => {
    const data = await axios.get<{data: T}>(url, {params}).catch(e => {
      console.log(e);
    });
    if (callback) {
      callback(data?.data);
    }
    return data?.data as T;
  });
  return res;
};

export const usePostApi = <Result, Parameter extends AxiosRequestConfig>(
  url: string,
  options?: useApiOptions,
): UseMutationResult<Result, unknown, Parameter, unknown> => {
  const {key, params} = options ?? {};
  const mutation = useMutation<Result, unknown, Parameter>(requestData =>
    axios.post(key ?? url, requestData, {params}),
  );
  return mutation;
};

export const usePatchApi = <Result, Parameter extends AxiosRequestConfig>(
  url: string,
  options?: useApiOptions,
): UseMutationResult<Result, unknown, Parameter, unknown> => {
  const {key, params} = options ?? {};
  const mutation = useMutation<Result, unknown, Parameter>(requestData =>
    axios.patch(key ?? url, requestData, {params}),
  );
  return mutation;
};

export const useDeleteApi = <Result, Parameter extends AxiosRequestConfig>(
  url: string,
  options?: useApiOptions,
): UseMutationResult<Result, unknown, Parameter, unknown> => {
  const {key} = options ?? {};
  const mutation = useMutation<Result, unknown, Parameter>(requestData =>
    axios.delete(key ?? url, requestData),
  );
  return mutation;
};

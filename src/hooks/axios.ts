import axios, {AxiosRequestConfig} from 'axios';
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from 'react-query';
import {NativeModules} from 'react-native';

interface useApiOptions {
  key?: string;
  callback?: (data: any) => any;
  params?: {[key: string]: any};
  enabled?: boolean;
}

const getDevServerAddress = () => {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  const address = scriptURL.split('://')[1].split('/')[0];
  const hostname = address.split(':')[0];
  return hostname;
};

axios.defaults.baseURL = `http://${getDevServerAddress()}:3000`;

export const useGetApi = <T>(
  url: string,
  options?: useApiOptions | any,
): UseQueryResult<T, unknown> => {
  const {key, callback, params, ...axiosOptions} = options ?? {};
  const res = useQuery<T>(
    key ?? url,
    async () => {
      const data = await axios.get<{data: T}>(url, {params}).catch(e => {
        console.log(e);
      });
      if (callback) {
        callback(data?.data);
      }
      return data?.data as T;
    },
    axiosOptions,
  );
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

export const postApi = <Result>(
  url: string,
  body: any,
  config?: AxiosRequestConfig,
): ApiResult<Result> =>
  axios
    .post<Result>(url, body, config)
    .then(r => ({...r.data, statusCode: r.status}));

export type ApiResult<Result> = Promise<
  Result & {
    statusCode: number;
  }
>;

export const getApi = <Result>(
  url: string,
  config?: AxiosRequestConfig,
): ApiResult<Result> => {
  return axios
    .get<Result>(url, config)
    .then(r => ({...r.data, statusCode: r.status}));
};

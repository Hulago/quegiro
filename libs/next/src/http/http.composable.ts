import { reactive, toRefs, unref } from '@vue/composition-api';
import Axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';

import { useAuth } from '../auth/auth.composable';
import { useHTTPFilter } from './http-filter.composable';
// types
import { RequestParamsParser } from './http-filter.type';
import {
  ErrorHandler,
  HTTPResponse,
  HTTPState,
  RequestMiddleware,
  ResponseDataMiddlewares
} from './http.type';

const { refresh } = useAuth();

const { filterParser } = useHTTPFilter();

const DEFAULT_TIMEOUT = 20000; // 20 seconds

export const authMiddleware: RequestMiddleware = async (config) => {
  const token = await refresh();

  const { headers = {} } = config || {};

  config = {
    ...config,
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  };

  return config;
};

export const responseMiddleware: ResponseDataMiddlewares = (req, res) => {
  const { data, headers, status } = res || {};
  const { 'x-total-count': count = null } = headers || {};
  res.data = { count: Number(count), data, status };
};

export const legacyMiddleware: ResponseDataMiddlewares = (req, res) => {
  const { headers = null } = res || {};
  const { 'x-total-count': count = null } = headers || {};
  res.data._count = count;
};

let instance: AxiosInstance = null;
let defaultRequestMiddlewares: Array<RequestMiddleware> = [authMiddleware];
let defaultResponseMiddlewares: Array<ResponseDataMiddlewares> = [
  responseMiddleware
];
let defaultParamsParser: RequestParamsParser = filterParser;
let defaultErrorHandlers: ErrorHandler = null;

let installed = false;

export const useHTTP = <T, R = HTTPResponse<T>>(
  url: string,
  options?: {
    requestMiddlewares?: Array<RequestMiddleware>;
    responseMiddlewares?: Array<ResponseDataMiddlewares>;
    paramsParser?: RequestParamsParser;
    errorHandlers?: ErrorHandler;
  }
) => {
  /**
   * state
   */
  const state = reactive<HTTPState<R>>({
    errors: null,
    isFetching: false,
    response: null,
    results: null
  });

  const requestMiddlewares = options?.requestMiddlewares
    ? options?.requestMiddlewares
    : defaultRequestMiddlewares;

  const responseMiddlewares = options?.responseMiddlewares
    ? options?.responseMiddlewares
    : defaultResponseMiddlewares;

  const paramsParser = options?.paramsParser
    ? options?.paramsParser
    : defaultParamsParser;

  const errorHandlers = options?.errorHandlers
    ? options?.errorHandlers
    : defaultErrorHandlers;

  /**
   * Reset state
   */
  const resetState = () => {
    state.errors = null;
    (state.isFetching = false), (state.response = null);
    state.results = null;
  };

  /**
   * fetch a request
   * @param method
   * @param params
   * @param axiosRequestOptions
   */
  const fetch = async (
    method: Method = 'GET',
    params,
    axiosRequestOptions: AxiosRequestConfig = {}
  ) => {
    try {
      resetState();

      let request: AxiosRequestConfig = {
        method,
        params,
        paramsSerializer: paramsParser,
        url: unref(url),
        ...axiosRequestOptions
      };

      for (let i = 0; i < requestMiddlewares.length; i++) {
        try {
          request = await requestMiddlewares[i](request);
        } catch (e) {
          console.error('Error executing request middleware', { e });
        }
      }

      const res = await instance.request(request);

      responseMiddlewares.forEach((middleware) => {
        middleware(request, res);
      });

      state.results = res.data;
      state.response = res;

      return state.results as R;
    } catch (e) {
      state.errors = errorHandlers ? errorHandlers(e) : e;

      throw e;
    } finally {
      state.isFetching = false;
    }
  };

  /**
   * Add request interceptor
   *
   * @param interceptor - {
   * (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>
   * }
   */
  const addRequestInterceptor = (
    interceptor: (
      config: AxiosRequestConfig
    ) => AxiosRequestConfig | Promise<AxiosRequestConfig>
  ) => {
    if (process.env.NODE_ENV !== 'test') {
      instance.interceptors.request.use(interceptor.bind(this), (error) =>
        Promise.reject(error)
      );
    }
  };

  /**
   * get request
   * @param params
   * @param options
   * @returns
   */
  const get = (params, options: AxiosRequestConfig = {}) =>
    fetch('GET', params, options);

  /**
   * post request
   * @param payload
   * @param params
   * @param options
   * @returns
   */
  const post = (payload, params, options: AxiosRequestConfig = {}) =>
    fetch('POST', params, { ...options, data: payload });

  /**
   * put request
   * @param payload
   * @param params
   * @param options
   * @returns
   */
  const put = (payload, params, options: AxiosRequestConfig = {}) =>
    fetch('PUT', params, { ...options, data: payload });

  /**
   * delete request
   * @param payload
   * @param params
   * @param options
   * @returns
   */
  const deleteRequest = (payload, params, options: AxiosRequestConfig = {}) =>
    fetch('DELETE', params, { ...options, data: { data: payload } });

  return {
    ...toRefs(state),
    addRequestInterceptor,
    deleteRequest,
    fetch,
    get,
    post,
    put
  };
};

export default {
  install(
    Vue,
    {
      axiosConfig,
      baseURL,
      config
    }: {
      baseURL: string;
      config?: {
        requestMiddlewares: Array<RequestMiddleware>;
        responseMiddlewares: Array<ResponseDataMiddlewares>;
        paramsParser: RequestParamsParser;
        errorHandlers: ErrorHandler;
      };
      axiosConfig?: AxiosRequestConfig;
    }
  ) {
    if (!installed) {
      installed = true;

      instance = Axios.create({
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: DEFAULT_TIMEOUT
      });

      instance.defaults = {
        ...instance.defaults,
        baseURL,
        ...axiosConfig
      };

      defaultRequestMiddlewares = config?.requestMiddlewares
        ? config.requestMiddlewares
        : defaultRequestMiddlewares;

      defaultResponseMiddlewares = config?.responseMiddlewares
        ? config.responseMiddlewares
        : defaultResponseMiddlewares;

      defaultParamsParser = config?.paramsParser
        ? config.paramsParser
        : defaultParamsParser;

      defaultErrorHandlers = config?.errorHandlers
        ? config.errorHandlers
        : defaultErrorHandlers;
    }
  }
};

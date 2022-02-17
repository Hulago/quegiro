import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface HTTPState<T> {
  results: T | null;
  errors: any;
  isFetching: boolean;
  response: AxiosResponse;
}

export type RequestMiddleware = (
  config: AxiosRequestConfig
) => Promise<AxiosRequestConfig>;

export type ResponseDataMiddlewares = (
  req: AxiosRequestConfig,
  res: AxiosResponse
) => any;

export interface HTTPResponse<T> {
  data: T;
  count: number;
  status: number;
}

export type ErrorHandler = (error: AxiosError) => PromiseRejectedResult | null;

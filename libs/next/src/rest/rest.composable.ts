import { AxiosRequestConfig } from 'axios';
import { isArray } from 'lodash-es';

import { RequestParamsParser } from '../http/http-filter.type';
import { useHTTP } from '../http/http.composable';
// types
import {
  ErrorHandler,
  RequestMiddleware,
  ResponseDataMiddlewares
} from '../http/http.type';

export type ClassConstructorType<T> = new (...args: unknown[]) => T;

export const useREST = <T>(
  url: string,
  model: ClassConstructorType<T>,
  options: {
    requestMiddlewares?: Array<RequestMiddleware>;
    responseMiddlewares?: Array<ResponseDataMiddlewares>;
    paramsParser?: RequestParamsParser;
    errorHandlers?: ErrorHandler;
  } = {}
) => {
  const responseRESTMiddleware: ResponseDataMiddlewares = (req, res) => {
    const { data, headers, status } = res || {};
    const { 'x-total-count': count = null } = headers || {};

    res.data = {
      count: Number(count),
      data: isArray(data)
        ? data.map((item: T) => new model(item))
        : new model(data),
      status
    };
  };

  const { responseMiddlewares = [] } = options || {};

  const httpById = useHTTP<T>(url, {
    ...options,
    responseMiddlewares: [responseRESTMiddleware].concat(responseMiddlewares)
  });

  const httpAll = useHTTP<T[]>(url, {
    ...options,
    responseMiddlewares: [responseRESTMiddleware].concat(responseMiddlewares)
  });

  const getById = (id: number | string, options: AxiosRequestConfig = {}) =>
    httpById.get(null, { url: `${url}/${id}`, ...options });

  const removeById = (
    id: number | string,
    payload: any,
    options: AxiosRequestConfig = {}
  ) =>
    httpById.deleteRequest(payload, null, { url: `${url}/${id}`, ...options });

  const updateById = (
    id: number | string,
    payload: any,
    options: AxiosRequestConfig = {}
  ) => httpById.put(payload, null, { url: `${url}/${id}`, ...options });

  return {
    ...httpAll,
    getById,
    removeById,
    updateById
  };
};

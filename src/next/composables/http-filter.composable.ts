import { isArray, isObject } from 'lodash-es';

import type {
  Filter,
  FilterValue,
  QueryFilter,
  RequestParamsParser
} from '../types/http-filter.type';

export const useHTTPFilter = () => {
  const filterParser: RequestParamsParser = (params: QueryFilter) =>
    Object.entries(params || {})
      .map(([key, param]) => {
        if (isObject(param as Filter)) {
          return `${param.key}[${param.op ? param.op : 'eq'}]=${
            isArray(param.from) ? param.from.join(',') : param.from
          }`;
        } else {
          return `${key}[eq]=${
            isArray(param as FilterValue) ? param.join(',') : param
          }`;
        }
      })
      .join('&');

  const legacyFilterParser: RequestParamsParser = (params: QueryFilter) =>
    Object.entries((params as QueryFilter) || {})
      .map(([key, param]) => {
        if (isObject(param as Filter)) {
          return `${param?.key}${param?.op ? '_' + param.op : ''}=${
            isArray(param?.from) ? param?.from.join(',') : param?.from
          }`;
        } else {
          return `${key}=${
            isArray(param as FilterValue)
              ? (param as Array<any>).join(',')
              : param
          }`;
        }
      })
      .join('&');

  return {
    filterParser,
    legacyFilterParser
  };
};

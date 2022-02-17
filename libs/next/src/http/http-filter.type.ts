export type FilterOperators =
  | 'like'
  | 'nlike'
  | 'eq'
  | 'ne'
  | 'starts'
  | 'ends'
  | 'lt'
  | 'lte'
  | 'gt'
  | 'gte'
  | 'in'
  | 'nin'
  | 'inRange';

export type FilterValue =
  | string
  | number
  | boolean
  | Array<any>
  | null
  | undefined;

export type Filter = {
  key: string;
  op?: FilterOperators;
  from: FilterValue;
  to?: FilterValue;
};

export type QueryFilter =
  | Record<string, Filter>
  | Record<string, FilterValue>
  | null;

export type RequestParamsParser = (params: QueryFilter) => string;

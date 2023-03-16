import {
  PCurrencyRenderer,
  PDateRenderer,
  PNumberRenderer,
  PStringRenderer,
  useAgFilters,
  useI18n
} from '@/next';

import { deburr, get } from 'lodash-es';

import type { ColDef } from 'ag-grid-community';

import { useLabels } from '../labels/labels.composable';

export function useAccountColumns() {
  const { labels } = useLabels();

  const currencyColumn = ({
    sortable = true,
    field = 'unknown',
    currency = 'EUR',
    headerName = '',
    locale = 'de-DE',
    minimumFractionDigits = 2,
    ...options
  } = {}) =>
    ({
      field,
      cellRenderer: PCurrencyRenderer({
        field,
        currency,
        monoFont: true,
        fontSize: 10,
        locale,
        minimumFractionDigits
      }),
      getQuickFilterText(params: any) {
        return deburr(get(params.data, field));
      },
      headerName,
      headerTooltip: headerName,
      sortable,
      ...((options as ColDef) || {})
    } as ColDef);

  const numberColumn = ({
    sortable = true,
    field = 'unknown',
    formated = false,
    headerName = '',
    minimumFractionDigits = 2,
    ...options
  } = {}) =>
    ({
      field,
      cellRenderer: PNumberRenderer({
        field,
        formated,
        monoFont: true,
        fontSize: 10,
        minimumFractionDigits
      }),
      getQuickFilterText(params: any) {
        return deburr(get(params.data, field));
      },
      headerName,
      headerTooltip: headerName,
      sortable,
      ...((options as ColDef) || {})
    } as ColDef);

  const stringColumn = ({
    sortable = true,
    field = 'unknown',
    headerName = '',
    lines = 2,
    ...options
  }: any = {}) =>
    ({
      field,
      cellRenderer: PStringRenderer({ field, lines }),
      getQuickFilterText(params: any) {
        return deburr(get(params.data, field));
      },
      headerName,
      headerTooltip: headerName,
      sortable,
      ...((options as ColDef) || {})
    } as ColDef);

  const dateColumn = ({
    maxWidth = 150,
    sortable = true,
    field = 'unknown',
    headerName = '',
    dateFormat = 'DD MMM YYYY HH:mm',
    ...options
  }: any = {}) =>
    ({
      maxWidth,
      field,
      cellRenderer: PDateRenderer({ field, dateFormat }),
      getQuickFilterText(params: any) {
        return deburr(get(params.data, field));
      },
      headerName,
      headerTooltip: headerName,
      sortable,
      ...(options || {})
    } as ColDef);

  const descriptionColumn = ({
    sortable = true,
    field = 'description',
    headerName = labels.descripton,
    ...options
  }: any = {}) =>
    stringColumn({
      sortable,
      field,
      headerName,
      ...(options || {})
    });

  const orderIdColumn = ({
    sortable = true,
    field = 'orderId',
    headerName = labels.orderId,
    ...options
  }: any = {}) =>
    stringColumn({
      sortable,
      field,
      headerName,
      ...(options || {})
    });

  const isinColumn = ({
    sortable = true,
    field = 'isin',
    headerName = labels.isin,
    headerTooltip = labels.isinTooltip,
    ...options
  }: any = {}) =>
    stringColumn({
      sortable,
      field,
      headerName,
      headerTooltip,
      ...(options || {})
    });

  const productColumn = ({
    sortable = true,
    field = 'product',
    headerName = labels.product,
    ...options
  }: any = {}) =>
    numberColumn({
      sortable,
      field,
      headerName,
      minimumFractionDigits: 3,
      ...(options || {})
    });

  const accountDateColumn = ({
    sortable = true,
    field = 'date',
    headerName = labels.date,
    ...options
  }: any = {}) =>
    dateColumn({
      sortable,
      field,
      headerName,
      ...(options || {})
    });

  const valueColumn = ({
    sortable = true,
    field = 'value',
    currency = 'currencyValue',
    headerName = labels.value,
    ...options
  }: any = {}) =>
    currencyColumn({
      field,
      currency,
      headerName
    });

  const balanceColumn = ({
    sortable = true,
    field = 'balance',
    currency = 'currencyBalance',
    headerName = labels.balance,
    ...options
  }: any = {}) =>
    currencyColumn({
      field,
      currency,
      headerName
    });

  const exchangeRateColumn = ({
    sortable = true,
    field = 'exchangeRate',
    headerName = labels.exchangeRate,
    ...options
  }: any = {}) =>
    numberColumn({
      sortable,
      field,
      headerName,
      minimumFractionDigits: 3,
      ...(options || {})
    });

  return {
    accountDateColumn,
    productColumn,
    descriptionColumn,
    valueColumn,
    exchangeRateColumn,
    balanceColumn,
    isinColumn,
    orderIdColumn
  };
}

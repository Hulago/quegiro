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

export function useTransactionColumns() {
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

  const nameColumn = ({
    sortable = true,
    field = 'name',
    headerName = 'Name',
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
    headerName = 'Order Id',
    ...options
  }: any = {}) =>
    stringColumn({
      sortable,
      field,
      headerName,
      ...(options || {})
    });

  const exchangeColumn = ({
    sortable = true,
    field = 'exchange',
    headerName = 'Exchange',
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
    headerName = 'ISIN',
    ...options
  }: any = {}) =>
    stringColumn({
      sortable,
      field,
      headerName,
      ...(options || {})
    });

  const stateColumn = ({
    sortable = true,
    field = 'qty',
    editable = false,
    headerName = 'State',
    ...options
  } = {}) =>
    ({
      field,
      cellRenderer: 'TransactionStateRender', // isBuy, isSell, Qty, Remain
      maxWidth: 240,
      getQuickFilterText(params: any) {
        return deburr(get(params.data, field));
      },
      headerName,
      headerTooltip: headerName,
      sortable,
      ...((options as ColDef) || {})
    } as ColDef);

  const remainColumn = ({
    sortable = true,
    field = 'remain',
    headerName = 'Remain',
    ...options
  }: any = {}) =>
    numberColumn({
      sortable,
      field,
      headerName,
      ...(options || {})
    });

  const exchangeRateColumn = ({
    sortable = true,
    field = 'exchangeRate',
    headerName = 'Exchange Rate',
    ...options
  }: any = {}) =>
    numberColumn({
      sortable,
      field,
      headerName,
      minimumFractionDigits: 3,
      ...(options || {})
    });

  const quantityColumn = ({
    sortable = true,
    field = 'qty',
    headerName = 'Quantity',
    ...options
  }: any = {}) =>
    numberColumn({
      sortable,
      field,
      headerName,
      ...(options || {})
    });

  const transactionDateColumn = ({
    sortable = true,
    field = 'transactionDate',
    headerName = 'Date',
    ...options
  }: any = {}) =>
    dateColumn({
      sortable,
      field,
      headerName,
      ...(options || {})
    });

  const localTotalTransactionPriceColumn = ({
    sortable = true,
    field = 'localTotalTransactionPrice',
    currency = 'localTotalTransactionCurrency',
    headerName = 'Local Total Transaction Price',
    ...options
  }: any = {}) =>
    currencyColumn({
      field,
      currency,
      headerName
    });

  const localTransactionPriceColumn = ({
    sortable = true,
    field = 'localTransactionPrice',
    currency = 'localTransactionCurrency',
    headerName = 'Local Transaction Price',
    ...options
  }: any = {}) =>
    currencyColumn({
      field,
      currency,
      headerName
    });

  const transactionPriceColumn = ({
    sortable = true,
    field = 'transactionPrice',
    currency = 'transactionCurrency',
    headerName = 'Transaction Price',
    ...options
  }: any = {}) =>
    currencyColumn({
      field,
      currency,
      headerName
    });

  const transactionCostColumn = ({
    sortable = true,
    field = 'transactionCost',
    currency = 'transactionCostCurrency',
    headerName = 'Transaction Cost',
    ...options
  }: any = {}) =>
    currencyColumn({
      field,
      currency,
      headerName
    });

  return {
    nameColumn,
    transactionDateColumn,
    exchangeColumn,
    quantityColumn,
    transactionPriceColumn,
    transactionCostColumn,
    orderIdColumn,
    remainColumn,
    stateColumn,
    localTotalTransactionPriceColumn,
    localTransactionPriceColumn,
    exchangeRateColumn
  };
}

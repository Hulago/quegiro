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

export function useSalesColumns() {
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

  const buyOrderIdColumn = ({
    sortable = true,
    field = 'buyOrderId',
    headerName = 'Buy order Id',
    ...options
  }: any = {}) =>
    stringColumn({
      sortable,
      field,
      headerName,
      ...(options || {})
    });

  const sellOrderIdColumn = ({
    sortable = true,
    field = 'sellOrderId',
    headerName = 'Sell order Id',
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

  const buyDateColumn = ({
    sortable = true,
    field = 'buyDate',
    headerName = 'Buy date',
    ...options
  }: any = {}) =>
    dateColumn({
      sortable,
      field,
      headerName,
      ...(options || {})
    });

  const sellDateColumn = ({
    sortable = true,
    field = 'sellDate',
    headerName = 'Sell date',
    ...options
  }: any = {}) =>
    dateColumn({
      sortable,
      field,
      headerName,
      ...(options || {})
    });

  const sellPriceColumn = ({
    sortable = true,
    field = 'sellPrice',
    currency = 'currency',
    headerName = 'Sell price',
    ...options
  }: any = {}) =>
    currencyColumn({
      field,
      currency,
      headerName
    });

  const sellTotalPriceColumn = ({
    sortable = true,
    field = 'totalSellPrice',
    currency = 'currency',
    headerName = 'Sell total price',
    ...options
  }: any = {}) =>
    currencyColumn({
      field,
      currency,
      headerName
    });

  const buyPriceColumn = ({
    sortable = true,
    field = 'buyPrice',
    currency = 'currency',
    headerName = 'Buy price',
    ...options
  }: any = {}) =>
    currencyColumn({
      field,
      currency,
      headerName
    });

  const buyTotalPriceColumn = ({
    sortable = true,
    field = 'totalBuyPrice',
    currency = 'currency',
    headerName = 'Buy total price',
    ...options
  }: any = {}) =>
    currencyColumn({
      field,
      currency,
      headerName
    });

  const costColumn = ({
    sortable = true,
    field = 'cost',
    currency = 'currency',
    headerName = 'Cost',
    ...options
  }: any = {}) =>
    currencyColumn({
      field,
      currency,
      headerName
    });

  const deltaColumn = ({
    sortable = true,
    field = 'delta',
    editable = false,
    headerName = 'Delta',
    ...options
  } = {}) =>
    ({
      field,
      cellRenderer: 'SalesDeltaRender', // isBuy, isSell, Qty, Remain
      maxWidth: 240,
      getQuickFilterText(params: any) {
        return deburr(get(params.data, field));
      },
      headerName,
      headerTooltip: headerName,
      sortable,
      ...((options as ColDef) || {})
    } as ColDef);

  return {
    nameColumn,
    deltaColumn,
    buyDateColumn,
    sellDateColumn,
    buyOrderIdColumn,
    buyTotalPriceColumn,
    sellOrderIdColumn,
    costColumn,
    exchangeColumn,
    quantityColumn,
    buyPriceColumn,
    sellPriceColumn,
    sellTotalPriceColumn,
    isinColumn
  };
}

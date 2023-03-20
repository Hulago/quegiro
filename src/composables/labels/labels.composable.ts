import { useI18n } from '@/next';

export function useLabels(data: any = {}) {
  const { t } = useI18n();

  const labels = {
    account: t('APP.LABEL.ACCOUNT'),
    accountAndBalance: t('APP.LABEL.ACCOUNT_AND_BALANCE'),
    startDate: t('APP.LABEL.START_DATE'),
    endDate: t('APP.LABEL.END_DATE'),
    search: t('APP.LABEL.SEARCH'),
    date: t('APP.LABEL.DATE'),
    product: t('APP.LABEL.PRODUCT'),
    descripton: t('APP.LABEL.DESCRIPTION'),
    isin: t('APP.LABEL.ISIN'),
    isinTooltip: t('APP.LABEL.ISIN_TOOLTIP'),
    orderId: t('APP.LABEL.ORDER_ID'),
    value: t('APP.LABEL.VALUE'),
    exchangeRate: t('APP.LABEL.EXCHANGE_RATE'),
    balance: t('APP.LABEL.BALANCE'),
    dashboard: t('APP.LABEL.DASHBOARD'),
    buysAndSales: t('APP.LABEL.BUYS_AND_SALES'),
    portfolio: t('APP.LABEL.PORTFOLIO'),
    buysAndSalesPerYear: t('APP.LABEL.BUYS_AND_SALES_PER_YEAR'),
    gainsAndLossesPerMonth: t('APP.LABEL.GAINS_AND_LOSSES_PER_MONTH'),
    gainsAndLossesPerYear: t('APP.LABEL.GAINS_AND_LOSSES_PER_YEAR'),
    dividendPerYear: t('APP.LABEL.DIVIDEND_PER_YEAR'),
    buys: t('APP.LABEL.BUYS'),
    sells: t('APP.LABEL.SELLS'),
    sales: t('APP.LABEL.SALES'),
    gains: t('APP.LABEL.GAINS'),
    losses: t('APP.LABEL.LOSSES'),
    dividend: t('APP.LABEL.DIVIDEND'),
    dividends: t('APP.LABEL.DIVIDENDS'),
    loading: t('APP.LABEL.LOADING'),

    importData: t('APP.LABEL.IMPORT_DATA'),
    clearAllData: t('APP.LABEL.CLEAR_ALL_DATA'),
    transactions: t('APP.LABEL.TRANSACTIONS'),
    selectTransactionFile: t('APP.LABEL.SELECT_TRANSACTION_FILE'),
    loadTransactions: t('APP.LABEL.LOAD_TRANSACTIONS'),
    uploadTransactionCSVFile: t('APP.LABEL.UPLOAD_TRANSACTION_CSV_FILE'),
    note: t('APP.LABEL.NOTE'),
    selectAccountFile: t('APP.LABEL.SELECT_ACCOUNT_FILE'),
    loadAccount: t('APP.LABEL.LOAD_ACCOUNT'),
    uploadAccountCSVFile: t('APP.LABEL.UPLOAD_ACCOUNT_CSV_FILE'),
    toBeginGoTo: t('APP.LABEL.TO_BEGIN_GOTO'),
    section: t('APP.LABEL.SECTION'),
    application: t('APP.LABEL.APPLICATION'),
    accountOverview: t('APP.LABEL.ACCOUNT_OVERVIEW'),
    inDegiroApplication: t('APP.LABEL.IN_DEGIRO_APPLICATION', {
      format: 'plain'
    }),
    welcome: t('APP.LABEL.WELCOME'),

    setupTable: t('APP.LABEL.SETUP_TABLE'),
    fullData: t('APP.LABEL.FULL_DATA'),
    aggregatedData: t('APP.LABEL.AGGREGATED_DATA'),
    aggregatedDataTooltip: t('APP.LABEL.AGGREGATED_DATA_TOOLTIP'),
    noSales: t('APP.LABEL.NO_SALES'),
    noSalesDescription: t('APP.LABEL.NO_SALES_DESCRIPTION'),
    buyOrderId: t('APP.LABEL.BUY_ORDER_ID'),
    sellOrderId: t('APP.LABEL.SELL_ORDER_ID'),
    stockExchange: t('APP.LABEL.STOCK_EXCHANGE'),
    quantity: t('APP.LABEL.QUANTITY'),
    buyDate: t('APP.LABEL.BUY_DATE'),
    sellDate: t('APP.LABEL.SELL_DATE'),
    buyPrice: t('APP.LABEL.BUY_PRICE'),
    sellPrice: t('APP.LABEL.SELL_PRICE'),
    sellTotalPrice: t('APP.LABEL.SELL_TOTAL_PRICE'),
    buyTotalPrice: t('APP.LABEL.BUY_TOTAL_PRICE'),
    cost: t('APP.LABEL.COST'),

    saleDetail: t('APP.LABEL.SALE_DETAIL'),
    transactionDetail: t('APP.LABEL.TRANSACTION_DETAIL'),
    transactionCost: t('APP.LABEL.TRANSACTION_COST'),
    accountMovementsDetail: t('APP.LABEL.ACCOUNT_MOVEMENTS_DETAIL'),
    state: t('APP.LABEL.STATE'),
    remain: t('APP.LABEL.REMAIN'),
    localPrice: t('APP.LABEL.LOCAL_PRICE'),
    totalPrice: t('APP.LABEL.TOTAL_PRICE'),
    stockExchangeFrom: t('APP.LABEL.STOCK_EXCHANGE_FROM'),

    noTransactions: t('APP.LABEL.NO_TRANSACTIONS'),
    noTransactionsDescription: t('APP.LABEL.NO_TRANSACTIONS_DESCRIPTION'),
    totalLocalPrice: t('APP.LABEL.TOTAL_LOCAL_PRICE'),
    transactionPrice: t('APP.LABEL.TRANSACTION_PRICE'),
    contact: t('APP.LABEL.CONTACT', { format: 'plain' }),

    action: {
      back: t('APP.ACTION.BACK'),
      cancel: t('APP.ACTION.CANCEL'),
      clear: t('APP.ACTION.CLEAR'),
      close: t('APP.ACTION.CLOSE'),
      confirm: t('APP.ACTION.CONFIRM'),
      delete: t('APP.ACTION.DELETE'),
      edit: t('APP.ACTION.EDIT'),
      getRowData: t('APP.ACTION.GET_ROW_DATA'),
      loading: t('APP.ACTION.LOADING'),
      open: t('APP.ACTION.OPEN'),
      refresh: t('APP.ACTION.REFRESH'),
      save: t('APP.ACTION.SAVE'),
      search: t('APP.ACTION.SEARCH'),
      tableSetup: t('APP.ACTION.TABLE_SETUP'),
      view: t('APP.ACTION.VIEW')
    },

    error: {
      videoSizeExceeded: t('APP.ERROR.VIDEO_SIZE_EXCEEDED', data)
    },

    mainError: {
      fetchData: t('APP.ERROR.FETCH_DATA'),
      invalidForm: t('APP.ERROR.INVALID_FORM'),
      saveData: t('APP.ERROR.SAVE_DATA')
    },

    sentence: {
      data1: t('APP.SENTENCE.DATA1'),
      data2: t('APP.SENTENCE.DATA2'),
      data3: t('APP.SENTENCE.DATA3'),
      data4: t('APP.SENTENCE.DATA4'),
      data5: t('APP.SENTENCE.DATA5'),
      data6: t('APP.SENTENCE.DATA6'),
      data7: t('APP.SENTENCE.DATA7'),
      data8: t('APP.SENTENCE.DATA8'),
      data9: t('APP.SENTENCE.DATA9'),

      home1: t('APP.SENTENCE.HOME1'),
      home2: t('APP.SENTENCE.HOME2'),
      home3: t('APP.SENTENCE.HOME3'),
      home4: t('APP.SENTENCE.HOME4'),
      home5: t('APP.SENTENCE.HOME5'),
      home6: t('APP.SENTENCE.HOME6'),
      home7: t('APP.SENTENCE.HOME7'),
      home8: t('APP.SENTENCE.HOME8'),
      home9: t('APP.SENTENCE.HOME9'),

      clearAllData: t('APP.SENTENCE.CLEAR_ALL_DATA')
    },

    success: {
      accountInformationLoaded: t('APP.SUCCESS.ACCOUNT_INFORMATION_LOADED'),
      transactionInformationLoaded: t(
        'APP.SUCCESS.TRANSACTION_INFORMATION_LOADED'
      )
    }
  };

  return {
    labels
  };
}

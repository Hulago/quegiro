import { useI18n } from '@/next';

export function useLabels(data: any = {}) {
  const { t } = useI18n();

  const labels = {
    account: t('APP.LABEL.ACCOUNT'),
    accountAndBalance: t('APP.LABEL.ACCOUNT_AND_BALANCE'),
    accountMovementsDetail: t('APP.LABEL.ACCOUNT_MOVEMENTS_DETAIL'),
    accountOverview: t('APP.LABEL.ACCOUNT_OVERVIEW'),
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
    aggregatedData: t('APP.LABEL.AGGREGATED_DATA'),
    aggregatedDataTooltip: t('APP.LABEL.AGGREGATED_DATA_TOOLTIP'),
    application: t('APP.LABEL.APPLICATION'),
    balance: t('APP.LABEL.BALANCE'),
    buy: t('APP.LABEL.BUY'),
    buyDate: t('APP.LABEL.BUY_DATE'),
    buyOrderId: t('APP.LABEL.BUY_ORDER_ID'),
    buyPrice: t('APP.LABEL.BUY_PRICE'),
    buys: t('APP.LABEL.BUYS'),
    buysAndSales: t('APP.LABEL.BUYS_AND_SALES'),
    buysAndSalesPerYear: t('APP.LABEL.BUYS_AND_SALES_PER_YEAR'),
    buyTotalPrice: t('APP.LABEL.BUY_TOTAL_PRICE'),
    clearAllData: t('APP.LABEL.CLEAR_ALL_DATA'),
    close: t('APP.LABEL.CLOSE'),
    contact: t('APP.LABEL.CONTACT', {
      format: 'plain'
    }),
    cost: t('APP.LABEL.COST'),
    dashboard: t('APP.LABEL.DASHBOARD'),
    date: t('APP.LABEL.DATE'),
    descripton: t('APP.LABEL.DESCRIPTION'),
    dividend: t('APP.LABEL.DIVIDEND'),
    dividendPerYear: t('APP.LABEL.DIVIDEND_PER_YEAR'),
    dividends: t('APP.LABEL.DIVIDENDS'),
    endDate: t('APP.LABEL.END_DATE'),
    error: {
      videoSizeExceeded: t('APP.ERROR.VIDEO_SIZE_EXCEEDED', data)
    },
    exchangeRate: t('APP.LABEL.EXCHANGE_RATE'),
    fullData: t('APP.LABEL.FULL_DATA'),
    gains: t('APP.LABEL.GAINS'),
    gainsAndLossesPerMonth: t('APP.LABEL.GAINS_AND_LOSSES_PER_MONTH'),
    gainsAndLossesPerYear: t('APP.LABEL.GAINS_AND_LOSSES_PER_YEAR'),
    importData: t('APP.LABEL.IMPORT_DATA'),
    inDegiroApplication: t('APP.LABEL.IN_DEGIRO_APPLICATION', {
      format: 'plain'
    }),
    isin: t('APP.LABEL.ISIN'),
    isinTooltip: t('APP.LABEL.ISIN_TOOLTIP'),
    loadAccount: t('APP.LABEL.LOAD_ACCOUNT'),
    loading: t('APP.LABEL.LOADING'),
    loadTransactions: t('APP.LABEL.LOAD_TRANSACTIONS'),
    localPrice: t('APP.LABEL.LOCAL_PRICE'),
    losses: t('APP.LABEL.LOSSES'),
    mainError: {
      fetchData: t('APP.ERROR.FETCH_DATA'),
      invalidForm: t('APP.ERROR.INVALID_FORM'),
      saveData: t('APP.ERROR.SAVE_DATA')
    },
    noSales: t('APP.LABEL.NO_SALES'),
    noSalesDescription: t('APP.LABEL.NO_SALES_DESCRIPTION'),
    note: t('APP.LABEL.NOTE'),
    noTransactions: t('APP.LABEL.NO_TRANSACTIONS'),
    noTransactionsDescription: t('APP.LABEL.NO_TRANSACTIONS_DESCRIPTION'),
    open: t('APP.LABEL.OPEN'),
    orderId: t('APP.LABEL.ORDER_ID'),
    portfolio: t('APP.LABEL.PORTFOLIO'),
    product: t('APP.LABEL.PRODUCT'),
    quantity: t('APP.LABEL.QUANTITY'),
    remain: t('APP.LABEL.REMAIN'),
    sale: t('APP.LABEL.SALE'),
    saleDetail: t('APP.LABEL.SALE_DETAIL'),
    sales: t('APP.LABEL.SALES'),
    search: t('APP.LABEL.SEARCH'),
    section: t('APP.LABEL.SECTION'),
    selectAccountFile: t('APP.LABEL.SELECT_ACCOUNT_FILE'),
    selectTransactionFile: t('APP.LABEL.SELECT_TRANSACTION_FILE'),
    sellDate: t('APP.LABEL.SELL_DATE'),
    sellOrderId: t('APP.LABEL.SELL_ORDER_ID'),
    sellPrice: t('APP.LABEL.SELL_PRICE'),
    sells: t('APP.LABEL.SELLS'),
    sellTotalPrice: t('APP.LABEL.SELL_TOTAL_PRICE'),
    sentence: {
      clearAllData: t('APP.SENTENCE.CLEAR_ALL_DATA'),
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
      home9: t('APP.SENTENCE.HOME9')
    },
    setupTable: t('APP.LABEL.SETUP_TABLE'),
    startDate: t('APP.LABEL.START_DATE'),
    state: t('APP.LABEL.STATE'),
    stockExchange: t('APP.LABEL.STOCK_EXCHANGE'),
    stockExchangeFrom: t('APP.LABEL.STOCK_EXCHANGE_FROM'),
    success: {
      accountInformationLoaded: t('APP.SUCCESS.ACCOUNT_INFORMATION_LOADED'),
      transactionInformationLoaded: t(
        'APP.SUCCESS.TRANSACTION_INFORMATION_LOADED'
      )
    },
    toBeginGoTo: t('APP.LABEL.TO_BEGIN_GOTO'),
    totalLocalPrice: t('APP.LABEL.TOTAL_LOCAL_PRICE'),
    totalPrice: t('APP.LABEL.TOTAL_PRICE'),
    transactionCost: t('APP.LABEL.TRANSACTION_COST'),
    transactionDetail: t('APP.LABEL.TRANSACTION_DETAIL'),
    transactionPrice: t('APP.LABEL.TRANSACTION_PRICE'),
    transactions: t('APP.LABEL.TRANSACTIONS'),
    uploadAccountCSVFile: t('APP.LABEL.UPLOAD_ACCOUNT_CSV_FILE'),
    uploadTransactionCSVFile: t('APP.LABEL.UPLOAD_TRANSACTION_CSV_FILE'),
    value: t('APP.LABEL.VALUE'),
    welcome: t('APP.LABEL.WELCOME')
  };

  return {
    labels
  };
}

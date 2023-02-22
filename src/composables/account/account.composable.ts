import { orderBy, uniq, uniqBy, groupBy } from 'lodash-es';
import { format, parse } from 'date-fns';
import { useStorage } from '@/next';
import { computed, ref, unref } from 'vue';

import { AccountModel } from './account.model';
import { number } from 'echarts';

const MONTH_FORMAT = 'MM-yyyy';
const DAY_FORMAT = 'dd-MM-yyyy';
const FULL_DAY_FORMAT = 'dd-MM-yyyy HH:mm';

const account = ref<AccountModel[]>([]);

export function useAccount() {
  const { getItem, setItem } = useStorage('QUEGIRO');

  function parseDate(date: string, dateFormat: string) {
    try {
      return parse(date, dateFormat, new Date());
    } catch (e) {
      return null;
    }
  }

  async function loadAccount() {
    try {
      const res = await getItem('account');

      console.log(res);

      account.value = res ? res : [];
    } catch (e) {
      console.error('Erro loading account from localstorage');
      console.error(e);
    }
  }

  async function saveAccount() {
    try {
      await setItem('account', unref(account));

      // if(account.value.length === 0) {
      //   debugger;
      // }
    } catch (e) {
      console.error('Erro saving account to localstorage');
      console.error(e);
    }
  }

  async function resetAccount() {
    account.value = [];
    await saveAccount();
  }

  function getAccountDays() {
    const dates = orderBy(account.value.map(item => item.date));

    return uniq(dates);
  }

  function getAccountMonths() {
    const months = orderBy(account.value, ['dateValue']).map(item => {
      const date = parse(item.date, DAY_FORMAT, new Date());

      return format(date, MONTH_FORMAT);
    });

    return uniq(months);
  }

  function getAccountYears() {
    const years = orderBy(account.value, ['date']).map(item => {
      // const date = parse(item.date, DAY_FORMAT, new Date());
      return format(new Date(item.date), 'Qo yyyy');
    });

    return uniq(years);
  }

  function getDividendsYears() {
    const years = orderBy(
      account.value.filter(item => item.description.match(/dividend/i)),
      ['dateValue']
    ).map(item => {
      console.log(item.date);
      return format(new Date(item.date), 'Qo yyyy');
    });

    return uniq(years);
  }

  function getDividendsPerYear() {
    const dividendData = groupBy(
      unref(account).filter(item => item.description.match(/dividend/i)),
      item => format(new Date(item.date), 'Qo yyyy')
    );

    console.log('Dividend data', dividendData, account.value);

    const res = Object.keys(dividendData).map(year =>
      Math.round(
        dividendData[year].reduce((prev, next) => (prev += next.value), 0)
      )
    );

    console.log('RES', res);

    return res;
  }

  function addAccount(item: AccountModel) {
    account.value.push(item);
  }

  function processAccountCVS(content: string) {
    const lines = content.split('\n');

    const regex = /(\"[^\"]*\d+)\,(\d+[^\"]*\")/g;

    const subst = `$1.$2`;

    lines
      .filter((line, index) => index !== 0)
      .map(line => line.replace(regex, subst).replace(/"/g, ''))
      .forEach(line => {
        // console.log(line);

        const [
          date,
          time,
          dateValue,
          product,
          isin,
          description,
          exchangeRate,
          currencyValue,
          value,
          currencyBalance,
          balance,
          orderId
        ] = line.split(',');

        if (date && date !== '') {
          console.log(
            new AccountModel({
              date: parseDate(
                `${date} ${time}`,
                FULL_DAY_FORMAT
              )?.toISOString(),
              dateValue,
              product,
              isin,
              description,
              exchangeRate: Number(exchangeRate),
              currencyValue,
              value: Number(value),
              currencyBalance,
              balance: Number(balance),
              orderId
            })
          );

          addAccount(
            new AccountModel({
              date: parseDate(
                `${date} ${time}`,
                FULL_DAY_FORMAT
              )?.toISOString(),
              dateValue,
              product,
              isin,
              description,
              exchangeRate: Number(exchangeRate),
              currencyValue,
              value: Number(value),
              currencyBalance,
              balance: Number(balance),
              orderId
            })
          );
        }
      });
  }

  function processAccount() {
    account.value = orderBy(
      uniqBy(
        account.value.filter(item => item.date && item.date !== ''),
        (account: AccountModel) =>
          account.orderId +
          account.date +
          account.description +
          account.dateValue
      ),
      ['date'],
      ['desc']
    );

    console.log('After process account', unref(account));
  }

  return {
    account,
    loadAccount,
    processAccountCVS,
    processAccount,
    resetAccount,
    saveAccount,
    getDividendsYears,
    getDividendsPerYear
  };
}

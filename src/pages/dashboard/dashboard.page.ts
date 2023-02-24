import {
  useLineChart,
  useTransactions,
  useBarChart,
  useSales,
  useData,
  useAccount
} from '@/composables';

import { defineComponent, onMounted, ref } from 'vue';

import { useRouter } from 'vue-router';

import { PToolbar } from '@/next';

import { useHead } from '@vueuse/head';

import { max, min } from 'lodash-es';

export default defineComponent({
  name: 'Dashboard',
  components: {
    PToolbar
  },

  setup() {
    useHead({
      title: 'Dashboard',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'google-site-verification',
          content: 'PBkQrOSqcjgQtk1Ee-wlNSRK3VcQb3KewbsXawGmWh8'
        },
        {
          name: 'description',
          content:
            'Introducing our new tax calculation application for stock transactions. Our user-friendly platform makes it easy to import your transaction data in the form of a CSV file. Our system will automatically process the information and calculate all of the necessary tax entries for you to declare to the tax authorities.'
        }
      ]
    });

    const { back } = useRouter();

    const isLoading = ref(false);

    const buysVsSalesChart = useLineChart();
    const totalPorfolioChart = useLineChart();
    const buysVsSalesYearChart = useBarChart();

    const dividendChart = useBarChart();

    const gainsVsLossesMonthChart = useBarChart();
    const gainsVsLossesYearChart = useBarChart();

    const { loadTransactions } = useTransactions();
    const { loadSales } = useSales();

    const { loadAccount, getDividendsYears, getDividendsPerYear } =
      useAccount();

    const {
      getTransactionMonths,
      getBuysPerMonth,
      getSalesPerMonth,
      getTransactionYears,
      getBuysPerYear,
      getSalesPerYear,
      getGainsPerMonth,
      getLossesPerMonth,
      getGainsPerYear,
      getLossesPerYear,
      getMonthsOnSales,
      getYearsOnSales
    } = useData();

    const buysVsSalesChartRef = ref(null);
    const buysVsSalesChartYearRef = ref(null);
    const totalPorfolioChartRef = ref(null);

    const dividendChartRef = ref(null);

    const gainsVsLossesMonthChartRef = ref(null);
    const gainsVsLossesYearChartRef = ref(null);

    onMounted(async () => {
      isLoading.value = true;
      await loadTransactions();
      await loadSales();
      await loadAccount();

      initBuysVsSalesChart();
      initTotalPorfolioChart();
      initBuysVsSalesYearChart();

      initDividendChart();

      initGainsVsLossesMonthChart();

      initGainsVsLossesYearChart();

      isLoading.value = false;
    });

    function initBuysVsSalesChart() {
      buysVsSalesChart.options.yAxis.type = 'value';
      buysVsSalesChart.initChart(
        buysVsSalesChartRef.value as any,
        'Sales & Buys'
      );

      buysVsSalesChart.setXValues(getTransactionMonths());

      buysVsSalesChart.addSeries('Buys', getBuysPerMonth());

      buysVsSalesChart.addSeries('Sells', getSalesPerMonth());

      buysVsSalesChart.setMaxY(
        max([...getBuysPerMonth(), ...(getSalesPerMonth() as any)])
      );

      buysVsSalesChart.refreshChart();
    }

    function initBuysVsSalesYearChart() {
      buysVsSalesYearChart.options.yAxis.type = 'value';
      buysVsSalesYearChart.initChart(
        buysVsSalesChartYearRef.value as any,
        'Sales & Buys / Year'
      );

      buysVsSalesYearChart.setXValues(getTransactionYears());

      buysVsSalesYearChart.addSeries('Buys', getBuysPerYear());

      buysVsSalesYearChart.addSeries('Sells', getSalesPerYear());

      buysVsSalesYearChart.setMaxY(
        max([...getBuysPerYear(), ...(getSalesPerYear() as any)])
      );

      buysVsSalesYearChart.refreshChart();
    }

    function initDividendChart() {
      dividendChart.options.yAxis.type = 'value';
      dividendChart.initChart(dividendChartRef.value as any, 'Dividend / Year');

      dividendChart.setXValues(getDividendsYears());

      dividendChart.addSeries('Dividend', getDividendsPerYear());

      dividendChart.setMaxY(max([...getDividendsPerYear()]));

      dividendChart.refreshChart();
    }

    function initTotalPorfolioChart() {
      totalPorfolioChart.options.yAxis.type = 'value';
      totalPorfolioChart.initChart(
        totalPorfolioChartRef.value as any,
        'Portfolio'
      );

      totalPorfolioChart.setXValues(getTransactionMonths());

      totalPorfolioChart.addSeries('Buys', getBuysPerMonth(), {
        areaStyle: {},
        stack: 'total'
      });

      let totalBuy = 0;
      const buys = getBuysPerMonth().map(item => {
        totalBuy += item;
        return totalBuy;
      });

      let totalSales = 0;
      const sales = getSalesPerMonth().map(item => {
        totalSales += item;
        return totalSales;
      });

      const portfolio = buys.map(
        (item, index) => Math.round((item - sales[index]) * 100) / 100
      );

      totalPorfolioChart.addSeries('Portfolio', portfolio);

      totalPorfolioChart.addSeries(
        'Sales',
        getSalesPerMonth().map(item => item * -1),
        { areaStyle: {}, stack: 'total' }
      );

      totalPorfolioChart.setMaxY(
        max([...(getBuysPerMonth() as any), ...portfolio])
      );

      totalPorfolioChart.setMinY(
        min([...(getSalesPerMonth().map(item => item * -1) as any)])
      );

      totalPorfolioChart.refreshChart();
    }

    function initGainsVsLossesMonthChart() {
      gainsVsLossesMonthChart.options.yAxis.type = 'value';
      gainsVsLossesMonthChart.initChart(
        gainsVsLossesMonthChartRef.value as any,
        'Gains vs Losses / Month'
      );

      gainsVsLossesMonthChart.setXValues(getMonthsOnSales());

      const gains = getGainsPerMonth();

      gainsVsLossesMonthChart.addSeries('Gains', gains);

      const losses = getLossesPerMonth();

      gainsVsLossesMonthChart.addSeries('Losses', losses);

      gainsVsLossesMonthChart.setMaxY(max([...gains, ...(losses as any)]));

      gainsVsLossesMonthChart.refreshChart();
    }

    function initGainsVsLossesYearChart() {
      gainsVsLossesYearChart.options.yAxis.type = 'value';
      gainsVsLossesYearChart.initChart(
        gainsVsLossesYearChartRef.value as any,
        'Gains vs Losses / Years'
      );

      gainsVsLossesYearChart.setXValues(getYearsOnSales());

      const gains = getGainsPerYear();

      gainsVsLossesYearChart.addSeries('Gains', gains);

      const losses = getLossesPerYear();

      gainsVsLossesYearChart.addSeries('Losses', losses);

      gainsVsLossesYearChart.setMaxY(max([...gains, ...(losses as any)]));

      gainsVsLossesYearChart.refreshChart();
    }

    const handleBack = () => {
      back();
    };

    return {
      isLoading,
      handleBack,
      buysVsSalesChartRef,
      totalPorfolioChartRef,
      buysVsSalesChartYearRef,
      gainsVsLossesMonthChartRef,
      gainsVsLossesYearChartRef,
      dividendChartRef
    };
  }
});

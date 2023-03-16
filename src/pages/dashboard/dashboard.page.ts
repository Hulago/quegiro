import {
  useLineChart,
  useTransactions,
  useBarChart,
  useSales,
  useData,
  useAccount
} from '@/composables';

import { useLabels } from '@/composables/labels/labels.composable';

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
            'Dashboard onde pode ver em gráficos as principais métricas das suas transações.'
        },
        {
          property: 'og:site_name',
          content: 'Quegiro'
        },
        {
          property: 'og:url',
          content: 'https://quegiro.netlify.app/dashboard'
        }
      ]
    });

    const { labels } = useLabels();

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
        labels.buysAndSales
      );

      buysVsSalesChart.setXValues(getTransactionMonths());

      buysVsSalesChart.addSeries(labels.buys, getBuysPerMonth());

      buysVsSalesChart.addSeries(labels.sells, getSalesPerMonth());

      buysVsSalesChart.setMaxY(
        max([...getBuysPerMonth(), ...(getSalesPerMonth() as any)])
      );

      buysVsSalesChart.refreshChart();
    }

    function initBuysVsSalesYearChart() {
      buysVsSalesYearChart.options.yAxis.type = 'value';
      buysVsSalesYearChart.initChart(
        buysVsSalesChartYearRef.value as any,
        labels.buysAndSalesPerYear
      );

      buysVsSalesYearChart.setXValues(getTransactionYears());

      buysVsSalesYearChart.addSeries(labels.buys, getBuysPerYear());

      buysVsSalesYearChart.addSeries(labels.sells, getSalesPerYear());

      buysVsSalesYearChart.setMaxY(
        max([...getBuysPerYear(), ...(getSalesPerYear() as any)])
      );

      buysVsSalesYearChart.refreshChart();
    }

    function initDividendChart() {
      dividendChart.options.yAxis.type = 'value';
      dividendChart.initChart(
        dividendChartRef.value as any,
        labels.dividendPerYear
      );

      dividendChart.setXValues(getDividendsYears());

      dividendChart.addSeries(labels.dividend, getDividendsPerYear());

      dividendChart.setMaxY(max([...getDividendsPerYear()]));

      dividendChart.refreshChart();
    }

    function initTotalPorfolioChart() {
      totalPorfolioChart.options.yAxis.type = 'value';
      totalPorfolioChart.initChart(
        totalPorfolioChartRef.value as any,
        labels.portfolio
      );

      totalPorfolioChart.setXValues(getTransactionMonths());

      totalPorfolioChart.addSeries(labels.buys, getBuysPerMonth(), {
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

      totalPorfolioChart.addSeries(labels.portfolio, portfolio);

      totalPorfolioChart.addSeries(
        labels.sales,
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
        labels.gainsAndLossesPerYear
      );

      gainsVsLossesMonthChart.setXValues(getMonthsOnSales());

      const gains = getGainsPerMonth();

      gainsVsLossesMonthChart.addSeries(labels.gains, gains);

      const losses = getLossesPerMonth();

      gainsVsLossesMonthChart.addSeries(labels.losses, losses);

      gainsVsLossesMonthChart.setMaxY(max([...gains, ...(losses as any)]));

      gainsVsLossesMonthChart.refreshChart();
    }

    function initGainsVsLossesYearChart() {
      gainsVsLossesYearChart.options.yAxis.type = 'value';
      gainsVsLossesYearChart.initChart(
        gainsVsLossesYearChartRef.value as any,
        labels.gainsAndLossesPerYear
      );

      gainsVsLossesYearChart.setXValues(getYearsOnSales());

      const gains = getGainsPerYear();

      gainsVsLossesYearChart.addSeries(labels.gains, gains);

      const losses = getLossesPerYear();

      gainsVsLossesYearChart.addSeries(labels.losses, losses);

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
      dividendChartRef,
      labels
    };
  }
});

import { defineComponent, onMounted, ref } from '@vue/composition-api';
import { useLineChart, useTransactions, useBarChart } from '@/common';

import { max, min } from 'lodash-es';

export default defineComponent({
  name: 'Home',
  metaInfo: {
    title: 'Dashboard'
  },
  setup() {
    const buysVsSalesChart = useLineChart();
    const totalPorfolioChart = useLineChart();
    const buysVsSalesYearChart = useBarChart();

    const gainsVsLossesMonthChart = useBarChart();
    const gainsVsLossesYearChart = useBarChart();

    const {
      load,
      processSales,
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
    } = useTransactions();

    const buysVsSalesChartRef = ref(null);
    const buysVsSalesChartYearRef = ref(null);
    const totalPorfolioChartRef = ref(null);

    const gainsVsLossesMonthChartRef = ref(null);

    const gainsVsLossesYearChartRef = ref(null);

    onMounted(async () => {
      await load();

      initBuysVsSalesChart();
      initTotalPorfolioChart();
      initBuysVsSalesYearChart();

      initGainsVsLossesMonthChart();

      initGainsVsLossesYearChart();
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

    return {
      buysVsSalesChartRef,
      totalPorfolioChartRef,
      buysVsSalesChartYearRef,
      gainsVsLossesMonthChartRef,
      gainsVsLossesYearChartRef
    };
  }
});

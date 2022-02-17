import {
  BarChart,
  // The series types are defined with the SeriesOption suffix
  BarSeriesOption,
  LineChart,
  LineSeriesOption
} from 'echarts/charts';
import {
  // Dataset
  DatasetComponent,
  DatasetComponentOption,
  GridComponent,
  GridComponentOption,
  TitleComponent,
  // The component types are defined with the suffix ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  // Built-in transform (filter, sort)
  TransformComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

// Combine an Option type with only required components and charts via ComposeOption
type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

// Register the required components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

const option: ECOption = {
  // ...
};

export function useLineChart() {
  const xAxis: any = {
    boundaryGap: false,
    data: [],
    type: 'category'
  };

  const options: ECOption = {
    grid: {
      bottom: '3%',
      containLabel: true,
      left: '3%',
      right: '4%'
    },
    legend: {
      data: []
    },
    series: [],
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis,
    yAxis: {
      type: 'log'
    }
  };

  let chart: any;

  const initChart = (
    canvas: HTMLDivElement | HTMLCanvasElement,
    title: string
  ) => {
    options.title.text = title;
    chart = echarts.init(canvas);
    chart.setOption(options);
  };

  const setXValues = (data: Array<any>) => {
    xAxis.data = data;
  };

  const setMinY = (value: number) => {
    options.yAxis.min = value;
  };

  const setMaxY = (value: number) => {
    options.yAxis.max = value;
  };

  const addXValues = (xValue: any) => {
    xAxis.data.push(xValue);
  };

  const addSeries = (name: string) => {
    options.legend.data.push(name);
    options.series.push({
      data: [],
      name,
      smooth: true,
      type: 'line'
    });
  };

  const addValueToSeries = (name: string, value: any) => {
    const serie = options.series.find((serie: any) => serie.name === name);
    serie.data.push(value);
  };

  const clearData = () => {
    xAxis.data = [];
    options.series.forEach((element: any) => {
      element.data = [];
    });
  };

  const refreshChart = () => {
    chart.setOption(options);
  };

  return {
    addSeries,
    addValueToSeries,
    addXValues,
    chart,
    clearData,
    initChart,
    options,
    refreshChart,
    setMaxY,
    setMinY,
    setXValues
  };
}

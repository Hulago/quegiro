import {
  // Dataset
  DatasetComponent,
  // DatasetComponentOption,
  GridComponent,
  GridComponentOption,
  TitleComponent,
  LegendComponent,
  // The component types are defined with the suffix ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  // Built-in transform (filter, sort)
  TransformComponent
} from 'echarts/components';
import {
  BarChart,
  // The series types are defined with the SeriesOption suffix
  BarSeriesOption
} from 'echarts/charts';
import {
  LegendComponentOption,
  XAXisComponentOption,
  YAXisComponentOption
} from 'echarts';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import * as echarts from 'echarts/core';

// Combine an Option type with only required components and charts via ComposeOption
type ChartOptions = {
  title: TitleComponentOption;
  series: BarSeriesOption[];
  tooltip: TooltipComponentOption;
  grid: GridComponentOption;
  legend: LegendComponentOption;
  xAxis: XAXisComponentOption;
  yAxis: YAXisComponentOption;
};
// | BarSeriesOption
// | LineSeriesOption
// | TitleComponentOption
// | TooltipComponentOption
// | GridComponentOption
// | DatasetComponentOption;

// Register the required components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  LegendComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

export function useBarChart() {
  const xAxis: XAXisComponentOption = {
    data: [],
    type: 'category'
  };

  const options: ChartOptions = {
    grid: {
      bottom: '3%',
      containLabel: true,
      left: '3%',
      right: '4%'
    },
    legend: {
      orient: 'vertical',
      right: 'right',
      data: []
    },
    series: [],
    title: {
      text: '',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis,
    yAxis: {
      min: 0,
      max: 0,
      type: 'category'
    }
  };

  let chart: any;

  const setTitle = (title: string) => {
    if (options.title) {
      options.title.text = title;
    }
  };

  const initChart = (
    canvas: HTMLDivElement | HTMLCanvasElement,
    title: string
  ) => {
    setTitle(title);
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
    xAxis?.data?.push(xValue);
  };

  const addSeries = (name: string, data: any = [], stack = {}) => {
    options.legend?.data?.push(name);

    options.series.push({
      ...stack,
      data,
      name,
      type: 'bar'
    });
  };

  const addValueToSeries = (name: string, value: any) => {
    const serie = options.series.find((serie: any) => serie.name === name);
    serie?.data?.push(value);
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
    setTitle,
    clearData,
    initChart,
    options,
    refreshChart,
    setMaxY,
    setMinY,
    setXValues
  };
}

import React from 'react';
import { Chart } from '@antv/g2';

type RenderColumnChartProps<T> = {
  data: T[] | null;
  id: string;
};

const renderColumnChart = <T extends {}>({ id, data }: RenderColumnChartProps<T>): void => {
  const chart = new Chart({
    container: id,
    autoFit: true,
    height: 250,
    localRefresh: true,
    pixelRatio:window.devicePixelRatio,
  });

  chart.data(data || []);
  chart.legend(false);
  chart.scale({
    date: {
      range: [0, 1],
    },
    errorcount: {
      nice: true,
    },
  });
  
  chart.tooltip({
    showCrosshairs: true,
  });
  

  chart
    .interval()
    .position('errorname*errorcount')
    .color('errorname', '#002d74')
    .size(15)
    .shape('style')
    .style({
      stroke: '#002d74',
      lineWidth: 1,
    });  
  chart.render();
  
};

type ColumnChartProps<T> = {
  data: T[] | null;
  id: string;
};

const ErrorChart = <T extends {}>({ data,  id }: ColumnChartProps<T>): JSX.Element => {
  React.useEffect(() => {
    if (data && id) {
      renderColumnChart({ id: id, data });
    }
  }, [data, id]);
  React.useEffect(() => {
    return (): void => {
      const wrapper = document.getElementById(id);
      const chart = wrapper && wrapper.firstElementChild;
      chart && chart.remove();
    };
  });
  return <div id={id} />;
};


export default ErrorChart;

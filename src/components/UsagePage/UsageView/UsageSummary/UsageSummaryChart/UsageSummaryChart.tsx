import React, { useState } from 'react';
import { Chart } from '@antv/g2';

type RenderColumnChartProps<T> = {
  data: T[] | null;
  id: string;
};

const renderColumnChart = <T extends {}>({ id, data }: RenderColumnChartProps<T>): void => {
  const canvas = document.getElementById(id);
  if (canvas) {
    canvas.innerHTML = '';
  }
  if (data && data.length > 0) {
    const chart = new Chart({
      container: id,
      autoFit: true,
      height: 200,
      width: 180,
      padding: [10, 20, 55, 60],
      localRefresh: true,
      pixelRatio: window.devicePixelRatio,
      limitInPlot: true,
    });
    chart.data(data || []);

    chart.scale({
      day: {
        range: [0, 1],
        tickCount: 4,
      },
      value: {
        nice: true,
      },
    });

    chart.tooltip({
      showCrosshairs: true,
      shared: true,
    });

    chart.axis('value', {
      label: {
        formatter: val => {
          return val;
        },
      },
    });
    chart.legend('type', {
      position: 'bottom-left',
    });
    chart
      .line()
      .position('day*value')
      .color('type')
      .size(4)
      .shape('smooth');

    chart.theme({
      styleSheet: {
        brandColor: '#002D74',
        paletteQualitative10: ['#002D74', '#6BA53A'],
        paletteQualitative20: ['#002D74', '#6BA53A'],
      },
    });
    chart.render();
  }
};

type UsageSummaryChartProps<T> = {
  data: T[] | null;
  id: string;
};

const UsageSummaryChart = <T extends {}>({ data, id }: UsageSummaryChartProps<T>): JSX.Element => {
  const [isUpdated, setUpdated] = useState(0);

  React.useEffect(() => {
    if (data && id && data.length !== isUpdated) {
      setUpdated(data.length);
      renderColumnChart({ id: id, data });
    }
  }, [data, id, isUpdated]);

  return <div id={id} />;
};

export default UsageSummaryChart;

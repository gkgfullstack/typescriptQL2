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
    height: 350,
    width: 300,
    padding:[20, 30, 65, 50],
    localRefresh: true,
    pixelRatio:window.devicePixelRatio,
    limitInPlot:true,
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
      formatter: (val) => {
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
  
  chart.theme({ "styleSheet": { "brandColor": "#002D74", "paletteQualitative10": ["#002D74", "#6BA53A"], "paletteQualitative20": ["#002D74", "#6BA53A"] } });
  chart.render();
};

type ColumnChartProps<T> = {
  data: T[] | null;
  id: string;
};

const LineChart = <T extends {}>({ data,  id }: ColumnChartProps<T>): JSX.Element => {
  React.useEffect(() => {
    if (data && id) {
      renderColumnChart({ id: id, data });
    }
  }, [data, id]);
  return <div id={id} />;
};


export default LineChart;

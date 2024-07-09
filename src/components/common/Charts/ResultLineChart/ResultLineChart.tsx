import React from 'react';
import { Chart } from '@antv/g2';

type RenderColumnChartProps<T> = {
  data: T[] | null;
  id: string;
  runId:string
};

const renderColumnChart = <T extends {}>({ id, data, runId }: RenderColumnChartProps<T>): void => {
  const chart = new Chart({
    container: id,
    autoFit: true,
    height: 360,
   // padding:[10, 10, 10, 10]
  });
console.log(runId)

  chart.data(data || []);
  chart.scale({
    date: {
      range: [0, 1],
    },
    scriptcount: {
      nice: true,
    },
  });
  
  chart.tooltip({
    showCrosshairs: true,
    //shared: true,
  });
  

    chart.axis('key', {
  label: {
      formatter: (val) => {
        return val ;
      },
    },
  });
  
  chart
    .line()
    .position('key*scriptcount')
    .color('scriptname')
    .shape('smooth');
  
  chart
    .point()
    .position('key*scriptcount')
    .color('scriptname')
    .shape('circle')
    .style({
      stroke: '#fff',
      lineWidth: 1,
    });
  
  chart.render();
  
};

type ColumnChartProps<T> = {
  data: T[] | null;
  id: string;
  runId:string;
};

const ResultLineChart1 = <T extends {}>({ data,  id, runId }: ColumnChartProps<T>): JSX.Element => {
  React.useEffect(() => {
    if (data && id) {
      renderColumnChart({ id: id, data, runId });
    }
  }, [data, id, runId]);
  React.useEffect(() => {
    return (): void => {
      const wrapper = document.getElementById(id);
      const chart = wrapper && wrapper.firstElementChild;
      chart && chart.remove();
    };
  });
  return <div id={id} />;
};


export default ResultLineChart1;

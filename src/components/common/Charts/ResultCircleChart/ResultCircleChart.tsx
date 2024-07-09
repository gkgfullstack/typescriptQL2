import React from 'react';
import { Chart } from '@antv/g2';

type RenderColumnChartProps<T> = {
  data: T[] | null;
  id: string;
  runId:string
};

const renderColumnChart = <T extends {}>({ id, data, runId }: RenderColumnChartProps<T>): void => {
console.log(data, runId);


const chart = new Chart({
  container: id,
  autoFit: true,
  height:290,
  padding:[0, 0, 0, 0],  
  localRefresh: true,
  pixelRatio:window.devicePixelRatio,
  
});

 chart.data(data || []);
chart.scale('percent', {
  formatter: (val) => {
    val = val * 100 + '%';
    return val;
  },
});
chart.legend('cut', false);
chart.coordinate('theta', {
  radius: 0.6,
  innerRadius: 0.96,
  
});
chart.tooltip({
  showTitle: false,
  showMarkers: false,
  itemTpl: '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
});
chart.legend({
  position: 'left-bottom',
  offsetX:0,
  offsetY:2,
  maxWidth:180,
});
chart
  .annotation()
  .text({
    position: ['0%', '0%'],
    content: '',
    style: {
      fontSize: 14,
      fill: '#002D74',
      textAlign: 'center',
      stroke: '#444',
    lineWidth: 0,
    },
    offsetY: 0,
    offsetX:0,
  })
  .text({
    position: ['50%', '50%'],
    //content: '200',
    content: 'Inputs Complete',
    style: {
      fontSize: 14,
      fill: '#002D74',
      textAlign: 'center',
      stroke: '#444',
    lineWidth: 0,
    },
    offsetX: 0,
    offsetY: 10,
  })
  .text({
    position: ['50%', '50%'],
    //content: 'comp',
    content: id,
    style: {
      fontSize: 44,
      fill: '#002D74',
      textAlign: 'center',
      fontWeigh:600,
      stroke: '#444',
    lineWidth: 0,
    },
    offsetY: -20,
    offsetX: 0,
  });
chart
  .interval()
  .adjust('stack')
  .position('percent')
  .color('item', ['#002D74', '#FF0000', '#6BA53A'])
  .style({
    stroke: '#444',
    lineWidth: 0,
  })
  
  .tooltip('item*count*percent', (item, count, percent) => {
    percent = percent * 100 + '%';
    return {
      item: item,
      count: count,
      percent: percent,
    };
    
  });

chart.interaction('element-active');
chart.render();
 };



type ColumnChartProps<T> = {
  data: T[] | null;
  completed: string;
  runId:string;
};

const ResultCircleChart = <T extends {}>({ data, completed, runId }: ColumnChartProps<T>): JSX.Element => {
  
  React.useEffect(() => {
    if (data && completed) {
      renderColumnChart({ id: completed, data, runId });
    }
  }, [data, completed, runId]);
  React.useEffect(() => {
    return (): void => {
      const wrapper = document.getElementById(completed);
      const chart = wrapper && wrapper.firstElementChild;
      chart && chart.remove();
    };
  });
  return <div id={completed} />; 
};


export default ResultCircleChart;

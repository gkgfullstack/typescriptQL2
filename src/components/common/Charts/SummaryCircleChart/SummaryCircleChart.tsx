import React from 'react';
import { Chart } from '@antv/g2';

type RenderColumnChartProps<T> = {
  data: T[] | null;
  id: string;
  runId:string
};

const renderColumnChart = <T extends {}>({ id, data, runId}: RenderColumnChartProps<T>): void => {
  console.log(runId)
  let hightCustom;
  let paddingCustom;
  if(data?.length === 1){
    hightCustom = 300;
    paddingCustom = [0, 0, 80, 0]
  }else if(data?.length === 2){
    hightCustom = 300;
    paddingCustom = [0, 0, 80, 0] ; 
  }else if(data?.length === 5){
    hightCustom = 300;
    paddingCustom = [0, 0, 80, 0];
  }else if(data?.length === 7){
    hightCustom = 300;
    paddingCustom = [0, 0, 80, 0] 
  }else{ 
      hightCustom = 300;  
      paddingCustom = [0, 0, 80, 0]
  }
const chart = new Chart({
  container: id,
  autoFit: true,
  height: hightCustom,
  //width: 250,
  padding:paddingCustom,
  pixelRatio:window.devicePixelRatio,
});
chart.data(data || []);
chart.scale('percent', {
  formatter: (val) => {
    val = val + '%';
    return val;
  },
});
chart.coordinate('theta', {
  radius: 0.75,
  innerRadius: 0.94,
});
chart.tooltip({
  showTitle: false,
  showMarkers: false,
  itemTpl: '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span> {name}: {value}</li>',
});

chart
  .annotation()  
  .text({
    position: ['50%', '50%'],
    content: id,
    style: {
      fontSize: 26,
      fill: '#3B808F',
      textAlign: 'center',
      fontWeight:800
    },
    offsetX: 0,
    offsetY: 0,
  })
  
  chart.legend({
    position: 'left-bottom',
    itemSpacing:0,
    itemHeight:5,
  });

  chart
  .interval()
  .adjust('stack')
  .position('percent')
  .color('item',  ['#6BA53A', '#1A73E8', '#6BA53A', '#673ab7', '#2196f3','#f44336','#ffc107','#795548','#00bcd4','#009688','#9e9e9e','#cddc39','#e91ed9','#21f3e0','#ffee58',]) 
  // .label('percent', (percent) => {    
  //   return {
  //     offset: -10,
  //     style: {
  //       fill:('percent'),
  //       fontSize: 10,
  //     }, 
  //     textStyle: {
  //       fill: '#000',
  //       fontSize: 11,
  //       textAlign:'center',
  //     },
  //     rotate: 0,
  //     autoRotate: false,    
  //     content: () => {
  //       return `${(percent )}%`;
  //     },
  //   };
  // }) 
  .tooltip('item*percent', (item, percent) => {
    percent = percent + '%';
    return {
      name: item,
      value: percent,
    };
  }); 

chart.interaction('element-active');
chart.render();
 };



type ColumnChartProps<T> = {
  data: T[] | null;
  completed: string;
  runId:string;
  //id:string;
};

const SummaryCircleChart = <T extends {}>({ data, completed, runId }: ColumnChartProps<T>): JSX.Element => {
 
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


export default SummaryCircleChart;

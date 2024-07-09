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
    val = val  + '%';
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
  itemTpl: '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
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
  if(data?.length === 7){
    chart.legend({
      position: 'left-bottom',
      itemHeight:2,
      //itemWidth:100,      
    });
  }else{
  chart.legend({
    position: 'left-bottom',
    itemSpacing:0,
    itemHeight:4,
    
  });
}

  chart
  .interval()
  .adjust('stack')
  .position('percent')
  .color('item', ['#3B808F', '#f7685b', '#ff0202', '#ffbd02', '#12da3d', '#12dad0', '#12acda', '#9612da', '#da12cb', '#da128a', '#8bbdcc', '#74eaae', ]) 
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
  //   autoRotate: false,    
  //     content: () => {
  //       return `${(percent )}%`;
  //     },
  //   };
  // }) 
  .tooltip('item*percent', (item, percent) => {
    percent = percent  + '%';
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
  completedOut: string;
  runId:string;
  //id:string;
};

const SummaryCircleChart = <T extends {}>({ data, completedOut, runId }: ColumnChartProps<T>): JSX.Element => {
 
  React.useEffect(() => {
    if (data && completedOut) {
      renderColumnChart({ id: completedOut, data, runId });
    }
  }, [data, completedOut, runId]);
  React.useEffect(() => {
    return (): void => {
      const wrapper = document.getElementById(completedOut);
      const chart = wrapper && wrapper.firstElementChild;
      chart && chart.remove();
    };
  });
  return <div id={completedOut} />; 
};


export default SummaryCircleChart;

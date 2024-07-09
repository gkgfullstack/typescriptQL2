import React from 'react';
import { Chart, registerShape } from '@antv/g2';
import { Shape, ShapeInfo } from '@antv/g2/lib/interface';
import VARIANCE_COLORS from 'src/enums/varianceColor';
import { Point } from '@antv/g2/lib/dependents';
//import { TEMP_VARIANCE_CHART_MINUS } from 'src/components/ProductFinder/ProductList/hooks/useProductListTableColumns';
//import { tmpdir } from 'os';
//import { reducer } from 'src/stateProviders/searchAuditHistoryStateProvider';
//import CategoryVariance from 'src/types/categoryVariance';
//let height= 45;
const COLOR_GRAY = '#323C47';

// const tooltipTmp =
//   '<li class="g2-tooltip-list-item"><span class="g2-tooltip-title">{value}</span></li>';
  const tooltipTmp =
  '<li class="g2-tooltip-list-item"><span class="g2-tooltip-name"><center><b>{value}</b>  Product Priced Below<br/> <img src="https://www.w3schools.com/html/pic_trulli.jpg" alt="Trulli" width="20" style="margin:10px 0px 0px 0px" ></center></span></li>';


const getFillAttrs = (cfg: ShapeInfo): object => {
  return {
    ...cfg.defaultStyle,
    ...cfg.style,
    fill: cfg.color,
  };
};
const getRectPath = (points: Point[]): any[][] => {
  const path = [];
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    if (point) {
      const action = i === 0 ? 'M' : 'L';
      path.push([action, point.x, point.y]);
    }
  }
  const first = points[0];
  path.push(['L', first.x, first.y]);
  path.push(['z']);
  return path;
};
type RenderMirrorChartProps<CategoryVariance> = {
  data: CategoryVariance[] | null;
  id: string;
  callback: (elem: CategoryVariance) => void;
};
//const heightd=(data:any)=> void {data.length != 0 ? data*15 : height};
        
      
  
const renderMirrorChart = <CategoryVariance extends {}>({ id, data, callback }: RenderMirrorChartProps<CategoryVariance>): void => {
  let height = data!= null? data.length*25:45;
  registerShape('interval', 'right', {
    draw(cfg, container) {
      const attrs = getFillAttrs(cfg);
      let path = getRectPath(cfg.points as Point[]);
      path = this.parsePath(path);
      const radius = (path[2][1] - path[1][1]) / 2;
      const temp = [];
      temp.push(['M', path[0][1] + radius, path[0][2]]);
      temp.push(['A', radius, radius, 90, 0, 1, path[0][1], path[0][2] - radius]);
      temp.push(['L', path[1][1], path[1][2]]);
      temp.push(['L', path[2][1], path[2][2]]);
      temp.push(['L', path[3][1], path[3][2] - radius]);
      temp.push(['A', radius, radius, 90, 0, 1, path[3][1] - radius, path[3][2]]);
      temp.push(['Z']);

      const group = container.addGroup();
      group.addShape('path', {
        attrs: {
          ...attrs,
          path: temp,
        },
      });

      return group;
    },
  } as Shape);

  registerShape('interval', 'left', {
    draw(cfg, container) {
      const attrs = getFillAttrs(cfg);
      let path = getRectPath(cfg.points as Point[]);
      path = this.parsePath(path);
      const radius = (path[2][1] - path[1][1]) / 2;
      const temp = [];
      temp.push(['M', path[0][1] + radius, path[0][2]]);
      temp.push(['A', radius, radius, 90, 0, 1, path[0][1], path[0][2] - radius]);
      temp.push(['L', path[1][1], path[1][2]]);
      temp.push(['L', path[2][1], path[2][2]]);
      temp.push(['L', path[3][1], path[3][2] - radius]);
      temp.push(['A', radius, radius, 90, 0, 1, path[3][1] - radius, path[3][2]]);
      temp.push(['Z']);
  
      const group = container.addGroup();
      group.addShape('path', {
        attrs: {
          ...attrs,
          path: temp,
        },
      });
  
      return group;
    },
  }as Shape);

  const chart = new Chart({
    container: id || '1',
    autoFit: true,
    height:   height,
    padding:[20, 20, 20, 150],
    localRefresh: true,
    pixelRatio:window.devicePixelRatio,
  });

  chart.data(data||[]);
  chart.legend(false);
  chart.coordinate().transpose().scale(1, -1);
  chart.tooltip({
    showMarkers: true,
    showTitle: true,
    shared: true,
    itemTpl: tooltipTmp,
    // domStyles: {
    //   'g2-tooltip-name': {
    //     'text-align': 'left',
    //   },
    //   'g2-tooltip-value': {
    //     'margin-left': '2px',
    //   },
    //   'g2-tooltip-title': {
    //     'padding-bottom': '0',
    //     'margin-bottom': '0px',
    //     'margin-top': '0',
    //   },
    // },
  });
 
  chart.annotation().line({
    top: true,
    start: ['start', 0],
    end: ['start', 0],
    style: {
      stroke: '#595959',
      lineWidth: 0,
      lineDash: [3, 3],
      strokeOpacity: 0,
    },
    text: {
      position: 'start',
      style: {
        fill: '#8c8c8c',
        fontSize: 16,
        fontWeight: 400,
        strokeOpacity: 0,
      },
      content: '',
      offsetY: -15,
      offsetX: 10,
      
    },
  });
  /*chart.axis('key', {
    line: {
      style: {
        //fill: COLOR_GRAY,
        display:'',
        lineWidth: 1.5,
      },
    },
    label: {
    //  position:,
      style: {
       // fill: COLOR_GRAY,
        fontWeight: 400,
        fontSize: 12,
      },
      formatter: (val: string): string => {
        const arr = val.split('&');
        return arr[1];
      },
      
    },
  });*/
  chart.axis('value', {
    line: {
      style: {
        //fill: COLOR_GRAY,
        lineWidth: 0,
        strokeOpacity: 0,
      },
    },
    label: {
      style: {
        //fill: COLOR_GRAY,
        fontWeight: 400,
        //valign:top,
        fontSize: 12,
        strokeOpacity: 0,
      },
      formatter: (val: string): string => `${val}%`,
      
    },
  });
  //chart.axis.labels.template.valign = "top";
  
  chart.axis('key', {
    line: {
      style: {
        fill: COLOR_GRAY,
        lineWidth: 0,
        strokeOpacity: 0,
      },
      
    },
    label: {
      style: {
        fill: COLOR_GRAY,
        //valign:top,
        fontWeight: 400,
        fontSize: 12,
        strokeOpacity: 0,
      },
      formatter: (val: string): string => `${val}`,
      
      /*formatter: (val: string): string => {
        const arr = val.split('&');
        return arr[1];
      },*/
      
    },
  });
  
  chart
    .interval()
    .position('key*value')
    .size(10)
    //.shape('right')
    .style({
      stroke: 0,
      lineWidth: 0,
      border:0
    })
    .tooltip('type*label*value', (type, label, value) => {
      const name = type === 'BELOW' ? 'Priced Below' : type === 'ABOVE' ? 'Priced Above' : 'Similar Price';
      return {
        label: label,
        value: `${value}%`,
        name: name,
      };
      
    })
    .color('value', value => {
      if (value < 0) {
        return VARIANCE_COLORS.negative;
      }
      if (value > 0 ){
        return VARIANCE_COLORS.positive;
      }
      return VARIANCE_COLORS.similar;
    })
    .shape('value', (value: number): string => {
      if (value === 0) {
        return '';
      }
      return 'right';
    })
    .animate({
      appear: {
        animation: 'fade-in',
      },
    });
chart.tooltip({
    showMarkers: false,
    showTitle: false,
    shared: true,
    itemTpl: tooltipTmp,
    domStyles: {
      'g2-tooltip-name': {
        'text-align': 'left',
      },
      'g2-tooltip-value': {
        'margin-left': '10px',
      },
      'g2-tooltip-title': {
        'padding-bottom': '0',
        'margin-bottom': '10px',
        'margin-top': '0',
      },
    },
  });
    
  chart.interaction('element-active');
  chart.on('click', (ev: { target: { get: (arg0: string) => any } }) => {
    const lineElement = ev.target.get('element');
    const value = lineElement && lineElement.getModel().data;
    callback && value && callback(value);
  });
  chart.render();
};

type MirrorChartProps<CategoryVariance> = {
  data: CategoryVariance[] | null;
  onChange: (elem: CategoryVariance) => void;
  id: string;
};
const MirrorChart = <CategoryVariance extends {}>({ data, onChange, id }: MirrorChartProps<CategoryVariance>): JSX.Element => {
  React.useEffect(() => {
    if (data && id) {
      renderMirrorChart({ id: id, data, callback: onChange });
    }
  }, [data, id, onChange]);
  React.useEffect(() => {
    return (): void => {
      const wrapper = document.getElementById(id);
      const chart = wrapper && wrapper.firstElementChild;
      chart && chart.remove();
    };
  });
  return <div id={id} />;
};

export default MirrorChart;

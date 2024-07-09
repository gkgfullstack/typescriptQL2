import React from 'react';
import { Chart, registerShape } from '@antv/g2';
import { Shape, ShapeInfo } from '@antv/g2/lib/interface';
import VARIANCE_COLORS from 'src/enums/varianceColor';
import { Point } from '@antv/g2/lib/dependents';

const COLOR_GRAY = '#323C47';

const tooltipTmp =
  '<li class="g2-tooltip-list-item"><div class="g2-tooltip-title">{name}</div><span class="g2-tooltip-name">{label}</span>:<span class="g2-tooltip-value">{value}</span></li>';

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

type RenderColumnChartProps<T> = {
  data: T[] | null;
  onClickElement: (elem: T) => void;
  id: string;
};

const renderColumnChart = <T extends {}>({ id, data, onClickElement }: RenderColumnChartProps<T>): void => {
  registerShape('interval', 'radius-top', {
    draw(cfg, container) {
      const attrs = getFillAttrs(cfg);
      let path = getRectPath(cfg.points as Point[]);
      path = this.parsePath(path);
      const radius = (path[2][1] - path[1][1]) / 2;
      const temp = [];
      temp.push(['M', path[0][1], path[0][2]]);
      temp.push(['L', path[1][1], path[1][2]]);
      temp.push(['A', 5, 5, 90, 0, 1, path[1][1] + radius * 2, path[1][2]]);
      temp.push(['L', path[3][1], path[3][2]]);
      temp.push(['L', path[1][1], path[3][2]]);
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

  const chart = new Chart({
    container: id,
    autoFit: true,
    height: 300,
    localRefresh: true,
  });
  chart.data(data || []);
  chart.legend(false);
  chart.tooltip(false);
  chart.scale('value', {
    tickInterval: 10,
    nice: true,
    sync: true,
  });
  chart.axis('value', {
    label: {
      style: {
        fill: COLOR_GRAY,
        fontWeight: 400,
        fontSize: 12,
      },
      formatter: (val: string): string => `${val}%`,
    },
  });
  chart.axis('key', {
    line: {
      style: {
        fill: COLOR_GRAY,
        lineWidth: 1.5,
      },
    },
    label: {
      style: {
        fill: COLOR_GRAY,
        fontWeight: 400,
        fontSize: 12,
      },
      formatter: (val: string): string => {
        const arr = val.split('&');
        return arr[1];
      },
    },
  });
  chart
    .interval()
    .position('key*value')
    .size(15)
    .tooltip('type*label*value', (type, label, value) => {
      const name = type === 'BELOW' ? 'Priced Below' : type === 'ABOVE' ? 'Priced Above' : 'Similar Price';
      return {
        label: label,
        value: `${value}%`,
        name: name,
      };
    })
    .color('value')
    .shape('value', (value: number): string => {
      if (value === 0) {
        return '';
      }
      return 'radius-top';
    })
    .color('type', type => {
      if (type === 'BELOW') {
        return VARIANCE_COLORS.negative;
      }
      if (type === 'ABOVE') {
        return VARIANCE_COLORS.positive;
      }
      return VARIANCE_COLORS.similar;
    });
  chart.on('element:click', (ev: any) => {
    onClickElement(ev.data.data);
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
  chart.interaction('element-highlight');
  chart.render();
};

type ColumnChartProps<T> = {
  data: T[] | null;
  onChange: (elem: T) => void;
  id: string;
};

const ColumnChart = <T extends {}>({ data, onChange, id }: ColumnChartProps<T>): JSX.Element => {
  React.useEffect(() => {
    if (data && id) {
      renderColumnChart({ id: id, data, onClickElement: onChange });
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

export default ColumnChart;

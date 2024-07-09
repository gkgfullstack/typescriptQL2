import React, { useState } from 'react';
import CompetitorVariance from 'src/types/CompetitorVariance';

import styles from './VarianceChart.module.less';
import { Button, Popover } from 'antd';
import VARIANCE_COLORS from 'src/enums/varianceColor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function range(start: number, end: number, step: number) {
  const len = Math.floor((end - start) / step) + 1;
  const totalAmount = Array.from({ length: len }, (_, k) => ((((k - step) * 5 ) * 5) + 100) % 100)
  return totalAmount;
}

//export const xAxisValuess = range(-100, -0, -10);
export const xAxisValues = range(-100, 100, 25);

const belowColor = VARIANCE_COLORS.negative;
const similarColor = VARIANCE_COLORS.similar;
const aboveColor = VARIANCE_COLORS.positive;

export type VarianceProps = {
  items: CompetitorVariance[];
  itemsPerPage: number;
  onLabelClick: (item: CompetitorVariance) => void;
  onValueClick: (type: string, item: CompetitorVariance) => void;
};

const VarianceChart: React.FC<VarianceProps> = ({
  items,
  itemsPerPage,
  onLabelClick,
  onValueClick,
}: VarianceProps) => {
  const [displayedItems, setDisplayedItems] = useState<CompetitorVariance[]>([]);
  const [collapsed, setCollapsed] = useState(true);

  React.useEffect(() => {
    const displayedItems: CompetitorVariance[] =
      collapsed && items ? items.slice(0, itemsPerPage) : items ? [...items] : [];
    setDisplayedItems(displayedItems);
  }, [collapsed, itemsPerPage, items]);

  const showLoadMoreButton = itemsPerPage < items.length;
  const loadMoreLabel = collapsed ? 'Show More' : 'Show Less';

  const handleViewMoreButtonClick = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <div className={styles.chart_container}>
        <div className={styles.chart_x_axis}>
          {/* {xAxisValuess.map((values, index) => (
            <span key={index}>
              <span className="label">{values}</span>
            </span>
          ))} */}

          {/* {xAxisValues.map((values, index) => (
            <span key={index}>
              <span className="label">
                {values}
                </span>
            </span>
          ))} */}
          <span>-100 </span> <span>-75</span> <span>-50</span> <span>-25</span><span> 0 </span> <span>25 </span> <span>50  </span> <span>75 </span> <span> 100</span>
        </div>
        <div className={styles.chart_content_wrapper}>
          
          {displayedItems.map((item: CompetitorVariance) => (
            <div key={item.id} className={styles.bar_line}>
              <span
                className={styles.label}
                onClick={() => {
                  onLabelClick(item);
                }}
                title={item.competitorName}
              >
                {item.competitorName}
              </span>
              <div className={styles.bar}>
                {item.value >= 0 ? '' : item.value && (
                  <Popover
                    content={
                      <span>
                        <b>{Number.parseFloat(`${item.value}`).toFixed()}%</b> Average Price Variance from Median
                      </span>
                    }
                  >
                    <span
                      style={{ width: -item.value + '%', background: belowColor, float:'right', borderRadius: '5px 0px 0px 5px', position:'relative' }}
                      onClick={() => {
                        onValueClick('start', item);
                      }}
                    ><b style={{position:"absolute", left:'-5px', top:'-12px', color: '#ffa40d', 
                    fontSize: '10.5px', 
                    transform: 'rotate(180deg)'}}>{-item.value >= 101 ? (<FontAwesomeIcon className={styles.three_dots_icon} size="2x" icon={['fas', 'arrow-alt-right']} />) : ''  }</b></span>
                  </Popover>
                )}
              </div>
              <div style={{borderLeft:'1px dashed #C4C4C4', height: '24px'}}></div>
              <div className={styles.bar} >
                {item.value <= 0 ? '' : item.value && (
                  
                  <Popover
                    content={
                      <span>
                        <b>{Number.parseFloat(`${item.value}`).toFixed()}%</b> Average Price Variance from Median
                      </span>
                    }
                  >
                    <span
                      style={{ width: item.value + '%', background: aboveColor, float:'left', borderRadius: '0px 5px 5px 0px', position:'relative' }}
                      onClick={() => {
                        onValueClick('end', item);
                      }}
                    ><b style={{position:"absolute", right:'-5px', top:'-5px', color: '#9000ff', fontSize: '10px'}}>{item.value >= 101 ? (<FontAwesomeIcon className={styles.three_dots_icon} size="2x" icon={['fas', 'arrow-alt-right']} />) : ''  }</b></span>
                    
                  </Popover>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.legend}>
        <span className={styles.legend_item} style={{ color: belowColor }}>
          Priced Below
        </span>
        <span className={styles.legend_item} style={{ color: similarColor  }}>
          Similar Price 
        </span>
        <span className={styles.legend_item} style={{ color: aboveColor }}>
          Priced Above
        </span>
      </div>
      {showLoadMoreButton && (
        <div className={styles.buttons_bar}>
          <Button type={'link'} onClick={handleViewMoreButtonClick}>
            {loadMoreLabel}
          </Button>
        </div>
      )}
    </>
  );
};

export default VarianceChart;

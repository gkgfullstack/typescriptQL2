import React, { useState } from 'react';
import PriceAnalysisItem from 'src/types/PriceAnalysisItem';

import styles from './PriceAnalysis.module.less';
import { Button, Popover } from 'antd';
import VARIANCE_COLORS from 'src/enums/varianceColor';

function range(start: number, end: number, step: number) {
  const len = Math.floor((end - start) / step) + 1;
  return Array.from({ length: len }, (_, k) => k * step);
}
export const xAxisValues = range(0, 100, 10);

const belowColor = VARIANCE_COLORS.negative;
const similarColor = VARIANCE_COLORS.similar;
const aboveColor = VARIANCE_COLORS.positive;

export type PriceAnalysisProps = {
  items: PriceAnalysisItem[];
  itemsPerPage: number;
  onLabelClick: (item: PriceAnalysisItem) => void;
  onValueClick: (type: string, item: PriceAnalysisItem) => void;
};

const PriceAnalysis: React.FC<PriceAnalysisProps> = ({
  items,
  itemsPerPage,
  onLabelClick,
  onValueClick,
}: PriceAnalysisProps) => {
  const [displayedItems, setDisplayedItems] = useState<PriceAnalysisItem[]>([]);
  const [collapsed, setCollapsed] = useState(true);

  React.useEffect(() => {
    const displayedItems: PriceAnalysisItem[] =
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
        <div className={styles.chart_x_axis} >
          {xAxisValues.map((value, index) => (
            <span key={index}>
              <span className="label">{value}</span>
            </span>
          ))}
        </div>
        <div className={styles.chart_content_wrapper}>
          {displayedItems.map((item: PriceAnalysisItem) => (
            <div key={item.id} className={styles.bar_line}>
              <span
                className={styles.label}
                onClick={() => {
                  onLabelClick(item);
                }}
                title={item.label}
              >
                {item.label}
              </span>
              <div className={styles.bar}>
                {item.below === 0 ? '' : item.below  && (
                  <Popover
                    content={
                      <span>
                        <b>{item.below}%</b> Product Priced Below
                      </span>
                    }
                  >
                    <span
                      style={{ width: item.below + '%', background: belowColor }}
                      onClick={() => {
                        onValueClick('below', item);
                      }}
                    ></span>
                  </Popover>
                )}
                {item.similar === 0 ?  '' : item.similar && (
                  <Popover
                    content={
                      <span>
                        <b>{item.similar}%</b> Product Similar Priced
                      </span>
                    }
                  >
                    <span
                      style={{ width: item.similar + '%', background: similarColor }}
                      onClick={() => {
                        onValueClick('similar', item);
                      }}
                      ></span>
                  </Popover>
                )}
                {item.above === 0 ? '' : item.above && (
                  <Popover
                    content={
                      <span>
                        <b>{item.above}%</b> Product Priced Above
                      </span>
                    }
                  >
                    <span
                      style={{ width: item.above + '%', background: aboveColor }}
                      onClick={() => {
                        onValueClick('above', item);
                      }}
                      ></span>
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

export default PriceAnalysis;

import React from 'react';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import { ColumnChart } from 'src/components/common/Charts';
import styles from './PriceDistributionGraph.module.less';
import { usePriceDistributionFetch } from './hooks';
import { Alert, Button, Popover } from 'antd';
import Spin from 'src/components/common/Spin';
import routes from 'src/routes';
import useSourceOwnerId from 'src/hooks/useSourceOwnerId';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import VARIANCE_COLORS from 'src/enums/varianceColor';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';

export type PriceDistributionChart = {
  id: string;
  key: string;
  type: string;
  sortOrder: number;
  label: string;
  value: number;
};
const belowColor = VARIANCE_COLORS.negative;
const similarColor = VARIANCE_COLORS.similar;
const aboveColor = VARIANCE_COLORS.positive;

type PriceDistributionGraphProps = {
  content:string;
};
const PriceDistributionGraph: React.FC<PriceDistributionGraphProps> = ({content}:PriceDistributionGraphProps) : JSX.Element => {
  const sourceOwnerId = useSourceOwnerId();
  const { matchTypeFilter, region, priceType} = useQueryUrlParams();
  let initialMatchTypeFilterIds:string = matchTypeFilter  !== undefined ? matchTypeFilter :"ALL";
  let initialRegionIds:string = region  !== undefined ? region :"-1";
  let initialPriceTypeIds:string = priceType  !== undefined ? priceType :"1";
  const setSearch = useQueryUrlParamsDispatch();
  const { data, loading, error } = usePriceDistributionFetch(sourceOwnerId, initialMatchTypeFilterIds, initialRegionIds, initialPriceTypeIds);
  const onClick = (elem: PriceDistributionChart): void => {
    setSearch(
      {
        pricev: [elem.id],
        sourceOwnerId: sourceOwnerId,
        matchTypeFilterIds:initialMatchTypeFilterIds,
        regionIds:initialRegionIds,
        priceTypeIds:initialPriceTypeIds,
      },
      routes.productFinder
    );
  };
  
  return (    
    <div className={styles.price_distribution_wrapper} id="widget">     
      <h2>Price Distributions <span><Popover placement="left"  content={content} >
    <Button type="link" style= {{position:"absolute", zIndex:9,right:0, marginTop:"-25px"}} >
      <FontAwesomeIcon icon={['fal', 'info-circle']} /></Button>
    </Popover></span>
      </h2>
      {error && (
        <Alert
          message="Error"
          description="An error has occurred when trying to get price distribution! Please try again later!"
          type="error"
          showIcon
        />
      )}
      {loading ? (
        <div className={styles.price_distribution_loader}>
          <Spin spinning={loading} />
        </div>
      ) : (
        data !== null && (
          <div className={styles.price_distribution_chart}>
            <ColumnChart data={data} id={'price_distribution_chart'} onChange={onClick} />
            <div className={styles.price_distribution_footer}>
              <span className={styles.legend_item} style={{ color: belowColor }}>Priced Below</span>
              <span className={styles.legend_item} style={{ color: similarColor  }}>Similar Price</span>
              <span className={styles.legend_item} style={{ color: aboveColor }}>Priced Above</span>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PriceDistributionGraph;

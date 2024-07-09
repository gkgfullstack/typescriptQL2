import React from 'react';
import PriceAnalysis from 'src/components/common/PriceAnalysis';
import PriceAnalysisItem from 'src/types/PriceAnalysisItem';
import routes from 'src/routes';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import ProductFinderQueryParams from 'src/types/ProductFinderQueryParams';
import { Alert } from 'antd';
import { PriceVarianceFilter } from 'src/types/PriceVarianceFilter';
import Spin from 'src/components/common/Spin';
import { FetchState } from 'src/reducers/fetchReducer';

import styles from './PriceDistributionView.module.less';

type QueryParameters = {
  [k: string]: any;
};

export type PriceDistributionViewProps = FetchState<PriceAnalysisItem[]> & {
  itemsPerPage: number;
  queryParameter: string;
  priceVariance: PriceVarianceFilter[] | null;
};

const PriceDistributionView: React.FC<PriceDistributionViewProps> = ({
  data: items,
  loading,
  error,
  itemsPerPage,
  queryParameter,
  priceVariance,
}: PriceDistributionViewProps) => {
  const setQuery = useQueryUrlParamsDispatch<ProductFinderQueryParams>();
  const handleLabelClick = (item: PriceAnalysisItem) => {
    const query: QueryParameters = {};
    query[queryParameter] = [item.id];
    setQuery(query, routes.productFinder);
  };
  const handleValueClick = (type: string, item: PriceAnalysisItem) => {
    const query: QueryParameters = {};
    query[queryParameter] = [item.id];
    if (priceVariance) {
      const variances = priceVariance.filter((item: PriceVarianceFilter) => {
        return type === 'below'
          ? item.max && item.max <= -2
          : type === 'above'
          ? item.min && item.min >= 2
          : type === 'similar' && item.min && item.min >= -2 && item.max && item.max <= 2;
      });
      query['pricev'] = variances
        ? variances.map((variance: PriceVarianceFilter) => {
            return variance.Id.toString();
          })
        : [];
    }
    setQuery(query, routes.productFinder);
  };
  return (
    <div className={styles.chart}>
      {loading && (
        <div className={styles.spinner}>
          <Spin spinning={loading} />
        </div>
      )}
      {error && (
        <Alert
          message="Error"
          description="An error has occurred when trying to get price distribution! Please try again later!"
          type="error"
          showIcon
        />
      )}
      {items !== null && (
        <PriceAnalysis
          items={items}
          onLabelClick={handleLabelClick}
          onValueClick={handleValueClick}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

export default PriceDistributionView;

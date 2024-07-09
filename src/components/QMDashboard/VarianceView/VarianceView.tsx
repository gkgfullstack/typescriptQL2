import React from 'react';
import VarianceChart from 'src/components/common/VarianceChart';
import CompetitorVariance from 'src/types/CompetitorVariance';
import routes from 'src/routes';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import ProductFinderQueryParams from 'src/types/ProductFinderQueryParams';
import { Alert } from 'antd';
import  {VarianceFilter}  from 'src/types/VarianceFilter';
import Spin from 'src/components/common/Spin';
import { FetchState } from 'src/reducers/fetchReducer';

import styles from './VarianceView.module.less';

type QueryParameters = {
  [k: string]: any;
};

export type VarianceViewProps = FetchState<CompetitorVariance[]> & {
  itemsPerPage: number;
  queryParameter: string;
  variancess: VarianceFilter[] | null;
};

const VarianceView: React.FC<VarianceViewProps> = ({
  data: items,
  loading,
  error,
  itemsPerPage,
  queryParameter,
  variancess,
}: VarianceViewProps) => {
  const setQuery = useQueryUrlParamsDispatch<ProductFinderQueryParams>();
  const handleLabelClick = (item: CompetitorVariance) => {
    const query: QueryParameters = {};
    query[queryParameter] = [item.id];
    setQuery(query, routes.productFinder);
  };
  const handleValueClick = (type: string, item: CompetitorVariance) => {
    const query: QueryParameters = {};
    query[queryParameter] = [item.id];
    if (variancess) {
      const variances = variancess.filter((item: VarianceFilter) => {
        return type === 'value'
          ? item.max && item.max <= -2
          : type === 'value2'
          ? item.min && item.min >= 2
          : null
      });
      query['pricev'] = variances
        ? variances.map((variance: VarianceFilter) => {
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
          description="An error
          has occurred when trying to get price distribution! Please try again later!"
          type="error"
          showIcon
        />
      )}
      {items !== null && (
        <VarianceChart
          items={items}
          onLabelClick={handleLabelClick}
          onValueClick={handleValueClick}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

export default VarianceView;

import React from 'react';
import  LineChart  from 'src/components/common/Charts/LineChart';
import styles from './QualityIndexGraph.module.less';
import { useQualityIndexFetch } from './hooks';
import { Alert } from 'antd';
import Spin from 'src/components/common/Spin';

export type QualityIndexChart = {
  total: string;
  executed: string;
  day: string;
};

type QualityIndexGraphProps = {};

const QualityIndexGraph: React.FC<QualityIndexGraphProps> = (): JSX.Element => {
  const { data, loading, error } = useQualityIndexFetch(); 
  const fetchLoading = loading && data === null;
  return (
    <div className={styles.price_distribution_wrapper}>
      {error && (
        <Alert
          message="Error"
          description="An error
          has occurred when trying to get price distribution! Please try again later!"
          type="error"
          showIcon
        />
      )}
      {fetchLoading ? (
        <div className={styles.price_distribution_loader}>
          <Spin spinning={loading} />
        </div>
      ) : (
        data !== null && (
        <LineChart data={data} id={'price_distribution_chart'} />  
        )
      )}
    </div>
  );
};

export default QualityIndexGraph;

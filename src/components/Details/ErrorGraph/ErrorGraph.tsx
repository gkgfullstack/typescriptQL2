import React from 'react';
import styles from './ErrorGraph.module.less';
import { useErrorGraphFetch } from './hooks';
import { Alert } from 'antd';
import Spin from 'src/components/common/Spin';
import ErrorChart from 'src/components/common/Charts/ErrorChart';
import useRunId from 'src/hooks/useRunId';

export type ErrorGraphChart = {
  id: string;
  type: string;
  errorname: string;
  errorcount: string;
};

type ErrorGraphProps = {};

const ErrorGraph: React.FC<ErrorGraphProps> = (): JSX.Element => {
  const runId = useRunId();
  //const setSearch = useQueryUrlParamsDispatch();
  const { data, loading, error } = useErrorGraphFetch(runId);
  // const onClick = (elem: ErrorGraphChart): void => {
  //   setSearch(
  //     {
  //       pricev: [elem.id],
  //       runId: runId,
  //     },
  //     routes.results
  //   );
  // };
  const fetchLoading = loading && data === null;
  return (
    <div className={styles.price_distribution_wrapper}>
      <h2>Error</h2>
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
          <div className={styles.price_distribution_chart2}>
            <ErrorChart data={data} id={'price_distribution_chart'}  />
          </div>
        )
      )}
    </div>
  );
};

export default ErrorGraph;

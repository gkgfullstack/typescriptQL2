import React from 'react';
import  ResultLineChart  from 'src/components/common/Charts/ResultLineChart';
import styles from './ReportResultGraph.module.less';
import { useReportResultFetch } from './hooks';
import { Alert } from 'antd';
import Spin from 'src/components/common/Spin';

export type ReportResultChart = {
  date: string;
  scriptname: string;
  scriptcount:string
};

type ReportResultGraphProps = {
  runId:string
};

const ReportResultGraph: React.FC<ReportResultGraphProps> = ({runId}): JSX.Element => {
  const { data, loading, error } = useReportResultFetch(runId); 
  const fetchLoading = loading && data === null;
  return (
    <div className={styles.price_distribution_wrapper}>
      {error && (
        <Alert
          message=""
          description="There are no data in this Run Id!"
          type="info"
          showIcon
        />
      )}
      {fetchLoading ? (
        <div className={styles.price_distribution_loader}>
          <Spin spinning={loading} />
        </div>
      ) : (
        data !== null && (
        <ResultLineChart data={data} id={'price_distribution_chart'} runId={runId} />  
        )
      )}
    </div>
  );
};

export default ReportResultGraph;

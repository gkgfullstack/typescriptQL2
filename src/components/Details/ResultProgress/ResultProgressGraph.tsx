import React from 'react';
//import styles from './ResultProgressGraph.module.less';
import { useResultProgressFetch } from './hooks';
import { Alert } from 'antd';
import Spin from 'src/components/common/Spin';
import { Progress } from 'antd';

type ReportResultGraphProps = {
  //data?:any, 
  runId:any
  className?:any;
};

// const ResultProgressGraph: React.FC<ReportResultGraphProps> = ({data, runId}): JSX.Element => {
//   const { loading, error } = useResultProgressFetch(runId);

const ResultProgressGraph: React.FC<ReportResultGraphProps> = ({runId}): JSX.Element => {
  const { data, loading, error } = useResultProgressFetch(runId);

 // const sliced = data?.slice(0, 2); 
  var numberValue = Number(data);
  
  const fetchLoading = loading && data && runId  === null;
  return (
    <div className="price_distribution_wrapper">
      {error && (
        <Alert
          message="Error"
          description="An error
          has occurred when trying to get Quality Index ! Please try again later!"
          type="error"
          showIcon
        />
      )}
      {fetchLoading ? (
        <div className="price_distribution_loader">
          <Spin spinning={loading} />
        </div>
      ) : (data !== null && runId && (
        <Progress percent={numberValue} /> 
           
        )
      )}
       
    </div>
  );
};

export default ResultProgressGraph;

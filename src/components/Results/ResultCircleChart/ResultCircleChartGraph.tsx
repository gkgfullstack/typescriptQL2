import React from 'react';
import styles from './ResultCircleChartGraph.module.less';
import { useResultCircleChartFetch } from './hooks';
import { Alert, Row, Col } from 'antd';
import Spin from 'src/components/common/Spin';
import SummaryChartType from 'src/types/SummaryChartType';
import SummaryCircleChart from 'src/components/common/Charts/SummaryCircleChart';
import SummaryCircleOutputChart from 'src/components/common/Charts/SummaryCircleOutputChart';
//import { useResultInputFetch } from '../ResultInput/Hooks';
//import  {summaryCircleChartReducer}  from './reducers';

export type SummaryCircleChartGraph = {
  completed: string;
  type: string;
  errorList?: SummaryChartType[];
  completedOut:string;
};

type SummaryGraphProps = {
  runId:string;
};

const ResultCircleChartGraph: React.FC<SummaryGraphProps> = ({runId}:SummaryGraphProps): React.ReactElement => { 
  const {inputdata, outputdata, loading, error, completed, completedOut  }:any = useResultCircleChartFetch(runId);
  const fetchLoading = loading && inputdata === null;
  const fetchLoading1 = loading && outputdata === null;
  return (
    <div className={styles.price_distribution_wrapper} > 
      {error && inputdata === '' && (
        <Alert
          message="Error"
          description="An error
          has occurred when trying to get Graph! Please try again later!"
          type="error"
          showIcon
        />
      )}
      <Row>
      <Col span={12} >{ fetchLoading ? (
        <div className={styles.price_distribution_loader} >
          <Spin spinning={loading} />
        </div>
      ) :  ( inputdata && inputdata.length === 0 || null || undefined || completed === '' || null || undefined   ? <h3 className={styles.wargingStyle}>No Input</h3> : inputdata !== null && (
        <div className={styles.price_distribution_charts} >
          <SummaryCircleChart data={inputdata} runId={runId} completed={completed}/>                 
      </div>         
      ))}</Col>
      <Col span={12}>{ fetchLoading1 ? (
        <div className={styles.price_distribution_loader} >
          <Spin spinning={loading} />
        </div>
      ) : ( outputdata && outputdata.length === 0 || null || undefined || completedOut === '' || null || undefined ? <h3 className={styles.wargingStyle}>No Output</h3> : outputdata !== null && (
          <div className={styles.price_distribution_charts}>
            <SummaryCircleOutputChart data={outputdata} runId={runId} completedOut={completedOut}/>                   
          </div>         
        ))}</Col>
    </Row>        
    </div>
  );
};

export default ResultCircleChartGraph;

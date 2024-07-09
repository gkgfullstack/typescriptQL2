import React from 'react';
//import styles from './ResultCircleChartGraph.module.less';
import { useResultCircleChartFetch } from './hooks';
import { Row, Col, Alert } from 'antd';
import Spin from 'src/components/common/Spin';
import SummaryChartType from 'src/types/SummaryChartType';
import SummaryCircleChart from 'src/components/common/Charts/SummaryCircleChart';
import SummaryCircleOutputChart from 'src/components/common/Charts/SummaryCircleOutputChart';
//import  {summaryCircleChartReducer}  from './reducers';

export type SummaryCircleChartGraph = {
  completed: string;
  type: string;
  errorList?: SummaryChartType[];
  completedOut:any;
};

type SummaryGraphProps = {
  runId:string;
};

const ResultCircleChartGraph: React.FC<SummaryGraphProps> = ({runId}): React.ReactElement => {
  console.log('ResultCircleChartGraph=====', runId)
  const { inputList,outputList, loading, error, completed, completedOut }:any = useResultCircleChartFetch(runId);
  const fetchLoading = loading && inputList === null;
  const fetchLoading1 = loading && outputList === null;
  return (
    <div className="price_distribution_wrapper"> 
    
      {error && inputList === '' && (
        <Alert
          message="Error"
          description="An error
          has occurred when trying to get Graph! Please try again later!"
          type="error"
          showIcon
        />
      )}
      <Row>
      <Col span={12}>{fetchLoading ? (
        <div className="price_distribution_loader">
          <Spin spinning={loading} />
        </div>
      ) : ( inputList && inputList.length === 0 || null || undefined || completed === '' || null || undefined ? <h3 className="wargingStyle">No Input</h3> : inputList !== null && (
          <div className="price_distribution_charts">
            <SummaryCircleChart data={inputList} runId={runId} completed={completed}/>
          </div>         
        ))}</Col>
      <Col span={12}>{fetchLoading1 ? (
        <div className="price_distribution_loader">
          <Spin spinning={loading} />
        </div>
      ) : ( outputList && outputList.length === 0 || null || undefined || completedOut === '' || null || undefined ? <h3 className="wargingStyle">No Output</h3> : outputList !== null && (
          <div className="price_distribution_charts">
            <SummaryCircleOutputChart data={outputList} runId={runId} completedOut={completedOut}/>
          </div>         
        ))}</Col>
    </Row>  
        
    </div>
  );
};

export default ResultCircleChartGraph;

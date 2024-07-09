import React from 'react';
import  ResultCircleChart  from 'src/components/common/Charts/ResultCircleChart';
import styles from './ResultCircleChartGraph.module.less';
import { useResultCircleChartFetch } from './hooks';
import SummaryChartType from 'src/types/SummaryChartType';
import SummaryCircleOutputChart from 'src/components/common/Charts/SummaryCircleOutputChart';

export type ResultCircleChartGraph = {
  copleted?: string;
  runId:string;
  errorList?: SummaryChartType[];
  id?:string;
  selectedRowKeyVal?:any;
  copletedvalue?:any;
};


const ResultCircleChartGraph: React.FC<ResultCircleChartGraph> = ({runId, copletedvalue}: ResultCircleChartGraph) => {

  const { inputData,outputData }:any = useResultCircleChartFetch(runId !== undefined ? runId : '-1'); 
   // const copletedvalue :any= localStorage.getItem('completedval') !== null ? localStorage.getItem('completedval') : '30';
 
  return (
    <div className={styles.price_distribution_wrapper}>      
        <ResultCircleChart data={inputData} completed={copletedvalue} runId={runId}  /> 
       <SummaryCircleOutputChart data={outputData} completedOut={"Outputs"} runId={runId}  />  
       
    </div>
    
    
  );
};

export default ResultCircleChartGraph;
